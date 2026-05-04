# blackplum mockup — Tasks

> 최종 수정: 2026-05-04 (Phase 4 완료 — SidePanel 스레드 상세)

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

## Phase 3: Inbox 메인 (LSB + InboxList + 미리보기 카드) — 완료 (2026-05-04)

> 트리거: Phase 2 완료. shell·공통 UI 위에서 메인 메시지 큐 구현.
> 위임: frontend-dev (라운드 1: 3-1·3-2·3-3·3-5 / 라운드 2: 3-4) + code-reviewer (3-6).

- [x] 3-1. LeftSidebar (§5-3) — 9행(CI/BI + 7 카테고리 + 구분선 2 + 섹션나눔 1: ai_pick / 분류 4 / sent / dm_automation). 카테고리 클릭 → `selectedCategory` state 갱신 → InboxList 분기 + (모바일) drawer 자동 닫힘. 프로필 영역 하단 고정 (설정 버튼 미노출). 카테고리 아이콘 7종 + badge runtime computed (sent / dm_automation 항상 0)
- [x] 3-2. InboxList (§5-5) — 카테고리 헤더 + TagFilterBar(카테고리 내 태그 합집합 chip / ai_pick은 business+ops+social 합집합 / direct_check·sent·dm_automation 미노출) + SortToggle(우선순위순 기본 / 최신순) + 카드 리스트 + EmptyState. sent 카테고리는 `messages.filter(direction=outgoing)` 기반 단순 리스트(SentMessageCard). dm_automation은 Phase 5 placeholder
- [x] 3-3. PreviewCard 두 type — `Type1`(business 카테고리 + `business_extracted` 보유): 6필드 정형 슬롯(company/brand/contact_person/proposal_summary/product/conditions). `Type2`(그 외): sender + 미리보기 텍스트(2~3줄 truncate) + relative time + depth 2 tag chips(최대 3 + N more). 공통: 썸네일(post_thumb_url 또는 sender avatar) + 우상단 SNS 플랫폼 로고 + 계정 `accent_color` border(inline style 예외) + `is_stacked` 3건(mock-data.js 라인 337/352/427)에 `.preview-card--stacked` pseudo 효과
- [x] 3-4. 다중선택 / 일괄처리 (§6-2) — PC hover 체크박스 / 모바일 long-press 500ms → 선택 모드 진입. 선택 집합 `Set<thread_id>`. BulkActionBar(읽음처리 / 태그 추가)로 InboxList 헤더 morph. mock data 직접 mutate 금지 → MainScreen `processedOverrides: Set<id>` + `threadTagOverrides: Map<id, string[]>`로 React state override, `applyOverrides` helper가 thread에 두 override 합성. BulkTagModal은 TAG_CATALOG 4그룹(business/ops/social/manual) chip 그리드. Toast 결과 안내. 카테고리 전환 시 자동 종료, 마지막 선택 해제 시 자동 종료
- [x] 3-5. 우선순위 score 정렬 (§6-1) + Badge count (§6-7) — 정렬: priority_score desc 기본 / last_message_at desc 최신순. Badge: `threads.filter(!processed && categoryFilter(CATEGORIES[X], t)).length` 의사코드 그대로. sent / dm_automation 항상 0. LSB badge는 SNS 필터 무시(글로벌 SNS 필터는 InboxList 표시에만 적용). 한 thread 다중 카테고리 노출 시 모든 매칭 카테고리에서 badge 가산 (categoryFilter 자연 처리)
- [x] 3-6. code-reviewer 통합 검증 — 1차 critical 1건 + FAIL 6건 → follow-up fix 7건 모두 정리: (1) `threadsWithOverrides` useMemo가 `threadTagOverrides` 무시 → tags 병합 + deps 추가. (2) `-4px` raw → `--card-thumb-platform-offset` Tier 3 신설. (3) `32px` raw → `--bulk-bar-btn-height` Tier 3 신설. (4) Phase 3 토큰 spec.md §3-3/§3-4 일괄 등록(Tier 2 4 + Tier 3 30). (5) `.preview-card__inner` dead rule → modifier 기반 padding-left로 교체. (6/7) `selection-mode-on` non-BEM → `preview-card--selection-mode-on`. 최종: ESLint 0 errors / 1 pre-existing Popover warning(Phase 6 자연 해소 예정). index.html 463→1241줄(+778) / styles.css 1064→1860줄(+796)

### Phase 3 backlog (Phase 4+ 진입 시 처리)
- BulkActionBar 모바일 sticky top offset 검토 (Phase 4 SidePanel 통합 시 헤더 위치 재정리)
- PreviewCard 클릭 → SidePanel 진입 동작 활성 (Phase 4-1)
- dm_automation view 활성 (Phase 5)
- 모바일 long-press 시 브라우저 기본 context menu 억제(`preventDefault`)는 scroll 부작용 우려로 미적용 — mockup 허용 범위, 필요 시 Phase 6/7에서 재검토

---

## Phase 4: SidePanel — 스레드 상세 — 완료 (2026-05-04)

> 트리거: Phase 3 완료. 카드 클릭 → SidePanel 진입 동작 활성.
> 위임: frontend-dev (4-1~4-5 단일 라운드) + code-reviewer (4-6) + frontend-dev follow-up.

- [x] 4-1. SidePanel shell (§5-6, §7-3) — PC inline grid 슬롯 / Tablet+모바일(≤1023) 풀스크린 overlay(절대 위치 + backdrop dim). esc 닫기, X 버튼 닫기. `app-main--panel-open`/`--panel-closed` modifier로 PC grid 분기. `isNarrow` resize listener로 분기.
- [x] 4-2. ThreadHeader / MessageThread (§5-6) — `message_type` 3 분기: DMBubbleList(incoming 좌·outgoing 우 + avatar) / CommentImitateList(depth 1·2 들여쓰기 `--comment-indent-depth-2`) / EmailThreadList(flat sender+sent_at+body). `messages.length > 5`일 때 "더 이전 메시지 로드" 버튼(단방향 펼침). attachments는 AttachmentChips 컴포넌트(`<Icon name="image|link" />` + 파일명 truncate, `--attachment-chip-max-width` 160px). 시간 포맷은 기존 `relativeTime()` 재사용.
- [x] 4-3. OriginInfo (§5-6) — type=post: 썸네일(`--origin-thumb-size` = `--card-thumb-size` alias) + 캡션 + created_at / type=sender: avatar initial + display_name + account_id. AI 축약(`thread.ai_thread_context`)은 OriginInfo 하단 accordion 형태로 PC 3-pane에서만 노출(`@media (max-width: 1023px) { display: none }`). 빈 문자열일 때 미노출. (Origin 수동 tagging CTA는 backlog).
- [x] 4-4. ReplyArea + SavedReply + AIDraft (§5-7, §6-6) — `primaryCategory(thread)` 도출(business→ops→social→direct_check) → savedReplies.filter(category===primary). chip 클릭 시 textarea 채움. SavedReply.generated_by user/ai 구분 dot indicator(`--saved-reply-chip-dot-size` 6px, ai=`--color-accent-blue` user=`--color-text-tertiary`). AIDraftButton: `MOCK_DATA.ai_drafts[thread.id]`가 있을 때만 enabled, 없으면 `.ai-draft-button--disabled` modifier dim. Icon `sparkle`. ReplyEditor: controlled `useState('')`, Enter 발송 / Shift+Enter 줄바꿈, 빈 문자열 disabled, 발송 버튼 Icon `send`, message_type별 placeholder 분기.
- [x] 4-5. '처리' 상태 트리거 (§7-3) — 답장 발송: handleSendReply에서 outgoing message 생성 + processedOverrides 추가 + textarea 비우기 + Toast / 무시: handleIgnoreThread에서 processedOverrides 추가 + selectedThreadId=null + Toast / 보관: handleArchiveThread는 처리 trigger 없음(req.md §7-3 mockup) + Toast "준비 중인 기능" + 패널 유지 / 원문 링크: 미구현(req.md §7-3 action 아님). Outgoing message는 `sender_id = channel.connected_sns_accounts.find(acc=>acc.id===origin.user_sns_account_id).account_handle` (spec §4-5-1) + `processed_at = sent_at` (spec §4-5-2) + comment 분기 시 depth=2 + parent_message_id=마지막 incoming.id, dm/email은 depth=1 + parent_message_id=null. id는 `m_runtime_${Date.now()}_${rand}` 형식. MainScreen `outgoingMessageOverrides: Map<threadId, Message[]>` state로 mock data 직접 mutate 차단. `getThreadMessages(thread, overrides)` helper가 base + override 합쳐 시간순 정렬.
- [x] 4-6. code-reviewer 통합 검증 — 1차 CRITICAL 1건 + FAIL 8건 + WARN 3건 → frontend-dev follow-up fix 11건 정리: (1) `.origin-info__ai-summary` Tier 1 `--border-w-soft` 직접 참조 → `--ai-summary-border` Tier 3 composite로 교체. (2) origin-info thumb 56px raw → `--origin-thumb-size` Tier 3 신설(=`--card-thumb-size` alias). (3) saved-reply-chip dot 6px raw → `--saved-reply-chip-dot-size` Tier 3 신설. (4) opacity 4건(0.85/0.7/0.35) raw → Tier 2 신설 3개(`--opacity-hover` 0.85, `--opacity-disabled-soft` 0.7, `--opacity-disabled-strong` 0.35) + 4건 교체. (5) attachment-chip max-width 160px raw → `--attachment-chip-max-width` Tier 3 신설. (6) spec.md §3-4 Phase 4 Tier 3 토큰 22개 일괄 등록. (7) spec.md §10 Phase 4 entry 추가. (8) `--ai-summary-bg/border` dead token vs CSS rule 불일치 → 토큰 정의를 실 의도(brand-soft / surface-border-soft composite)에 맞게 수정 + CSS rule이 토큰 참조하도록 교체. (W-1) `side-panel-slide-in` animation의 `--transition-normal` composite shorthand → `--motion-duration-normal var(--motion-easing-standard)` 분리 토큰으로 교체(Phase 2 결정사항 일관성). (W-3) message-bubble tail radius `--gap-inline-xs`(gap 의미) → `--message-bubble-tail-radius` Tier 3 신설(=`--radius-sm`). (Fix 9) JSX `objectFit:'cover'` inline → `.origin-info__thumb-image` BEM 클래스 분리. 최종 ESLint 0 errors / 0 warnings(mock-data.js의 사전 directive warning 1건 무관). styles.css 2169→2971(+802) / index.html 1431→2051(+620) / icon-set.js 249→261(+12 / `send` + `sparkle`) / spec.md §3-3 Tier 2 +3 / §3-4 Tier 3 +26 / §10 Phase 4 entry +1.

### Phase 4 backlog (Phase 5+ 진입 시 처리)
- Origin 수동 tagging CTA (req.md §5-4 / spec.md §6-4) — OriginInfo 영역 "이 Origin에 태그 규칙 추가" 버튼 미구현. preset 태그 chip selector + origin.tagging_rules push 동작. mock data 구조에 `tagging_rules` 추가 필요할 수 있음
- SidePanel 내 `business_extracted` 정형 슬롯 노출(현재 PreviewCard.Type1에만 노출). spec 명시 없으나 시연 보강 후보
- 답장 textarea auto-resize(현재 max-height 제한 + 스크롤). 모바일 UX 보강 후보
- 스레드 원문 링크 버튼(req.md §8-3) — 미구현. 외부 링크 placeholder Toast로 처리 가능
- styles.css `:1976` `.preview-card__thumb-platform`의 `--border-w-soft` 직접 참조(Phase 3 잔존 / Phase 4 범위 외) — Tier 1 직접 참조 정리 후보
- BulkActionBar 모바일 sticky top offset 검토(Phase 3 backlog 이월) — Phase 4에서도 SidePanel overlay 모드에서는 BulkActionBar 자연 분리, PC inline 모드에서는 본 라운드 미점검
- AI 초안 미정의 thread(약 57건) — 시연 시 AI 초안 버튼이 모두 disabled. mock-data-writer가 ai_drafts 확장 검토 가능
- TopToolbar PC grid는 `var(--layout-lsb-width) 1fr auto`로 InboxList+SidePanel 영역에 걸쳐 펼쳐짐. SidePanel 열림 시 `var(--layout-lsb-width) var(--layout-inboxlist-width) auto` 3-col로 맞추면 filter bar가 InboxList 폭에 정확히 정렬됨 (Phase 5+ 진입 시 검토)
- `--origin-thumb-size` Tier 3 토큰(spec.md §3-4)은 ThreadHeader 통합(라운드 3) 후 사용처 사라짐 — `.thread-header__post-thumb`이 `--avatar-size-md` 재사용. dead token cleanup 후보
- ThreadHeader post 타입 캡션은 `.thread-header__sender` text-overflow: ellipsis로 1줄 truncate. 2줄 이상 clamp 원하면 추가 CSS 필요(backlog)

### Phase 4 후속 사용자 브라우저 점검 라운드 1 (2026-05-04)
- [x] SidePanel width 고정 → 잔여 width 자동 차지로 변경. Tier 1 `--width-inboxlist-pc: 520px` + Tier 2 `--layout-inboxlist-width` 신설. PC `.app-main` 기본 2-col(LSB+1fr) / `.app-main--panel-open` 3-col(LSB+520px+1fr). Tablet overlay-body는 width 고정 → `left: var(--layout-inboxlist-width); right: 0`로 inbox 영역 비우고 우측 잔여 전부.
- [x] DM outgoing bubble 좌측 정렬 버그 → 우측 정렬. `flex-direction: row-reverse`(단일 자식 모호함) 제거 → `.message-bubble-row--outgoing { justify-content: flex-end }` 명시. JSX wrapper에 `.message-bubble-stack` 클래스 부여.
- [x] 짧은 outgoing 메시지 강제 줄바꿈("가능합니다" 2줄) → 1줄. `max-width: 72%` 책임을 `.message-bubble`에서 `.message-bubble-stack`으로 이전(`max-width + width: fit-content + min-width: 0`). `.message-bubble`의 `word-break: break-word` → `overflow-wrap: anywhere; word-break: normal`(URL/긴 단어만 분리, 한국어 자연 wrap).
- 검증: PC panel open/close grid 분기 / Tablet overlay 정렬 / DM outgoing 우측 / 짧은 메시지 1줄 / 긴 메시지 max-width 72% wrap. ESLint 0 errors / 0 warnings.

### Phase 4 후속 사용자 브라우저 점검 라운드 4 (2026-05-04)
- 사용자 사전 변경: ThreadHeader 답장 버튼 주석처리 + 남은 2개 버튼(대응하지 않기 / 저장하기) aria-label/title 갱신.
- [x] **'대응하지 않기' 버튼 아이콘**: X → 귀여운 유령(`ghost`). icon-set.js에 Lucide `ghost` path 추가(stroke 기반). ThreadHeader 해당 버튼만 `name="x" → name="ghost"` 교체. 다른 X 사용처(닫기 등)는 그대로.
- [x] **Mobile 햄버거 ↔ 뒤로가기 morph**. SidePanel overlay 레이어링 옵션 B 채택 — `.side-panel--overlay { inset: var(--top-toolbar-height) 0 0 0 }`로 TopToolbar 아래에서 시작(z-index 조작 불필요). 신규 Tier 3 토큰 `--top-toolbar-height: 56px`(touch-target-min 44 + padding 6×2) + `.top-toolbar`에 height 토큰 적용. SidePanel 내부 backup 헤더(`.side-panel-header*` 4 rule) JSX/CSS 전체 제거. TopToolbar에 `showBackButton`/`onCloseSidePanel` prop 추가 → MainScreen에서 `panelOpen && isNarrow` 전달. 햄버거 버튼이 두 아이콘(menu / chevron-left) 동시 렌더 + `.top-toolbar__hamburger--back-mode` 클래스 토글로 90deg rotation + opacity cross-fade 애니메이션. aria-label dynamic("메뉴 열기" / "뒤로가기"). 클릭 핸들러도 동일 분기. dead token cleanup: `--side-panel-header-height`. 검증: Mobile에서 SidePanel 열림 시 햄버거 morph 정상 / TopToolbar 항상 노출 / PC·Tablet 무영향. ESLint 0 errors / 1 warning(`textareaRef` unused — 답장 버튼 주석처리에서 기인. 사용자가 복원할 수 있도록 prop 자체는 유지).

### Phase 4 후속 사용자 브라우저 점검 라운드 3 (2026-05-04)
- [x] **ThreadHeader + OriginInfo 통합**. OriginInfo 컴포넌트 폐기. ThreadHeader가 sender handle sub-line(`.thread-header__sender-handle`) + post 타입 thumb/relative-time(`.thread-header__post-thumb`) + AI 요약 카드(`.thread-header__ai-summary`) 흡수. 중복 avatar/display_name 제거 → 단일 시맨틱 섹션. SidePanel JSX `<OriginInfo>` 삭제, CSS `.origin-info*` 110줄 삭제.
- [x] **선택된 PreviewCard 테두리 검정 유지**. `.preview-card--active`에서 `border-color` 줄 제거(default 검정 상속). `--card-active-border-color` 토큰 정의도 함께 삭제(orphan). 선택 시 배경색만 변경.
- [x] **전역 스크롤바 자동 숨김**. `* { scrollbar-width: thin; scrollbar-color: transparent transparent }` + `*::-webkit-scrollbar { width:6px; height:6px }` + thumb transparent. 스크롤 중 `.is-scrolling` 클래스 토글로 thumb 색 노출. App `useEffect` capture-phase scroll 리스너, 700ms debounce. 폭 고정(thin, 6px) 방식으로 reflow 차단. Tier 3 토큰 신설: `--scrollbar-thumb-size: 6px`, `--scrollbar-thumb-color: var(--color-text-muted)`. 기존 per-element scrollbar hide 4곳 제거(global rule로 통합).
- 검증: sender/post 타입 ThreadHeader 단일 섹션 / PreviewCard 선택 시 검정 border 유지 / 모든 스크롤 영역 평상시 invisible + 스크롤 중 thumb 노출. ESLint 0 errors / 0 warnings.

### Phase 4 후속 사용자 브라우저 점검 라운드 2 (2026-05-04)
- [x] **Tablet에서 InboxList dim 처리 → inline 2-col grid 전환**. `isNarrow` 기준 `1024 → 768`로 변경(mobile-only overlay). Tier 1 `--width-inboxlist-tablet: 360px` + Tier 2 `--layout-inboxlist-width-tablet` 신설. tablet용 `@media (max-width:1023px) and (min-width:768px)` 블록 신설: LSB 숨김 + 패널 열림 시 grid `360px 1fr`(InboxList + SidePanel). overlay backdrop 제거. mobile(≤767)만 기존 overlay 유지.
- [x] **AI 요약 카드 모든 모드 노출 + 색상 + 높이**. `@media (max-width:1023px) display:none` 삭제 → tablet/mobile에서도 노출. 색상 노란(`--color-yellow-soft` 경유) → 퍼플 soft. Tier 1 `--color-purple-soft: #D4C8F8` 신설(기존 yellow-soft/pink-soft 패턴 답습) + Tier 2 `--color-accent-purple-soft` 신설 + Tier 3 `--ai-summary-bg`를 새 토큰에 매핑. padding `gap-inline-md → gap-inline-sm`, line-height `relaxed → normal`로 카드 footprint 축소 → 본문 영역 확보.
- [x] **메일 본문 잘림 + 스크롤 부재 + 토글 비대칭**. 핵심 fix: `.message-thread > * { flex-shrink: 0 }` 1줄 — 자식(`.email-message`/`.message-bubble-row`/`.comment-item`/load-more)이 flex column에서 균등 shrink되어 contents가 squeeze되던 동작 차단. 이로써 message-thread `overflow-y: auto` 자체 스크롤 정상 동작. 더 보기 버튼: `expanded` true에도 노출 + 라벨 토글(`이전 메시지/댓글/메일 N개 더 보기` ↔ `최근 5개만 보기`). 3개 컴포넌트(DMBubbleList / CommentImitateList / EmailThreadList) 동일 패턴 적용.
- 검증: 코드 레벨 — Tablet 800~1000px inline 2-col / Mobile ≤767 overlay / PC ≥1024 3-col / AI 요약 모든 모드 보임 / `.message-thread > *` shrink 차단으로 expanded 시 자연 height + 스크롤. ESLint 0 errors / 0 warnings.

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
- **아이콘 일괄 점검 (Phase 7-1 직전 권장)**: 제품 전체에 사용되는 아이콘(brand 로고 / 카테고리 / 액션 / 매크로 / SNS 로고 등 53개+α)을 한 번에 시각·정합성 검증. LandingScreen의 kakao/apple brand 아이콘 미등록(Phase 2 backlog)도 본 점검에 합류
- **InboxList 정렬 기준 확장**: 현재는 우선순위순 / 최신순 2종. SortToggle을 드롭다운 sort 아이콘 형태로 전환한 시점(2026-05-04)부터 정렬 기준은 향후 추가 예정. 후보: 미처리 우선 / 답장 대기 / sender 알파벳순 / unread 우선 등. 추가 시 §6-1 우선순위 score 모델 정합성 함께 점검
