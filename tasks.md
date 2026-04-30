# blackplum mockup — Tasks

> 최종 수정: 2026-04-30

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

## Backlog (별도 세션에서 진행)

### IG DM 자동화 매크로 빌더 wizard 흐름 정리
- 레퍼런스: `docs/macro_wizard_reference.png` (인포크링크 기준 IG flow ~7 scene)
- 기존 별도 프로토타입 명세 `docs/req_macro_builder.md`는 이번 mockup에서 재활용하지 않음 (참고용 문서로만 보존)
- 진행 단계
  1. 별도 세션에서 reference 이미지 기반으로 wizard 단계별 화면/필드/CTA 정리
  2. `req.md` §6-2 (인스타그램 DM 자동화)에 wizard 흐름 본문 추가
  3. 정리된 wizard 사양을 `spec.md`에 반영 (컴포넌트 구조 / 상태 모델 / 데이터 인터페이스)
- 트리거 시점: 본 mockup의 메인 환경 세팅(Phase 0) 완료 후
