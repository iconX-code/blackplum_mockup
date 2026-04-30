# blackplum mockup — 기술 스펙

> 기준일: 2026-04-29
> 최종 수정: 2026-04-30

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
├── mock-data.js       ← window.MOCK_DATA (메시지·스레드·게시글·매크로 룰)
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
    │   ├── PreviewCard.Type1  ← 비즈니스 카드 (정형 추출 레이아웃)
    │   ├── PreviewCard.Type2  ← 기본 카드
    │   └── (DM자동화 탭)        ← 매크로 빌더 진입 (별도 세션)
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

### 3-2. Tier 1: Primitive 토큰 (placeholder)

초기값은 디자인시스템 적용 전까지의 placeholder. Phase 0 완료 후 외부 디자인시스템 swap task에서 실제 값으로 교체.

```css
:root {
  /* === Tier 1: Color Palette === */
  --color-orange-50:  #FFF4E6;
  --color-orange-500: #FF7A00;
  --color-orange-700: #B85600;
  --color-gray-50:    #FAFAFA;
  --color-gray-200:   #E5E5E5;
  --color-gray-500:   #737373;
  --color-gray-900:   #1A1A1A;
  --color-red-500:    #EF4444;
  --color-blue-500:   #3B82F6;

  /* === Tier 1: Font Family === */
  --font-pretendard: 'Pretendard Variable', 'Pretendard', -apple-system, sans-serif;
  --font-mono:       'JetBrains Mono', ui-monospace, monospace;

  /* === Tier 1: Size Scale (px) === */
  --size-12: 12px;
  --size-13: 13px;
  --size-14: 14px;
  --size-16: 16px;
  --size-18: 18px;
  --size-20: 20px;
  --size-24: 24px;
  --size-28: 28px;
  --size-32: 32px;

  /* === Tier 1: Spacing Scale === */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;

  /* === Tier 1: Radius === */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-pill: 9999px;

  /* === Tier 1: Shadow === */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);

  /* === Tier 1: Motion === */
  --motion-fast:   120ms;
  --motion-normal: 200ms;
  --motion-slow:   320ms;
  --easing-standard: cubic-bezier(0.2, 0, 0, 1);
}
```

### 3-3. Tier 2: Semantic 토큰

UI 코드가 직접 참조하는 토큰. swap 후에도 이 토큰의 이름은 변하지 않는다.

```css
:root {
  /* === Tier 2: Color (semantic) === */
  --color-brand:           var(--color-orange-500);
  --color-brand-soft:      var(--color-orange-50);
  --color-brand-strong:    var(--color-orange-700);

  --color-bg-canvas:       var(--color-gray-50);
  --color-bg-surface:      #FFFFFF;
  --color-bg-muted:        var(--color-gray-50);

  --color-text-primary:    var(--color-gray-900);
  --color-text-secondary:  var(--color-gray-500);
  --color-text-on-brand:   #FFFFFF;

  --color-border-subtle:   var(--color-gray-200);
  --color-border-strong:   var(--color-gray-500);

  --color-status-danger:   var(--color-red-500);
  --color-status-info:     var(--color-blue-500);

  /* === Tier 2: Typography === */
  --font-family-primary:   var(--font-pretendard);
  --font-family-code:      var(--font-mono);

  --font-size-h1:          var(--size-28);
  --font-size-h2:          var(--size-24);
  --font-size-h3:          var(--size-20);
  --font-size-h4:          var(--size-18);
  --font-size-body:        var(--size-14);
  --font-size-body-lg:     var(--size-16);
  --font-size-caption:     var(--size-12);
  --font-size-overline:    var(--size-12);

  --font-weight-regular:   400;
  --font-weight-medium:    500;
  --font-weight-semibold:  600;
  --font-weight-bold:      700;

  --line-height-tight:     1.2;
  --line-height-normal:    1.5;
  --line-height-loose:     1.75;

  --letter-spacing-tight:  -0.01em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide:   0.04em;

  /* === Tier 2: Surface === */
  --surface-radius-card:   var(--radius-lg);
  --surface-radius-pill:   var(--radius-pill);
  --surface-shadow-card:   var(--shadow-sm);
  --surface-shadow-overlay:var(--shadow-lg);

  /* === Tier 2: Spacing aliases (선택) === */
  --gap-inline-xs:         var(--space-1);
  --gap-inline-sm:         var(--space-2);
  --gap-stack-md:          var(--space-4);
  --gap-section:           var(--space-8);

  /* === Tier 2: Icon === */
  --icon-size-sm:          16px;
  --icon-size-md:          20px;
  --icon-size-lg:          24px;
  --icon-color-primary:    var(--color-text-primary);
  --icon-color-muted:      var(--color-text-secondary);
  --icon-color-on-brand:   var(--color-text-on-brand);

  /* === Tier 2: Motion === */
  --transition-fast:       var(--motion-fast)   var(--easing-standard);
  --transition-normal:     var(--motion-normal) var(--easing-standard);
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
}
```

판단 기준:
- 동일한 semantic 의미를 여러 컴포넌트가 공유 → Tier 2로 충분
- 한 컴포넌트의 고유 디자인 결정이 다른 토큰들과 분리되어야 함 → Tier 3 정의

### 3-5. Typography 체계

semantic 역할별 사용 매핑. 컴포넌트는 raw 값 대신 아래 역할 토큰을 통해 텍스트를 표현한다.

| 역할 | 사용처 (예시) | 토큰 조합 |
| --- | --- | --- |
| Display | 랜딩 영역 brand title | `--font-size-h1` + `bold` + `tight` |
| Heading 1 | 카테고리/화면 타이틀 | `--font-size-h2` + `semibold` + `tight` |
| Heading 2 | 섹션 / 카드 헤더 | `--font-size-h3` + `semibold` + `normal` |
| Heading 3 | sender 이름 / 카드 부제목 | `--font-size-h4` + `medium` + `normal` |
| Body | 메시지 본문, 일반 텍스트 | `--font-size-body` + `regular` + `normal` |
| Body large | 강조 본문 | `--font-size-body-lg` + `regular` + `normal` |
| Caption | 시각 보조 메타 | `--font-size-caption` + `regular` + `normal` |
| Overline | 라벨/카테고리 메타 | `--font-size-overline` + `medium` + `wide` letter-spacing + UPPERCASE |

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
| `size` | `'sm' \| 'md' \| 'lg'` | `--icon-size-{size}` |
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
.icon--sm { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.icon--md { width: var(--icon-size-md); height: var(--icon-size-md); }
.icon--lg { width: var(--icon-size-lg); height: var(--icon-size-lg); }
.icon--tone-inherit  { color: currentColor; }
.icon--tone-primary  { color: var(--icon-color-primary); }
.icon--tone-muted    { color: var(--icon-color-muted); }
.icon--tone-on-brand { color: var(--icon-color-on-brand); }
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

### 3-8. CSS 작성 규칙

- BEM 기반 시맨틱 클래스 (`.preview-card`, `.preview-card__thumb`, `.preview-card--type-business`)
- raw 값 사용 금지. semantic 토큰 또는 component 토큰만 참조
- 동적 색상(SNS 플랫폼별 border, 카테고리 accent 등)만 inline `style={{ color: ... }}` 허용. 단 inline 값도 가급적 토큰 reference (`var(--color-platform-instagram)` 등)로 작성
- `!important` 사용 금지 (불가피한 경우 §10에 사유 기록)

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
macroRules[]                                     placeholder
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

### 4-8. MacroRule (placeholder — backlog)

별도 세션에서 wizard UI 흐름 정리 후 schema 확정. 1차 placeholder:

```ts
type MacroRule = {
  id: string;
  name: string;
  trigger: { posts: string[] | 'all'; keywords: string[] | 'any' };
  actions: Array<{ type: 'send_dm' | 'reply_comment' | 'request_follow_check'; payload: any }>;
  branches?: Array<{ condition: 'is_follower' | 'is_not_follower'; actions: any[] }>;
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
  macroRules: MacroRule[],          // placeholder
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
| DM 자동화 매크로 (placeholder rules) | n/a | 3~5 | 3~5 |

- 미처리 비율 ~75% / 처리됨 ~25% (시연 중 새 처리 동작 여지 확보)
- 보낸메시지함은 derived view (별도 thread 분포 없음). 다른 카테고리 thread에 outgoing message가 충분히 섞이도록 작성
- AI context (`ai_context_solo`/`ai_context_cumulative`/`ai_thread_context`)는 모든 message·thread에 풀 채움
- 비즈니스 long thread 2개: req.md §5-3-3 예시(A→B→C→B→D 주제 전환) 패턴을 반영하여 누적맥락이 자연스럽게 변화하는 시연 데이터로 구성
- 플랫폼 분포: Instagram > YouTube > Gmail > 틱톡 > 네이버메일 > 기타메일 (req.md §4 우선순위)
- 같은 플랫폼 복수 계정: Instagram 2개 정도 (글로벌 SNS 필터 시연용)

---

## 5. 화면 / 컴포넌트 설계

### 5-1. 랜딩 화면 (`LandingScreen`)

- req.md §2-4: 가입/OAuth/채널생성 모두 생략
- 좌우 2단 (PC) / 상하 1단 (모바일) 레이아웃 후보
- 중앙: blackplum 로고 + "OOO SNS로 시작하기" 버튼 나열 (Google / Naver / Kakao 등)
- 어떤 버튼이든 클릭 → `currentScreen = 'main'` 으로 즉시 전환

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
- `PreviewCard.Type1` (비즈니스): 회사명·브랜드·담당자명·제안내용·제품명·조건을 정형 슬롯으로 표시 (mock 데이터에 사전 추출 결과 포함)
- `PreviewCard.Type2` (기본): 썸네일 / sender / 미리보기 텍스트 / 받은시각 / depth 2 태그
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
- `Modal`/`Popover`: 검색 진입, 매크로 빌더 wizard 등에서 사용 (별도 세션)
- `EmptyState`: 카테고리 빈 상태

### 5-9. 매크로 빌더

- 별도 세션에서 상세 정의 (tasks.md backlog)
- 진입 위치: LSB의 "DM 자동화" 클릭 시 InboxList 영역에 룰 리스트 노출 → 룰 클릭 시 SidePanel에 wizard
- placeholder 컴포넌트 `MacroPlaceholder`로 1차 자리만 마련

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
- 변형: dot notation (`PreviewCard.Type1`) 또는 prop-driven (`<PreviewCard variant="business">`) 중 일관성 있게
- CSS 클래스: BEM (`.preview-card`, `.preview-card__thumb`, `.preview-card--type-business`)

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
