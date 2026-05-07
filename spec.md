# blackplum mockup — 기술 스펙

> 기준일: 2026-04-29
> 최종 수정: 2026-05-04

---

## 0. 섹션 인덱스 (필요 부분만 읽기)

> 본 spec은 1500+ 줄. **통째로 Read 금지**. 작업 시작 전 grep으로 라인 번호 식별 → Read의 `offset`/`limit`으로 해당 섹션만 부분 Read.
>
> 통째로 Read하면 컨텍스트 폭발(60k+) → 응답 사이클 5분/턴 + watchdog stall. 부분 Read가 기본 모드.

### 작업 유형별 권장 섹션 + grep 명령

| 작업 유형 | 권장 섹션 | grep 명령 (라인 번호 식별용) |
| --- | --- | --- |
| 컴포넌트 구현 | §3 디자인 토큰 + §5의 해당 컴포넌트 | `grep -n '^### 5-' spec.md` |
| 데이터 작성/수정 | §4의 해당 엔티티 | `grep -n '^### 4-' spec.md` |
| 매크로 빌더 | §4-8 + §5-9 + §3-2~§3-4 신설 토큰 | `grep -nE '5-9|4-8' spec.md` |
| 디자인 토큰 swap | §3 전체 | `grep -n '^### 3-' spec.md` |
| 반응형/모바일 | §7 | `grep -n '^## 7' spec.md` |
| 코드 품질/검증 기준 | §8 | `grep -n '^## 8' spec.md` |
| 변경 이력 | §10 working log | `grep -n '^## 10' spec.md` |

### 부분 Read 예시

```bash
# 1) 라인 번호 식별
grep -n '^### 4-3' spec.md
# → 626:### 4-3. Origin (sender + post 통합)

# 2) 다음 섹션 시작 라인까지 식별
grep -n '^### 4-4' spec.md
# → 657:### 4-4. Thread

# 3) 626~656만 부분 Read (Read tool offset=626, limit=31)
```

라인 번호는 변동되므로 **하드코딩 금지** — 매 작업마다 grep으로 동적 확인.

---

## 1. 개요

### 1-1. 본 문서의 위치

| 문서 | 역할 |
| --- | --- |
| `req.md` | 무엇을 만들지 — 도메인 요구사항, IA, 기능 정의 (mockup 스펙) |
| `spec.md` | 어떻게 만들지 — 기술 아키텍처, 디자인 시스템, 컴포넌트 설계, 동작 명세 |
| `tasks.md` | 진행 현황 — Phase·Task 단위 체크리스트, backlog |
| `CLAUDE.md` | 세션 운영 지침 — 코딩 규칙, 작업 위임 원칙, 행동 원칙 |

본 문서는 도메인 요구사항(req.md)을 직접 복제하지 않고 참조한다. 도메인 정의가 필요한 경우 `req.md §X` 형식으로 인용한다.

### 1-2. 작성/유지 원칙

- 기술 스펙의 변화, 로직 변경/개선, error/debug 이력은 모두 본 문서에 기록 (§10)
- 문서 작성 시 bold(`**`) 사용 최소화. 강조는 헤더, 인용, 코드블럭, 테이블로 처리
- 각 섹션은 mockup이 시연용임을 전제로 단순함을 우선. 추측성 확장 금지
- 토큰 swap 등으로 인해 자주 갱신되는 영역(§3)은 변경 시점/사유를 짧게 함께 기록

---

## 2. 아키텍처

### 2-1. 런타임 모델

빌드 도구 없이 단일 `index.html`을 브라우저에서 직접 로드. JSX는 Babel Standalone이 런타임 트랜스파일.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>blackplum</title>
  <link rel="stylesheet" href="styles.css" />
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="mock-data.js"></script>
  <script src="icon-set.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useReducer, useEffect, createContext, useContext } = React;
    /* App + 컴포넌트 정의 */
    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  </script>
</body>
</html>
```

### 2-2. 파일 구조

```
blackplum_mockup/
├── index.html         ← 진입점 + React 컴포넌트 정의
├── styles.css         ← 디자인 토큰 + 컴포넌트 스타일
├── mock-data.js       ← window.MOCK_DATA (메시지·스레드·게시글·자동화 룰·템플릿)
├── icon-set.js        ← window.ICON_SET (아이콘 name → SVG mapping)
├── eslint.config.js   ← ESLint 10 flat config
├── package.json       ← devDeps (eslint 등). 런타임 deps는 CDN
├── req.md
├── spec.md
├── tasks.md
├── dependencies.txt
├── docs/              ← 레퍼런스 자료, 별도 프로토타입 문서
└── .claude/           ← 세션 설정·sub-agents·CLAUDE.md
```

### 2-3. 상태 관리 전략

| 상태 종류 | 처리 방식 |
| --- | --- |
| 화면 전환 (랜딩 ↔ Home) | `useState` 로 `currentScreen` 관리 |
| 카테고리 / 탭 선택 | `useState` |
| SNS 필터, 태그 필터, 정렬 | `useState` (Set 또는 array) |
| Side Panel 열림/닫힘 + 선택 스레드 ID | `useState` |
| 메시지·스레드 컬렉션 mutation (읽음/보관/답장 추가) | `useReducer` |
| 다중선택 모드 / 선택 항목 집합 | `useState` (Set) |
| 토스트 큐 | `useReducer` |

전역 상태가 필요한 경우 React Context API까지만 허용. Redux/Zustand/Jotai 등 외부 상태 라이브러리 미도입.

### 2-4. 라우팅

React Router 미사용. state-based screen switching.

- 최상위 `App`이 `currentScreen` state를 들고 분기
- Home 내부의 카테고리/탭/사이드패널 전환은 모두 동일한 `MainScreen` 컴포넌트 안에서 state로 처리
- 브라우저 히스토리/딥링크 미지원 (mockup 시연 범위에서 불요)

### 2-5. 컴포넌트 트리 (초안)

```
App
├── LandingScreen              ← req.md §2-4. SNS 시작 버튼만 노출, 클릭 시 즉시 Home 진입
└── MainScreen                 ← Home (3분할 레이아웃)
    ├── TopToolbar             ← 글로벌 SNS 필터 / SNS 추가(+) / 검색
    ├── LeftSidebar (LSB)      ← CI/BI, 카테고리 탭, DM자동화, 프로필
    ├── InboxList              ← 카테고리별 분기
    │   ├── TagFilterBar
    │   ├── SortToggle
    │   ├── PreviewCard        ← 단일 레이아웃 (Type2 통합)
    │   └── (DM자동화 탭)        ← 매크로 빌더 진입 (§5-9)
    ├── SidePanel              ← 스레드 상세 (메시지 유형별 레이아웃 분기)
    │   ├── ThreadHeader
    │   ├── MessageThread      ← DM bubble / 댓글 imitate / 메일 (TBD)
    │   ├── OriginInfo         ← 게시글 썸네일 / sender 메타 (3단 레이아웃)
    │   └── ReplyArea          ← 저장답변 + AI 초안 + 에디터
    ├── Toast
    └── SearchPanel            ← 검색 (오버레이)
```

화면별 정확한 컴포넌트 분해는 §5에서 상세화.

---

## 3. 디자인 시스템

본 mockup은 외부 디자인시스템을 자주 swap할 것을 전제로 한다. 토큰 아키텍처는 swap-friendly 설계가 최우선이다.

### 3-1. 3-tier 토큰 아키텍처

```
Tier 1: Primitive Tokens   ← raw values. 외부 DS swap 시 이 tier만 교체
        │
        ▼ references
Tier 2: Semantic Tokens    ← 의미 기반. UI 코드는 이 tier만 참조
        │
        ▼ references
Tier 3: Component Tokens   ← 컴포넌트 단위 옵션 (필요한 경우만 정의)
```

규칙:
- UI 코드(컴포넌트 CSS·inline style)는 Tier 2(semantic) 또는 Tier 3(component) 토큰만 참조한다. Tier 1을 직접 참조하지 않는다.
- raw 값(예: `#FF7A00`, `14px`, `1.5`)을 컴포넌트 코드에 하드코딩하지 않는다.
- swap 시 작업: Tier 1 값 교체 → Tier 2 매핑 점검 → 변경된 토큰만 컴포넌트에 자연 반영.

### 3-2. Tier 1: Primitive 토큰

> 1차 swap (2026-04-30): "Streamtime theme" (warm cream paper + ink black + halftone-textured shapes) 기반. 출처는 `design.md` 및 `design_ref/colors_and_type.css`. 한국어 fallback으로 Pretendard를 폰트 스택에 유지 (§3-7 참조).
>
> 2차 swap (2026-05-07): "Zapier theme" (warm cream paper + warm near-black + sand 1px borders + single orange accent) 기반. 출처는 `design_ref/DESIGN-zapier.md`. Hanken Grotesk → Manrope (Google Fonts 무료, Degular Display 의 wide geometric fallback). Pretendard 한글 fallback 유지 (§3-7-1). 주요 변경: `--color-yellow*` → `--color-orange*` (토큰명+값 동시 변경), radius scale 16/24/32 → 5/8/14, border 2px→1px, hard-edge offset shadow → transparent (border-forward 시스템), display tracking -0.04em→-0.01em.

```css
:root {
  /* === Tier 1: Color — Foundations === */
  --color-ink:           #0F0F0F;   /* near-black body / display copy */
  --color-ink-soft:      #1F1F1F;
  --color-paper:         #F5EFE3;   /* warm cream — page floor */
  --color-paper-warm:    #EFE7D6;   /* slightly deeper cream */
  --color-paper-cool:    #ECE9E2;   /* desaturated alt cream */
  --color-white:         #FFFFFF;   /* card interior only — NOT page floor */

  /* === Tier 1: Color — Brand primaries (halftone shape palette) === */
  --color-yellow:        #FFD23F;   /* signature yellow */
  --color-yellow-soft:   #FFE680;
  --color-blue:          #4FC3F7;
  --color-blue-deep:     #2196F3;
  --color-pink:          #FF8FA3;
  --color-pink-soft:     #FFC2CD;
  --color-green:         #7CB342;
  --color-green-soft:    #B8D88A;
  --color-purple:        #8E6FE0;
  --color-purple-soft:   #D4C8F8;
  --color-coral:         #FF6B4A;

  /* === Tier 1: Color — Neutrals (warm-tinted) === */
  --color-grey-100:      #E8E4DA;
  --color-grey-200:      #C9C4B8;
  --color-grey-300:      #9D998E;
  --color-grey-400:      #6B6862;
  --color-grey-500:      #3D3B36;

  /* === Tier 1: Font Family === */
  --font-display:        'Hanken Grotesk', 'Pretendard Variable', 'Pretendard', system-ui, -apple-system, sans-serif;
  --font-body:           'Inter', 'Pretendard Variable', 'Pretendard', system-ui, -apple-system, sans-serif;
  --font-mono:           ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace;

  /* === Tier 1: Size Scale (font-size px) === */
  --size-12: 12px;
  --size-14: 14px;
  --size-16: 16px;
  --size-18: 18px;
  --size-20: 20px;
  --size-24: 24px;
  --size-28: 28px;
  --size-32: 32px;
  --size-44: 44px;
  --size-64: 64px;
  --size-88: 88px;

  /* === Tier 1: Spacing Scale (4px base) === */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-7:  48px;
  --space-8:  64px;
  --space-9:  96px;
  --space-10: 128px;

  /* === Tier 1: Layout Width (3분할 shell — Phase 1-3 도입) === */
  --width-lsb-pc:             240px;   /* PC 좌측 LSB 고정 폭 */
  --width-sidepanel-pc:       400px;   /* PC 우측 SidePanel 폭 */
  --width-inboxlist-pc:       520px;   /* PC InboxList 고정 폭 (패널 열림 시) */
  --width-inboxlist-tablet:   360px;   /* Tablet InboxList 고정 폭 (패널 열림 시) */
  --width-container-max:      1440px;  /* 콘텐츠 컨테이너 최대 폭 */

  /* === Tier 1: Radius === */
  --radius-xs:   4px;
  --radius-sm:   8px;
  --radius-md:   16px;
  --radius-lg:   24px;
  --radius-xl:   32px;
  --radius-pill: 9999px;

  /* === Tier 1: Border Width === */
  --border-w-default: 2px;       /* signature ink-black outline */
  --border-w-soft:    1.5px;     /* hairline (chips, dividers) */

  /* === Tier 1: Shadow — hard-edge offset only (no soft blur) === */
  --shadow-card:            0 1px 0 0 var(--color-ink);
  --shadow-press:           4px 4px 0 0 var(--color-ink);
  --shadow-press-lg:        6px 6px 0 0 var(--color-ink);
  /* === Tier 1: Shadow — soft elevation (blur-based, UI element lift) === */
  --shadow-elevation-soft:  0 1px 3px rgba(0,0,0,0.18);  /* 토글 knob 등 소형 UI 요소 lift */

  /* === Tier 1: Letter-spacing (tracking) === */
  --tracking-display-xl:  -0.04em;    /* 88px+ hero */
  --tracking-display-md:  -0.03em;    /* 44px display */
  --tracking-tight:       -0.02em;
  --tracking-snug:        -0.015em;
  --tracking-normal:      0;
  --tracking-wide:        0.04em;     /* eyebrow */

  /* === Tier 1: Line-height (leading) === */
  --leading-display:  0.92;
  --leading-tight:    1.05;
  --leading-snug:     1.2;
  --leading-normal:   1.4;
  --leading-relaxed:  1.5;

  /* === Tier 1: Font weight === */
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;
  --weight-heavy:    800;
  --weight-black:    900;

  /* === Tier 1: Motion === */
  --motion-fast:     150ms;
  --motion-normal:   200ms;
  --motion-slow:     350ms;
  --easing-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
  --easing-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1);

  /* === Tier 1: Overlay / Opacity (§5-9 매크로 빌더 도입) === */
  --color-overlay-scrim:        rgba(15, 15, 15, 0.4);   /* sheet/drawer backdrop dim — Tier 1에서만 raw rgba 허용 */
  --color-overlay-scrim-strong: rgba(15, 15, 15, 0.5);   /* modal backdrop dim (더 강한 dim) */
  --opacity-disabled:           0.45;                    /* INACTIVE / disabled 시각 dim */
}
```

### 3-3. Tier 2: Semantic 토큰

UI 코드가 직접 참조하는 토큰. swap 후에도 이 토큰의 이름은 변하지 않는다.

```css
:root {
  /* === Tier 2: Surface (background) === */
  --color-bg-canvas:        var(--color-paper);        /* page floor — warm cream */
  --color-bg-canvas-alt:    var(--color-paper-warm);   /* deeper cream band */
  --color-bg-surface:       var(--color-white);        /* card interior */
  --color-bg-inverse:       var(--color-ink);          /* dark band, primary CTA fill */

  /* === Tier 2: Text === */
  --color-text-primary:     var(--color-ink);
  --color-text-secondary:   var(--color-grey-500);
  --color-text-tertiary:    var(--color-grey-400);
  --color-text-muted:       var(--color-grey-300);
  --color-text-inverse:     var(--color-paper);
  --color-text-on-brand:    var(--color-ink);          /* yellow / cream surfaces use ink type */

  /* === Tier 2: Brand & accents === */
  --color-brand:            var(--color-yellow);       /* signature accent */
  --color-brand-soft:       var(--color-yellow-soft);
  --color-accent-pink:      var(--color-pink);
  --color-accent-pink-soft: var(--color-pink-soft);
  --color-accent-blue:      var(--color-blue);
  --color-accent-coral:       var(--color-coral);

  /* === Tier 2: Border === */
  --color-border-strong:    var(--color-ink);          /* 2px signature outline */
  --color-border-soft:      var(--color-grey-100);     /* 1.5px hairline */

  /* === Tier 2: Status === */
  --color-status-danger:    var(--color-coral);

  /* === Tier 2: Platform colors (functional — SNS borders/accents) === */
  --color-platform-instagram: var(--color-pink);
  --color-platform-youtube:   var(--color-coral);
  --color-platform-gmail:     var(--color-blue);
  --color-platform-tiktok:    var(--color-ink);
  --color-platform-naver:     var(--color-green);
  --color-platform-mail:      var(--color-grey-400);

  /* === Tier 2: Typography — family === */
  --font-family-display:    var(--font-display);       /* headlines / buttons / eyebrows / nav */
  --font-family-primary:    var(--font-body);          /* body / lead / running text */

  /* === Tier 2: Typography — size (semantic role) === */
  --font-size-display-xl:   var(--size-88);            /* hero — desktop only */
  --font-size-display-lg:   var(--size-64);
  --font-size-display-md:   var(--size-44);
  --font-size-h1:           var(--size-32);
  --font-size-h2:           var(--size-24);
  --font-size-h3:           var(--size-20);
  --font-size-h4:           var(--size-18);
  --font-size-body-lg:      var(--size-16);
  --font-size-body:         var(--size-14);
  --font-size-caption:      var(--size-12);
  --font-size-overline:     var(--size-12);

  /* === Tier 2: Typography — weight === */
  --font-weight-regular:    var(--weight-regular);
  --font-weight-medium:     var(--weight-medium);
  --font-weight-semibold:   var(--weight-semibold);
  --font-weight-bold:       var(--weight-bold);
  --font-weight-heavy:      var(--weight-heavy);
  --font-weight-black:      var(--weight-black);

  /* === Tier 2: Typography — leading === */
  --line-height-display:    var(--leading-display);    /* 0.92 — display type */
  --line-height-tight:      var(--leading-tight);      /* 1.05 — h1~h3 */
  --line-height-snug:       var(--leading-snug);       /* 1.2 — h4 / eyebrow */
  --line-height-normal:     var(--leading-normal);     /* 1.4 — lead */
  --line-height-relaxed:    var(--leading-relaxed);    /* 1.5 — body */

  /* === Tier 2: Typography — tracking === */
  --letter-spacing-display: var(--tracking-display-md);
  --letter-spacing-tight:   var(--tracking-tight);
  --letter-spacing-snug:    var(--tracking-snug);
  --letter-spacing-normal:  var(--tracking-normal);
  --letter-spacing-wide:    var(--tracking-wide);      /* eyebrow */

  /* === Tier 2: Surface — radius === */
  --surface-radius-card:    var(--radius-lg);          /* 24px — card / panel */
  --surface-radius-md:      var(--radius-md);          /* 16px — icon box, small surfaces */
  --surface-radius-chip:    var(--radius-pill);
  --surface-radius-pill:    var(--radius-pill);

  /* === Tier 2: Surface — border (composite) === */
  --surface-border-default: var(--border-w-default) solid var(--color-border-strong); /* 2px ink — default for all "object" surfaces: cards, panels, chrome, avatars, inputs, buttons */
  --surface-border-soft:    var(--border-w-soft)    solid var(--color-border-soft);   /* 1.5px hairline — reserved for true internal dividers within a single surface */

  /* === Tier 2: Surface — shadow === */
  --surface-shadow-card:    var(--shadow-card);
  --surface-shadow-press:   var(--shadow-press);       /* button hover */
  --surface-shadow-press-lg:var(--shadow-press-lg);    /* card hover */

  /* === Tier 2: Spacing aliases === */
  --gap-inline-xs:          var(--space-1);
  --gap-inline-sm:          var(--space-2);
  --gap-inline-md:          var(--space-3);
  --gap-stack-sm:           var(--space-3);
  --gap-stack-md:           var(--space-4);
  --gap-stack-lg:           var(--space-5);
  --gap-section:            var(--space-7);

  /* === Tier 2: Icon === */
  --icon-size-xs:           var(--size-12);
  --icon-size-sm:           var(--size-16);
  --icon-size-md:           var(--size-20);
  --icon-size-lg:           var(--size-24);
  --icon-color-primary:     var(--color-text-primary);
  --icon-color-muted:       var(--color-text-tertiary);
  --icon-color-on-brand:    var(--color-text-on-brand);
  --icon-color-inverse:     var(--color-text-inverse);
  --icon-color-accent:      var(--color-accent-coral);    /* AI-pick sparkle, coral accent icons */

  /* === Tier 2: Motion === */
  --transition-fast:        var(--motion-fast)   var(--easing-standard);
  --transition-normal:      var(--motion-normal) var(--easing-standard);
  --motion-duration-fast:   var(--motion-fast);
  --motion-duration-normal: var(--motion-normal);
  --motion-easing-standard: var(--easing-standard);

  /* === Tier 2: Overlay scrim (backdrop) === */
  --color-scrim-heavy:      var(--color-overlay-scrim-strong);   /* modal backdrop */
  --color-scrim-light:      var(--color-overlay-scrim);          /* drawer backdrop */

  /* === Tier 2: Interaction — press offset (button/card hover lift) === */
  --press-offset-x:         -2px;
  --press-offset-y:         -2px;

  /* === Tier 2: Layout (3분할 shell + hit area — Phase 1-3 도입) === */
  --layout-lsb-width:               var(--width-lsb-pc);
  --layout-inboxlist-width:         var(--width-inboxlist-pc);        /* 패널 열림 시 InboxList 고정 폭 */
  --layout-inboxlist-width-tablet:  var(--width-inboxlist-tablet);    /* Tablet InboxList 폭 */
  --layout-container-max:           var(--width-container-max);
  --touch-target-min:               var(--size-44);                   /* mobile fat-finger 최소 타겟 */

  /* === Tier 2: §5-9 매크로 빌더 — sheet / accordion / chip / status === */
  --color-bg-sheet:               var(--color-bg-surface);
  --color-bg-sheet-overlay:       var(--color-overlay-scrim);
  --color-bg-accordion-collapsed: var(--color-bg-canvas-alt);
  --color-bg-input-soft:          var(--color-bg-canvas-alt);
  --color-status-info-soft:       var(--color-accent-blue);
  --color-chip-remove-bg:         var(--color-grey-100);
  --color-chip-remove-fg:         var(--color-text-tertiary);
  --color-reply-remove-bg:        var(--color-accent-pink-soft);
  --color-reply-remove-fg:        var(--color-accent-pink);
  --surface-radius-sheet:         var(--radius-lg);            /* 양 상단 코너에만 적용 — CSS 측에서 처리 */

  /* === Tier 2: Phase 3 — 카드 선택 상태 === */
  --color-state-selected-bg:      var(--color-yellow-soft);   /* 선택된 카드 배경 */
  --color-state-selected-border:  var(--color-yellow);        /* 선택된 카드 테두리 */
  --color-state-checkbox-on:      var(--color-ink);           /* 체크박스 ON 색상 */
  --color-state-checkbox-off:     var(--color-grey-300);      /* 체크박스 OFF 색상 */

  /* === Tier 2: Stacked card — box-shadow fill & border (alpha via color-mix) === */
  --color-stacked-card-1:         color-mix(in srgb, var(--color-bg-canvas-alt) 50%, transparent);  /* 1번 카드 fill */
  --color-stacked-card-2:         color-mix(in srgb, var(--color-bg-canvas-alt) 25%, transparent);  /* 2번 카드 fill */
  --color-stacked-border-1:       color-mix(in srgb, var(--color-border-strong) 50%, transparent);  /* 1번 카드 외곽선 */
  --color-stacked-border-2:       color-mix(in srgb, var(--color-border-strong) 25%, transparent);  /* 2번 카드 외곽선 */

  /* === Tier 2: Opacity — semantic intent (Phase 4 도입) === */
  --opacity-hover:           0.85;  /* hover 단계 미세 dim (버튼·CTA) */
  --opacity-disabled-soft:   0.7;   /* 외형 visible 유지한 disabled (AI 버튼 등) */
  --opacity-disabled-strong: 0.35;  /* 강한 dim disabled (발송 버튼 비활성 등) */
}
```

### 3-4. Tier 3: Component 토큰 (필요 시)

컴포넌트별 옵션이 필요한 경우에만 정의. 처음부터 모든 컴포넌트에 component 토큰을 만들지 않는다 (over-engineering 회피).

예시:

```css
:root {
  --button-bg-primary:     var(--color-brand);
  --button-fg-primary:     var(--color-text-on-brand);
  --button-bg-secondary:   var(--color-bg-surface);
  --button-fg-secondary:   var(--color-text-primary);
  --button-radius:         var(--radius-md);

  --card-bg:               var(--color-bg-surface);
  --card-radius:           var(--surface-radius-card);
  --card-shadow:           var(--surface-shadow-card);
  --card-border:           1px solid var(--color-border-subtle);

  /* === Phase 2 컴포넌트 토큰 === */
  --landing-inner-max-width:             560px;
  --landing-headline-font-size:          clamp(var(--size-44), 12vw, var(--font-size-display-xl));
  --landing-headline-highlight-bg:       var(--color-brand-soft);        /* 업무 큐 인라인 yellow 하이라이트 배경 */
  --landing-headline-highlight-radius:   12px;                           /* DESIGN.md L305: rotated pill border-radius */
  --landing-sub-max-width:               36ch;                           /* 본문 단락 최대 폭 */
  --chip-expanded-max-width:             180px;
  --chip-label-max-width:                140px;
  --toast-max-width:                     320px;
  --toast-enter-offset:                  8px;
  --toast-exit-offset:                   4px;
  --modal-dialog-max-width:              480px;
  --modal-dialog-max-height:             90vh;   /* PC */
  --modal-dialog-max-height-mobile:      85vh;   /* mobile bottom-sheet 형태 */
  --popover-min-width:                   160px;
  --empty-state-icon-size:               48px;
  --empty-state-desc-max-width:          280px;
  --empty-state-min-height:              200px;
  --empty-state-title-font-size:         clamp(var(--size-24), 7vw, var(--font-size-display-md));  /* sub-region empty state: display-md scale */
  --lsb-drawer-width:                    min(280px, 80vw);

  /* === §5-9 매크로 빌더 컴포넌트 토큰 (Round 1 — Phase 5-1 사전 등재분) === */
  --sheet-handle-bg:                     var(--color-grey-200);
  --sheet-handle-w:                      var(--space-7);
  --sheet-handle-h:                      var(--space-1);
  --wizard-step-indicator-active-bg:     var(--color-bg-inverse);
  --wizard-step-indicator-visited-bg:    var(--color-text-secondary);
  --wizard-step-indicator-pending-bg:    var(--color-grey-200);
  --wizard-progress-track-bg:            var(--color-grey-100);
  --wizard-progress-fill-bg:             var(--color-bg-inverse);
  --automation-card-disabled-opacity:    var(--opacity-disabled);
  --keyword-chip-bg:                     var(--color-bg-canvas-alt);
  --keyword-chip-fg:                     var(--color-text-primary);
  --toggle-on-bg:                        var(--color-status-info-soft);
  --toggle-off-bg:                       var(--color-grey-200);
  --toggle-knob-bg:                      var(--color-bg-surface);

  /* === §5-9 매크로 빌더 컴포넌트 토큰 (Round 2 — Phase 5 구현 시 신설) === */

  /* Toggle track geometry */
  --toggle-track-w:                      44px;                           /* 토글 트랙 너비 */
  --toggle-track-h:                      24px;                           /* 토글 트랙 높이 */
  --toggle-knob-size:                    18px;                           /* 토글 knob 크기 */
  --toggle-knob-inset:                   3px;                            /* knob 내부 간격 */

  /* Wizard step dot geometry */
  --wizard-step-indicator-size:          8px;                            /* dot 지름 */
  --wizard-step-indicator-active-size:   10px;                           /* 현재 step dot 지름 */
  --wizard-step-indicator-gap:           var(--gap-inline-sm);           /* dot 간 간격 */

  /* Button edit sheet */
  --button-edit-sheet-max-width:         480px;                          /* PC sheet 최대 너비 */

  /* AutomationCard thumb */
  --automation-card-thumb-w:             80px;                           /* 카드 썸네일 너비 (PC) */
  --automation-card-thumb-w-mobile:      64px;                           /* 카드 썸네일 너비 (모바일) */
  --automation-card-thumb-border:        var(--surface-border-soft);     /* 썸네일 보더 */
  --automation-card-padding-x:          var(--card-padding-x);          /* 카드 좌우 패딩 */
  --automation-card-padding-y:          var(--card-padding-y);          /* 카드 상하 패딩 */
  --automation-card-future-bg:           var(--color-bg-canvas-alt);     /* FUTURE placeholder 배경 */

  /* AutomationTemplateCard */
  --template-card-w:                     180px;                          /* 템플릿 카드 너비 */
  --template-card-h:                     100px;                          /* 템플릿 카드 높이 */

  /* Wizard form layout */
  --wizard-field-radius:                 var(--radius-sm);               /* 입력 필드 radius */
  --wizard-section-gap:                  var(--gap-stack-md);            /* wizard 섹션 간격 */

  /* IgPostGridPicker */
  --ig-post-grid-cell-size:              80px;                           /* 그리드 셀 크기 */

  /* Review summary */
  --review-row-min-height:               var(--touch-target-min);        /* 요약 row 최소 높이 */

  /* === Phase 5 통합 검증 신설 토큰 === */

  /* Toggle knob shadow (C-1) */
  --toggle-knob-shadow:                  var(--shadow-elevation-soft);   /* knob lift 그림자 */

  /* Media/thumb radius (C-2) — image thumb, uploader, post grid cell */
  --media-thumb-radius:                  var(--radius-sm);               /* 미리보기·업로더·그리드 셀 모서리 */

  /* Wizard progress bar (C-4) */
  --wizard-progress-bar-h:               3px;                            /* 모바일 progress bar 높이 */

  /* Keyword chip in wizard input (C-4) */
  --keyword-chip-height:                 28px;                           /* wizard 입력 영역 chip 높이 */

  /* Chip remove button (C-4) */
  --chip-remove-icon-size:               18px;                           /* chip 내 X 버튼 크기 */

  /* Reply item textarea (C-4) */
  --reply-item-min-height:               40px;                           /* reply 항목 textarea 최소 높이 */

  /* Icon button 28px 사이즈군 (C-4) */
  --icon-button-size:                    28px;                           /* 28px 사이즈 아이콘 버튼 (reply/button-row 공용) */

  /* Message bubble preview thumb (C-4) */
  --message-preview-thumb-size:          60px;                           /* 말풍선 미리보기 이미지 썸네일 크기 */

  /* Wizard textarea height (C-4) */
  --wizard-textarea-min-h:               80px;                           /* wizard 내 textarea 최소 높이 */
  --wizard-textarea-max-h:               160px;                          /* wizard 내 textarea 최대 높이 */

  /* Button row URL display (C-4) */
  --button-row-url-max-w:                120px;                          /* 버튼 편집 행 URL 표시 최대 너비 */

  /* Image uploader thumb remove button (C-4) */
  --thumb-remove-offset:                 2px;                            /* thumb remove 버튼 top/right 오프셋 */
  --thumb-remove-size:                   20px;                           /* thumb remove 버튼 크기 */

  /* IG post grid cell check indicator (C-4) */
  --cell-check-offset:                   4px;                            /* 그리드 셀 check 버튼 top/right 오프셋 */
  --cell-check-size:                     20px;                           /* 그리드 셀 check 버튼 크기 */

  /* Review step label (C-4) */
  --review-step-label-min-w:             48px;                           /* 요약 행 스텝 라벨 최소 너비 */
  --review-step-label-pt:                2px;                            /* 요약 행 스텝 라벨 상단 패딩 */

  /* IG post grid cell border (C-3 — width-only for transparent border) */
  --ig-post-grid-cell-border-w:          var(--border-w-soft);           /* 그리드 셀 기본 테두리 두께 */
  --ig-post-grid-cell-border-w-selected: var(--border-w-default);        /* 그리드 셀 선택 테두리 두께 */

  /* === Phase 3 컴포넌트 토큰 === */

  /* LSB (LeftSidebar) */
  --lsb-brand-height:           52px;
  --lsb-category-row-height:    var(--touch-target-min);   /* 44px */
  --lsb-category-icon-size:     var(--icon-size-md);
  --lsb-badge-min-width:        20px;
  --lsb-badge-height:           20px;
  --lsb-divider-height:         1px;
  --lsb-section-divider-height: var(--border-w-default);
  --lsb-profile-height:         56px;
  --lsb-profile-avatar-size:    var(--size-32);

  /* InboxList */
  --inbox-header-height:        var(--touch-target-min);
  --inbox-tag-chip-height:      28px;
  --inbox-sort-toggle-height:   32px;

  /* PreviewCard */
  --card-thumb-size:            56px;
  --card-thumb-logo-size:       var(--icon-size-sm);       /* platform logo badge */
  --card-thumb-border-width:    var(--border-w-soft);
  --card-thumb-platform-offset: calc(-1 * var(--card-stacked-offset)); /* badge overlap */
  --card-gap:                   var(--gap-inline-md);
  --card-padding-x:             var(--gap-stack-md);
  --card-padding-y:             var(--gap-inline-md);
  --card-stacked-offset:        4px;
  --card-stacked-shadow:                                          /* fill 2장 + 외곽선 2장 (옵션 B) */
    var(--card-stacked-offset) var(--card-stacked-offset) 0 0 var(--color-stacked-card-1),
    var(--card-stacked-offset) var(--card-stacked-offset) 0 var(--border-w-default) var(--color-stacked-border-1),
    calc(var(--card-stacked-offset) * 2) calc(var(--card-stacked-offset) * 2) 0 0 var(--color-stacked-card-2),
    calc(var(--card-stacked-offset) * 2) calc(var(--card-stacked-offset) * 2) 0 var(--border-w-default) var(--color-stacked-border-2);
  --card-min-height:            var(--touch-target-min);   /* 44px */
  --card-tag-chip-height:       20px;
  --card-checkbox-size:         var(--icon-size-md);
  --card-longpress-scale:       0.97;

  /* PreviewCard — typography ramp (bolder round) */
  --card-sender-font-size:       clamp(var(--size-18), 5vw, var(--font-size-h3));   /* Type2 sender / Type1 biz-company: 18→20px Hanken Black */

  /* PreviewCard — type chip colors */
  --card-type-chip-bg-business: var(--color-yellow-soft);   /* business (비즈 제안) */
  --card-type-chip-bg-dm:       var(--color-pink-soft);     /* DM */
  --card-type-chip-bg-comment:  var(--color-pink-soft);     /* 댓글 (coral-soft 미정의 → pink-soft 폴백) */
  --card-type-chip-bg-mail:     var(--color-purple-soft);   /* 메일 (blue-soft 미정의 → purple-soft 폴백) */

  /* BulkActionBar */
  --bulk-bar-height:            var(--touch-target-min);   /* 44px 최소 */
  --bulk-bar-bg:                var(--color-bg-inverse);
  --bulk-bar-color:             var(--color-text-inverse);
  --bulk-bar-z:                 20;
  --bulk-bar-btn-height:        32px;                      /* pill 버튼 높이 */

  /* BulkTagModal */
  --bulk-tag-chip-height:       32px;

  /* === Phase 4 컴포넌트 토큰 (SidePanel) === */

  /* PreviewCard — 활성 선택 */
  --card-active-bg:             var(--color-state-selected-bg);

  /* TopToolbar */
  --top-toolbar-height:         56px;                          /* sticky bar 실효 높이 */

  /* SidePanel shell */
  --side-panel-padding-block:   var(--gap-stack-md);
  --side-panel-padding-inline:  var(--gap-stack-md);
  --side-panel-z-overlay:       50;                            /* mobile overlay z-index */

  /* ThreadHeader */
  --thread-header-action-gap:   var(--gap-inline-sm);
  --thread-header-sender-font-size: clamp(var(--size-20), 6vw, var(--font-size-display-md));  /* Option A: tighter mobile floor to prevent 3+ line wrap on 360px */

  /* Message bubbles (DM) */
  --message-bubble-radius:      var(--surface-radius-md);
  --message-bubble-padding-x:   var(--gap-stack-md);
  --message-bubble-padding-y:   var(--gap-inline-md);
  --message-bubble-max-width:   72%;
  --message-bubble-bg-incoming: var(--color-bg-canvas-alt);
  --message-bubble-bg-outgoing: var(--color-brand-soft);
  --message-bubble-tail-radius: var(--radius-sm);              /* 말풍선 꼬리쪽 radius */

  /* Comment thread */
  --comment-indent-depth-2:     var(--gap-stack-lg);           /* depth-2 댓글 들여쓰기 */

  /* Avatar sizes */
  --avatar-size-sm:             var(--size-28);                /* 댓글·버블 아바타 */
  --avatar-size-md:             var(--size-32);                /* 스레드 헤더 */

  /* SavedReply chips */
  --saved-reply-chip-max-width: 200px;
  --saved-reply-chip-dot-size:  6px;                           /* 상태 표시 dot 크기 */

  /* ReplyEditor */
  --reply-editor-min-height:    80px;
  --reply-editor-max-height:    200px;

  /* AI summary block */
  --ai-summary-bg:              var(--color-brand-soft);
  --ai-summary-border:          var(--border-w-soft) solid var(--color-border-soft);
  --ai-summary-padding:         var(--gap-inline-md);

  /* Attachment chip */
  --attachment-chip-max-width:  160px;                         /* 메시지 첨부 chip 최대폭 */

  /* Scrollbar (전역 overlay 스크롤바) */
  --scrollbar-thumb-size:       6px;                           /* thumb 폭/높이 — thin 고정 */
  --scrollbar-thumb-color:      var(--color-text-muted);       /* 스크롤 중 thumb 색 */
}
```

판단 기준:
- 동일한 semantic 의미를 여러 컴포넌트가 공유 → Tier 2로 충분
- 한 컴포넌트의 고유 디자인 결정이 다른 토큰들과 분리되어야 함 → Tier 3 정의

### 3-5. Typography 체계

semantic 역할별 사용 매핑. 컴포넌트는 raw 값 대신 아래 역할 토큰을 통해 텍스트를 표현한다.

| 역할 | 사용처 (예시) | family | size | weight | leading | tracking |
| --- | --- | --- | --- | --- | --- | --- |
| Display XL | 랜딩 hero brand title (desktop) | `display` | `display-xl` (88) | `black` (900) | `display` (0.92) | `display` (-0.03em) |
| Display LG | 큰 섹션 헤드 | `display` | `display-lg` (64) | `black` | `tight` | `display` |
| Display MD | 보조 hero / 큰 카드 타이틀 | `display` | `display-md` (44) | `black` | `tight` | `display` |
| Heading 1 | 카테고리 / 화면 타이틀 | `display` | `h1` (32) | `heavy` (800) | `tight` (1.05) | `tight` |
| Heading 2 | 섹션 / 카드 헤더 | `display` | `h2` (24) | `bold` (700) | `tight` | `tight` |
| Heading 3 | sender 이름 / 카드 부제목 | `display` | `h3` (20) | `bold` | `snug` | `snug` |
| Heading 4 | 카드 inline 타이틀 | `display` | `h4` (18) | `semibold` (600) | `snug` | `snug` |
| Body | 메시지 본문, 일반 텍스트 | `primary` | `body` (14) | `regular` (400) | `relaxed` (1.5) | `normal` |
| Body large | 강조 본문 / lead | `primary` | `body-lg` (16) | `medium` (500) | `normal` (1.4) | `normal` |
| Caption | 시각 보조 메타 | `primary` | `caption` (12) | `regular` | `normal` | `normal` |
| Overline / Eyebrow | 라벨, 카테고리 메타 | `display` | `overline` (12) | `bold` | `snug` | `wide` (0.04em) |
| Button | CTA / 버튼 라벨 | `display` | `body-lg` (16) | `bold` | `tight` | `snug` |

원칙:
- 디스플레이 계열(D-XL/LG/MD/H1/H2/H3) — Hanken Grotesk 700~900 + 음의 tracking. brand voice는 헤드라인의 라틴 카피에서 살아남.
- 본문 계열(Body / Body large / Caption) — Inter 400~500 + 0 tracking. 한글은 fallback의 Pretendard로 자연스럽게 폴백.
- Eyebrow/Overline은 대소문자 변경(UPPERCASE) 강제 없음. design.md의 Streamtime은 case 변경을 사용하지 않음. 색상은 보통 `--color-text-secondary`.

`styles.css`에서는 `.t-display`, `.t-h1`, `.t-h2`, `.t-body`, `.t-caption` 등 typography helper class로도 노출하여 JSX에서 단축 사용 가능 (선택). 단 raw 값 사용은 금지.

### 3-6. Icon 시스템

#### 3-6-1. 아키텍처

- 아이콘은 `icon-set.js`의 `window.ICON_SET` 객체에 `name → SVG path data` 형태로 등록
- 모든 아이콘 사용처는 `<Icon name="..." />` 컴포넌트만 통과
- 사이즈/색상은 CSS 토큰(`--icon-size-*`, `--icon-color-*`)으로 통제

#### 3-6-2. icon-set.js 형식

```js
// icon-set.js
window.ICON_SET = {
  search:   '<path d="..." />',
  archive:  '<path d="..." />',
  star:     '<path d="..." />',
  // ... Lucide 등에서 발췌한 SVG inner content
};
```

#### 3-6-3. <Icon /> API

```jsx
<Icon name="search" size="md" tone="primary" />
<Icon name="archive" size="sm" tone="muted" />
```

| prop | 값 | 매핑 |
| --- | --- | --- |
| `name` | `string` | `window.ICON_SET[name]` 조회 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `--icon-size-{size}` |
| `tone` | `'primary' \| 'muted' \| 'on-brand' \| 'inherit'` | `--icon-color-{tone}` 또는 `currentColor` |

내부 구현 컨셉:

```jsx
function Icon({ name, size = 'md', tone = 'inherit' }) {
  const inner = window.ICON_SET[name];
  if (!inner) return null;
  const cls = `icon icon--${size} icon--tone-${tone}`;
  return (
    <svg className={cls} viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: inner }} />
  );
}
```

CSS 측:

```css
.icon { display: inline-block; flex-shrink: 0; }
.icon--xs { width: var(--icon-size-xs); height: var(--icon-size-xs); }
.icon--sm { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.icon--md { width: var(--icon-size-md); height: var(--icon-size-md); }
.icon--lg { width: var(--icon-size-lg); height: var(--icon-size-lg); }
.icon--tone-inherit  { color: currentColor; }
.icon--tone-primary  { color: var(--icon-color-primary); }
.icon--tone-muted    { color: var(--icon-color-muted); }
.icon--tone-on-brand { color: var(--icon-color-on-brand); }
.icon--tone-accent   { color: var(--icon-color-accent); }
.icon path, .icon circle, .icon rect { stroke: currentColor; fill: none; }
```

(line-style 아이콘 가정. 채움 아이콘이 섞여야 한다면 `tone` 또는 별도 prop으로 분기)

#### 3-6-4. 초기 아이콘 출처

- 1차: Lucide(line-style, MIT 라이선스) 에서 필요한 SVG path만 발췌하여 `icon-set.js`에 옮김
- 외부 라이브러리 의존성 없음(사용 시점엔 SVG가 인라인 자산)
- swap 시 `icon-set.js` 한 파일만 새 아이콘팩의 SVG로 교체

### 3-7. 외부 디자인시스템 swap 절차

1. 디자인시스템 자산을 프로젝트에 추가 (폰트 자산 / Figma 토큰 export / 아이콘팩 등)
2. 자산 분석:
   - typography 체계 (family / size / weight / line-height)
   - 색상 팔레트
   - 간격 / radius / shadow
   - 아이콘셋
3. `styles.css`의 Tier 1 값 교체. 토큰 이름은 그대로 두고 값만 swap (`--color-orange-500` 같은 raw-name이라면 새 디자인시스템에 맞게 토큰명도 같이 갱신)
4. Tier 2 매핑 점검:
   - 새 디자인시스템에 누락된 semantic 토큰이 있으면 Tier 1 보강
   - 중복/불필요 토큰 제거
5. `icon-set.js`의 SVG mapping을 새 아이콘팩의 SVG로 교체
6. 폰트 로딩 `<link>` 갱신
7. 콘솔 에러 / 시각 점검 후 swap 완료
8. spec.md §3-2, §3-3 placeholder를 새 값으로 갱신, §10에 swap 시점·출처 기록

#### 3-7-1. 한글 fallback 정책

본 mockup의 UI 카피는 거의 전부 한국어다. 외부 디자인시스템이 한글 글리프를 자체 처리하지 못하는 라틴 중심 폰트(예: Hanken Grotesk, Inter)를 처방하는 경우, **Tier 1의 폰트 family 토큰 fallback에 Pretendard를 항상 유지**한다. 브라우저는 라틴은 외부 DS의 디스플레이/본문 폰트로, 한글은 Pretendard로 글리프 단위 폴백한다. swap 시 이 정책은 협상 대상이 아니며, 디자인시스템이 한글 cuts를 직접 제공하는 경우에만 Pretendard fallback을 빼낸다.

### 3-8. CSS 작성 규칙

- BEM 기반 시맨틱 클래스 (`.preview-card`, `.preview-card__thumb`)
- raw 값 사용 금지. semantic 토큰 또는 component 토큰만 참조
- 동적 색상(SNS 플랫폼별 border, 카테고리 accent 등)만 inline `style={{ color: ... }}` 허용. 단 inline 값도 가급적 토큰 reference (`var(--color-platform-instagram)` 등)로 작성
- `!important` 사용 금지 (불가피한 경우 §10에 사유 기록)
- **`@media` 쿼리의 breakpoint raw px 예외**: CSS spec상 `@media (max-width: var(--bp-mobile))` 식 변수 사용이 불가하므로 미디어쿼리 조건절에 한해 raw px 사용 허용. 단 §7-1 breakpoint 표(767 / 768 / 1023 / 1024)를 단일 truth source로 사용하고 다른 값 도입 금지

---

## 4. 데이터 모델

본 mockup의 데이터는 `mock-data.js`의 `window.MOCK_DATA`에 정적으로 정의된다. mockup 범위에서 schema는 다음과 같다.

### 4-1. 엔티티 관계도

```
channel (단일 객체)
  └─ connected_sns_accounts[]                    user의 SNS 계정 목록

origins[]
  ├─ type='post' | 'sender'
  └─ user_sns_account_id → channel.connected_sns_accounts[].id

threads[]
  ├─ origin_id → origins[].id
  └─ message_ids[] → messages[].id

messages[]
  └─ thread_id → threads[].id

savedReplies[]
automations[]                                    §4-8
AUTOMATION_TEMPLATES[]                           §4-8-4
ai_drafts: { [thread_id]: string }
```

### 4-2. Channel & Connected SNS Account

```ts
type Channel = {
  user_id: string;
  user_display_name: string;
  channel_id: string;
  channel_display_name: string;
  channel_handle: string;
  connected_sns_accounts: ConnectedSnsAccount[];
};

type ConnectedSnsAccount = {
  id: string;
  platform: 'instagram' | 'youtube' | 'tiktok' | 'gmail' | 'naver_mail' | 'other_mail';
  account_handle: string;        // 본인 채널의 핸들/이메일
  display_name: string;          // mouseover 확장 시 표시
  account_color_token?: string;  // 같은 플랫폼 복수 계정 border 색상 (예: 'var(--color-account-1)')
  initial?: string;              // 같은 플랫폼 복수 계정 이니셜
};
```

mockup에서 `channel`은 단일 객체. 다중 channel은 backlog.

### 4-3. Origin (sender + post 통합)

```ts
type Origin = {
  id: string;
  type: 'post' | 'sender';
  platform: enum;
  user_sns_account_id: string;   // channel.connected_sns_accounts[].id reference
  account_id?: string;           // (type=sender) 발신자의 SNS account id (핸들/이메일)
  media_id?: string;             // (type=post) 게시글의 platform unique 식별자 (Meta API상 IG/FB media id 등)
  display_name: string;          // (type=sender) 발신자 표시명 / (type=post) 캡션 short
  post_meta?: {
    thumbnail_url: string;
    caption: string;
    created_at: string;
  };
  manual_tags: string[];         // 현재 활성 manual tag (origin 시점 이후 message에 자동 부착)
  engagement_meta?: {
    likes: number;
    views: number;
    comment_count: number;
    trend_flag?: 'rising' | 'falling' | null;
  };
};
```

Origin manual tag 동작 (req.md §5-4):
- origin에 manual tag가 부착된 시점 이후 들어오는 메시지는 `message.tags`에 origin manual tag가 자동 복제됨
- 해제(detach) 후 들어오는 메시지에는 자동 복제 안 됨
- mockup에서는 mock data 작성 단계에서 위 시간 의존성을 사전에 반영하여 `message.tags`에 결과를 채워둠 (runtime에서 재계산하지 않음)

### 4-4. Thread

```ts
type Thread = {
  id: string;
  platform: enum;
  message_type: 'dm' | 'comment' | 'email';   // origin.type + platform으로 derive 가능, 분기 편의용 mirror
  origin_id: string;
  origin_type: 'post' | 'sender';             // origin.type mirror — 분기 편의용
  message_ids: string[];                       // 시간 오름차순
  tags: string[];                              // message들의 tag 합집합 (derive). manual/auto 구분 없는 단일 풀
  priority_score: number;                      // 사전 계산된 정수
  processed: boolean;                          // derived: thread 내 incoming message 중 processed_at=null이 하나도 없으면 true
  last_message_at: string;
  is_stacked: boolean;                         // 대댓글 stacked card UI 표시 여부
  business_extracted?: BusinessFields;         // type1 비즈니스 카드용 정형 추출
  ai_thread_context: string;                   // 스레드 맥락 (req.md §5-3-2)
};

type BusinessFields = {
  company: string;
  brand: string;
  contact_person: string;
  proposal_summary: string;
  product: string;
  conditions: string;
};
```

### 4-5. Message

```ts
type Message = {
  id: string;
  thread_id: string;
  sender_id: string;             // 메시지 작성자 식별자. 항상 SNS account_id 형식 (incoming: origin.account_id / outgoing: 자동 기록 — 아래 4-5-1)
  direction: 'incoming' | 'outgoing';
  body: string;
  attachments: { name: string; type: string }[];
  sent_at: string;               // ISO timestamp
  read_at: string | null;        // 읽은 시각. null이면 미독
  processed_at: string | null;   // 답장/읽음처리/toss/무시하기 등 명시적 action 시점. null이면 미처리. read_at과 별개 개념
  depth: 1 | 2;                  // dm/email 항상 1, 원댓글 1, 대댓글 2
  parent_message_id: string | null;
  tags: string[];                // 자동 분류 + origin.manual_tags 자동 복제 결과의 합집합
  ai_context_solo: string;       // 메시지 단독맥락 (req.md §5-3-1)
  ai_context_cumulative: string; // 메시지 누적맥락
};
```

#### 4-5-1. Outgoing message의 sender_id 자동 기록

Outgoing message는 작성자가 user 본인이므로 `sender_id`가 다음 규칙으로 자동 채워진다:

```
sender_id = channel.connected_sns_accounts.find(
  acc => acc.id === thread.origin.user_sns_account_id
).account_handle
```

mock data 작성 시 모든 outgoing message는 위 규칙으로 sender_id를 채운다.

#### 4-5-2. Outgoing message의 processed_at

Outgoing message는 보낸 시점에 이미 처리된 것으로 간주. `processed_at`은 `sent_at`과 동일하게 채운다 (mock data·runtime 모두).

### 4-6. Tag / Category 정의

```js
window.MOCK_DATA.TAG_CATALOG = {
  business: ['공구 제안','시딩 제안','광고/협찬 제안','행사/오프라인 제안','기타 제안'],
  ops:      ['구매 문의','배송 문의','CS/환불','제품 질문','링크 요청'],
  social:   ['셀럽','VIP팬','일반팬','브랜드','고민상담','콘텐츠 요청'],
  manual:   ['중요','저장','긴급','이벤트-예정','이벤트-오픈','이벤트-종료','VIP','NIP'],
};

window.MOCK_DATA.CATEGORIES = {
  ai_pick:       { display: 'AI Pick',       tag_filter: '*' },
  business:      { display: '비즈니스',       tag_filter: TAG_CATALOG.business },
  ops:           { display: '운영/CS',        tag_filter: TAG_CATALOG.ops },
  social:        { display: '소통',           tag_filter: TAG_CATALOG.social },
  direct_check:  { display: '직접확인',       tag_filter: 'untagged' },
  sent:          { display: '보낸메시지함',    view: 'outgoing_messages', type_filter: ['dm','comment','email'] },
  dm_automation: { display: 'DM 자동화',      view: 'macro_rules' },
};
```

`tag_filter` 의미:
- `'*'` — 모든 thread (AI pick)
- `'untagged'` — `tags.length === 0` 인 thread (직접확인)
- `string[]` — 배열 중 하나 이상 포함된 thread

`view` 의미:
- `'outgoing_messages'` — derived view: 다른 카테고리 thread들의 outgoing message를 모아 표시
- `'macro_rules'` — InboxList 영역이 매크로 룰 리스트로 전환

태그 추가/삭제는 mockup 범위 외 (req.md §5-2: preset only).

### 4-7. SavedReply

```ts
type SavedReply = {
  id: string;
  category: keyof typeof CATEGORIES;
  text: string;
  generated_by: 'user' | 'ai';
};
```

같은 카테고리 메시지에서만 노출 (req.md §6-3).

### 4-8. Automation (DM 자동화 룰)

본 mockup은 macro-prd.md §5의 `Automation` 스키마를 기준으로 한다. mockup 범위 외 항목(P3 — 이벤트 추첨 / A·B / 고급 분석)은 schema에서 제거하였다. 시간 필드는 단순 ISO string으로 보유하며, runtime 갱신은 시연 범위 외이므로 정적이다.

```ts
type Automation = {
  id: string;
  template_key: TemplateKey | null;       // 빈 자동화는 null
  title: string | null;                   // null이면 카드에 "설정된 타이틀 없음" 표기
  status: AutomationStatus;
  delivery_mode: 'IMMEDIATE';             // mockup은 IMMEDIATE 고정

  // ④ 대상 게시물
  target_mode: TargetMode;
  target_post_ids: string[];              // target_mode=SPECIFIC_POSTS일 때 ≥1, FUTURE_POSTS일 때 빈 배열

  // ③ 댓글 트리거
  trigger_mode: TriggerMode;
  trigger_keywords: string[];             // trigger_mode=KEYWORD_MATCH일 때 ≥1, ALL_COMMENTS일 때 빈 배열

  // ② 팔로우 분기
  follower_branch: FollowerBranch;

  // 메시지 본문 (단일)
  // - follower_branch.mode != DIFFERENT_MESSAGES일 때만 사용
  // - DIFFERENT_MESSAGES일 때는 follower_branch.follower_message / non_follower_message 사용 (이때 본 필드는 무시)
  message: AutomationMessage;

  // ① 자동 답글
  reply: AutoReply;

  // 통계 (mock 정적 수치)
  stats: AutomationStats;

  // 정적 mock 누적 활성 시간(분). created_at 이후 status가 ACTIVE인 시간을 합산한 값을 정적으로 보유.
  active_minutes: number;

  created_at: string;                     // ISO timestamp
  updated_at: string;                     // ISO timestamp
};

type TemplateKey =
  | 'COMMENT_EVENT'
  | 'PRODUCT_INFO'
  | 'PURCHASE_AUTH';

type AutomationStatus = 'ACTIVE' | 'INACTIVE';

type TargetMode = 'SPECIFIC_POSTS' | 'FUTURE_POSTS';

type TriggerMode = 'ALL_COMMENTS' | 'KEYWORD_MATCH';

type FollowerBranchMode =
  | 'SAME'                                // 모두 같은 메시지
  | 'FOLLOWERS_ONLY'                      // 팔로워에게만 발송
  | 'NON_FOLLOWERS_ONLY'                  // 비팔로워에게만 발송
  | 'DIFFERENT_MESSAGES';                 // 팔로워/비팔로워에 다른 메시지 발송

type FollowerBranch = {
  mode: FollowerBranchMode;
  follower_message?: AutomationMessage;       // mode=DIFFERENT_MESSAGES일 때 필수
  non_follower_message?: AutomationMessage;   // mode=DIFFERENT_MESSAGES일 때 필수
};

type AutomationMessage = {
  type: MessageBodyType;
  body: string;                           // 항상 필수, non-empty
  images: ImageRef[];                     // type=IMAGE_CAROUSEL일 때 ≥1, TEXT일 때 빈 배열
  buttons: AutomationButton[];            // 0..n
};

type MessageBodyType = 'TEXT' | 'IMAGE_CAROUSEL';

type AutomationButton = {
  id: string;                             // 클라이언트 임시 id (순서 변경 / 키 안정화용)
  text: string;                           // 필수
  action_type: 'URL';                     // mockup은 URL 고정 (확장 여지)
  url: string;                            // 필수, 유효성 검증은 substring 'http' 정도까지만
};

type ImageRef = {
  url: string;                            // mock 이미지 url (placeholder 가능)
  order: number;                          // 0-based
};

type AutoReplyTone = 'POLITE' | 'FRIENDLY' | 'CUSTOM';

type AutoReply = {
  enabled: boolean;
  tone: AutoReplyTone;                    // enabled=false여도 마지막 선택 톤은 보존
  items: string[];                        // enabled=true일 때 ≥1, 발송 시 랜덤 1건
};

type AutomationStats = {
  sent: number;
  read: number;
  clicked: number;
};
```

#### 4-8-1. Schema 결정 근거

| 결정 | 근거 |
| --- | --- |
| 타입명 `Automation` | macro-prd.md §5와 일치 |
| `template_key` 3종으로 한정 | macro-prd.md §10 P1 범위 — `BLANK`는 null로 표현 |
| `delivery_mode: 'IMMEDIATE'` 고정 | macro-prd.md §4-2 — 다른 발송 모드는 mockup 범위 외 |
| `follower_branch.follower_message` / `non_follower_message`를 nested 객체로 보유 | macro-prd.md §6 — DIFFERENT_MESSAGES 모드에서 본 필드 사용 |
| `images.order` 보유 | 캐러셀 순서 변경 UI 시연 가능성 (P2) |
| `stats`는 정적 mock | macro-prd.md §10 P3의 실시간 갱신은 mockup 범위 외 |
| `created_at`/`updated_at` ISO string | mockup runtime은 갱신하지 않음. mock data 작성 시 사실적 분포로 채움 |

#### 4-8-2. 검증 함수 (`isAutomationValid`)

다음의 조건을 모두 만족할 때 룰 저장(=`완료`)이 가능하다 (req.md §6-2-6과 동일 규칙).

```js
function isAutomationValid(a) {
  // 대상 게시물
  if (a.target_mode === 'SPECIFIC_POSTS' && a.target_post_ids.length < 1) return false;

  // 댓글 트리거
  if (a.trigger_mode === 'KEYWORD_MATCH' && a.trigger_keywords.length < 1) return false;

  // 자동 답글
  if (a.reply.enabled && a.reply.items.length < 1) return false;

  // 메시지(들) 검증
  if (a.follower_branch.mode === 'DIFFERENT_MESSAGES') {
    if (!isMessageValid(a.follower_branch.follower_message)) return false;
    if (!isMessageValid(a.follower_branch.non_follower_message)) return false;
  } else {
    if (!isMessageValid(a.message)) return false;
  }
  return true;
}

function isMessageValid(m) {
  if (!m || !m.body || m.body.trim() === '') return false;
  if (m.type === 'IMAGE_CAROUSEL' && m.images.length < 1) return false;
  for (const b of m.buttons) {
    if (!b.text || b.text.trim() === '') return false;
    if (!b.url || b.url.trim() === '') return false;
  }
  return true;
}
```

#### 4-8-3. mock_data 모듈 키 갱신

§4-10의 모듈 구조에서 `macroRules: MacroRule[]` 필드를 `automations: Automation[]`로 교체한다. 카테고리 정의(§4-6)의 `dm_automation` view 처리(`view: 'macro_rules'`)는 그대로 두되, mock_data 참조명만 `automations`로 일치시킨다. `AUTOMATION_TEMPLATES` 키도 신규 추가한다 (§4-8-4 참조).

#### 4-8-4. AUTOMATION_TEMPLATES (사전 채움 데이터)

템플릿 카드 클릭 시 wizard에 prefill되는 부분 데이터. 빈 영역은 사용자 입력으로 채워진다.

```ts
type AutomationTemplate = {
  key: TemplateKey;
  category_label: string;             // "판매 자동화"
  display_name: string;               // "댓글 이벤트 템플릿"
  prefill: Partial<Automation>;       // wizard draft에 deep-merge
};
```

| 템플릿 키 | prefill 영역 |
| --- | --- |
| `COMMENT_EVENT` | trigger_keywords, reply(enabled+items+tone=FRIENDLY), message.body |
| `PRODUCT_INFO` | trigger_keywords, reply(enabled+items+tone=POLITE), message.body, message.buttons[1] |
| `PURCHASE_AUTH` | trigger_keywords, reply(enabled+items+tone=POLITE), message.body |

위 prefill에서 채워지지 않는 필드의 기본값은 §4-8-5의 `BLANK_AUTOMATION_DRAFT`를 따른다.

#### 4-8-5. 신규 draft 기본값

`+ 자동화 추가하기`로 시작하는 빈 자동화의 초기값. 템플릿 사용 시에는 본 기본값에 prefill을 deep-merge한다.

```js
const BLANK_AUTOMATION_DRAFT = {
  template_key: null,
  title: null,
  status: 'INACTIVE',                 // 완료 시 ACTIVE로 전환
  delivery_mode: 'IMMEDIATE',
  target_mode: 'SPECIFIC_POSTS',
  target_post_ids: [],
  trigger_mode: 'ALL_COMMENTS',
  trigger_keywords: [],
  follower_branch: { mode: 'SAME' },
  message: {
    type: 'TEXT',
    body: '',
    images: [],
    buttons: [],
  },
  reply: { enabled: false, tone: 'POLITE', items: [] },
  stats: { sent: 0, read: 0, clicked: 0 },
};
```

### 4-9. Platform Logo 매핑

SNS 로고는 `icon-set.js`의 SVG와 통합 관리. channel 또는 connected_sns_accounts에 로고 자산을 직접 보유하지 않는다.

```js
window.MOCK_DATA.PLATFORM_LOGOS = {
  instagram:  'logo-instagram',     // window.ICON_SET 의 name
  youtube:    'logo-youtube',
  tiktok:     'logo-tiktok',
  gmail:      'logo-gmail',
  naver_mail: 'logo-naver-mail',
  other_mail: 'logo-other-mail',
};
```

JSX 사용:
```jsx
<Icon name={PLATFORM_LOGOS[account.platform]} size="sm" />
```

디자인시스템 swap 시: `icon-set.js`의 logo-* SVG를 새 출처로 교체하면 자동 swap.

### 4-10. MOCK_DATA 모듈 구조

```js
window.MOCK_DATA = {
  channel: { /* 단일 Channel 객체, connected_sns_accounts 임베드 */ },
  origins: Origin[],
  threads: Thread[],
  messages: Message[],
  savedReplies: SavedReply[],
  automations: Automation[],                    // §4-8
  AUTOMATION_TEMPLATES: AutomationTemplate[],   // §4-8-4
  BLANK_AUTOMATION_DRAFT: Partial<Automation>,  // §4-8-5 — 신규 wizard 초기값
  AUTOMATION_REPLY_PRESETS: {                   // §5-9-8 — 톤별 한국어 답글 후보
    POLITE: string[],
    FRIENDLY: string[],
  },
  ai_drafts: { [thread_id: string]: string },
  TAG_CATALOG,
  CATEGORIES,
  PLATFORM_LOGOS,
};
```

### 4-11. Mock 데이터 분포 가이드

본 분포는 `mock-data-writer`가 Phase 1에서 작성할 때의 기준이다.

| 카테고리 | 미처리 thread | 처리됨 thread | 합계 |
| --- | --- | --- | --- |
| 비즈니스 (그중 2개는 20+ msg long thread, 다중 주제 전환 시연용) | 16~20 | 4~6 | 20~26 |
| 운영/CS | 20~26 | 5~7 | 25~33 |
| 소통 | 16~20 | 4~6 | 20~26 |
| 직접확인 (untagged) | 7~10 | 2~3 | 9~13 |
| DM 자동화 (Automation 룰, §4-8) | n/a | 5~7 | 5~7 |

- 미처리 비율 ~75% / 처리됨 ~25% (시연 중 새 처리 동작 여지 확보)
- 보낸메시지함은 derived view (별도 thread 분포 없음). 다른 카테고리 thread에 outgoing message가 충분히 섞이도록 작성
- AI context (`ai_context_solo`/`ai_context_cumulative`/`ai_thread_context`)는 모든 message·thread에 풀 채움
- 비즈니스 long thread 2개: req.md §5-3-3 예시(A→B→C→B→D 주제 전환) 패턴을 반영하여 누적맥락이 자연스럽게 변화하는 시연 데이터로 구성
- 플랫폼 분포: Instagram > YouTube > Gmail > 틱톡 > 네이버메일 > 기타메일 (req.md §4 우선순위)
- 같은 플랫폼 복수 계정: Instagram 2개 정도 (글로벌 SNS 필터 시연용)

#### 4-11-1. Automation 룰 분포 (5~7개)

자동화 룰 5~7개는 다음 분포로 작성한다. 시연 시 다양한 조합을 보여주기 위함이다.

| # | 핵심 시연 포인트 | template_key | target_mode | trigger_mode | follower_branch | message.type | buttons | reply.enabled | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 가장 단순한 룰 (P0) | null | SPECIFIC_POSTS | KEYWORD_MATCH (`참여`) | SAME | TEXT | 0 | true (CUSTOM, 1건) | ACTIVE |
| 2 | 템플릿 기반 풀 옵션 (P1) | PRODUCT_INFO | SPECIFIC_POSTS | KEYWORD_MATCH (`정보`,`상세`) | SAME | TEXT | 1 (URL) | true (POLITE, 3건) | ACTIVE |
| 3 | 이미지 캐러셀 시연 (P1) | COMMENT_EVENT | SPECIFIC_POSTS | KEYWORD_MATCH (`이벤트`) | SAME | IMAGE_CAROUSEL (3장) | 0 | true (FRIENDLY, 4건) | ACTIVE |
| 4 | 팔로우 분기 — 동일메시지 모드 (P2) | null | SPECIFIC_POSTS | ALL_COMMENTS | FOLLOWERS_ONLY | TEXT | 1 | false | ACTIVE |
| 5 | 팔로우 분기 — DIFFERENT_MESSAGES (P2) | null | SPECIFIC_POSTS | KEYWORD_MATCH (`구매`,`주문`) | DIFFERENT_MESSAGES | TEXT × 2 | 1 + 0 | true (POLITE, 2건) | ACTIVE |
| 6 | 향후 게시물 자동 적용 (P2) | PURCHASE_AUTH | FUTURE_POSTS | KEYWORD_MATCH (`인증`) | SAME | TEXT | 0 | true (POLITE, 3건) | INACTIVE |
| 7 | INACTIVE 카드 (시각 dim 시연용, optional) | null | SPECIFIC_POSTS | KEYWORD_MATCH (`좌표`) | SAME | TEXT | 1 | false | INACTIVE |

분포 작성 시 추가 가이드:

- 통계(`stats`)는 ACTIVE 룰에 비례 분포 — `sent` 100~3000, `read`는 `sent`의 60~85%, `clicked`는 `read`의 5~25% (단, `buttons=[]`인 룰은 클릭 대상이 없으므로 `clicked=0` 허용)
- `target_post_ids`는 `origins[]` 중 `platform=instagram` AND `type=post`인 항목의 media_id를 차용 (별도 게시물 mock 신설 불필요)
- INACTIVE 룰의 stats는 0이거나 매우 낮음(<50) — "발송 정지 후 누적되지 않음" 시연
- 룰 #2의 `buttons[0]`는 "자세히 보기" / `https://example.com/product` 식의 generic mock
- 룰 #5의 `follower_message`·`non_follower_message`는 본문 톤 차이가 명확하도록 작성 (팔로워 → 친근, 비팔로워 → 공식적)
- `active_minutes`는 created_at부터 현재 또는 status 변경 시점까지의 누적 활성 분. INACTIVE 룰은 status 변경 전까지의 누적값. mockup 시점 기준 2026-05-05.

---

## 5. 화면 / 컴포넌트 설계

### 5-1. 랜딩 화면 (`LandingScreen`)

- req.md §2-4: 가입/OAuth/채널생성 모두 생략
- 중앙 수직 스택 레이아웃 (centered-vertical-stack). 모바일/PC 공통
- 3-tier 타이포그래피 히어로:
  - 아이브로우: `blackplum` — `t-display-md` (44px), `--color-text-tertiary`
  - 헤드라인: `"받은편지함이 아닌 업무 큐"` — `t-display-xl` (clamp 44→88px), `업무 큐` 단어에 `--landing-headline-highlight-bg`(brand-soft yellow) 인라인 하이라이트
  - 서브: `"인스타 DM·댓글, 유튜브 댓글, 메일까지 — 처리할 일만 골라드려요"` — `t-body-lg`, `--color-text-secondary`
- SNS 버튼 나열 (Google / Naver / Kakao / Apple) — 어떤 버튼이든 클릭 → `currentScreen = 'main'` 즉시 전환

### 5-2. Home 3분할 레이아웃 (`MainScreen`)

req.md §8-1 기준.

| 영역 | 컴포넌트 |
| --- | --- |
| top toolbar | `TopToolbar` — 글로벌 SNS 필터, SNS 추가(+), 검색 진입 |
| 섹션1 (좌측 LSB) | `LeftSidebar` — CI/BI, 카테고리 탭, DM자동화, 프로필 (설정 미노출) |
| 섹션2 (스레드 List) | `InboxList` — 카테고리별 분기 |
| 섹션3 (우측 SidePanel) | `SidePanel` — 스레드 상세 |

PC: 3섹션 가로 분할. 모바일: 섹션 전환형(LSB는 햄버거/하단 탭, SidePanel은 풀스크린 진입).

### 5-3. CategorySidebar / LeftSidebar

- 카테고리 항목과 동적 뱃지 카운트 (정크 탭은 dot만 — mockup에선 정크 미구현이라 해당 없음)
- 카테고리 사이 구분선 (req.md §5-1 참조 그룹: AI pick / 분류 카테고리 / 운영 / 섹션나눔 / DM 자동화)
- DM자동화 진입 시 InboxList 영역이 매크로 룰 리스트로 전환 (별도 세션)

### 5-4. SNSFilterBar / TopToolbar

- 글로벌 필터 (req.md §8-2)
- 같은 플랫폼 내 복수 계정: 테두리 색상 또는 이니셜로 구분 (동적 색상은 inline style 허용)
- mouseover 시 일시 확장 → 계정명 표시
- 최우측 (+) 버튼: SNS OAuth 계정 추가 팝업 시연

### 5-5. InboxList

- `TagFilterBar`: 해당 카테고리에 속한 태그의 합집합을 chip으로 노출
- `SortToggle`: 우선순위순(기본) / 최신순
- `PreviewCard` (단일 레이아웃): 썸네일 / sender(`--card-sender-font-size` Hanken Black) / type-label 컬러 mini-chip(`--card-type-chip-bg-{type}`) / 미리보기 텍스트 / 받은시각 / depth 2 태그. `priority_score >= 85` 스레드에 coral sparkle 아이콘 prepend. 비즈니스 스레드(`message_type === 'business'`)는 yellow-soft type-label chip으로 인박스 행에서 시각 신호 제공. 상세 biz 필드(`business_extracted`)는 SidePanel 상세 뷰에서만 노출.
- 대댓글 달린 원댓글 스레드: 카드겹침(stacked card) 효과 (`.preview-card--stacked`)
- 다중선택 모드: 카드 좌측 체크박스 노출, 상단에 일괄 액션 바
- pagination: 무한스크롤 (mockup에서는 mock 데이터 끝까지 렌더 후 종료)

### 5-6. SidePanel

req.md §8-3.

| 영역 | 컴포넌트 |
| --- | --- |
| 헤더 (고정) | `ThreadHeader` — sender / 플랫폼 / 태그 / 액션 (답장 / 무시하기 / 보관) |
| Origin 메타 | `OriginInfo` — 게시글 썸네일·캡션 또는 sender 메타 (Origin 수동 tagging 진입 CTA 포함, req.md §5-4) |
| 메시지 목록 (스크롤) | `MessageThread` — 최근 5개 + "더 이전 메시지 로드" 버튼 |
| 입력 (고정) | `ReplyArea` — 저장 답변 + AI 초안 + 에디터 |

메시지 유형별 레이아웃 분기 (req.md §8-3):

| 유형 | 레이아웃 |
| --- | --- |
| IG/틱톡 DM | message bubble |
| 게시글 댓글 | 댓글/대댓글 imitate (대댓글 depth 2까지) |
| 메일 | TBD — 디자인 시안 검토 후 결정. 초기에는 thread 형식 |

AI 축약 표기는 3단 레이아웃에서만 (스레드 맥락과 동일 데이터, req.md §5-3-2).

### 5-7. ReplyArea

- 저장 답변 dropdown / chips
- AI 초안 생성 버튼 → 초안을 에디터에 채움 (mockup에서는 mock 데이터의 사전 정의 초안을 호출)
- Enter 전송 / Shift+Enter 줄바꿈

### 5-8. 공통 UI

- `Toast`: 전역, 2초 auto fade
- `Modal`/`Popover`: 검색 진입, 매크로 빌더 wizard 등에서 사용
- `EmptyState`: 카테고리 빈 상태

### 5-9. 매크로 빌더 (DM 자동화)

LSB의 "DM 자동화" 카테고리 진입 시 InboxList 영역이 룰 카드 리스트로 전환되고, 카드를 클릭하거나 신규 추가 버튼을 누르면 SidePanel에 wizard가 표시된다 (req.md §6-2-1, macro-prd.md §3 진입 흐름의 본 mockup IA 매핑).

#### 5-9-1. 컴포넌트 트리

```
InboxList (category=dm_automation)
└── AutomationListView
    ├── AutomationListHeader              ← 안내 배너 (타이틀은 LSB에서 이미 표시)
    ├── AutomationTemplateCarousel        ← 가로 스크롤 템플릿 캐러셀
    │   ├── AutomationTemplateCard.Blank  ← `+` 신규 직접 생성
    │   └── AutomationTemplateCard        ← COMMENT_EVENT / PRODUCT_INFO / PURCHASE_AUTH
    └── AutomationCardList
        └── AutomationCard
            ├── AutomationCardThumb           ← 좌측 80×80 썸네일 / FUTURE_POSTS placeholder 일러스트
            └── AutomationCardBody
                ├── AutomationCardTop         ← 계정 + 토글 (한 행)
                ├── AutomationCardTitle       ← 규칙명 (L1)
                ├── AutomationCardMetaLine    ← "댓글 자동화" + 키워드 inline (L1)
                └── AutomationCardFooterMeta  ← 등록·활성·작동 (L2)

SidePanel (when selectedAutomationId or wizardMode === 'new')
└── MacroBuilderWizard
    ├── WizardHeader                      ← 타이틀 / 닫기 (X) / dirty 시 confirm
    ├── WizardStepNav                     ← "Step 1~5" segmented tabs + 양 끝 ghost chevron / step 5 우측 morph 완료 CTA
    └── WizardStepBody                    ← 현재 step의 컨텐츠
        ├── WizardStepTrigger             ← step 1
        ├── WizardStepReply               ← step 2
        ├── WizardStepFollowerBranch      ← step 3
        ├── WizardStepMessage             ← step 4
        └── WizardStepReview              ← step 5

— Wizard 내부 파편 컴포넌트 —
WizardStepTrigger
├── PostTargetModeRadio                   ← SPECIFIC_POSTS / FUTURE_POSTS
├── IgPostGridPicker                      ← target_mode=SPECIFIC_POSTS일 때
└── TriggerModeRadio                      ← ALL_COMMENTS / KEYWORD_MATCH
    └── KeywordChipInput                  ← KEYWORD_MATCH일 때

WizardStepReply
├── ReplyEnableRadio
└── ReplyEditor (enabled일 때)
    ├── ReplyToneTabs                     ← POLITE / FRIENDLY / CUSTOM
    └── ReplyItemList
        ├── ReplyItemRow (×n)             ← 본문 + `−` 삭제
        └── ReplyItemAddButton            ← `+ 새로운 답글 추가하기`

WizardStepFollowerBranch
└── FollowerBranchRadio                   ← 4모드

WizardStepMessage
├── MessageTabSwitcher                    ← TEXT / IMAGE_CAROUSEL
├── MessageBubblePreview                  ← 채팅 버블 미리보기
├── MessageBodyInput                      ← textarea
├── MessageImageUploader                  ← IMAGE_CAROUSEL 모드일 때
├── MessageButtonList
│   ├── ButtonRow (×n)
│   └── ButtonAddTrigger                  ← `+` 버튼 추가 → ButtonEditSheet 호출
│       └── ButtonEditSheet               ← bottom sheet (모바일·PC 공통)
│           ├── LinkBlockImportButton     ← disabled placeholder
│           ├── ButtonTextInput
│           ├── ButtonActionTypeDropdown  ← URL only
│           └── ButtonUrlInput
└── FollowerVariantTabs                   ← follower_branch.mode=DIFFERENT_MESSAGES일 때
                                            (팔로워 / 비팔로워 각 variant별로 위 sub-tree 반복)

WizardStepReview
├── ReviewSummaryList                     ← step 1~4 요약 (각 항목 클릭 → 해당 step jump)
├── ReviewMessagePreview                  ← 최종 채팅 미리보기
└── ReviewBodyInlineEditor                ← 본문 인라인 수정 가능 (macro-prd.md §4-9)
```

#### 5-9-2. Wizard step 매핑

macro-prd.md §3은 모바일 멀티스크린 흐름이다. 본 mockup은 SidePanel 단일 컨테이너 내부에서 step 진행 방식으로 매핑한다.

| step | 화면 (PC: SidePanel inline / 모바일: 풀스크린 page) | macro-prd.md 매핑 |
| --- | --- | --- |
| 1 | 트리거 설정 (대상 게시물 + 댓글 트리거 통합) | §4-4 + §4-5 + §4-6 섹션 ③④ |
| 2 | 자동 답글 설정 | §4-6 섹션 ① |
| 3 | 팔로우 분기 설정 | §4-6 섹션 ② |
| 4 | 메시지 본문 + 버튼 설정 | §4-7 + §4-8 |
| 5 | 최종 확인 | §4-9 |

step 1에서 macro-prd.md의 4섹션 아코디언(§4-6)을 본 mockup에서는 step 분리로 풀어낸다. 이유는 모바일 풀스크린 SidePanel에서 아코디언을 그대로 옮기면 한 화면에 너무 많은 입력이 누적되어 fat-finger 위험(req.md §8-4)과 스크롤 부담이 커지기 때문. 단 step 1만은 "대상 게시물"과 "댓글 트리거"를 함께 묶었는데, 둘 다 IG 게시물·댓글이라는 동일 도메인의 짧은 입력이고 사용자가 한 흐름으로 이해하기 쉽기 때문.

#### 5-9-3. PC vs 모바일 동작

| 동작 | PC (SidePanel inline) | 모바일 (SidePanel 풀스크린) |
| --- | --- | --- |
| step 진행 표기 | "Step 1~5" segmented tab + 활성 underline + 양 끝 chevron / step 5 우측 morph 완료 CTA | 동일 (PC와 동일 5 tab — 6자 고정 라벨로 360px에서도 자연 fit) |
| 닫기 | 우상단 X 단일 | 우상단 X 단일 (← 백버튼 폐기) |
| 버튼 설정 sheet | SidePanel 영역에 inline 또는 작은 modal | bottom sheet (전체 화면 하단에서 슬라이드업) |
| 게시물 그리드 | step 1 내 expand → 3 column grid | step 1 내 expand → 3 column grid (썸네일 화면폭 / 3) |
| dirty 상태 닫기 시도 | confirm dialog "변경사항을 버리고 닫을까요?" | 동일 |

PC/모바일 모두 동일 React 컴포넌트가 CSS media query로 변형된다. 별도 컴포넌트 분기 없음 (§7-1 원칙).

#### 5-9-4. Wizard 상태 모델

```ts
type WizardMode = 'new' | 'edit' | null;

type WizardState = {
  mode: WizardMode;
  sourceAutomationId: string | null;     // edit 모드일 때 원본 룰 id
  draft: Automation;                     // 작업 중 draft (BLANK_AUTOMATION_DRAFT 또는 source 복사)
  currentStep: 1 | 2 | 3 | 4 | 5;
  visitedSteps: Set<1 | 2 | 3 | 4 | 5>;  // step jump 가능 여부 판단 (방문한 step만 임의 점프)
  isDirty: boolean;                      // 시작값 대비 한 글자라도 변경되면 true
  errors: Record<string, string>;        // field path → 에러 메시지
};
```

상태 관리:

- `useReducer`로 다음 action 정의 (10개): `OPEN_NEW`, `OPEN_TEMPLATE`, `OPEN_EDIT`, `UPDATE_FIELD`, `GOTO_STEP`, `NEXT_STEP`, `PREV_STEP`, `SAVE`, `CLOSE`, `SET_ERRORS`
  - `SET_ERRORS`: 검증 실패 시 `errors` state를 갱신. payload: `{ errors: Record<string, string> }`
- `UPDATE_FIELD`는 path 기반 immutable update (예: `path='reply.items[2]'`)
- `NEXT_STEP`은 현재 step의 검증을 통과해야만 진행. 실패 시 `errors`에 메시지 누적
- `SAVE`는 step 5에서만 호출. 전체 검증(`isAutomationValid`, §4-8-2) 통과 후 `automations[]`에 commit + `status='ACTIVE'`

dirty tracking:

- 진입 시 draft의 deep-clone을 `_initialSnapshot` ref에 저장
- 매 `UPDATE_FIELD` 후 `_initialSnapshot`과 shallow JSON 비교로 `isDirty` 갱신
- 닫기 시 `isDirty=true`이면 confirm dialog 노출, 사용자가 확인하면 그대로 닫고 cancel하면 wizard 유지

#### 5-9-5. 검증 / CTA 활성 정책 (step별)

| step | 검증 통과 조건 (다음 활성) | 통과 시 footer CTA |
| --- | --- | --- |
| 1 | (target_mode=SPECIFIC_POSTS면 post 1개 이상 선택) AND (trigger_mode=KEYWORD_MATCH면 키워드 ≥1) | `다음` |
| 2 | reply.enabled=false OR (items 모두 non-empty AND items ≥1) | `다음` |
| 3 | follower_branch.mode 선택됨 (default SAME 항상 valid) | `다음` |
| 4 | 메시지 본문 검증 통과 (DIFFERENT_MESSAGES면 두 variant 모두) | `다음` |
| 5 | 모든 step 검증 통과 (요약 테이블에 invalid step 없음) | `완료` |

검증 실패 시 footer CTA는 disabled, 해당 입력 필드 옆에 inline 에러 메시지를 노출한다 (예: "키워드를 1개 이상 입력해주세요").

#### 5-9-6. 룰 카드 인터랙션

| 인터랙션 | 동작 |
| --- | --- |
| 카드 본문 영역 클릭 | wizard 진입 (mode='edit', currentStep=5 — 사용자가 즉시 전체 요약을 보고 원하는 step으로 jump) |
| 활성 토글 | mock state에서 status 즉시 toggle. 카드 dim 또는 활성화 |
| `...` 메뉴 → "편집" | wizard 진입 (mode='edit', currentStep=1) |
| `...` 메뉴 → "복제" | 동일 draft 복사하여 status=INACTIVE로 새 룰 추가, wizard 자동 진입하지 않음 |
| `...` 메뉴 → "삭제" | confirm dialog → 즉시 automations[]에서 제거. toast "자동화가 삭제되었어요" |

#### 5-9-7. 디자인 토큰 누락 항목 (§3에 추가 필요)

본 빌더 구현에 새로 필요한 토큰. 모든 토큰은 Tier 2 또는 Tier 3로 정의하고, 컴포넌트는 raw 값을 절대 참조하지 않는다 (CLAUDE.md 절대 원칙).

| Tier | 토큰명 | 용도 | 매핑 제안 |
| --- | --- | --- | --- |
| 1 (신설) | `--color-overlay-scrim` | sheet/modal dim 색 | rgba 직접 표기 (Tier 1 primitive 한 곳에서만) |
| 1 (신설) | `--opacity-disabled` | disabled / inactive 시각 dim | `0.45` |
| 2 | `--color-bg-sheet` | bottom sheet / SidePanel 표면 배경 | `var(--color-bg-surface)` |
| 2 | `--color-bg-sheet-overlay` | sheet 뒤 dim 오버레이 | `var(--color-overlay-scrim)` |
| 2 | `--color-bg-accordion-collapsed` | 아코디언 닫힌 상태 배경 (mockup의 step 요약 카드에도 사용) | `var(--color-bg-canvas-alt)` |
| 2 | `--color-bg-input-soft` | wizard input 영역의 옅은 배경 | `var(--color-bg-canvas-alt)` |
| 2 | `--color-status-info-soft` | 활성 토글 ON일 때의 채움색 (macro-prd.md §8 — blue 계열) | `var(--color-accent-blue)` |
| 2 | `--color-chip-remove-bg` | chip 우측 `×` 버튼의 배경 | `var(--color-grey-100)` |
| 2 | `--color-chip-remove-fg` | chip 우측 `×` 버튼의 글리프 색 | `var(--color-text-tertiary)` |
| 2 | `--color-reply-remove-bg` | 답글 항목 `−` 버튼 배경 (옅은 핑크 — macro-prd.md §8) | `var(--color-accent-pink-soft)` |
| 2 | `--color-reply-remove-fg` | 답글 항목 `−` 글리프 | `var(--color-accent-pink)` |
| 2 | `--surface-radius-sheet` | bottom sheet 상단 radius (양 코너만) | `var(--radius-lg)` (위쪽만 적용, CSS 측에서 처리) |
| 3 | `--sheet-handle-bg` | bottom sheet 상단 grab handle | `var(--color-grey-200)` |
| 3 | `--sheet-handle-w` | grab handle 너비 | `var(--space-7)` |
| 3 | `--sheet-handle-h` | grab handle 높이 | `var(--space-1)` |
| 3 | `--wizard-tab-underline-w` | 활성 step tab bottom underline 두께 | `2px` |
| 3 | `--wizard-tab-mobile-px-x` | 모바일 step tab 좌우 padding (xs보다 작은 tight 간격) | `2px` |

**deprecated (Round 2 — 2026-05-05)** ← styles.css에서 삭제됨. swap 시 이력 추적용 보존.

| Tier | 토큰명 | 용도 (폐기 사유) |
| --- | --- | --- |
| 3 | `--wizard-step-indicator-active-bg` | dot navigation 현재 step → WizardStepNav tab으로 대체 |
| 3 | `--wizard-step-indicator-visited-bg` | 방문한 step dot → 폐기 |
| 3 | `--wizard-step-indicator-pending-bg` | 미방문 step dot → 폐기 |
| 3 | `--wizard-step-indicator-size` | dot 지름 → 폐기 |
| 3 | `--wizard-step-indicator-active-size` | 현재 step dot 지름 → 폐기 |
| 3 | `--wizard-step-indicator-gap` | dot 간 간격 → 폐기 |
| 3 | `--wizard-progress-track-bg` | 모바일 progress bar track → 폐기 |
| 3 | `--wizard-progress-fill-bg` | progress bar 채움 → 폐기 |
| 3 | `--wizard-progress-bar-h` | 모바일 progress bar 높이 → 폐기 |
| 3 | `--automation-card-disabled-opacity` | INACTIVE 카드 dim 비율 | `var(--opacity-disabled)` |
| 3 | `--automation-card-thumb-w` | 카드 썸네일 너비 PC | `80px` |
| 3 | `--automation-card-thumb-w-mobile` | 카드 썸네일 너비 모바일 | `64px` |
| 3 | `--automation-card-future-bg` | FUTURE placeholder 배경 | `var(--color-bg-canvas-alt)` |
| 3 | ~~`--automation-card-stat-divider`~~ | stat 사이 구분선 → 폐기 (Round 3) | — |
| 3 | ~~`--keyword-chip-compact-height`~~ | 카드 내 compact chip 높이 → 폐기 (Round 3) | — |
| 3 | ~~`--card-stat-divider-w`~~ | stat 구분선 너비 → 폐기 (Round 3) | — |
| 3 | ~~`--card-stat-divider-h`~~ | stat 구분선 높이 → 폐기 (Round 3) | — |
| 3 | `--keyword-chip-bg` | 키워드 chip 배경 | `var(--color-bg-canvas-alt)` |
| 3 | `--keyword-chip-fg` | 키워드 chip 글자색 | `var(--color-text-primary)` |
| 3 | `--toggle-on-bg` | 활성 토글 ON 배경 | `var(--color-status-info-soft)` |
| 3 | `--toggle-off-bg` | 활성 토글 OFF 배경 | `var(--color-grey-200)` |
| 3 | `--toggle-knob-bg` | 토글 knob | `var(--color-bg-surface)` |

위 토큰을 §3-2(Tier 1), §3-3(Tier 2), §3-4(Tier 3)에 각각 분산 추가한 뒤 컴포넌트에서 reference한다. 신설 시 §10 working log에 기록한다.

#### 5-9-8. 기타 컴포넌트 동작 메모

- `IgPostGridPicker`는 mock에서 `origins[]` 중 platform=instagram AND type=post인 항목을 사용. 단일 선택. 선택 시 `target_post_ids = [origin.media_id]`. 다중 선택은 mockup 범위 외
- `KeywordChipInput`은 입력 필드에서 Enter 또는 `+` 버튼으로 chip 추가. 빈 문자열 / 중복 입력은 무시. 최대 개수 제한 없음 (mockup 시연에서는 5개 이내 권장)
- `ReplyToneTabs`에서 POLITE / FRIENDLY를 클릭할 때마다 해당 톤의 preset(`MOCK_DATA.AUTOMATION_REPLY_PRESETS[tone]`)으로 `reply.items`가 교체된다. CUSTOM 클릭 시 직전 `items`를 그대로 유지하여 사용자 직접 입력 모드로 전환(Round 4 변경: 매 클릭 preset 교체로 정책 전환)
- `MessageImageUploader`는 mock 환경이므로 실제 업로드 없음. 클릭 시 mock 이미지 placeholder URL을 `images[]`에 추가. 최대 10장
- `LinkBlockImportButton`은 항상 disabled 상태로 노출. 클릭 시 `Toast` 호출하여 "준비 중인 기능이에요" 표시 (req.md §6-2-7)
- `WizardStepReview`의 `ReviewSummaryList`는 macro-prd.md §4-6의 4섹션 요약 표를 base로 한다. 각 row 우측에 `편집` 텍스트 버튼 → 해당 step으로 jump

#### 5-9-9. Wizard step별 화면 사양 (구현자 단위 작업표)

| step | 타이틀 | 입력 필드 | 기본값 | 검증 규칙 | CTA / 다음 step | 비고 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 어떤 댓글에 메시지를 보낼까요? | (a) target_mode 라디오: 직접 선택 / 향후 게시물<br>(b) IgPostGridPicker (a=SPECIFIC_POSTS일 때만)<br>(c) trigger_mode 라디오: 모든 댓글 / 키워드<br>(d) KeywordChipInput (c=KEYWORD_MATCH일 때만) | a=SPECIFIC_POSTS, c=ALL_COMMENTS | • a=SPECIFIC_POSTS → 게시물 1개 선택 필수<br>• c=KEYWORD_MATCH → 키워드 ≥1 | `다음` → step 2 | 키워드 placeholder "발송하시는 키워드를 입력해주세요" / 헬프 "플러스(+)나 엔터를 눌러서 추가할 수 있어요" — macro-prd.md §4-6-3 |
| 2 | 댓글에 답글도 남겨볼까요? | (a) reply.enabled 라디오: 아니요 / 네<br>(b) ReplyToneTabs (POLITE/FRIENDLY/CUSTOM) (a=true일 때)<br>(c) ReplyItemList — 항목 추가/삭제 | a=false, b=POLITE | • a=true → items ≥1 AND 모든 item non-empty | `다음` → step 3 | POLITE/FRIENDLY 최초 선택 시 mock preset이 items에 채워짐. CUSTOM은 빈 리스트 |
| 3 | 팔로우 여부에 따라 다르게 보낼까요? | follower_branch.mode 라디오: SAME / FOLLOWERS_ONLY / NON_FOLLOWERS_ONLY / DIFFERENT_MESSAGES | SAME | (없음 — 항상 valid) | `다음` → step 4 | DIFFERENT_MESSAGES 선택 시 step 4의 input이 2벌로 분기됨 (FollowerVariantTabs로) |
| 4 | 자동화할 메시지를 설정해주세요 | (a) MessageTabSwitcher: TEXT / IMAGE_CAROUSEL<br>(b) MessageBodyInput<br>(c) MessageImageUploader (a=IMAGE_CAROUSEL일 때)<br>(d) MessageButtonList (`+` 버튼 추가)<br>(e) FollowerVariantTabs (step 3 mode=DIFFERENT_MESSAGES일 때) | a=TEXT, body='', images=[], buttons=[] | • body non-empty<br>• a=IMAGE_CAROUSEL → images ≥1<br>• 버튼 추가됨 → text·url 모두 non-empty<br>• DIFFERENT_MESSAGES → 위 모두 두 variant 각각 통과 | `다음` → step 5 | ButtonEditSheet bottom sheet 진입. LinkBlockImportButton은 disabled placeholder |
| 5 | 고객에게 전송될 메시지를 확인해주세요 | (a) ReviewSummaryList — step 1~4 요약 (각 row의 `편집` 버튼으로 해당 step jump)<br>(b) ReviewMessagePreview — 채팅 미리보기<br>(c) ReviewBodyInlineEditor — 본문 인라인 수정 | (이전 step 결과 표시) | • isAutomationValid(draft) 통과 | `완료` → SAVE → status=ACTIVE, automations[]에 commit, wizard 닫고 카드 리스트 복귀 + toast "자동화가 등록되었어요" | edit 모드 진입 시 currentStep=5에서 시작 (전체 요약 → 원하는 step으로 jump) |

step 간 step nav (WizardStepNav 내부):

| 위치 | step 1 | step 2~4 | step 5 |
| --- | --- | --- | --- |
| 좌측 chevron | disabled | 활성 (← 이전 step) | 활성 (← 이전 step) |
| 우측 chevron / CTA | 활성 chevron (→ 다음) | 활성 chevron (→ 다음) | `완료` inverse pill (morph) |
| 닫기 | 헤더 우상단 X 단일 | 동일 | 동일 |

※ WizardFooter(이전/다음 버튼 영역)는 Round 2에서 폐기됨. step 이동은 WizardStepNav chevron으로 통합.

#### 5-9-10. DM 자동화 뷰의 SNS 필터 동작 (Phase 5 Round 1 확정)

DM 자동화는 인스타그램 전용이므로, 진입/이탈 시 SNS 필터를 임시 조정한다.

**진입** (`selectedCategory`가 `dm_automation`으로 바뀌는 시점):
1. 현재 `selectedAccountIds` 전체를 `snsFilterSnapshotRef`에 snapshot
2. `selectedAccountIds`에서 비-IG 계정 모두 제거 (IG 계정은 직전 상태 보존)

**메뉴 내 동작**:
- IG chip 2개: 사용자가 자유 토글 가능
- 비-IG chip 5개: `.top-toolbar__chip--disabled` (opacity: `--opacity-disabled`, pointer-events: none) — 토글 불가
- 전체(ALL) chip: DM 자동화 뷰에서는 숨김

**이탈** (`selectedCategory`가 `dm_automation`이 아닌 값으로 바뀌는 시점):
1. `snsFilterSnapshotRef` → `selectedAccountIds` restore
2. snapshot ref 클리어

**룰 카드 매칭** (`ruleMatchesIgAccountFilter`):
```js
function ruleMatchesIgAccountFilter(automation, activeIgAccountIds, origins) {
  if (activeIgAccountIds.size === 0) return false;     // 모든 IG OFF → 빈 리스트
  if (automation.target_mode === 'FUTURE_POSTS') return true;   // IG ≥1 ON이면 노출
  return automation.target_post_ids.some(media_id => {
    const origin = origins.find(o => o.media_id === media_id);
    return origin && activeIgAccountIds.has(origin.user_sns_account_id);
  });
}
```

**IgPostGridPicker 매칭**: wizard 진입 시 `activeIgAccountIds` 기반 `visiblePosts`를 `igOrigins` prop으로 주입. IG chip 실시간 토글 시 picker 갱신.

**EmptyState 2종**:

| 조건 | 제목 | 설명 |
| --- | --- | --- |
| 모든 IG OFF (`activeIgAccountIds.size === 0`) | "표시할 자동화가 없어요" | "상단 SNS 필터에서 인스타그램 계정을 켜주세요." |
| 활성 IG ≥1 + 매칭 룰 0건 | "연결된 자동화 룰이 없어요" | "위 템플릿에서 시작하거나 빈 카드를 눌러 새로 만들어보세요." |

두 케이스 모두 AutomationTemplateCarousel은 그대로 표시 (신규 생성 가능).

---

## 6. 핵심 기능 동작 명세

### 6-1. 우선순위 score

- 스레드 단위 scoring만 (req.md §6-1)
- mockup용 단순 모델: 각 thread mock에 사전 계산된 정수 score 부여, 카테고리 내 정렬 시 desc
- 비활성 스레드(처리 완료)는 score 유지하나 listing에서 제외 (filter)
- 가산 요소(시현용 정성 반영):
  - sender의 manual tag (`중요`/`저장`) → +가산
  - Origin 수동 tagging (긴급/이벤트-오픈 등) → +가산
  - 콘텐츠 created 시점 최신성 → 가중치
  - 재문의/후속 연락 표식 → +가산

scoring 수식은 mockup 범위 외 (req.md WIP). 정렬 순서만 정확히 시연되면 충분.

### 6-2. 다중선택 / 일괄처리

- 선택 모드 진입: 길게 누르기(모바일) / 카드 hover의 체크박스(PC)
- 일괄 액션: 읽음처리(=무시하기), 분류·태그 기준 일괄 처리 (req.md §7-3 mockup)
- 선택 집합 state: `Set<thread_id>`

### 6-3. 검색

- 진입: TopToolbar 돋보기 버튼
- PC: 오버레이 패널, 모바일: 전체화면 진입 (req.md §10)
- 검색어 입력 시 dropdown으로 태그 chip 노출 → 토글 가능
- mockup 범위: mock 데이터 내 단순 substring 매치 + 태그 필터

### 6-4. Origin 별 수동 tagging

- 진입: SidePanel의 OriginInfo 영역 "이 Origin에 태그 규칙 추가" CTA (req.md §5-4)
- 가용 태그: preset (분류 태그 + 긴급/이벤트-시리즈/VIP·NIP)
- 규칙 저장 시 mock 데이터의 origin.tagging_rules에 push, 동일 origin의 다른 thread에도 즉시 반영

### 6-5. 게시글/콘텐츠 관제 (mockup 범위)

- req.md §6-4의 4가지 항목 중 mockup에서는 시각 시연 가능한 수준만:
  - 콘텐츠별 반응 모아보기 (필터 chip)
  - 급등락 알림 — Toast/뱃지 시연 1~2건 정도
- 별도 화면이 아닌 SidePanel의 OriginInfo 확장 또는 InboxList의 컨텍스트로 통합

### 6-6. 빠른 답장 / AI 초안

- 저장 답변: 같은 카테고리 메시지에서만 노출 (req.md §6-3)
- AI 초안: 스레드 맥락(`ai_thread_context`) 기반의 mock 정적 초안. 버튼 클릭 시 에디터 채움
- 사용자가 초안을 수정/폐기 가능

### 6-7. Badge Count 산출

모든 카테고리·필터의 badge count는 동일한 계산식으로 산출한다:

> badge count = 해당 카테고리·필터에 속하는 thread 중 `processed=false`인 thread 수

mock data에 사전 저장하지 않고 runtime computed.

| 위치 | 계산 |
| --- | --- |
| 카테고리 X badge | `threads.filter(t => !t.processed && categoryFilter(CATEGORIES[X], t)).length` |
| 글로벌 SNS 필터 sns_acc badge | `threads.filter(t => !t.processed && origins[t.origin_id].user_sns_account_id === sns_acc.id).length` |
| AI pick badge | 미처리 thread 전체 수 (`tag_filter: '*'` 룰의 자연 결과) |
| 보낸메시지함 badge | 항상 0 (outgoing은 sent_at 시점에 processed 처리) |
| DM 자동화 badge | 항상 0 (매크로 룰 view) |

`categoryFilter` 의사코드:

```js
function categoryFilter(cat, thread) {
  if (cat.tag_filter === '*')        return true;
  if (cat.tag_filter === 'untagged') return thread.tags.length === 0;
  if (Array.isArray(cat.tag_filter)) return cat.tag_filter.some(t => thread.tags.includes(t));
  if (cat.view)                      return false;  // outgoing_messages / macro_rules는 thread 단위 카운트 X
  return false;
}
```

시연 동작:
- 시연 중 thread.processed가 false → true 전환 시 React state reactive 재계산
- 카드 리스트에서 thread가 사라지고 카테고리·SNS 필터 badge가 즉시 1 감소
- thread 한 건이 여러 카테고리에 동시 노출되는 경우(태그 다중 부착), 처리 시 모든 노출 카테고리에서 동시에 감소

---

## 7. 반응형 디자인

### 7-1. Breakpoint

| 이름 | 범위 | 우선순위 |
| --- | --- | --- |
| Mobile | ~ 767px | 최우선 (UI 품질 1순위) |
| Tablet | 768 ~ 1023px | 보조 |
| Desktop | 1024px ~ | 보조 |

CSS 미디어쿼리만 사용. 별도 모바일/PC 컴포넌트 분기 없음(같은 컴포넌트가 CSS로 변형).

### 7-2. 모바일 UI 원칙 (req.md §8-4)

- 화면 단순화: 핵심이 아닌 보조 UI는 숨김/접기
- fat finger 방지: clickable 최소 44x44px. 미달 시 hit area 확장(투명 padding)
- chip/dropdown/button 정리: 한 화면 노출 수 과다 시 우선순위 낮은 항목 fold
- 숨김 판단 기준: 핵심 태스크(메시지 확인 / 답장 / 처리) 수행에 필수적인지

### 7-3. SidePanel 모바일 동작

- PC: 섹션2(InboxList) 옆에 inline 표시, 영역을 가리지 않고 줄임
- 모바일: 풀스크린 오버레이 (back 버튼으로 InboxList 복귀)

---

## 8. 코드 품질

### 8-1. ESLint 10 (flat config)

- `eslint.config.js`에 React/HTML 규칙 정의
- `eslint-plugin-html`로 `index.html`의 `<script type="text/babel">` 블록도 lint
- 주요 규칙: `react/jsx-uses-vars`, `no-unused-vars`, `no-undef`, `no-console`(warn)

### 8-2. PostToolUse 훅

`.claude/settings.json`에 정의된 hook이 Edit/Write 직후 자동 실행:

- `*.js`, `*.html` → `npx eslint --fix`

자동 수정 불가한 lint 오류는 sub-agent가 수정 후 `code-reviewer`로 넘김.

### 8-3. 콘솔 에러 zero 정책

- 브라우저 console에 error/warning 누적 금지
- React key 경고, prop type 경고 등도 모두 즉시 해소
- 발생 시 §10에 기록

### 8-4. 컴포넌트 네이밍

- 컴포넌트: PascalCase (`PreviewCard`, `SidePanel`)
- CSS 클래스: BEM (`.preview-card`, `.preview-card__thumb`)

---

## 9. 배포

### 9-1. GitHub Pages

- 정적 호스팅. 별도 빌드 없이 repo의 `index.html`이 배포됨
- 브랜치 옵션: `main` 또는 `gh-pages` 사용 (Phase 0 마감 시점에 결정)

### 9-2. 배포 절차

1. 변경사항 commit & push
2. GitHub Pages 설정에서 source branch 지정
3. 자동 배포 (수 초 ~ 수 분 소요)
4. 시연 URL 확인

mockup 범위에서는 별도 CI 파이프라인 불요.

---

## 10. 변경 / 디버그 / 에러 이력 (working log)

| 일자 | 변경 내용 |
| --- | --- |
| 2026-04-29 | spec.md 신규 작성 (clean slate). Step 1~3 의사결정 반영: React 18 CDN + Pure CSS 3-tier 토큰 + Lucide 발췌 + ESLint 10 flat config + GitHub Pages. 매크로 빌더와 외부 디자인시스템 적용은 backlog (tasks.md) |
| 2026-04-30 | §4 데이터 모델 확정 (Step 6). Sender/Origin 통합, User+Channel + connected_sns_accounts, Origin.user_sns_account_id, Message.processed_at·read_at(timestamp)·depth·sent_at, SavedReply.generated_by, TAG_CATALOG/CATEGORIES/PLATFORM_LOGOS 정의, mock 분포 3배 + 미처리/처리 분리. §6-7 badge count 산출 추가 (모든 카테고리 동일 계산식 = 미처리 thread 수). Outgoing sender_id 자동 기록·outgoing processed_at 동작 명세 추가 |
| 2026-04-30 | 1차 외부 디자인시스템 swap (Streamtime theme). 출처: `design.md`, `design_ref/colors_and_type.css`. §3-2 Tier 1 placeholder(orange/gray) → cream paper(#F5EFE3) + ink black(#0F0F0F) + halftone shape primaries(yellow/blue/pink/green/purple/coral) + warm grey 5-step + 4px-base spacing + 32/24/16/8/4/pill radii + hard-edge offset shadows(`shadow-press`, `shadow-press-lg`) + 2px·1.5px border widths + Hanken Grotesk(display) / Inter(body) / system mono. §3-3 Tier 2 신규: bg-canvas/canvas-alt/surface/inverse, text-primary/secondary/tertiary/muted/inverse/on-brand, brand+brand-soft+accent-pink/blue/green/purple/coral, border-strong/soft, status, platform color slots(instagram/youtube/gmail/tiktok/naver/mail), display-xl/lg/md font sizes, weight-heavy/black, line-height-display/tight/snug/normal/relaxed, surface-shadow-press·press-lg. §3-5 typography 매핑 테이블에 Display XL/LG/MD 행 추가, weight-heavy/black 반영. §3-7-1 신규: 한글 fallback 정책 — UI 카피가 한국어이므로 Pretendard를 폰트 family Tier 1 fallback에 항상 유지. dependencies.txt 폰트 갱신, styles.css 신규 생성. icon-set.js는 본격 UI 구현 단계에 Lucide 발췌로 생성 (이번 swap 범위 외) |
| 2026-05-03 | DM 자동화 매크로 빌더 사양 정리. source: `docs/macro-prd.md` §10 P0+P1+P2 일부 채택. 결정사항: 진입 모델 LSB 유지(spec.md §5-9 그대로), 데이터 모델 `MacroRule` placeholder → `Automation` 전면 교체(§4-8), wizard step 5단계 분리(트리거/답글/팔로우 분기/메시지/최종 확인). req.md §6-2 보강(7개 하위 섹션). spec.md §4-8 schema 재정의 + 검증 함수 + AUTOMATION_TEMPLATES + BLANK_AUTOMATION_DRAFT, §4-10 모듈 키 갱신(macroRules → automations + AUTOMATION_TEMPLATES), §4-11 분포 5~7개 + 7개 룰 시연 포인트 표, §5-9 컴포넌트 트리·step 매핑·PC/모바일 동작·상태 모델·검증·인터랙션·step 사양 표. §3-2/§3-3/§3-4 토큰 25개 추가(Tier 1 2개: `--color-overlay-scrim`/`--opacity-disabled`, Tier 2 11개: sheet/accordion/chip/reply-remove/status-info-soft/sheet-radius, Tier 3 12개: sheet-handle/wizard-indicator/wizard-progress/automation-card/keyword-chip/toggle). styles.css 토큰 적용은 후속 frontend-dev task |
| 2026-05-03 | Phase 1-3 트리거. 3분할 shell layout 토큰 신설. §3-2 Tier 1: `--width-lsb-pc`(240px) / `--width-sidepanel-pc`(400px) / `--width-container-max`(1440px). §3-3 Tier 2: `--layout-lsb-width` / `--layout-sidepanel-width` / `--layout-container-max` / `--touch-target-min`(=`var(--size-44)`). §3-8에 미디어쿼리 breakpoint raw px 예외 명시 (CSS `var()`를 `@media` 조건절에서 사용 불가하므로 불가피, §7-1 표를 단일 truth source로) |
| 2026-05-04 | Phase 1 완료 (Foundation). icon-set.js 53개 아이콘(Lucide MIT 발췌) / mock-data.js 74 threads · 200 messages · 56 origins · 7 SNS accounts / styles.css 418→591줄(layout shell + reset 보강). 카테고리·플랫폼 분포 §4-11 일치, Long thread 2개(A→B→C→B→D), automations[] / AUTOMATION_TEMPLATES[] 빈 배열로 Phase 5 예약. code-reviewer 통합 검증 → 8개 발견사항 follow-up fix 후 12개 자동 정합성 항목 ALL PASS. 미동기화 격리: spec §3-2/§3-3 매크로 빌더 토큰 11개의 styles.css 동기화는 Phase 5-1에 위임 (의도된 분리). 환경 정비: sub-agent frontmatter `name`+`description` 누락 등록 거부 사고 → 3개 파일 보강 + CLAUDE.md 작업 위임 원칙에 메모 추가 |
| 2026-05-04 | Phase 2 완료 (Shell & 공통 UI). index.html 신규 463줄 — React 18 UMD + Babel Standalone, App / LandingScreen / MainScreen / TopToolbar / Icon / Toast(2초 auto fade) / Modal(focus trap·esc·backdrop) / Popover / EmptyState. `<App>` `currentScreen: 'landing' \| 'main'` state, ToastProvider 최상위 래핑. TopToolbar 7개 SNS chip 토글(Set 상태) + 동적 `accent_color` inline border + hover 확장(`:hover` width transition + `::after` display_name). 모바일(≤767px) 햄버거 → LSB 드로어(슬라이드인 + backdrop·esc 닫힘). LSB / InboxList / SidePanel 본체는 Phase 3·4 placeholder 유지. styles.css 591→1056줄. code-reviewer 통합 검증 → 6 FAIL + 2 WARN → follow-up fix 4건: (1) Tier 2 토큰 9개 §3-3 등록(`--surface-radius-md`, motion duration·easing 분리 4개 = `--motion-duration-fast/normal/slow` + `--motion-easing-standard`, scrim heavy/light, press-offset x/y). (2) Tier 3 토큰 14개 §3-4 등록(landing/chip/toast(enter·exit offset)/modal max-width·max-height(PC/mobile)/popover/empty-state/lsb-drawer). (3) `top-toolbar__chip` Tier 1 `--border-w-soft` 직접 참조 → Tier 2 `--surface-border-soft`. (4) modal `max-height: 90vh/85vh` raw → Tier 3 토큰. WARN 2건: LandingScreen kakao/apple brand 아이콘 미등록(backlog), Popover ESLint unused warning(Phase 3 사용 시 자연 해소). swap-friendly 결정: `@keyframes animation` shorthand는 duration/easing 분리 Tier 2 토큰을 통해서만 진입(기존 `--transition-*` composite shorthand는 transition 속성 전용으로 유지) |
| 2026-05-04 | Phase 3 완료 (Inbox 메인 — LSB + InboxList + PreviewCard 두 type + 다중선택/일괄처리 + 정렬·badge count). index.html 463→1241줄(+778), styles.css 1064→1860줄(+796). 라운드 1: LeftSidebar 9행(ai_pick / 분류 4 / sent / dm_automation + 구분선 2 + 섹션나눔 1) + InboxList(카테고리 헤더 + TagFilterBar + SortToggle + 카드 리스트 + EmptyState) + PreviewCard.Type1(`business_extracted` 6필드 정형 슬롯) / Type2(sender + 미리보기 + relative time + tag chips) + `is_stacked` 3건 stacked 카드 + 정렬(priority_score desc 기본 / last_message_at desc 최신순 토글) + Badge count runtime computed(`categoryFilter` 의사코드 §6-7 그대로, sent / dm_automation 항상 0, LSB badge는 SNS 필터 무시) + sent 카테고리는 outgoing message만 추출한 단순 리스트. 라운드 2: 다중선택/일괄처리 — PC hover 체크박스 / 모바일 long-press 500ms → 선택 모드 진입. 선택 집합 `Set<thread_id>`. BulkActionBar(읽음처리 / 태그 추가)로 InboxList 헤더 morph. mock data 직접 mutate 금지 → MainScreen `processedOverrides: Set<id>` + `threadTagOverrides: Map<id, string[]>`로 React state override, `applyOverrides` helper가 thread에 두 override 합성. BulkTagModal은 TAG_CATALOG 4그룹(business/ops/social/manual) chip 그리드. Toast 결과 안내. 카테고리 전환 시 자동 종료, 마지막 선택 해제 시 자동 종료. code-reviewer 1차 검증 → critical 1건 + FAIL 6건 → follow-up fix 7건 모두 정리: (1) `threadsWithOverrides` useMemo가 `threadTagOverrides`를 무시 → tags 병합 + deps 추가(태그 일괄 추가 후 LSB badge 새 카테고리 즉시 반영). (2) `.preview-card__thumb-platform`의 `-4px` raw → `--card-thumb-platform-offset` Tier 3 신설. (3) `.bulk-action-bar__btn`의 `32px` raw → `--bulk-bar-btn-height` Tier 3 신설. (4) Phase 3 토큰 spec.md §3-3/§3-4 일괄 등록 — Tier 2 4개(`--color-state-selected-bg/border`, `--color-state-checkbox-on/off`) + Tier 3 30개(LSB 9 / Inbox 3 / Card 14 / Bulk 6). (5) `.preview-card__inner` dead rule(JSX에 미존재) → `.preview-card--selectable.preview-card--selection-mode-on { padding-left: ... }` modifier 기반 인덴트로 교체. (6/7) `selection-mode-on` non-BEM → `preview-card--selection-mode-on`(JSX·CSS 모두 정규화). ESLint 0 errors / 1 pre-existing Popover warning(Phase 6 검색 진입에서 자연 해소 예정). 백로그: SidePanel 진입(Phase 4), dm_automation view 활성(Phase 5), BulkActionBar 모바일 sticky top offset 검토(Phase 4 SidePanel 통합 시) |
| 2026-05-04 | Phase 4 완료 (SidePanel — 스레드 상세). index.html 1241→2051줄(+810), styles.css 1860→2948줄(+1088). **추가된 컴포넌트 13개**: SidePanel(overlay/inline 이중 모드) / SidePanelHeader / ThreadHeader / OriginInfo / DmThread / CommentThread / MessageBubble / CommentItem / TagManager / SavedReplyBar / ReplyEditor / AiDraftButton / AttachmentChip. **토큰 추가(첫 등록)**: Tier 3 22개 — card-active-border-color/bg(2) + side-panel 4개(padding-block/inline/header-height/z-overlay) + thread-header-action-gap + message-bubble 7개(radius/padding-x/y/max-width/bg-incoming/outgoing/tail-radius) + comment-indent-depth-2 + avatar-size-sm/md + saved-reply-chip-max-width/dot-size + reply-editor-min/max-height + ai-summary-bg/border/padding + origin-thumb-size + attachment-chip-max-width. **기능 동작**: PreviewCard 탭 → 스레드 상세 열림 (PC grid 슬롯 / 모바일 overlay). DM/댓글 레이아웃 자동 분기(thread.type === "dm"). 발송 버튼 → 메시지 React state 추가(processedOverrides 연동). 처리완료 버튼 → processed toggle. 퀵 저장 답장 chip. code-reviewer 검증: CRITICAL 1 + FAIL 8 + WARN 3 발견 → Phase 4 follow-up fix(당일). **follow-up fix 처리 결과**: (1) CRITICAL — `.origin-info__ai-summary border` Tier 1 직접 참조 → `--ai-summary-border` Tier 3 composite shorthand로 교체. (2) `.origin-info__thumb` 56px raw → `--origin-thumb-size` Tier 3 신설. (3) `.saved-reply-chip__dot` 6px raw → `--saved-reply-chip-dot-size` Tier 3 신설. (4) opacity 4건(0.85/0.7/0.35) → Tier 2 `--opacity-hover`/`--opacity-disabled-soft`/`--opacity-disabled-strong` 신설 + 전 4건 교체. (5) `max-width: 160px` raw → `--attachment-chip-max-width` Tier 3 신설. (6) §3-4 Phase 4 Tier 3 토큰 22개 일괄 등록. (7) `--ai-summary-bg/border` 토큰 정의와 CSS rule 불일치 해소 — 옵션 A 적용(토큰 정의를 실제 의도에 맞게 수정: brand-soft 배경 + border-soft composite). (8) §10 Phase 4 entry 추가(본 항목). W-1: `side-panel-slide-in animation --transition-normal` composite → `--motion-duration-normal var(--motion-easing-standard)` 분리 토큰으로 교체. W-3: `.message-bubble--incoming/outgoing` tail radius `--gap-inline-xs` → `--message-bubble-tail-radius` Tier 3 신설. Fix 9: `objectFit: 'cover'` JSX inline → `.origin-info__thumb-image` CSS class 분리. Tier 2 신설 3개(`--opacity-hover/disabled-soft/disabled-strong`) + Tier 3 신설 4개(`--origin-thumb-size/saved-reply-chip-dot-size/attachment-chip-max-width/message-bubble-tail-radius`). ESLint 0 errors / 0 warnings. styles.css 2948→2961줄(+13) |
| 2026-05-04 | Phase 3 후속 사용자 브라우저 점검 누적 fix. **레이아웃·스크롤 분리**: html/body overflow hidden + `.app-shell` flex-column + height 100dvh + `.app-main { flex:1; min-height:0 }` → InboxList만 자체 overflow-y. TopToolbar/LSB/SidePanel sticky 정상화. **TopToolbar 반응형 분기 재구성**: PC(≥1024) `grid-template-columns: var(--layout-lsb-width) 1fr auto`로 `.app-main`과 pixel-perfect 정렬, wordmark 좌측 LSB 영역 차지. Tablet+Mobile(≤1023) wordmark 숨김 + `grid auto 1fr auto`(햄버거/카테고리명/액션), (+) SNS 추가 PC 전용으로 분리, drawer 헤더에 wordmark 추가(`hideBrand` prop으로 LSB 본체 brand 숨김). **SNS chip 재구현**: grid `0fr↔1fr` 폐기 → 각 chip 자체 `max-width` transition. collapsed `width=height=44px` 정확한 원형, hover 시 컨텐츠 기반 동적 폭 + 상한 `--chip-expanded-width`(160px). 좌측 chip 영향 0 / 우측만 자연스럽게 밀림. 전체 토글 `chip--all` 추가. label-cell도 max-width 기반 transition. **연결 계정 통일**: Tablet+Mobile에서 SNS chip filter 영역 숨김 → "연결 계정" 버튼 → `<Popover>`로 통일(Modal/bottom-sheet 분기 폐기). `withBackdrop` prop 신설 + dim scrim. Popover 컴포넌트 `position: absolute → fixed` + 좌표 계산 scrollX/Y 제거(`position: relative` ancestor 좌표 mismatch 근본 해소). `.popover` border-radius `--surface-radius-chip`(pill) → `--surface-radius-card`(24px) 교체로 양옆 부풀림 해소. width `min(--popover-max-width, calc(100vw - gap*2))` viewport 안전 처리. **InboxList toolbar 통일**: 카테고리 헤더 영역 폐기(JSX/CSS/토큰 cleanup). SortToggle segmented control → `<Icon name="sort">` 버튼 + Popover dropdown(우선순위순/최신순). TagFilterBar `flex-wrap: nowrap` + `overflow-y: hidden`(가로 스크롤만). 모바일 toolbar 상단 `top: var(--touch-target-min)` override 제거(빈 공간 해소). direct_check / sent layout 통일 — sent 별도 분기 폐기, 둘 다 type filter chip 3종(DM/댓글/메일) 고정 표시. sent도 정렬 토글 정상(priority_score / sent_at). **Icon system robust 처리**: `<Icon>` SVG root에 Lucide standard attrs(`fill=none stroke=currentColor strokeWidth=2 strokeLinecap=round strokeLinejoin=round`) 추가로 stroke 기반 아이콘(menu / x / search / check / sort / more-* 등) silent invisibility 해소. fill 기반 4건(more-horizontal/more-vertical/drag-handle dot 9개 + logo-youtube play triangle)에 `fill=currentColor stroke=none` 보강. CSS `.icon line/polyline/polygon` 셀렉터 + `.icon [fill="currentColor"]` override 추가. `--icon-size-xs: var(--size-12)` Tier 2 + `.icon--xs` helper 신설(`size="xs"` 호출이 사실상 무효였던 silent bug 해소). **PreviewCard stacked 시각 fix**: hover 시 `transform: translate()`이 stacking context 강제 생성 → pseudo `z-index: -1`이 부모 background를 못 뚫는 paint order bug → pseudo(`::before/::after`) 폐기 → `box-shadow` 4-stack(fill 2장 + 외곽선 2장)으로 재구현. `color-mix(in srgb, ...)` alpha 처리로 opacity 0.5/0.25 표현. hover/non-hover 일관 paint order. Tier 2 색상 4개(`--color-stacked-card-1/2`, `--color-stacked-border-1/2`) + Tier 3 1개(`--card-stacked-shadow`) 신설. **기타**: `.preview-card--sent`의 `border-left` 단독 override 제거(둥근 모서리와 충돌하던 selvage 해소). 폐기 토큰 누적: `--chip-expanded-max-width` / `--chip-label-max-width` / `--inbox-header-height` / `--inbox-sort-toggle-height`. spec.md §3 토큰 동기화 완료. ESLint 0 errors / 0 warnings(Popover unused warning은 본 라운드 사용 시작으로 자연 해소). 백로그(tasks.md 등재): 아이콘 일괄 점검(Phase 7-1 직전) / InboxList 정렬 기준 확장(현재 우선순위·최신순 2종) |
| 2026-05-04 | Phase 4 후속 브라우저 점검 fix 3건. (1) SidePanel width 고정 해소 — 신규 토큰 `--width-inboxlist-pc`(520px, Tier 1) + `--layout-inboxlist-width`(Tier 2) 추가. `.app-main` default를 2-col(LSB+1fr)로 변경, `.app-main--panel-open`을 `LSB + inboxlist-width(고정) + 1fr(SidePanel 잔여 전부)`로 교체. Tablet overlay `.side-panel__overlay-body`를 `width` 고정에서 `left: var(--layout-inboxlist-width)` + `right:0` 방식으로 전환(InboxList 폭만 비우고 잔여 전부 차지). Mobile은 `left:0` override로 fullscreen 유지. (2) DM outgoing bubble 좌측 정렬 — `flex-direction: row-reverse` 제거 + `.message-bubble-row--outgoing { justify-content: flex-end }` 명시적 우측 정렬로 교체. JSX unnamed wrapper `<div>` → `<div className="message-bubble-stack">` 클래스 부여. (3) 짧은 outgoing 메시지 강제 줄바꿈 — `max-width` 책임을 `.message-bubble`에서 `.message-bubble-stack`으로 이전(`max-width: var(--message-bubble-max-width); width: fit-content`). `.message-bubble`의 `word-break: break-word` → `overflow-wrap: anywhere; word-break: normal`으로 교체. ESLint 0 errors / 0 warnings. |
| 2026-05-04 | Phase 4 SidePanel 브라우저 점검 라운드 2 — 4건 layout fix. (1) **Tablet inline grid**: `isNarrow` 기준 1024→768 변경(mobile-only overlay). Tablet(768~1023)은 PC와 동일한 inline grid 모드. `@media (max-width:1023px) and (min-width:768px)` 블록에서 `.app-main__lsb { display:none }` + 패널 열림 시 `grid-template-columns: var(--layout-inboxlist-width-tablet) 1fr`. 신규 Tier 1 `--width-inboxlist-tablet`(360px) + Tier 2 `--layout-inboxlist-width-tablet` 추가. 기존 overlay backdrop이 InboxList를 dim하던 문제 해소. Mobile(≤767px)만 overlay 유지. (2) **AI 요약 카드 노출 + 색상**: `@media (max-width:1023px) { .origin-info__ai-summary { display:none } }` 삭제(모든 모드 표시). 색상 노란 계열(`--color-brand-soft`) → 퍼플 소프트로 변경 — Tier 1 `--color-purple-soft`(#D4C8F8) + Tier 2 `--color-accent-purple-soft` 신설, `--ai-summary-bg` → `var(--color-accent-purple-soft)` 재매핑. padding `--gap-inline-md` → `--gap-inline-sm` 축소. line-height `--line-height-relaxed` → `--line-height-normal` 다운. (3) **MessageThread 스크롤 + 메일 본문 잘림**: `.message-thread > * { flex-shrink: 0 }` 추가 — flex container 안 자식 squeeze(메일/버블/댓글이 동등 shrink되던 문제) 차단 → message-thread `overflow-y:auto` 스크롤 정상화. (4) **더 보기 토글**: DMBubbleList / CommentImitateList / EmailThreadList 3개 컴포넌트의 load-more 버튼을 단방향(더 보기) → 양방향 토글(`expanded ? '최근 5개만 보기' : '이전 N개 더 보기'`)로 변경. ESLint 0 errors. |
| 2026-05-04 | Phase 4 브라우저 점검 라운드 4 — 2건 fix. **(1) ghost 아이콘 신설**: icon-set.js에 `ghost`(Lucide 유령 유머 아이콘) 등록. ThreadHeader 대응하지 않기 버튼 `name="x"` → `name="ghost"` 교체. **(2) TopToolbar 햄버거 ↔ 뒤로가기 morph(Mobile)**: TopToolbar에 `showBackButton`/`onCloseSidePanel` prop 추가. `panelOpen && isNarrow` 시 버튼이 rotation+fade 애니메이션으로 chevron-left로 morph(back-mode CSS class 토글). SidePanel overlay `inset: 0` → `inset: var(--top-toolbar-height) 0 0 0`(옵션 B — TopToolbar가 항상 노출). 신규 Tier 3 토큰 `--top-toolbar-height: 56px` 신설. SidePanelHeader(mobile back row) JSX 블록 + CSS `.side-panel-header*` 4개 rule 제거(TopToolbar morph가 역할 대체). 폐기 토큰: `--side-panel-header-height`. ESLint 0 errors / 0 warnings. |
| 2026-05-04 | Phase 4 브라우저 점검 라운드 3 — 3건 UI fix. **(1) ThreadHeader + OriginInfo 통합**: OriginInfo 컴포넌트 폐기. avatar/display_name 중복 제거. ThreadHeader가 sender handle(account_id sub-line) + post 타입 정보(post thumb 슬롯 + relative time) + AI 요약 카드를 흡수. CSS `.origin-info*` 규칙 전체 삭제 → `.thread-header__post-thumb / __post-thumb-image / __sender-handle / __ai-summary / __ai-label / __ai-text` BEM 클래스 신설. SidePanel JSX에서 `<OriginInfo>` 라인 제거. **(2) PreviewCard 활성 테두리 fix**: `.preview-card--active` `border-color` 줄 제거(Option B) → 선택 시 배경색만 변경, 테두리는 기본 검정 유지. `--card-active-border-color` 토큰 §3-4 및 styles.css 정의 삭제(orphaned). **(3) 전역 스크롤바 자동 숨김**: Tier 3 토큰 2개 신설(`--scrollbar-thumb-size: 6px`, `--scrollbar-thumb-color: var(--color-text-muted)`). 전략: scrollbar 폭은 항상 thin(6px) 고정 → 콘텐츠 폭 흔들림 없음, thumb 색 transparent ↔ visible 토글. `* { scrollbar-width: thin; scrollbar-color: transparent transparent }` 글로벌 base + `.is-scrolling` 클래스로 thumb 노출. MainScreen `useEffect`에 `document.addEventListener('scroll', ..., true)` capture 등록 — 700ms debounce 후 `.is-scrolling` 제거. 기존 per-element `scrollbar-width: none` + `::-webkit-scrollbar { display:none }` 3곳(toolbar-filter / tag-filter-bar / inbox-list-toolbar-chips / reply-area-chips) 제거(global rule로 통합됨). ESLint 0 errors. |
| 2026-05-05 | Phase 5-1 토큰 28종 등록. Tier 1 2개(`--color-overlay-scrim`, `--opacity-disabled`) + Tier 2 11개(sheet/accordion/input-soft/status-info-soft/chip-remove/reply-remove/surface-radius-sheet) + Tier 3 15개(sheet-handle/wizard-step-indicator/wizard-progress/automation-card/keyword-chip/toggle) — spec.md §5-9-7 표 기반, styles.css :root 동기화 완료. |
| 2026-05-05 | Phase 5 Round 2 완료 (매크로 빌더 DM 자동화 전체 구현). index.html 2037→3672줄(+1635), styles.css 2968→4380줄(+1412), icon-set.js 265→289줄(+24, 5개 아이콘 신규 등록: check-circle/radio-dot/users/message-circle/external-link). **신규 컴포넌트 16개**: ToggleSwitch / AutomationCard / WizardStepTrigger / WizardStepReply / WizardStepFollowerBranch / WizardStepMessage / WizardStepReview / MacroBuilderWizard / AutomationListView / MessageInputPanel / ButtonEditSheet / WizardHeader / WizardFooter / WizardStepIndicator(dot) / WizardProgressBar(mobile) / ReviewSummaryList. **helper/reducer 신규**: isAutomationValid / isMessageValid / fmtStat / setPath / deepMerge / wizardReducer(9 action) / WIZARD_INITIAL_STATE. **Tier 3 토큰 15개 추가**(Round 2 신설): toggle-track-w/h / toggle-knob-size/inset / wizard-step-indicator-size/active-size/gap / button-edit-sheet-max-width / automation-card-thumb-size/border/padding-x/y / template-card-w/h / wizard-field-radius / wizard-section-gap / ig-post-grid-cell-size / review-row-min-height. **5-3 AutomationListView**: 템플릿 캐러셀(Blank+3종) + 요약바 + 정렬 Popover + AutomationCard 7개 인터랙션(본문클릭→wizard step5, 토글즉시, ...메뉴 편집/복제/삭제). **5-4 MacroBuilderWizard**: useReducer 9-action / 5step / step별 검증 / DIFFERENT_MESSAGES variant tabs / ButtonEditSheet bottom sheet / LinkBlockImportButton disabled / PC dot navigation (visited step jump) / mobile progress bar / dirty tracking confirm dialog / ReviewBodyInlineEditor / title input at step 5. **5-5 LSB 진입**: `AutomationListView` 활성화(EmptyState stub 교체). **상태 관리**: MainScreen에 wizardState(useReducer) + automationStatusOverrides/automationOverrides/deletedAutomationIds/addedAutomations + getDisplayedAutomations() helper. selectedThreadId ↔ wizardState.mode mutually exclusive. ESLint 0 errors / 1 pre-existing warning(Phase 4 textareaRef). |
| 2026-05-05 | Phase 5 통합 검증 mechanical fix. **C-1**: toggle knob `box-shadow` raw rgba → Tier 1 `--shadow-elevation-soft` 신설 + Tier 3 `--toggle-knob-shadow` 경유. **C-2**: 4건 `--radius-sm` 직접 참조(message-bubble-preview thumb/image-uploader thumb/add-btn/ig-post-grid cell) → Tier 3 `--media-thumb-radius` 신설. **C-3**: Tier 1 `--border-w-default/soft` 직접 참조 6건 교체 — 4건 `--surface-border-default/soft` Tier 2 composite로 교체, 2건(`ig-post-grid-picker__cell` transparent+selected) → Tier 3 `--ig-post-grid-cell-border-w/selected` 신설. **C-4**: raw px 17건 Tier 3 토큰화 — `--keyword-chip-compact-height(20px)` / `--card-stat-divider-w/h(1px/20px)` / `--wizard-progress-bar-h(3px)` / `--keyword-chip-height(28px)` / `--chip-remove-icon-size(18px)` / `--reply-item-min-height(40px)` / `--icon-button-size(28px, reply+button-row 통합)` / `--message-preview-thumb-size(60px)` / `--wizard-textarea-min-h/max-h(80/160px)` / `--button-row-url-max-w(120px)` / `--thumb-remove-offset/size(2px/20px)` / `--cell-check-offset/size(4px/20px)` / `--review-step-label-min-w/pt(48px/2px)`. **W-1**: Tier 2 `--color-scrim-heavy/light` raw rgba → Tier 1 `--color-overlay-scrim-strong(0.5)/--color-overlay-scrim(0.4)` reference. **W-2**: §3-4에 Round 2 Tier 3 토큰 15개 등재. **W-3**: `mock-data.js:4` 불필요한 `/* eslint-disable */` 제거. **W-4**: §4-11-1에 `buttons=[]` 룰 `clicked=0` 예외 문구 추가. **F-1**: LSB 카테고리 변경 시 dirty wizard 무조건 CLOSE → `pendingCategoryChange` state 도입 + confirm Modal 추가(버리고 이동/취소). **F-2**: §5-9-4 action 목록 9개→10개(`SET_ERRORS` 추가). 신설 토큰 총 35개(Tier 1 2 / Tier 3 33). styles.css + spec.md §3-2/§3-3/§3-4/§4-11-1/§5-9-4 동기화. |
| 2026-05-05 | Phase 5 후속 라운드 2 — wizard step nav 재설계: 헤더 뒤로가기 제거, dot indicator/progress-bar/footer 폐기, segmented tab + 양 끝 ghost chevron + step 5 완료 morph 1행 통합. 토큰 9개 deprecated(`--wizard-step-indicator-active/visited/pending-bg`, `--wizard-step-indicator-size/active-size/gap`, `--wizard-progress-track/fill-bg`, `--wizard-progress-bar-h`), 신설 2개(`--wizard-tab-underline-w`, `--wizard-tab-mobile-px-x`). `.wizard-footer*` CSS 폐기 → `.wizard-button--primary/secondary` 공용 클래스로 대체(wizard confirm modal 3곳 + step 5 완료 CTA 공용). `STEP_NAV_LABELS` 상수 신설. |
| 2026-05-05 | Phase 5 라운드 3 mock 보강 — title 7건, active_minutes 신규 필드, IG post 썸네일 정합성. |
| 2026-05-05 | Phase 5 후속 사용자 브라우저 점검 라운드 3 — automation card 전면 재구성: 메뉴/통계/메시지 미리보기 제거, 좌측 80px 썸네일 + 우측 3-zone(top·title·meta·footer-meta) 구조. title mock 7건 채움, active_minutes 신규 필드 + 카드 표기. 제거된 기능: `...` 메뉴(편집/복제/삭제) + 삭제 confirm Modal. 폐기 state: `deletedAutomationIds`/`deleteConfirmId`. 폐기 handler: `handleAutomationDuplicate`/`handleAutomationDelete`/`handleDeleteConfirm`. 폐기 CSS: `.automation-card__menu*`/`.automation-card__keyword-chip*`/`.automation-card__stats*`/`.automation-card__stat-divider`/`.automation-card__body`(미리보기)/`.automation-card__status-row*`/`.automation-card__header`/`.automation-card__content`. 폐기 토큰: `--automation-card-stat-divider`/`--keyword-chip-compact-height`/`--card-stat-divider-w`/`--card-stat-divider-h`/`--automation-card-thumb-size`. 신설 토큰: `--automation-card-thumb-w`/`--automation-card-thumb-w-mobile`/`--automation-card-future-bg`. §5-9-1 컴포넌트 트리 + §3-4 Tier 3 표 동기화. ESLint 0 errors / 1 pre-existing warning(textareaRef). |
| 2026-05-05 | Phase 5 후속 사용자 브라우저 점검 라운드 1 — 4건 피드백 처리. **(1) DM 자동화 SNS 필터 동작**: `dm_automation` 진입 시 `snsFilterSnapshotRef`에 전체 set snapshot → 비-IG 계정 자동 OFF, 이탈 시 restore. TopToolbar에 `disabledAccountIds` prop 추가 — 비-IG chip `.top-toolbar__chip--disabled`(opacity disabled + pointer-events none). `전체` chip은 automation view에서 숨김. `ruleMatchesIgAccountFilter` helper 신설(FUTURE_POSTS는 IG≥1 ON이면 항상 노출, SPECIFIC_POSTS는 media_id → origin → account 매칭). `activeIgAccountIds` useMemo 도출(MainScreen) → AutomationListView/MacroBuilderWizard로 prop 주입. IgPostGridPicker `igOrigins` prop 기반 실시간 갱신. EmptyState 2종(모든 IG OFF / 매칭 룰 0건) 추가. `pendingCategoryChange` confirm 경로에도 snapshot restore 추가. §5-9-10 명세 신설. **(2) AutomationListHeader title 제거**: `<div className="automation-list-header__title">` JSX 노드 제거. `.automation-list-header__title` CSS 룰 제거. AutomationListHeader 컴포넌트 자체는 안내 배너를 유지하므로 보존. **(3) AutomationListSummaryBar + AutomationSortToggle 제거**: 두 영역 JSX 제거. 관련 state(`sortMode`/`sortPopoverOpen`)/ref(`sortBtnRef`)/handler 제거. 정렬은 mock array 순서(auto1→auto7) 그대로. `.automation-list-summary-bar*` CSS 3개 + `.automation-sort-toggle` CSS 1개 삭제. spec §5-9-1 컴포넌트 트리에서 두 노드 제거. **(4) ESLint 0 errors / 1 pre-existing warning(textareaRef)** 유지. |
| 2026-05-05 | Phase 5 후속 사용자 브라우저 점검 라운드 4 — 3건 피드백 처리. **(1-A) 모바일 뒤로가기 dirty confirm 매핑**: `MacroBuilderWizard`에 `onCloseAttemptRef` prop 추가 — `handleCloseAttempt`를 `useEffect`로 ref에 동기화. MainScreen에 `wizardCloseAttemptRef` 신설. `handleTopBarBack`에서 `wizardOpen` 분기 시 ref를 통해 dirty-check 흐름 경유(`wizardCloseAttemptRef.current?.()`). overlay backdrop 클릭도 동일 ref 경유로 교체. **(1-B) dirty confirm modal 모바일 가운데 배치**: `Modal` 컴포넌트에 `centered` bool prop 추가 → `.modal--center` modifier 클래스 토글. `styles.css` 모바일 분기에서 `.modal:not(.modal--center)` 선택자로 bottom-sheet 변형을 비-center modal에만 적용. wizard dirty confirm Modal에 `centered` prop 추가. **(2) ReplyToneTabs 매 클릭 preset 교체**: `handleToneSelect`에서 `toneInitializedRef` 제거(orphan 정리 포함) → POLITE/FRIENDLY 매 클릭마다 `PRESETS[tone]` deep copy로 items 교체. CUSTOM은 직전 items 유지. §5-9-8 동작 메모 갱신. **(3) ReviewSummaryList ellipsis → wrap**: `.review-summary-row__value` CSS에서 `overflow:hidden / text-overflow:ellipsis / white-space:nowrap` 제거 → `white-space:normal / overflow-wrap:anywhere`로 교체. ESLint 0 errors / 1 pre-existing warning(textareaRef). |
| 2026-05-07 | 디자인 토큰 health check 1차 — dead token 18개 정리. 코드 전체에서 `var()` 호출 0회로 검증된 dead 28개 중 사용자 옵션 2(그룹 A 12 + 그룹 B-1 6) 선택분 삭제. **삭제된 Tier 1(6)**: `--size-13/15/22/56`(비정형 size scale), `--tracking-display-lg/sm`(미사용 tracking variant). **삭제된 Tier 2(8)**: `--color-accent-green/-purple/-purple-soft`(색명 노출 + 미사용 relay), `--color-status-info`(soft variant만 사용 중), `--color-bg-accordion-expanded`, `--font-family-code`(font-mono 직접 사용), `--layout-sidepanel-width`(width-sidepanel-pc 직접 사용), `--transition-slow`/`--motion-duration-slow`(motion-slow 직접 사용). **삭제된 Tier 3(4)**: `--landing-tagline-font-size`, `--sns-filter-modal-chip-height`, `--origin-thumb-size`(card-thumb-size 직접 사용으로 alias 불필요), [styles.css만, spec.md에는 미등재]. **보존된 false-positive(6)**: `--color-platform-{gmail,instagram,mail,naver,tiktok,youtube}` — [index.html:588, 732]에서 JS template literal `var(--color-platform-${platform})`로 동적 참조 중(grep 미감지). **검증 결과**: 18개 모두 styles.css `^[[:space:]]+--token:` 매칭 0회. spec.md §3-2/§3-3/§3-4 카탈로그 17개 동기화(sns-filter는 spec 미등재). 총 토큰 356→338. ESLint 에러 0. **남은 dead 10개(보존 결정)**: 정형 scale 멤버(`--space-6/8/9/10`, `--radius-xs/xl`), brand palette dark variant(`--color-ink-soft/-paper-cool/-green-soft`), motion family(`--easing-bounce`) — 향후 사용 가능성 + 스케일 일관성. **메모**: 색명 노출 위반(예: `--color-accent-pink/-blue/-coral`, `--card-type-chip-bg-{business,dm,comment,mail}`) 정리 + Tier 3 single-use 통폐합은 별도 phase로 backlog. |
| 2026-05-07 | dark theme → light theme 원복. styles.css Tier 1 4개 블록 swap — (1) Color Foundations: `--color-ink/-soft`, `--color-paper/-warm/-cool`, `--color-white` 6개 light(`#0F0F0F` / `#F5EFE3` / `#FFFFFF` 계열) 활성 + dark(`#D5CFC2` / `#16140C` 계열) 주석 보존. (2) Brand -soft variants: `--color-yellow-soft`(#FFE680), `--color-pink-soft`(#FFC2CD), `--color-green-soft`(#B8D88A), `--color-purple-soft`(#D4C8F8) light 활성 + dark 주석. (3) Neutrals: `--color-grey-100~500` 5개 warm-light(`#E8E4DA → #3D3B36`) 활성 + dark 주석. (4) Overlay scrim: `--color-overlay-scrim`/`-strong` light `rgba(15,15,15,0.4/0.5)` 활성 + dark `rgba(0,0,0,0.55/0.65)` 주석. **유지**: `--color-ink-fixed: #1A1410`(테마 무관 always-dark, brand surface 가독 보장용 라인 37 코멘트 가이드대로 라이트에서도 활성), Tier 2/3 토큰 정의 일절 변경 없음(Tier 1 swap만으로 자동 light 반영 — swap-friendly 아키텍처의 핵심). 보너스 cleanup: `--ai-summary-bg` 코멘트 "다크모드: 밝은파랑 → 다크 보라" 서술 제거 → "purple soft accent — AI 블록 vibe + body 가독". swap reversibility 패턴(현재 활성/보존 헤더 코멘트) 유지로 향후 재swap 가능. ESLint 에러 0. |
| 2026-05-07 | 2차 디자인시스템 swap — "Zapier theme" (warm cream + 1px sand borders + single orange accent + Manrope display). hard-edge offset shadow → border-forward. 시그니처 2px ink outline → 1px sand. radius scale tighten (16/24/32 → 5/8/14). `--color-yellow*` → `--color-orange*` (토큰명+값 동시 변경, Tier 2 brand 매핑 + Tier 2 state-selected + Tier 3 card-type-chip-bg-business 참조 갱신). `--font-display` Hanken Grotesk → Manrope. `--leading-display` 0.92→0.90, `--tracking-display-xl/md` -0.04/-0.03→-0.01. `::selection` background `--color-brand`(이제 #ff4f00, 강렬) → `--color-state-selected-bg`(orange-soft #ffece4). 영향 파일: styles.css, spec.md. index.html / mock-data.js / icon-set.js 무수정. |
