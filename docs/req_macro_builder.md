# INBOXX — 자동응답 매크로 빌더 UI 프로토타입 요구사항

> 버전: v0.1  
> 대상: Claude Code (프로토타입 구현용)  
> 범위: **UI 프로토타입만** (실제 API 연동·인증·서버 저장 없음. 로컬 메모리 상태만)
> 주의사항: PC web 기반 매크로 기능 설계용이며, 모바일 환경에서는 wizard 방식 채택 예정.

---

## 1. 목적

크리에이터가 인스타그램 댓글/DM 자동화 규칙을 **자연어 문장을 완성하는 방식**으로 만드는 UI 프로토타입.
- 경쟁사(인포크링크 등)의 step-by-step 위저드 대비, **단일 화면에서 자연어 문장의 빈칸을 채워가며** 규칙을 구성.
- 드래그-캔버스형(ManyChat류)이 아닌 **선형 문장 리스트 기반**.

---

## 2. 기술 스택

| 항목 | 지정 |
|---|---|
| 프레임워크 | React (함수형 컴포넌트 + Hooks) |
| 스타일링 | Tailwind CSS (core utility classes만, 컴파일러 없는 환경 전제) |
| 팝오버·드롭다운 | 직접 구현 or Radix UI Primitives (가능하면 Radix) |
| 아이콘 | lucide-react |
| 상태 관리 | React `useState` / `useReducer` 로컬 상태만 |
| 저장소 | **brower localStorage/sessionStorage 사용 금지**. 페이지 내 메모리 상태만 유지 |
| 플랫폼 | **PC 웹 전용** (1024px 이상 기준 설계). 모바일 대응 불필요 |
| 언어 | UI 문구는 한국어 |

---

## 3. 화면 구조 (단일 페이지)

```
┌─────────────────────────────────────────────────────────────┐
│  [INBOXX 로고]   매크로 만들기                   [취소] [저장]│  ← 상단 헤더
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  규칙 이름:  [_______________________________]               │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │  ← 규칙 문장 카드
│  │  📍 만약                                               │  │
│  │     [게시글 선택] 에 [키워드] 댓글이 달리면              │  │
│  │                                                       │  │
│  │  → [액션 선택]                                         │  │
│  │     [+ 액션 추가]                                      │  │
│  │                                                       │  │
│  │  [+ 후속 조건 추가]                                    │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  💡 미리보기: (아래 §7 참조)                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- 좌측 사이드바, 하단 네비게이션 없음. 단일 페이지.
- 스크롤은 세로 방향만.
- 규칙 문장 카드는 화면 중앙 정렬, 최대 너비 720px.

---

## 4. 규칙 데이터 모델

TypeScript 인터페이스로 명시.

```ts
type Rule = {
  id: string;
  name: string;
  trigger: TriggerCondition;     // 필수, 항상 1개
  actions: Action[];             // trigger 직후 실행, 1개 이상
  branches: Branch[];            // 후속 조건 분기, 0개 이상
};

type TriggerCondition = {
  type: 'comment_received';
  posts: PostRef[] | 'all';      // 게시글 다중 선택 or 전체
  keywords: string[] | 'any';    // 키워드 다중 지정 or 모든 댓글
};

type Branch = {
  id: string;
  condition: FollowerCondition;  // 팔로워 여부 분기 (MVP 한정)
  actions: Action[];
};

type FollowerCondition = {
  type: 'is_follower' | 'is_not_follower';
};

type Action =
  | { type: 'send_dm'; message: string }
  | { type: 'reply_comment'; messages: string[]; tone?: 'polite'|'friendly'|'fun' }
  | { type: 'request_follow_check'; message: string };

type PostRef = {
  id: string;
  thumbnailUrl: string;
  caption: string;
};
```

---

## 5. 조건·액션 풀 정의

### 5-1. 조건 풀 (Condition Pool)

| ID | 자연어 표현 | 빈칸 구성 | 사용 위치 |
|---|---|---|---|
| `C1` | `[게시글] 에 [키워드] 댓글이 달리면` | 게시글 선택기, 키워드 칩 입력 | trigger 전용 |
| `C2` | `팔로워로 확인되면` | 없음 | branch 전용 |
| `C3` | `비팔로워로 확인되면` | 없음 | branch 전용 |

### 5-2. 액션 풀 (Action Pool)

| ID | 자연어 표현 | 빈칸 구성 | 특수 동작 |
|---|---|---|---|
| `A1` | `댓글러에게 [DM 메시지] 를 보낸다` | 텍스트 에디터 (640자) | — |
| `A2` | `댓글에 [답글 문구] 로 답글을 단다` | 답글 문구 다중 입력 (1~5개) + 톤 선택 | 2개 이상이면 랜덤 발송 안내 노출 |
| `A3` | `[안내 문구] 와 함께 팔로우 확인 버튼 DM을 보낸다` | 텍스트 에디터 (640자) | 선택 시 **자동으로 팔로워/비팔로워 분기 블록 2개 제안** (§6-3 참조) |

---

## 6. 인터랙션 상세

### 6-1. 빈칸 (Slot) 공통 동작

- 빈칸은 **채워지지 않은 상태**: 점선 테두리, 회색 placeholder 텍스트 (예: `게시글 선택`).
- 채워진 상태: 실선 테두리 칩 형태, 값 요약 표시 (예: `게시글 3개`, `키워드: 구매, 문의`).
- 빈칸 클릭 시 **Popover** 가 빈칸 바로 아래 또는 위에 floating으로 나타남.
- Popover 외부 클릭 or ESC → 닫힘 (변경사항 유지. 별도 "확인" 버튼 불필요, 단 텍스트 에디터류는 "완료" 버튼 제공)
- 채워진 빈칸 우측에 작은 `×` 아이콘 → 클릭 시 값 초기화

### 6-2. 빈칸별 Popover UI

| 빈칸 | Popover 내용 |
|---|---|
| 게시글 | 상단 토글 `전체 게시글 적용` / `직접 선택` + 그리드형 게시글 리스트 (§10 목업 데이터). 체크박스 다중 선택 |
| 키워드 | 토글 `모든 댓글` / `특정 키워드` + 태그 입력 (엔터/콤마로 구분, 각 태그는 `×` 삭제) |
| 액션 선택 | 드롭다운 3지선다: `DM 보내기` / `답글 달기` / `팔로우 확인 요청`. 선택 즉시 해당 액션의 빈칸이 인라인으로 확장 |
| DM 메시지 / 답글 / 안내 문구 | textarea (다줄) + 글자수 카운터 (640/640). 하단 `완료` 버튼 |
| 답글 문구 다중 | 입력 리스트 (최대 5개) + `+ 답글 추가` 버튼 + 톤 라디오(`정중하게`/`프렌들리`/`재밌게`). 2개 이상이면 `"랜덤 발송됩니다"` 안내 노출 |

### 6-3. 액션 / 분기 추가 동작

- **`+ 액션 추가`** 버튼: 동일 조건 블록 내에 액션 추가 (and 병렬). 최대 3개까지.
- **`+ 후속 조건 추가`** 버튼: branch 블록 추가. 조건 드롭다운으로 `C2` or `C3` 선택.
- **자동 분기 제안:** trigger 액션으로 `A3 (팔로우 확인 요청)` 선택 시, 토스트 또는 인라인 제안 카드 노출:
  ```
  💡 팔로우 확인 후 다르게 응답하시겠어요?
  [팔로워/비팔로워 분기 자동 생성]  [나중에]
  ```
  클릭 시 `C2`, `C3` 분기 블록 2개 자동 생성 (액션은 비어있는 상태).

### 6-4. 완성된 규칙 문장 예시

**예시 1: 단순 (분기 없음)**
```
만약 [📷 게시글 3개] 에 [🏷 구매, 문의] 댓글이 달리면
  → 댓글러에게 [📝 "감사합니다! DM 드릴게요"] DM을 보낸다
  → 댓글에 [📝 "감사해요! 💕"] 로 답글을 단다
```

**예시 2: 분기 있음**
```
만약 [📷 게시글 1개] 에 [🏷 링크] 댓글이 달리면
  → [📝 "팔로우하시면 링크 보내드려요"] 와 함께 팔로우 확인 버튼 DM을 보낸다

그리고 팔로워로 확인되면
  → 댓글러에게 [📝 "링크입니다: bit.ly/xxx"] DM을 보낸다
  → 댓글에 [📝 "감사합니다 💖"] 로 답글을 단다

그리고 비팔로워로 확인되면
  → 댓글러에게 [📝 "팔로우 후 다시 버튼 눌러주세요"] DM을 보낸다
```

---

## 7. 미리보기 영역 (Preview)

규칙 문장 카드 아래에 실시간으로 규칙 요약을 렌더링.

- 채워진 slot만 실제 값으로 표시, 비어있는 slot은 `(입력 필요)` 로 플레이스홀더 표시.
- 규칙이 **완성 가능한 상태**(모든 slot 채워짐)인지 상단 `[저장]` 버튼 활성화 상태와 연동.
- 복잡한 visualization 불필요. 들여쓰기된 텍스트 블록으로 충분.

---

## 8. 상태 / 검증

### 8-1. 저장 가능 조건

- 규칙 이름 비어있지 않음
- trigger의 모든 slot 채워짐
- actions 최소 1개, 모든 action의 slot 채워짐
- branch가 있다면 각 branch의 action 최소 1개, 모든 slot 채워짐

### 8-2. 미충족 시

- `[저장]` 버튼 비활성화 (회색)
- 호버 시 tooltip: `"비어있는 항목을 모두 채워주세요"`
- 비어있는 slot은 점선 테두리를 **붉은 계열 강조** (단, 유저가 상호작용 시작한 이후에만. 최초 진입 시엔 일반 점선)

### 8-3. 저장 시

- 실제 저장 없음. `console.log(rule)` 로 JSON 출력 + `alert("저장되었습니다 (프로토타입)")`

---

## 9. 비주얼 가이드

| 요소 | 스타일 |
|---|---|
| 전체 배경 | `bg-neutral-50` |
| 규칙 문장 카드 | `bg-white border border-neutral-200 rounded-xl p-8 shadow-sm` |
| 자연어 고정 텍스트 (`만약`, `에`, `댓글이 달리면`, `→` 등) | `text-neutral-700 text-base leading-loose` |
| 빈 slot | `inline-flex px-3 py-1 border border-dashed border-neutral-400 rounded-md text-neutral-400 text-sm hover:bg-neutral-100 cursor-pointer` |
| 채워진 slot | `inline-flex px-3 py-1 bg-orange-50 border border-orange-300 rounded-md text-orange-700 text-sm font-medium` |
| Popover | `bg-white border border-neutral-200 rounded-lg shadow-lg p-4 min-w-[280px]` |
| 액션 화살표 `→` | `text-neutral-400` |
| 분기 구분선 `그리고` | `text-neutral-500 text-sm mt-4 mb-2` |
| `+ 액션 추가` / `+ 후속 조건 추가` 버튼 | `text-sm text-orange-600 hover:text-orange-700` (텍스트 버튼, 배경 없음) |
| Primary CTA (저장) | `bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg` |
| 브랜드 컬러 톤 | 오렌지 계열 (인포크링크와 유사해도 무방, 프로토타입이므로) |

---

## 10. 목업 데이터

### 10-1. 게시글 (Instagram 계정 연결 시뮬레이션)

아래 데이터를 하드코딩하여 게시글 선택기에 표시.

```js
const mockPosts = [
  { id: 'p1', thumbnailUrl: 'https://picsum.photos/seed/p1/200', caption: '신상 공구 안내 🎁' },
  { id: 'p2', thumbnailUrl: 'https://picsum.photos/seed/p2/200', caption: '이벤트 응모 방법' },
  { id: 'p3', thumbnailUrl: 'https://picsum.photos/seed/p3/200', caption: '오늘의 룩 ✨' },
  { id: 'p4', thumbnailUrl: 'https://picsum.photos/seed/p4/200', caption: 'Q&A 모집 중' },
  { id: 'p5', thumbnailUrl: 'https://picsum.photos/seed/p5/200', caption: '브이로그 업로드' },
  { id: 'p6', thumbnailUrl: 'https://picsum.photos/seed/p6/200', caption: '협찬 리뷰' },
  { id: 'p7', thumbnailUrl: 'https://picsum.photos/seed/p7/200', caption: '카페 추천' },
  { id: 'p8', thumbnailUrl: 'https://picsum.photos/seed/p8/200', caption: '구독자 이벤트' },
];
```

### 10-2. 초기 규칙 상태

빈 trigger 1개 + 빈 action 1개로 초기화. 이름은 "새 매크로".

---

## 11. 제외 사항 (명시적 Out-of-Scope)

프로토타입 범위가 비대해지지 않도록, 아래는 **구현하지 않음**.

- 실제 Instagram/YouTube/Kakao API 연동
- 로그인·회원가입
- 규칙 목록 페이지 (단일 규칙 생성 화면만)
- 저장된 규칙 불러오기/수정 (새로 만들기만)
- 대시보드, 메시지 인박스, 구독 관리 등 INBOXX의 다른 영역
- 다국어 지원 (한국어만)
- 모바일 반응형 (PC 1024px+ 전용)
- 다크모드
- 접근성 고급 기능 (ARIA는 가능한 수준까지만)

---

## 12. 구현 우선순위

Claude Code가 점진적으로 빌드할 수 있도록 단계 제안.

1. **Phase A — 뼈대:** 단일 trigger + 단일 action 구조, 빈 slot + popover 기본 동작
2. **Phase B — 복수 action:** `+ 액션 추가`, 액션 타입별 slot 분기
3. **Phase C — 분기:** `+ 후속 조건 추가`, C2/C3 branch, 자동 분기 제안
4. **Phase D — 검증·미리보기:** 저장 버튼 활성화 로직, preview 영역
5. **Phase E — 폴리싱:** 빈 slot 강조, 키워드·답글 다중 입력 UX 다듬기

---

## 13. 수락 기준 (Acceptance)

아래 시나리오가 모두 동작하면 프로토타입 완성.

- [ ] "새 매크로" 상태에서 trigger의 게시글·키워드 slot을 popover로 채울 수 있다
- [ ] 액션 slot에서 3가지 액션 중 하나를 선택할 수 있고, 선택 즉시 세부 slot이 나타난다
- [ ] `+ 액션 추가`로 동일 조건에 액션을 최대 3개까지 추가할 수 있다
- [ ] 첫 액션으로 `팔로우 확인 요청` 선택 시 분기 자동 생성 제안이 나타나고, 수락 시 분기 2개가 생긴다
- [ ] `+ 후속 조건 추가`로 수동 분기 추가도 가능하다
- [ ] 모든 slot이 채워지기 전엔 저장 버튼이 비활성 상태다
- [ ] 저장 버튼 클릭 시 console에 Rule JSON이 출력된다
- [ ] 답글 문구를 2개 이상 등록하면 "랜덤 발송" 안내가 나타난다
- [ ] Popover는 외부 클릭/ESC로 닫힌다

---

## 14. 참고 — 자연어 템플릿 원칙

구현 시 문구 수정 가능. 단, 다음 원칙 유지:

- 조건은 `만약 ~ 면,` / 분기는 `그리고 ~ 면` 으로 시작
- 액션은 `→` 로 시작
- 빈 slot은 명사로 끝남 (예: `게시글 선택`, `키워드`, `메시지`) — 행동 유발 아님
- 한 줄에 한 개의 절만 노출 (줄바꿈 적극 사용)
