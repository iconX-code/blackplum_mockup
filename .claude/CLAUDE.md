# blackplum_mockup — Claude 세션 지침

## 프로젝트 컨텍스트
Instagram DM/댓글, YouTube 댓글, Gmail, 틱톡 DM/댓글, 네이버 메일, 기타 메일 등 SNS 메시지를 자동 분류하여 별도 웹 UI에 정리하는 blackplum 서비스(아이콘엑스 내부 코드명: INBOXX)의 working mockup. "메시지를 모아주는 툴"이 아니라 "처리해야 할 일을 보여주는 업무 큐" 포지셔닝. 한국의 IG/유튜브 중형 크리에이터를 잠재고객으로 한 시연용 mockup으로, 모바일 UI 품질을 최우선으로 함. React + CDN 단일 HTML 파일로 구현하며 GitHub Pages로 배포. 자세한 요구사항은 `req.md`, 기술 스펙은 `spec.md`, 진행 현황은 `tasks.md`로 관리. 의존성은 `dependencies.txt`에 기록.

## 프로젝트 진행 방식
- 할 일이 발생되면 관련 체크리스트를 생성하고 tasks.md에 기록
- 이후 할 일이 변경, 취소, 완료되면 항상 tasks.md에 관련 내용 수정
- 신규 세션이 열릴 때마다 tasks.md를 참조하여 context 확보
- 기술 스펙의 변화, 로직의 변경/개선, error, debug 이력은 모두 spec.md에 기록
- 코딩 규칙에 추가할만한 공통적인 원칙은 CLAUDE.md에 업데이트
- 모든 코드의 수정 적용 완료 시, 항상 tasks.md, spec.md, CLAUDE.md에 업데이트 할 사항이 있는지 자동으로 점검

## 작업 위임 원칙
- main 스레드는 분석, 의사결정, agent orchestration에 집중. 직접 코드 수정 금지.
- 모든 코드 수정은 담당 sub-agent에 위임:
  - `frontend-dev` (sonnet): index.html / styles.css / icon-set.js 작성·수정
  - `mock-data-writer` (sonnet): mock-data.js 샘플 데이터 작성·수정
  - `code-reviewer` (sonnet): 코드 수정 후 읽기 전용 검증
- frontend-dev와 mock-data-writer는 담당 파일이 다르므로 병렬 실행 가능
- 여러 파일에 걸친 변경은 관련 agent들을 병렬 실행
- 코드 수정이 포함된 작업 단위(phase/task)가 완료될 때마다 반드시 `code-reviewer` agent로 검증. 단순 문서 수정만 있는 경우는 제외
- sub-agent 정의 파일(`.claude/agents/*.md`) 추가·수정 시 frontmatter에 `name`(lowercase+hyphens, 필수) / `description`(필수) 두 필드를 반드시 포함. 누락 시 세션에 등록 거부됨. 변경 후에는 세션 재시작 또는 `/agents` 슬래시 명령으로 리로드
- **spec 참조 정책**: spec.md / req.md는 1500+ / 580+ 줄로 통째로 Read 시 컨텍스트 폭발(60k+) → 응답 사이클 지연 + watchdog stall 사고 패턴(실제 발생 이력). main thread는 sub-agent 위임 시 가능하면 정확한 섹션 위치를 핀포인트로 지정(예: "spec.md §4-3 / 라인 626~655만 Read"). 또는 schema/토큰 등 핵심 정보를 위임 프롬프트에 inline 제공하여 agent의 spec 재읽기를 차단. 자세한 정책은 spec.md §0 / sub-agent 정의 참조
- **Serena MCP 활용 정책**: 코드 탐색은 1순위로 Serena 도구 사용 (`find_symbol`, `find_referencing_symbols`, `get_symbols_overview`, `search_for_pattern`, `list_dir` 등). symbol-level 탐색이 grep/Read 통째 읽기보다 컨텍스트 효율 우수. **단, 본 프로젝트의 React 컴포넌트는 `index.html` 내 `<script type="text/babel">` 블록에 위치하여 TypeScript LSP가 인식하지 못함 → index.html 내부 JSX/컴포넌트 탐색은 Serena의 `search_for_pattern`(regex 기반) 또는 핀포인트 Read로 우회**. symbol 도구가 효과적인 영역: `mock-data.js`, `icon-set.js`, `eslint.config.js` 등 .js 파일. spec.md / req.md 핀포인트 정책에도 Serena `search_for_pattern`을 통째 Read 회피 보조 수단으로 활용. 첫 세션에서 `activate_project` 첫 호출 시 typescript-language-server 자동 다운로드/인덱싱으로 수십 초~1분 소요(1회성, 이후 캐시됨)

## 기술 스택
- 프론트엔드: React 18 (CDN, UMD) + Babel Standalone (CDN, JSX 런타임 트랜스파일)
- 스타일: Pure CSS — 3-tier 디자인 토큰 시스템 (`styles.css`, 상세는 spec.md §3)
- 아이콘: `icon-set.js`의 SVG registry + `<Icon />` 컴포넌트 추상화 (1차 출처: Lucide 발췌)
- 빌드 도구: 없음 (단일 `index.html`을 브라우저에서 직접 로드)
- 배포: GitHub Pages 정적 호스팅
- 상태 관리: React hooks (`useState`, `useReducer`, Context API). React Router·외부 상태 라이브러리 미사용
- 데이터: 하드코딩 mock data — `mock-data.js`에서 `window.MOCK_DATA`로 노출

## 코딩 규칙

### 컴포넌트·데이터
- 모든 React 컴포넌트와 로직은 `index.html` 내 `<script type="text/babel">` 블록에 작성
- mock data는 `mock-data.js`로 분리하여 `window.MOCK_DATA`에 할당
- 아이콘 SVG는 `icon-set.js`의 `window.ICON_SET`에 등록, 사용처는 반드시 `<Icon name="..." size="..." tone="..." />`만 통과 (직접 SVG inline 금지)
- JSX 내 한국어 텍스트 사용 (시연 대상: 한국 잠재고객)
- 파일이 신규 생성되면 gitignore 적용 여부를 검토하고 필요 시 사용자에게 제안

### 디자인 토큰 / Swappable Design System (절대 원칙)

본 mockup은 외부 디자인시스템을 자주 swap한다. 모든 디자인 결정은 swap-friendly하게 토큰화한다. 위반 시 swap 비용이 폭발하므로 예외 없이 적용.

- 3-tier 토큰 아키텍처 (Tier 1 primitive raw / Tier 2 semantic / Tier 3 component)
  - UI 코드(컴포넌트 CSS·inline style·JSX)는 Tier 2(semantic) 또는 Tier 3(component) 토큰만 참조
  - Tier 1(primitive)을 컴포넌트가 직접 참조하지 않는다
- raw 값(색상 hex / px / rem / 폰트명 / line-height / radius / shadow / motion duration 등)을 컴포넌트 코드에 절대 하드코딩 금지. 모든 값은 토큰을 통해서만 진입
- 동적 색상(SNS 플랫폼별 border, 카테고리 accent 등)도 가급적 토큰 reference (`var(--color-platform-instagram)` 식)
- BEM 기반 시맨틱 CSS 클래스 (`.preview-card__thumb`, `.preview-card--type-business`)
- 폰트는 `--font-family-primary` 등 semantic 토큰을 통해서만 사용. 컴포넌트에 폰트명 직접 명시 금지
- 아이콘 사이즈/색상은 `--icon-size-*` / `--icon-color-*` 토큰으로만 통제. raw px 금지
- 새 디자인 표현이 필요한데 토큰이 누락된 경우: 토큰을 spec.md §3에 추가한 뒤 사용. 임시 raw 값 우회 금지
- **토큰 명명 원칙**: Tier 2 / Tier 3 토큰명은 **속성(property) + 용처(usage)** 만으로 구성. 색명(grey/blue/yellow/pink 등) 또는 hex 의미를 토큰명에 직접 노출 금지. ✅ `--toggle-on-bg`, `--keyword-chip-bg`, `--reply-remove-fg` / ❌ `--toggle-on-bg-blue`, `--keyword-chip-grey-100`, `--pink-soft-bg`. 의미적 변형(soft/strong/hover/disabled/light/heavy)은 정도 표현이라 허용. Tier 1(primitive)만 raw 값을 보유하므로 색명 등장 허용. 이유: swap 시 색이 바뀌면 토큰명이 거짓말이 되어 hex 하드코딩과 동일한 결과
- 디자인시스템 swap 시 영향 범위는 Tier 1 값 + `icon-set.js` SVG mapping + 폰트 `<link>`로 한정되어야 한다. UI 코드 변경이 필요하면 토큰화 누락이라는 신호
- 자세한 토큰 체계와 swap 절차는 spec.md §3 참조

## 코드 품질
- **JavaScript/HTML**: ESLint 10 (flat config) + eslint-plugin-html — 설정: `eslint.config.js`
- Edit/Write 후 PostToolUse 훅으로 자동 실행 (`.claude/settings.json`):
  - `*.js`, `*.html` → `npx eslint --fix`
- 자동 수정 불가 오류는 sub-agent가 수정 후 code-reviewer로 넘김
- 브라우저 콘솔 에러 없는 상태 유지
- 컴포넌트 네이밍은 spec.md의 컴포넌트 구조도를 따름

## 개발 환경
- 로컬: MacBook Apple Silicon processor
- 브라우저에서 `index.html` 직접 열어 테스트 (로컬 서버 불필요)

---

## Behavioral Guidelines
LLM 코딩의 흔한 실수를 줄이기 위한 행동 지침. 위 프로젝트별 지침과 함께 적용.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

