# blackplum mockup — Tasks

> 최종 수정: 2026-05-04 (Phase 2 완료)

---

## Phase 0: 프로젝트 환경 세팅 (진행 중)

`/project-setup` 스킬 워크플로우 8단계.

- [x] Step 1: 요구사항 파악 (req.md 검토)
- [x] Step 1 마무리: Andrej-Karpathy 문서 삭제, 기존 spec.md/tasks.md를 `.bak`으로 백업
- [x] Step 2: CLAUDE.md 검토 및 blackplum mockup 컨텍스트로 수정 (제목·프로젝트 컨텍스트만 우선 반영, 기술 스택/코딩 규칙/작업 위임 원칙은 Step 3·7 이후 재동기화)
- [x] Step 2 후속: spec.md §3 작성 후 CLAUDE.md 기술 스택·코딩 규칙 동기화 (디자인 토큰화·하드코딩 금지·swappable 강조 절대 원칙 추가)
- [x] Step 3: 기술 스택 선정 및 의사결정 (React 18 CDN + Pure CSS 3-tier 토큰 + Lucide 발췌 + ESLint flat config + GitHub Pages — 빌드/번들러/라우터/TS 미도입)
- [x] Step 4: spec.md 신규 작성 (1차 — 데이터 schema 디테일은 Step 6에서 보강, 매크로 빌더는 backlog)
- [x] Step 5: dependencies.txt / .gitignore / settings.json 업데이트 (dependencies.txt 재작성, .gitignore에 `*.bak` 추가, settings.json 훅 경로 inboxx_mockup → blackplum_mockup 수정. eslint.config.js / package.json 생성은 Step 8 의존성 설치 시점에 처리)
- [x] Step 6: 데이터 구조 및 스키마 설계 (Channel+ConnectedSnsAccount / Origin 통합 / Thread / Message / SavedReply / MacroRule placeholder / TAG_CATALOG / CATEGORIES / PLATFORM_LOGOS 확정. 미처리/처리 분리, badge count runtime 계산식, outgoing 자동 기록 동작 명세 포함. 실제 mock 데이터 생성은 본 구현 Phase 1에서 위임)
- [x] Step 7: sub-agent 구성 점검 (3-agent 구성 유지 + frontend-dev 담당 파일 확장(index.html / styles.css / icon-set.js). 세 agent 모두 spec.md §3·§4 기준으로 전면 재작성. CLAUDE.md 작업 위임 원칙 동기화)
- [x] Step 8: 의존성 설치 (package.json + eslint.config.js 작성, eslint@10 / @eslint/js / eslint-plugin-html / globals 설치, 동작 확인 완료. JSX 정밀 lint는 미도입(b안), npm scripts: lint / lint:fix)

---

## Phase D-1: 외부 디자인시스템 1차 swap (Streamtime theme) — 완료

> 트리거: `design.md` (Streamtime theme) + `design_ref/` 자산 추가됨. Phase 0 완료 직후 본격 UI 구현 전 1차 적용.

- [x] 1. 디자인시스템 자산 분석 — `design.md` Streamtime theme + `design_ref/colors_and_type.css` (color/type/spacing/radii/shadow/components 추출)
- [x] 2. spec.md §3-2 Tier 1 primitive 토큰 swap — cream paper + ink + halftone shape primaries + warm grey + 4px-base spacing + 32/pill radii + hard-edge offset shadows + 2px·1.5px border widths + Hanken Grotesk/Inter/mono
- [x] 3. spec.md §3-3 Tier 2 semantic 매핑 신규 — bg/text/brand/accent/border/status/platform 분리, display-xl/lg/md 추가, weight-heavy/black 추가, 한글 fallback 정책 §3-7-1 신설
- [x] 4. spec.md §3-5 typography 매핑 테이블 갱신 — Display XL/LG/MD/Button 행 추가
- [x] 5. spec.md §10 swap 시점·출처 working log 기록
- [x] 6. dependencies.txt 폰트 갱신 (Pretendard 단독 → Hanken Grotesk + Inter + Pretendard 한글 fallback)
- [x] 7. styles.css 신규 생성 — frontend-dev. 418줄 / Tier 1: 70 토큰 + Tier 2: 71 토큰 + base reset + icon 유틸(`.icon`/`.icon--sm/md/lg`/`.icon--tone-*`) + 12개 typography helper(`.t-display-xl/lg/md`, `.t-h1~h4`, `.t-body`, `.t-body-lg`, `.t-caption`, `.t-overline`, `.t-button`). display 헬퍼는 `text-wrap: balance` 포함. 컴포넌트 CSS는 Phase 1 작업 (의도적 미작성)
- [x] 8. styles.css code-reviewer 검증 — 토큰 contract / Tier discipline / scope / imports 모두 PASS. 크리티컬 이슈 0
- [-] icon-set.js: 본격 UI 구현(Phase 1) 단계에 Lucide 발췌로 생성. 본 swap 범위 외 (skip)
- [-] CLAUDE.md: 폰트명을 직접 명시하지 않으므로 동기화 불필요 (확인 완료)

---

## Phase D-2: 매크로 빌더 사양 정리 — 완료

> 트리거: Phase 0 완료. 사양 정리 단계는 본 phase에서 종결, 실제 구현은 후속 Phase 1로 이관.

- 요구사항: `docs/macro-prd.md`
- 요구사항 불명확 시 참조: `docs/macro-benchmark-research.md` (경쟁사 DM 자동화 기능 UI 분석서)
- 기존 별도 프로토타입 명세 `docs/req_macro_builder.md`는 이번 mockup에서 재활용하지 않음 (참고용 문서로만 보존)
- 사용자 결정사항 (2026-05-03):
  - 구현 범위: macro-prd.md §10의 P0+P1+P2 일부 (이벤트 추첨 P3 제외, 링크 블록 불러오기는 disabled placeholder)
  - 진입 모델: spec.md §5-9 그대로 (LSB DM자동화 → InboxList 룰 리스트 → SidePanel wizard). macro-prd §2의 홈 카드/매니저 별도 페이지 미채택
  - 데이터 모델: macro-prd.md §5의 `Automation` 스키마로 spec.md §4-8 전면 교체
- 진행 단계
  - [x] 1. wizard 단계별 화면/필드/CTA 정리 (5 step: 트리거 / 답글 / 팔로우 분기 / 메시지·버튼 / 최종 확인)
  - [x] 2. `req.md` §6-2 보강 (7개 하위 섹션: intro / 진입 / 시나리오 / 룰 구성 요소 / 템플릿 / 카드 표기 / 검증 / 미구현)
  - [x] 3. `spec.md` 반영 — §4-8 Automation 스키마 + 검증 함수 + AUTOMATION_TEMPLATES + BLANK_AUTOMATION_DRAFT, §4-10 모듈 키 갱신, §4-11 분포 갱신 + 7개 룰 시연 포인트 표, §5-9 컴포넌트 트리·step 매핑·상태 모델·검증·인터랙션·step 사양 표, §3 토큰 25개 추가, §10 working log

---

## Phase 1: Foundation — 아이콘 / mock 데이터 / 컴포넌트 CSS 진입 — 완료 (2026-05-04)

> 트리거: Phase D-1, D-2 완료. 후속 모든 컴포넌트 구현의 기초.
> 위임: frontend-dev (icon-set.js / styles.css), mock-data-writer (mock-data.js).

- [x] 1-1. icon-set.js 작성 (frontend-dev) — 53개 아이콘 등록 (카테고리 7 / 액션 22 / 매크로 빌더 8 / 플랫폼 로고 6 / 기타 UI 10). Lucide 발췌, viewBox 24×24, `<Icon />` 추상화 / PLATFORM_LOGOS 6종 매핑 정합. follow-up: `filter` polygon에 `fill="currentColor"` 추가
- [x] 1-2. mock-data.js 핵심 데이터 작성 (mock-data-writer) — 1664줄 / 74 threads / 200 messages / 56 origins / 13 savedReplies / 7 connected SNS accounts (IG main+sub / YT / Gmail / TikTok / Naver / Other mail). 카테고리 분포: business 20 (16/4) / ops 25 (20/5) / social 20 (16/4) / direct_check 9 (7/2). 플랫폼 분포: instagram(39) > youtube(14) > gmail(9) > tiktok(5) > naver_mail(4) > other_mail(3) — spec §4-11 권장 순서 일치. Long thread t1, t2 각 20msg, A→B→C→B→D 주제 전환. business_extracted 20 thread 전부 채움. ai_context_solo / ai_context_cumulative / ai_thread_context 풀 채움. automations[] / AUTOMATION_TEMPLATES[] 빈 배열 (Phase 5 예약). follow-up fix 다수: outgoing sender_id 6건 / 플랫폼 분포 swap 5건 (Gmail→YT 4 + naver→tiktok 1) / t6 message_ids 시간순 / t44 platform / m108·m185 sender_id YT 핸들 / o39 display_name / o6·o49 origin platform
- [x] 1-3. styles.css 컴포넌트 CSS 진입 (frontend-dev) — 418줄 → 591줄. spec.md §3-2/§3-3 신설 layout 토큰 4개 동기화 (Tier 1: `--width-lsb-pc`/`--width-sidepanel-pc`/`--width-container-max`, Tier 2: `--layout-lsb-width`/`--layout-sidepanel-width`/`--layout-container-max`/`--touch-target-min`). layout 클래스: `.app-shell` / `.app-main` BEM 트리 (`__lsb`/`__inbox-list`/`__side-panel`/`--panel-closed`) / `.safe-area-top`/`.safe-area-bottom` / `.container` / `.stack-y-sm/md/lg` / `.stack-x-sm/md/lg` / `.tappable`. PC(1024+) grid / Tablet(768~1023) / Mobile(~767) 분기. reset 보강(button/input/textarea/a/ul/ol/img/`*::selection`). follow-up: `env(safe-area-inset-*)`에 `0px` fallback 추가
- [x] 1-4. code-reviewer 통합 검증 — 1차 FAIL 결과로 8개 발견사항 도출 → mock-data 9건 + icon/styles 2건 mechanical fix로 정리. 최종 자동 정합성 검증 12개 항목 모두 ✓ (outgoing rule / thread.tags / thread-origin platform / origin-account platform / message_ids order / processed invariant / ai_context / business_extracted / TAG_CATALOG 멤버십 / enum 등). 미동기화로 분리된 항목: spec §3-2/§3-3 매크로 빌더 토큰 11개 styles.css 동기화는 Phase 5-1로 분리 (의도된 격리)

---

## Phase 2: Shell & 공통 UI — 완료 (2026-05-04)

> 트리거: Phase 1 완료. icon-set.js·mock-data.js·styles.css 베이스 확보 후.
> 위임: frontend-dev (전적). main 스레드는 orchestration·검증.

- [x] 2-1. App / 화면 라우팅 — `<App>` 최상위 `currentScreen: 'landing' | 'main'` state (초기 'landing'). `<LandingScreen>` blackplum wordmark + 4개 SNS 버튼(Google / Naver / Kakao / Apple) → 클릭 시 main 즉시 전환. `<MainScreen>` TopToolbar + 3분할 셸(LSB / InboxList / SidePanel). PC 그리드 / 모바일 섹션 전환형. LSB·InboxList·SidePanel 본체는 Phase 3·4 placeholder 유지
- [x] 2-2. TopToolbar — 좌측 SNS 필터 7 chip(Set 토글, mouse hover 확장 → display_name `::after`, `accent_color` inline border). 우측 (+) 버튼 → 모달 시연("준비 중인 기능이에요") / 검색 돋보기 → Toast stub("Phase 6")
- [x] 2-3. 공통 UI — `<Icon>` (spec §3-6-3 그대로) / `<Toast>` ToastProvider + useToast(), 2초 auto fade / `<Modal>` focus trap·esc·backdrop·portal / `<Popover>` anchorRef + position prop(현재 미사용, Phase 3+ 진입) / `<EmptyState>` icon+title+desc+action
- [x] 2-4. 반응형 base — `@media (max-width: 767px)` 모바일 LSB 드로어 슬라이드인 + scrim backdrop + esc/backdrop click 닫힘. `--touch-target-min` 44px 적용. SidePanel 풀스크린 분기는 Phase 4 활성
- [x] 2-5. code-reviewer 통합 검증 — 1차 6 FAIL + 2 WARN → mechanical follow-up 4건 fix: Tier 2 토큰 9개 / Tier 3 토큰 14개 spec.md §3-3·§3-4 등록, Tier 1 직접 참조 2건 → Tier 2 교체, modal `max-height` raw vh 토큰화. styles.css 591 → 1056줄. WARN 2건은 backlog로 이관(LandingScreen kakao/apple 아이콘 미등록, Popover unused warning은 Phase 3 자연 해소)

### Phase 2 backlog (Phase 3+ 진입 시 처리)
- LandingScreen kakao / apple brand 아이콘: `icon-set.js`에 SVG path 등록 후 `<Icon name="brand-kakao" />` / `<Icon name="brand-apple" />`로 연결 (현재 둘 다 `null`로 텍스트만 노출)
- `<Popover>` 미사용 ESLint warning: Phase 3 (LSB 카테고리 메뉴 / SortToggle dropdown 등) 또는 Phase 6 검색 진입에서 자연 해소 예정

---

## Phase 3: Inbox 메인 (LSB + InboxList + 미리보기 카드)

> 트리거: Phase 2 완료. shell·공통 UI 위에서 메인 메시지 큐 구현.
> 위임: frontend-dev.

### 3-1. LeftSidebar (LSB) (§5-3)
- CI/BI / 카테고리 탭 (TAG_CATALOG 기반) / DM 자동화 항목 / 프로필
- 카테고리 클릭 시 `view` 분기: 일반 카테고리 → InboxList 스레드, `dm_automation` → AutomationListView (Phase 5에서 본격 동작)
- 모바일 햄버거 진입

### 3-2. InboxList (§5-5)
- SNSFilterBar (글로벌 SNS 필터를 카테고리 단위로 적용)
- 카테고리 헤더 (§7-3 안내 메시지 후보)
- SortToggle (우선순위 / 받은시각 / ...)
- 무한 스크롤 stub

### 3-3. PreviewCard 두 type
- `<PreviewCard.Type1>` 비즈니스 카드 (정형 추출 레이아웃)
- `<PreviewCard.Type2>` 기본 카드 (req.md §7-2 형태)
- 썸네일·SNS 로고·계정 색 border·메시지 type / Body 영역 (sender·미리보기·받은시각·tag chips)

### 3-4. 다중선택 / 일괄처리 (§6-2)
- PC: hover 체크박스 / 모바일: 길게 누르기로 진입
- 선택 집합 state (`Set<thread_id>`)
- 일괄 액션: 읽음처리(=무시) / 분류·태그 일괄 처리

### 3-5. 우선순위 score 정렬 (§6-1) + Badge count (§6-7)
- 모든 카테고리: `미처리 thread 수` 동일 계산식
- 처리됨 / 보낸메시지함 / DM 자동화는 badge 항상 0
- DM 자동화 badge는 Phase 5 view와 무관하게 0 유지

### 3-6. code-reviewer 검증
- spec.md §6-1 / §6-7 계산식 일치
- 미처리/처리 분리 동작 (§4-5 processed_at / read_at)
- 모바일 hit area / 7-1 breakpoint 동작

---

## Phase 4: SidePanel — 스레드 상세

> 트리거: Phase 3 완료. 카드 클릭 → SidePanel 진입 동작 활성.
> 위임: frontend-dev.

### 4-1. SidePanel shell (§5-6, §7-3)
- PC: inline 우측 패널 / 모바일: 풀스크린 진입
- 닫기 버튼 / dirty 상태 confirm (Phase 5 wizard와 공유 패턴)

### 4-2. ThreadHeader / MessageThread (§5-6)
- 메시지 유형별 3 레이아웃: IG·틱톡 DM bubble / 게시글 댓글 imitate (대댓글 depth 2) / 메일 (TBD)
- AI 축약 표기는 3단 레이아웃에서만 (req.md §5-3-2)

### 4-3. OriginInfo (§5-6)
- 게시글 썸네일 / sender 메타 / AI 축약 (스레드 맥락)

### 4-4. ReplyArea + SavedReply + AIDraft (§5-7, §6-6)
- SavedReply chips (카테고리 한정 노출)
- AI 초안 생성 → 편집 → 발송 / 폐기

### 4-5. '처리' 상태 트리거 (§7-3)
- 답장 / 읽음처리 → `processed_at` 기록
- 저장함 보내기·원문 링크 클릭은 미처리 (req.md §7-3)
- outgoing message 자동 기록 (sender_id / processed_at)

### 4-6. code-reviewer 검증
- 메시지 유형별 레이아웃 분기 / AI 축약 노출 위치
- '처리' 상태 trigger 동작 / outgoing 자동 기록

---

## Phase 5: 매크로 빌더 — DM 자동화 (Phase D-2 사양 구현)

> 트리거: Phase 4 완료 (SidePanel·Toast·Icon·LSB DM자동화 진입점 모두 확보).
> 사양 출처: spec.md §4-8 / §4-11-1 / §5-9 / §3-2~§3-4 신설 토큰 (Phase D-2에서 작성 완료)
> 위임: frontend-dev (5-1, 5-3, 5-4, 5-5) + mock-data-writer (5-2). 5-1은 5-3·5-4의 선행. 5-2는 5-3·5-4와 병렬 가능.

### 5-1. styles.css 토큰 적용 (frontend-dev)
- spec.md §3-2/§3-3/§3-4에 신설된 토큰 28개 (Tier 1: 2 + Tier 2: 11 + Tier 3: 15)
- 컴포넌트 BEM 클래스는 5-3·5-4와 함께 작성
- code-reviewer로 토큰 reference / Tier discipline 점검

### 5-2. AUTOMATION_TEMPLATES + automations[] mock 데이터 (mock-data-writer)
- spec.md §4-11-1의 7개 룰 시연 포인트 표 그대로 작성
- `AUTOMATION_TEMPLATES` 3종 (COMMENT_EVENT / PRODUCT_INFO / PURCHASE_AUTH) prefill 데이터
- 자동 답글 톤별 mock preset (POLITE / FRIENDLY 후보 문구)
- 게시물 ref: `origins[]` 중 platform=instagram AND type=post의 media_id 차용 (별도 게시물 mock 신설 X)
- BLANK_AUTOMATION_DRAFT 기본값 (spec.md §4-8-5)

### 5-3. AutomationListView + AutomationCard (frontend-dev)
- spec.md §5-9-1 컴포넌트 트리 상위 절반
- 템플릿 캐러셀 / 카운트 + `+ 자동화 추가하기` / 정렬 토글 / 카드 리스트
- AutomationCard 슬롯 8종 (req.md §6-2-5)
- 카드 인터랙션 (§5-9-6): 본문 클릭 → wizard step 5 / 토글 / `...` 메뉴 (편집·복제·삭제)

### 5-4. MacroBuilderWizard (frontend-dev)
- spec.md §5-9-1 컴포넌트 트리 하위 절반
- WizardState `useReducer` (§5-9-4) 9개 action
- step 1~5 (§5-9-9): 트리거 / 답글 / 팔로우 분기 / 메시지·버튼 / 최종 확인
- step별 검증 (§5-9-5) + isAutomationValid (§4-8-2)
- DIFFERENT_MESSAGES → FollowerVariantTabs (한 step 안 분기)
- ButtonEditSheet (PC inline / 모바일 bottom sheet)
- LinkBlockImportButton disabled + Toast "준비 중인 기능이에요"
- PC/모바일 step indicator 분기 (dot navigation / progress bar)

### 5-5. LSB DM자동화 진입 통합 (frontend-dev)
- LSB "DM 자동화" 클릭 → InboxList view 전환 (Phase 3에서 이미 stub 작성된 분기 활성화)
- AutomationListView → 카드 클릭 → SidePanel에 wizard
- `+ 자동화 추가하기` / 템플릿 카드 → 신규 wizard 진입

### 5-6. code-reviewer 통합 검증
- 토큰 contract / 검증 함수 정합성: req.md §6-2-6 ↔ spec.md §4-8-2 ↔ 실제 `isAutomationValid` 일치
- 7개 mock 룰 전체가 wizard step 1~5를 정상 통과
- LSB → 리스트 → wizard 진입 흐름 / DIFFERENT_MESSAGES variant 입력
- 모바일 768px 미만 SidePanel 풀스크린 / 콘솔 에러 0건

---

## Phase 6: 검색

> 트리거: Phase 5 완료 (또는 Phase 4 완료 후 병렬 가능 — TopToolbar 돋보기 동작이 Phase 2에 stub만 있음).
> 위임: frontend-dev.

### 6-1. SearchPanel (§5, req.md §10)
- TopToolbar 돋보기 진입
- PC: overlay 패널 / 모바일: 풀스크린

### 6-2. 검색 로직 (§6-3)
- mock 데이터 내 substring 매치 + 태그 필터
- 검색어 입력 시 dropdown으로 태그 chip 노출 → 토글

### 6-3. code-reviewer 검증

---

## Phase 7: 최종 통합 + 배포

> 트리거: Phase 1~6 완료.

### 7-1. cross-screen 시연 시나리오 통과
- 카테고리 ↔ DM자동화 ↔ 검색 ↔ 매크로 빌더 전환
- 미처리 → 처리됨 / 토글 ↔ 카운트 일관성

### 7-2. 콘솔 에러 0건 확인 (§8-3)

### 7-3. GitHub Pages 배포 (§9)
- repo settings 또는 `gh-pages` 브랜치
- 절대경로 / 상대경로 점검 (CDN URL은 그대로)

### 7-4. code-reviewer 최종 검증

---

## 외부 swap / 사양 추가 트리거 (Backlog)

> 본 mockup의 특성상 외부 디자인시스템 swap 또는 추가 사양은 작업 도중 비동기로 들어옴. 트리거 발생 시 별도 phase로 등재.

- 디자인시스템 N차 swap (Phase D-N): `design.md` / `design_ref/` 자산 갱신 시
- req.md / macro-prd.md 업데이트로 인한 사양 보강: 변경 시점에 영향 phase로 분기 등재
- 매크로 빌더 P3 (이벤트 추첨 탭, A/B 테스트, 고급 분석): 본 mockup 범위 외 (macro-prd.md §10)
