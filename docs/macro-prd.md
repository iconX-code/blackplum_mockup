# Instagram DM 자동화 매크로 — PRD

## 1. 기능 개요

크리에이터가 Instagram 게시물의 댓글을 트리거로 DM을 자동 발송하는 매크로 기능. 댓글 키워드 매칭, 팔로우 여부 분기, 자동 답글, 사전 정의 템플릿을 지원한다.

**플랫폼**: 모바일 앱 (iOS 우선, Android 동일 사양)
**대상 사용자**: 인플루언서, 셀러, 1인 크리에이터

---

## 2. 진입점

| 경로 | 위치 |
|---|---|
| A. 홈 → 크리에이터 도구 카드 → "DM 자동화하기" | 홈 화면 |
| B. 하단 탭 "매니저" → "DM 자동화" 탭 | 매니저 화면 |

두 경로 모두 매니저 화면(DM 자동화 hub)으로 진입.

---

## 3. 전체 플로우

```
[매니저 hub]
   ├─ 템플릿 선택 → 사전 채워진 상태로 설정 진입
   └─ "+ 자동화 추가하기" → 빈 상태로 설정 진입
        │
        ▼
[게시물 대상 모드 선택]
   ├─ 직접 선택 → 게시물 그리드 → 게시물 선택
   └─ 향후 게시물 자동 적용
        │
        ▼
[자동화 설정 메인 (4 섹션 아코디언)]
   ① 자동 답글
   ② 팔로우 여부 분기
   ③ 댓글 트리거
   ④ 대상 게시물
        │
        ▼ [다음]
[메시지 본문 설정 (텍스트 / 이미지 캐러셀)]
        │
        ▼
[버튼 설정 — 옵션, 0..n개]
        │
        ▼
[메시지 최종 확인]
        │
        ▼ [완료]
[매니저 hub 복귀, 자동화 카드 추가, 기본 ACTIVE]
```

---

## 4. 화면 명세

### 4.1 홈 진입점

- "크리에이터 도구" 섹션 내 카드
  - 타이틀: "DM 자동화하기"
  - 부제: "24시간 언제나 스마트하게 응대하세요"
  - 우측 IG 아이콘
- 탭 시 매니저(DM 자동화 탭)로 이동

### 4.2 매니저 — DM 자동화 hub

#### 헤더
- 페이지 타이틀: "매니저"
- 사용자 핸들 + dropdown (계정 전환)
- 안내 배너: "매니저 이용이 처음인가요? / 서비스 이용 가이드 바로가기"

#### 탭
- "DM 자동화" / "이벤트 추첨"

#### 템플릿 캐러셀
"템플릿으로 간편하게 등록해 보세요" — 가로 스크롤. 좌측에 `+`(직접 생성) 카드, 우측으로 템플릿 카드 N개.

| 템플릿 키 | 카테고리 | 표시명 |
|---|---|---|
| `BLANK` | — | + (신규 직접 생성) |
| `COMMENT_EVENT` | 판매 자동화 | 댓글 이벤트 템플릿 |
| `PRODUCT_INFO` | 판매 자동화 | 제품 정보 전달 템플릿 |
| `PURCHASE_AUTH` | 판매 자동화 | 구매 인증 템플릿 |

#### 카운트 + 액션
- 좌측: `총 N개` (자동화 개수)
- 우측: primary 버튼 `+ 자동화 추가하기`

#### 정렬
- "게시물 순" / "최신 순" 토글

#### 자동화 카드 리스트 (반복)
| 요소 | 동작 |
|---|---|
| 게시물 썸네일 | 연결된 IG 게시물 |
| 게시물 제목 | 미설정 시 "설정된 타이틀 없음" |
| 키워드 chip | 트리거 키워드 또는 모드 표시 |
| 상태 라벨 | "즉시 발송" |
| 활성 토글 | ACTIVE ↔ INACTIVE |
| 메시지 미리보기 | 본문 1~2줄 truncate |
| 통계 | `전송 N` / `읽음 N` / `클릭 N` |
| `...` 메뉴 | 편집 / 복제 / 삭제 |

### 4.3 템플릿 적용 알림

전체 화면 dim + 중앙 체크 아이콘:
- "선택하신 템플릿을 불러왔어요"
- "버튼을 눌러 설정을 확인해주세요"

하단 sheet에서 다음 단계(게시물 선택)로 자연스럽게 연결.

### 4.4 게시물 대상 모드 선택

타이틀: "인스타그램 게시물을 선택해주세요"

라디오 옵션 (단일 선택):
- "자동화하려는 게시물을 직접 선택 할게요" → 게시물 그리드 노출
- "다음에 생성되는 게시물을 자동화 할게요" → 그리드 스킵

### 4.5 게시물 그리드

- IG 게시물 thumbnail 3열 grid
- 단일 선택
- 하단 `다음` 버튼 (선택 전 disabled, 선택 후 enabled)

### 4.6 자동화 설정 메인

타이틀: "인스타그램 메시지 자동화 설정을 선택해주세요"

4개 섹션 아코디언. 각 섹션은 우측에 현재 값 요약 + `(완료)` 라벨 + chevron.

| # | 섹션 | 요약 표기 예 |
|---|---|---|
| ① | 답글을 남겨볼까요? | "총 N개 답글 설정" / "남기지 않음" |
| ② | 팔로우 여부에 따라 다르게 보낼까요? | "동일하게 전송" / "팔로워에게만" 등 |
| ③ | 어떤 댓글에 메시지를 보낼까요? | "모든 댓글" / "키워드: 참여, 좌표" |
| ④ | 어떤 게시물을 자동화할까요? | "직접 선택" / "향후 게시물" |

하단: primary `다음` 버튼. 모든 섹션이 `(완료)` 상태일 때 활성화.

#### 섹션 ① 자동 답글
- 옵션 (라디오):
  - "아니요, 남기지 않을래요"
  - "네, 랜덤하게 답글을 남겨볼래요"
- "네" 선택 시 톤 탭 노출:
  - 정중하게 / 친근하게 / 직접
  - "정중하게" / "친근하게" → 사전 정의된 답글 후보가 자동 채워짐
  - "직접" → 사용자 직접 작성
- 답글 리스트:
  - 각 항목 우측 `−` 삭제 버튼
  - 하단 `+ 새로운 답글 추가하기` 버튼
- 발송 정책: 후보 중 랜덤 1건 선택

#### 섹션 ② 팔로우 분기
- 옵션 (라디오):
  - "동일하게 전송" (default)
  - "팔로워에게만 전송"
  - "비팔로워에게만 전송"
  - "팔로우 여부에 따라 다른 메시지 전송" → 팔로워용/비팔로워용 메시지 별도 입력

#### 섹션 ③ 댓글 트리거
- 옵션 (라디오):
  - "댓글을 달기만 하면 모두 전송할래요"
  - "특정 키워드를 남기면 전송할래요"
- "키워드" 선택 시:
  - 입력 필드 placeholder: "발송하시는 키워드를 입력해주세요"
  - 헬프 텍스트: "플러스(+)나 엔터를 눌러서 추가할 수 있어요"
  - 입력된 키워드는 chip으로 표시, 우측 `×`로 개별 삭제
  - 최소 1개 이상 필요

#### 섹션 ④ 대상 게시물
- 옵션 (라디오):
  - "자동화하려는 게시물을 직접 선택" → 게시물 그리드 호출
  - "다음에 생성되는 게시물을 자동화" → 향후 새 게시물에 자동 적용

### 4.7 메시지 본문 설정

타이틀: "자동화할 메시지를 설정해주세요"

| 요소 | 설명 |
|---|---|
| 모드 탭 | "텍스트" / "이미지 캐러셀" 양자택일 |
| 미리보기 | 채팅 버블 형태. 본문 + 버튼 영역 + `+`(버튼 추가) |
| 메시지 input | 필수. 텍스트 본문 |
| 이미지 영역 | 모드가 "이미지 캐러셀"일 때만 노출. 이미지 1..n개 업로드 |
| 하단 CTA | `다음` |

### 4.8 버튼 설정 (bottom sheet)

진입: 메시지 미리보기 내 `+`(버튼 추가) 또는 기존 버튼 탭

| 요소 | 설명 |
|---|---|
| 헤더 | "버튼 설정" + 우측 보조 액션 `링크 블록 불러오기 ↻` |
| 버튼 텍스트 (필수) | text input |
| 클릭 시 동작 (필수) | 좌측 dropdown (현재: URL) + 우측 input(URL) |
| `링크 블록 불러오기` | 자사 링크 시스템에서 사전 등록된 링크를 가져와 텍스트/URL 자동 채움 |
| CTA | `설정 완료` |

버튼은 0..n개. 추가/삭제/순서 변경 가능.

### 4.9 메시지 최종 확인

타이틀: "고객에게 전송될 메시지를 확인해주세요"

- 채팅 미리보기 (전체 렌더 결과)
- 본문 + 버튼이 실제 발송될 모습 그대로 표시
- 버튼 미설정 시 버튼 영역 비표시
- 본문은 하단 텍스트 영역에서 인라인 수정 가능
- 하단 CTA: `완료` → status=ACTIVE 저장 후 매니저 hub로 복귀

---

## 5. 데이터 모델

```ts
type Automation = {
  id: string
  user_id: string
  template_key: 'COMMENT_EVENT' | 'PRODUCT_INFO' | 'PURCHASE_AUTH' | null
  title: string | null            // null이면 "설정된 타이틀 없음"
  status: 'ACTIVE' | 'INACTIVE'
  delivery_mode: 'IMMEDIATE'

  // ④ 대상 게시물
  target_mode: 'SPECIFIC_POSTS' | 'FUTURE_POSTS'
  target_post_ids: string[]       // IG media IDs (target_mode=SPECIFIC_POSTS일 때)

  // ③ 댓글 트리거
  trigger_mode: 'ALL_COMMENTS' | 'KEYWORD_MATCH'
  trigger_keywords: string[]      // trigger_mode=KEYWORD_MATCH일 때 ≥1

  // ② 팔로우 분기
  follower_branch: {
    mode: 'SAME' | 'FOLLOWERS_ONLY' | 'NON_FOLLOWERS_ONLY' | 'DIFFERENT_MESSAGES'
    follower_message?: Message    // mode=DIFFERENT_MESSAGES일 때
    non_follower_message?: Message
  }

  // 메시지 본문
  message: Message

  // ① 자동 답글
  reply: {
    enabled: boolean
    tone: 'POLITE' | 'FRIENDLY' | 'CUSTOM'
    items: string[]               // enabled=true일 때 ≥1, 후보 중 랜덤 발송
  }

  stats: { sent: number; read: number; clicked: number }
  created_at: string
  updated_at: string
}

type Message = {
  type: 'TEXT' | 'IMAGE_CAROUSEL'
  body: string                    // 필수
  images: ImageRef[]              // type=IMAGE_CAROUSEL일 때 ≥1
  buttons: Button[]               // 0..n
}

type Button = {
  text: string                    // 필수
  action_type: 'URL'              // 추후 확장 가능
  url: string                     // action_type=URL일 때 필수
}

type ImageRef = {
  url: string
  order: number
}
```

---

## 6. 분기·검증 규칙

### 필수 필드
- `message.body`
- `message.images` (type=IMAGE_CAROUSEL일 때 ≥1)
- `button.text`, `button.url` (버튼이 추가된 경우)
- `trigger_keywords` (trigger_mode=KEYWORD_MATCH일 때 ≥1)
- `reply.items` (reply.enabled=true일 때 ≥1)
- `target_post_ids` (target_mode=SPECIFIC_POSTS일 때 ≥1)

### 조건부 UI 노출
| 조건 | 노출 |
|---|---|
| `target_mode = SPECIFIC_POSTS` | 게시물 그리드 |
| `trigger_mode = KEYWORD_MATCH` | 키워드 입력 영역 |
| `reply.enabled = true` | 톤 탭 + 답글 리스트 |
| `message.type = IMAGE_CAROUSEL` | 이미지 업로드 영역 |
| `follower_branch.mode = DIFFERENT_MESSAGES` | 팔로워/비팔로워 메시지 입력 분리 |

### 상태 전이
- 신규 생성: 템플릿 선택 또는 `+ 자동화 추가하기` → draft 생성
- 모든 섹션 valid → `다음` 활성
- 메시지 확인에서 `완료` → status=ACTIVE, hub로 복귀
- 카드 토글 → ACTIVE ↔ INACTIVE 즉시 반영
- `...` 메뉴 → 편집(설정 메인 재진입) / 복제(draft 신규) / 삭제(soft delete)

---

## 7. 백엔드/외부 연동

### Instagram Graph API
- 사용자 게시물 목록 조회 (게시물 그리드)
- 댓글 webhook 수신 또는 polling (트리거)
- DM 발송 (텍스트 / 이미지 캐러셀 / 버튼 첨부)
- 댓글 답글 작성
- 팔로우 관계 조회

### 자사 링크 시스템
- 등록된 링크 목록 조회 API → "링크 블록 불러오기"

### 자동화 실행 엔진
- 댓글 이벤트 수신 → automation 매칭 (target_post + trigger 조건)
- 팔로우 여부 조회 → follower_branch에 따른 메시지 선택
- DM 발송 + 자동 답글 작성 (병렬)
- 발송 결과/읽음/클릭 이벤트를 stats에 누적

---

## 8. UI 토큰 (스타일 가이드)

| 항목 | 값 |
|---|---|
| Primary | Orange (강조 라벨, primary 버튼, 활성 라디오) |
| Primary disabled | 옅은 코랄/오렌지 |
| 활성 토글 | Blue |
| 삭제 아이콘 | `−` (옅은 핑크 배경) |
| Chip 삭제 | chip 우측 `×` |
| Sheet | 하단 슬라이드업 모달 |
| 라디오 | 좌측 원형 체크 (선택 시 orange 채움) |

구체 hex/spacing은 디자인 토큰에 위임.

---

## 9. 통계

자동화 카드에 노출되는 3개 지표:
- **전송**: DM 발송 성공 건수
- **읽음**: 수신자가 DM을 읽은 건수 (IG read receipt 기반)
- **클릭**: DM 내 버튼 클릭 건수 (URL은 자사 단축/추적 링크 경유)

집계 주기: 실시간 또는 5분 단위 갱신.

---

## 10. 구현 우선순위

| Phase | 범위 |
|---|---|
| **P0** | 매니저 hub, 빈 자동화 직접 생성, 단일 게시물 + 키워드 트리거 + 텍스트 메시지 + URL 버튼 1개 + 자동 답글(직접 모드), DM 발송, ACTIVE/INACTIVE 토글 |
| **P1** | 템플릿 3종, 이미지 캐러셀 메시지, 톤 기반 사전 정의 답글, 통계(전송/읽음/클릭), `...` 메뉴(편집/복제/삭제) |
| **P2** | 팔로우 여부 분기 (4가지 모드), "향후 게시물 자동 적용" 모드, 링크 블록 연동, 다중 버튼 |
| **P3** | "이벤트 추첨" 탭, 메시지 A/B 테스트, 고급 분석 대시보드 |

---

## 11. 비기능 요구사항

- DM 발송 latency: 댓글 수신 후 P95 ≤ 30초
- 동일 사용자 중복 발송 방지: 같은 (automation_id, ig_user_id) 쌍에 대해 24시간 내 1회만 발송
- IG API rate limit 준수: 발송 큐 버퍼링
- 사용자 IG 계정 토큰 만료 시 알림 + 재인증 플로우
- 자동화 INACTIVE 토글 즉시 반영 (실행 중인 큐도 drop)
