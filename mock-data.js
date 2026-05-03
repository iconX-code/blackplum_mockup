// === blackplum mockup data ===
// Phase 1-2 — automations / AUTOMATION_TEMPLATES는 Phase 5에서 채움 (현재 빈 배열)

/* eslint-disable */

const TAG_CATALOG = {
  business: ['공구 제안','시딩 제안','광고/협찬 제안','행사/오프라인 제안','기타 제안'],
  ops:      ['구매 문의','배송 문의','CS/환불','제품 질문','링크 요청'],
  social:   ['셀럽','VIP팬','일반팬','브랜드','고민상담','콘텐츠 요청'],
  manual:   ['중요','저장','긴급','이벤트-예정','이벤트-오픈','이벤트-종료','VIP','NIP'],
};

const CATEGORIES = {
  ai_pick:       { display: 'AI Pick',     tag_filter: '*' },
  business:      { display: '비즈니스',     tag_filter: TAG_CATALOG.business },
  ops:           { display: '운영/CS',      tag_filter: TAG_CATALOG.ops },
  social:        { display: '소통',         tag_filter: TAG_CATALOG.social },
  direct_check:  { display: '직접확인',     tag_filter: 'untagged' },
  sent:          { display: '보낸메시지함',  view: 'outgoing_messages', type_filter: ['dm','comment','email'] },
  dm_automation: { display: 'DM 자동화',    view: 'macro_rules' },
};

const PLATFORM_LOGOS = {
  instagram: 'logo-instagram',
  youtube:   'logo-youtube',
  tiktok:    'logo-tiktok',
  gmail:     'logo-gmail',
  naver_mail:'logo-naver-mail',
  other_mail:'logo-other-mail',
};

const channel = {
  user_id: 'user_001',
  user_display_name: '김지우',
  channel_id: 'ch_001',
  channel_display_name: '지우의 일상',
  channel_handle: '@jiwoo_daily',
  connected_sns_accounts: [
    {
      id: 'a1',
      platform: 'instagram',
      account_handle: '@jiwoo_daily',
      display_name: '지우의 일상 (메인)',
      account_color_token: 'var(--color-platform-instagram)',
      initial: 'M',
    },
    {
      id: 'a2',
      platform: 'instagram',
      account_handle: '@jiwoo_beauty',
      display_name: '지우뷰티 (서브)',
      account_color_token: 'var(--color-accent-purple)',
      initial: 'B',
    },
    {
      id: 'a3',
      platform: 'youtube',
      account_handle: 'jiwoo_daily_yt',
      display_name: '지우의 일상 유튜브',
    },
    {
      id: 'a4',
      platform: 'gmail',
      account_handle: 'jiwoo.daily@gmail.com',
      display_name: '지우 Gmail',
    },
    {
      id: 'a5',
      platform: 'tiktok',
      account_handle: '@jiwoo_tiktok',
      display_name: '지우 틱톡',
    },
    {
      id: 'a6',
      platform: 'naver_mail',
      account_handle: 'jiwoo@naver.com',
      display_name: '지우 네이버메일',
    },
    {
      id: 'a7',
      platform: 'other_mail',
      account_handle: 'contact@jiwoo-brand.kr',
      display_name: '지우 브랜드메일',
    },
  ],
};

const origins = [
  // === BUSINESS SENDER ORIGINS ===
  { id:'o1',  type:'sender', platform:'gmail',     user_sns_account_id:'a4', account_id:'partner@lumiebeauty.co.kr', display_name:'루미에 뷰티', manual_tags:[] },
  { id:'o2',  type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@skinfit_official', display_name:'스킨핏 코리아', manual_tags:[] },
  { id:'o3',  type:'sender', platform:'gmail',     user_sns_account_id:'a4', account_id:'collab@fitlab.kr',          display_name:'핏랩 코리아', manual_tags:[] },
  { id:'o4',  type:'sender', platform:'instagram', user_sns_account_id:'a2', account_id:'@glowup_cosmetics',         display_name:'글로우업 코스메틱', manual_tags:[] },
  { id:'o5',  type:'sender', platform:'gmail',     user_sns_account_id:'a4', account_id:'biz@harucare.com',          display_name:'하루케어', manual_tags:[] },
  { id:'o6',  type:'sender', platform:'other_mail', user_sns_account_id:'a7', account_id:'ad@freshskin.co.kr',        display_name:'프레시스킨', manual_tags:['중요'] },
  { id:'o7',  type:'sender', platform:'naver_mail',user_sns_account_id:'a6', account_id:'marketing@pureclean.kr',    display_name:'퓨어클린', manual_tags:[] },
  { id:'o8',  type:'sender', platform:'gmail',     user_sns_account_id:'a4', account_id:'collab@moonlab.kr',         display_name:'문랩', manual_tags:[] },
  { id:'o9',  type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@dailyfood_kr',             display_name:'데일리푸드', manual_tags:[] },
  { id:'o10', type:'sender', platform:'gmail',     user_sns_account_id:'a4', account_id:'event@stylishco.kr',        display_name:'스타일리시코', manual_tags:[] },
  { id:'o11', type:'sender', platform:'instagram', user_sns_account_id:'a2', account_id:'@pinkrose_official',        display_name:'핑크로즈', manual_tags:[] },
  { id:'o12', type:'sender', platform:'gmail',     user_sns_account_id:'a4', account_id:'sponsor@natureglow.com',    display_name:'네이처글로우', manual_tags:[] },

  // === OPS/CS POST ORIGINS (IG & YT) ===
  { id:'o13', type:'post', platform:'instagram', user_sns_account_id:'a1',
    media_id:'ig_post_001', display_name:'선크림 추천 TOP5 🌞',
    post_meta:{ thumbnail_url:'https://placehold.co/120x120?text=P1', caption:'여름 필수템 선크림 TOP5 추천드려요!', created_at:'2026-04-10T10:00:00+09:00' },
    manual_tags:[], engagement_meta:{ likes:4821, views:0, comment_count:203, trend_flag:'rising' } },
  { id:'o14', type:'post', platform:'instagram', user_sns_account_id:'a2',
    media_id:'ig_post_002', display_name:'데일리 스킨케어 루틴 🧴',
    post_meta:{ thumbnail_url:'https://placehold.co/120x120?text=P2', caption:'아침 스킨케어 루틴 공개해요', created_at:'2026-04-15T09:00:00+09:00' },
    manual_tags:[], engagement_meta:{ likes:3209, views:0, comment_count:118, trend_flag:null } },
  { id:'o15', type:'post', platform:'youtube',   user_sns_account_id:'a3',
    media_id:'yt_video_001', display_name:'봄 메이크업 튜토리얼',
    post_meta:{ thumbnail_url:'https://placehold.co/120x120?text=P3', caption:'2026 봄 메이크업 튜토리얼 풀버전', created_at:'2026-04-08T14:00:00+09:00' },
    manual_tags:[], engagement_meta:{ likes:9830, views:210000, comment_count:542, trend_flag:'rising' } },
  { id:'o16', type:'post', platform:'instagram', user_sns_account_id:'a1',
    media_id:'ig_post_003', display_name:'공구 오픈! 마스크팩 할인 🎉',
    post_meta:{ thumbnail_url:'https://placehold.co/120x120?text=P4', caption:'인기 마스크팩 공구 오픈합니다', created_at:'2026-04-20T12:00:00+09:00' },
    manual_tags:['이벤트-오픈'], engagement_meta:{ likes:6102, views:0, comment_count:389, trend_flag:'rising' } },
  { id:'o17', type:'post', platform:'youtube',   user_sns_account_id:'a3',
    media_id:'yt_video_002', display_name:'다이어트 식단 7일 챌린지',
    post_meta:{ thumbnail_url:'https://placehold.co/120x120?text=P5', caption:'7일 다이어트 식단 챌린지 후기', created_at:'2026-04-18T16:00:00+09:00' },
    manual_tags:[], engagement_meta:{ likes:7650, views:180000, comment_count:411, trend_flag:null } },
  { id:'o18', type:'post', platform:'instagram', user_sns_account_id:'a2',
    media_id:'ig_post_004', display_name:'파운데이션 비교 리뷰 💄',
    post_meta:{ thumbnail_url:'https://placehold.co/120x120?text=P6', caption:'10종 파운데이션 비교 리뷰', created_at:'2026-04-22T11:00:00+09:00' },
    manual_tags:[], engagement_meta:{ likes:2870, views:0, comment_count:95, trend_flag:null } },
  { id:'o19', type:'post', platform:'tiktok',    user_sns_account_id:'a5',
    media_id:'tt_video_001', display_name:'1분 메이크업 챌린지',
    post_meta:{ thumbnail_url:'https://placehold.co/120x120?text=P7', caption:'1분 완성 메이크업 챌린지', created_at:'2026-04-25T20:00:00+09:00' },
    manual_tags:[], engagement_meta:{ likes:15200, views:520000, comment_count:630, trend_flag:'rising' } },

  // === OPS/CS SENDER ORIGINS ===
  { id:'o20', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@user_minseo22',    display_name:'민서', manual_tags:[] },
  { id:'o21', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@user_hyunji_0',    display_name:'현지', manual_tags:[] },
  { id:'o22', type:'sender', platform:'youtube',   user_sns_account_id:'a3', account_id:'YT_user_habin',     display_name:'하빈', manual_tags:[] },
  { id:'o23', type:'sender', platform:'gmail',     user_sns_account_id:'a4', account_id:'sora.lee@email.com',display_name:'이소라', manual_tags:[] },
  { id:'o24', type:'sender', platform:'naver_mail',user_sns_account_id:'a6', account_id:'junho.park@naver.com',display_name:'박준호', manual_tags:[] },

  // === SOCIAL SENDER ORIGINS ===
  { id:'o25', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@star_yuna_kr',      display_name:'유나 (셀럽)', manual_tags:['VIP'] },
  { id:'o26', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@vip_fan_jisu',      display_name:'지수 (VIP팬)', manual_tags:[] },
  { id:'o27', type:'sender', platform:'youtube',   user_sns_account_id:'a3', account_id:'YT_fan_seojin',      display_name:'서진', manual_tags:[] },
  { id:'o28', type:'sender', platform:'instagram', user_sns_account_id:'a2', account_id:'@brand_collab_kr',   display_name:'브랜드콜라보KR', manual_tags:[] },
  { id:'o29', type:'sender', platform:'tiktok',    user_sns_account_id:'a5', account_id:'@tiktok_fan_nari',   display_name:'나리', manual_tags:[] },
  { id:'o30', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@user_fan_minji',    display_name:'민지', manual_tags:[] },
  { id:'o31', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@user_fan_eunbi',    display_name:'은비', manual_tags:[] },
  { id:'o32', type:'sender', platform:'youtube',   user_sns_account_id:'a3', account_id:'YT_fan_sooyeon',     display_name:'수연', manual_tags:[] },
  { id:'o33', type:'sender', platform:'instagram', user_sns_account_id:'a2', account_id:'@user_fan_dahye',    display_name:'다혜', manual_tags:[] },
  { id:'o34', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@user_fan_chaerin',  display_name:'채린', manual_tags:[] },
  { id:'o35', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@celeb_jiyeon',      display_name:'지연 (셀럽)', manual_tags:[] },

  // === DIRECT CHECK SENDER ORIGINS ===
  { id:'o36', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@unknown_user_01',   display_name:'알 수 없음 01', manual_tags:[] },
  { id:'o37', type:'sender', platform:'instagram', user_sns_account_id:'a2', account_id:'@unknown_user_02',   display_name:'알 수 없음 02', manual_tags:[] },
  { id:'o38', type:'sender', platform:'gmail',     user_sns_account_id:'a4', account_id:'anon@email.com',     display_name:'익명 이메일', manual_tags:[] },
  { id:'o39', type:'sender', platform:'tiktok',user_sns_account_id:'a5', account_id:'@realname_tiktok',  display_name:'틱톡 익명', manual_tags:[] },
  { id:'o40', type:'sender', platform:'other_mail',user_sns_account_id:'a7', account_id:'misc@domain.com',    display_name:'기타 메일', manual_tags:[] },
  { id:'o41', type:'sender', platform:'tiktok',    user_sns_account_id:'a5', account_id:'@tiktok_unknown_01', display_name:'틱톡 익명', manual_tags:[] },
  { id:'o42', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@new_user_abc',      display_name:'새 사용자', manual_tags:[] },

  // === ADDITIONAL BUSINESS SENDER ORIGINS ===
  { id:'o43', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@bloom_official',    display_name:'블룸 공식', manual_tags:[] },
  { id:'o44', type:'sender', platform:'gmail',     user_sns_account_id:'a4', account_id:'biz@vivid.co.kr',   display_name:'비비드', manual_tags:[] },
  { id:'o45', type:'sender', platform:'gmail',     user_sns_account_id:'a4', account_id:'pr@sunnyday.kr',    display_name:'써니데이', manual_tags:[] },
  { id:'o46', type:'sender', platform:'naver_mail',user_sns_account_id:'a6', account_id:'event@cosmo.kr',    display_name:'코스모이벤트', manual_tags:[] },
  { id:'o47', type:'sender', platform:'instagram', user_sns_account_id:'a2', account_id:'@collab_agency_k',  display_name:'콜라보에이전시K', manual_tags:[] },
  { id:'o48', type:'sender', platform:'gmail',     user_sns_account_id:'a4', account_id:'ad@trendlab.kr',    display_name:'트렌드랩', manual_tags:[] },
  { id:'o49', type:'sender', platform:'other_mail', user_sns_account_id:'a7', account_id:'hello@greenco.kr',  display_name:'그린코', manual_tags:[] },

  // === ADDITIONAL SOCIAL & OPS ORIGINS ===
  { id:'o50', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@fan_yeonhee',       display_name:'연희', manual_tags:[] },
  { id:'o51', type:'sender', platform:'youtube',   user_sns_account_id:'a3', account_id:'YT_user_gyuwon',     display_name:'규원', manual_tags:[] },
  { id:'o52', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@user_bomi',         display_name:'보미', manual_tags:[] },
  { id:'o53', type:'sender', platform:'instagram', user_sns_account_id:'a2', account_id:'@user_taeyeon_fan',  display_name:'태연팬', manual_tags:[] },
  { id:'o54', type:'post',   platform:'instagram', user_sns_account_id:'a1',
    media_id:'ig_post_005', display_name:'여름 코디 하울 영상 🌊',
    post_meta:{ thumbnail_url:'https://placehold.co/120x120?text=P8', caption:'여름 코디 하울 영상 올렸어요', created_at:'2026-04-28T13:00:00+09:00' },
    manual_tags:[], engagement_meta:{ likes:3500, views:0, comment_count:145, trend_flag:null } },
  { id:'o55', type:'sender', platform:'instagram', user_sns_account_id:'a1', account_id:'@user_jungho',       display_name:'정호', manual_tags:[] },
  { id:'o56', type:'sender', platform:'instagram', user_sns_account_id:'a2', account_id:'@user_hyunwoo',      display_name:'현우', manual_tags:[] },
];

const threads = [
  // === BUSINESS THREADS (20 total: 16 unprocessed, 4 processed) ===
  // t1: LONG THREAD (20 msgs) — 루미에 뷰티 협찬 협상 A→B→C→B→D
  { id:'t1', platform:'gmail', message_type:'email', origin_id:'o1', origin_type:'sender',
    message_ids:['m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','m11','m12','m13','m14','m15','m16','m17','m18','m19','m20'],
    tags:['광고/협찬 제안','중요'], priority_score:95, processed:false,
    last_message_at:'2026-05-02T16:30:00+09:00', is_stacked:false,
    business_extracted:{ company:'루미에 뷰티', brand:'루미에', contact_person:'이마케팅팀장', proposal_summary:'인스타 피드 3회+스토리 5회 협찬', product:'루미에 앰플 세럼', conditions:'피드 단가 80만원 협의 중' },
    ai_thread_context:'루미에 협찬 협상 중, 단가 조율 단계' },

  // t2: LONG THREAD (20 msgs) — 스킨핏 공구 협업 A→B→C→B→D
  { id:'t2', platform:'instagram', message_type:'dm', origin_id:'o2', origin_type:'sender',
    message_ids:['m21','m22','m23','m24','m25','m26','m27','m28','m29','m30','m31','m32','m33','m34','m35','m36','m37','m38','m39','m40'],
    tags:['공구 제안'], priority_score:88, processed:false,
    last_message_at:'2026-05-02T11:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'스킨핏 코리아', brand:'스킨핏', contact_person:'김공구팀', proposal_summary:'공구 500개 한정 마스크팩', product:'스킨핏 마스크팩 10종', conditions:'마진 25% 재협의 중' },
    ai_thread_context:'스킨핏 공구 협업, 마진 재협의 단계' },

  // t3: 핏랩 협찬 제안 (unprocessed)
  { id:'t3', platform:'gmail', message_type:'email', origin_id:'o3', origin_type:'sender',
    message_ids:['m41','m42'], tags:['광고/협찬 제안'], priority_score:82, processed:false,
    last_message_at:'2026-05-01T14:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'핏랩 코리아', brand:'핏랩', contact_person:'박협찬팀', proposal_summary:'운동 유튜브 협찬 제안', product:'핏랩 단백질 쉐이크', conditions:'피드 1회 60만원 제안' },
    ai_thread_context:'핏랩 유튜브 협찬 제안 검토 중' },

  // t4: 글로우업 시딩 제안 (unprocessed)
  { id:'t4', platform:'instagram', message_type:'dm', origin_id:'o4', origin_type:'sender',
    message_ids:['m43','m44'], tags:['시딩 제안'], priority_score:74, processed:false,
    last_message_at:'2026-04-30T10:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'글로우업 코스메틱', brand:'글로우업', contact_person:'홍보팀', proposal_summary:'신제품 시딩 5종 발송', product:'글로우업 쿠션 신제품', conditions:'리뷰 의무 없음' },
    ai_thread_context:'글로우업 신제품 시딩 제안' },

  // t5: 하루케어 협찬 (unprocessed)
  { id:'t5', platform:'gmail', message_type:'email', origin_id:'o5', origin_type:'sender',
    message_ids:['m45','m46','m47'], tags:['광고/협찬 제안'], priority_score:79, processed:false,
    last_message_at:'2026-04-29T15:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'하루케어', brand:'하루케어', contact_person:'최마케팅', proposal_summary:'피부 보습 크림 협찬', product:'하루케어 수분크림', conditions:'단가 협의 중' },
    ai_thread_context:'하루케어 수분크림 협찬 제안 중' },

  // t6: 프레시스킨 (중요 태그, unprocessed)
  { id:'t6', platform:'other_mail', message_type:'email', origin_id:'o6', origin_type:'sender',
    message_ids:['m48','m50','m49'], tags:['광고/협찬 제안','중요'], priority_score:90, processed:false,
    last_message_at:'2026-04-28T09:30:00+09:00', is_stacked:false,
    business_extracted:{ company:'프레시스킨', brand:'프레시스킨', contact_person:'이대표', proposal_summary:'전속 모델 제안', product:'프레시스킨 전 라인', conditions:'월 200만원 계약 제안' },
    ai_thread_context:'프레시스킨 전속 모델 제안, 고우선순위' },

  // t7: 퓨어클린 (unprocessed)
  { id:'t7', platform:'naver_mail', message_type:'email', origin_id:'o7', origin_type:'sender',
    message_ids:['m51','m52'], tags:['시딩 제안'], priority_score:70, processed:false,
    last_message_at:'2026-04-27T11:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'퓨어클린', brand:'퓨어클린', contact_person:'김시딩담당', proposal_summary:'친환경 클렌저 시딩', product:'퓨어클린 클렌징폼', conditions:'시딩 3종 발송 예정' },
    ai_thread_context:'퓨어클린 친환경 클렌저 시딩' },

  // t8: 문랩 행사 제안 (unprocessed)
  { id:'t8', platform:'gmail', message_type:'email', origin_id:'o8', origin_type:'sender',
    message_ids:['m53','m54'], tags:['행사/오프라인 제안'], priority_score:76, processed:false,
    last_message_at:'2026-04-26T14:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'문랩', brand:'문랩', contact_person:'오이벤트팀', proposal_summary:'팝업 행사 게스트 초청', product:'문랩 신제품 발표회', conditions:'교통비+사례금 50만원' },
    ai_thread_context:'문랩 팝업 게스트 초청 제안' },

  // t9: 데일리푸드 공구 제안 (unprocessed)
  { id:'t9', platform:'instagram', message_type:'dm', origin_id:'o9', origin_type:'sender',
    message_ids:['m55','m56','m57'], tags:['공구 제안'], priority_score:80, processed:false,
    last_message_at:'2026-04-25T10:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'데일리푸드', brand:'데일리푸드', contact_person:'공구팀', proposal_summary:'건강간식 공구 협업', product:'데일리푸드 그래놀라', conditions:'마진 20% 조율 중' },
    ai_thread_context:'데일리푸드 건강간식 공구 제안 중' },

  // t10: 스타일리시코 행사 (unprocessed)
  { id:'t10', platform:'gmail', message_type:'email', origin_id:'o10', origin_type:'sender',
    message_ids:['m58','m59'], tags:['행사/오프라인 제안'], priority_score:73, processed:false,
    last_message_at:'2026-04-24T13:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'스타일리시코', brand:'스타일리시코', contact_person:'행사팀', proposal_summary:'패션쇼 인플루언서 초청', product:'스타일리시코 SS 컬렉션', conditions:'1인 교통비+식사 제공' },
    ai_thread_context:'스타일리시코 패션쇼 초청 제안' },

  // t11: 핑크로즈 시딩 (unprocessed)
  { id:'t11', platform:'instagram', message_type:'dm', origin_id:'o11', origin_type:'sender',
    message_ids:['m60','m61'], tags:['시딩 제안'], priority_score:71, processed:false,
    last_message_at:'2026-04-23T15:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'핑크로즈', brand:'핑크로즈', contact_person:'홍보', proposal_summary:'립스틱 시딩 5종', product:'핑크로즈 립스틱 신상', conditions:'리뷰 의무 없음' },
    ai_thread_context:'핑크로즈 립스틱 시딩 제안' },

  // t12: 네이처글로우 협찬 (unprocessed)
  { id:'t12', platform:'gmail', message_type:'email', origin_id:'o12', origin_type:'sender',
    message_ids:['m62','m63'], tags:['광고/협찬 제안'], priority_score:77, processed:false,
    last_message_at:'2026-04-22T10:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'네이처글로우', brand:'네이처글로우', contact_person:'마케팅', proposal_summary:'비건 선크림 협찬', product:'네이처글로우 비건 선크림', conditions:'단가 70만원 제안' },
    ai_thread_context:'네이처글로우 비건 선크림 협찬' },

  // t13: 블룸 기타 제안 (unprocessed)
  { id:'t13', platform:'instagram', message_type:'dm', origin_id:'o43', origin_type:'sender',
    message_ids:['m64','m65'], tags:['기타 제안'], priority_score:72, processed:false,
    last_message_at:'2026-04-21T14:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'블룸', brand:'블룸', contact_person:'홍보팀', proposal_summary:'유튜브 브랜디드 콘텐츠', product:'블룸 향수 라인', conditions:'편당 100만원 제안' },
    ai_thread_context:'블룸 향수 브랜디드 콘텐츠 제안' },

  // t14: 비비드 협찬 (unprocessed)
  { id:'t14', platform:'gmail', message_type:'email', origin_id:'o44', origin_type:'sender',
    message_ids:['m66','m67'], tags:['광고/협찬 제안'], priority_score:75, processed:false,
    last_message_at:'2026-04-20T11:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'비비드', brand:'비비드', contact_person:'협찬담당', proposal_summary:'뷰티 도구 협찬', product:'비비드 고데기', conditions:'단가 협의 요청' },
    ai_thread_context:'비비드 고데기 협찬 제안 수신' },

  // t15: 써니데이 시딩 (unprocessed)
  { id:'t15', platform:'gmail', message_type:'email', origin_id:'o45', origin_type:'sender',
    message_ids:['m68','m69'], tags:['시딩 제안'], priority_score:70, processed:false,
    last_message_at:'2026-04-19T09:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'써니데이', brand:'써니데이', contact_person:'팀장', proposal_summary:'여름 선케어 시딩', product:'써니데이 선스틱', conditions:'2종 발송 예정' },
    ai_thread_context:'써니데이 선스틱 시딩 제안' },

  // t16: 코스모 이벤트 행사 (unprocessed)
  { id:'t16', platform:'naver_mail', message_type:'email', origin_id:'o46', origin_type:'sender',
    message_ids:['m70','m71'], tags:['행사/오프라인 제안'], priority_score:74, processed:false,
    last_message_at:'2026-04-18T14:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'코스모이벤트', brand:'코스모', contact_person:'이벤트팀', proposal_summary:'코스모뷰티페어 참가', product:'코스모뷰티페어 2026', conditions:'부스 참가+교통비 제공' },
    ai_thread_context:'코스모뷰티페어 초청 제안' },

  // t17: 콜라보에이전시K 기타 제안 (processed)
  { id:'t17', platform:'instagram', message_type:'dm', origin_id:'o47', origin_type:'sender',
    message_ids:['m72','m73','m74'], tags:['기타 제안'], priority_score:76, processed:true,
    last_message_at:'2026-04-17T13:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'콜라보에이전시K', brand:'콜라보K', contact_person:'에이전시', proposal_summary:'멀티채널 브랜드 제안', product:'여러 브랜드 패키지 제안', conditions:'계약 완료' },
    ai_thread_context:'콜라보K 멀티 제안 처리 완료' },

  // t18: 트렌드랩 협찬 (processed)
  { id:'t18', platform:'gmail', message_type:'email', origin_id:'o48', origin_type:'sender',
    message_ids:['m75','m76','m77'], tags:['광고/협찬 제안'], priority_score:78, processed:true,
    last_message_at:'2026-04-16T10:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'트렌드랩', brand:'트렌드랩', contact_person:'마케팅팀장', proposal_summary:'트렌드랩 앱 광고 협찬', product:'트렌드랩 앱', conditions:'고정 단가 90만원 계약 완료' },
    ai_thread_context:'트렌드랩 앱 광고 계약 완료' },

  // t19: 그린코 협찬 (processed)
  { id:'t19', platform:'other_mail', message_type:'email', origin_id:'o49', origin_type:'sender',
    message_ids:['m78','m79','m80'], tags:['광고/협찬 제안'], priority_score:72, processed:true,
    last_message_at:'2026-04-15T11:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'그린코', brand:'그린코', contact_person:'홍보담당', proposal_summary:'친환경 제품 협찬 진행', product:'그린코 텀블러+에코백', conditions:'제품 협찬 완료' },
    ai_thread_context:'그린코 친환경 협찬 처리 완료' },

  // t20: 글로우업 추가 제안 (processed)
  { id:'t20', platform:'instagram', message_type:'dm', origin_id:'o4', origin_type:'sender',
    message_ids:['m81','m82','m83'], tags:['공구 제안'], priority_score:80, processed:true,
    last_message_at:'2026-04-14T15:00:00+09:00', is_stacked:false,
    business_extracted:{ company:'글로우업 코스메틱', brand:'글로우업', contact_person:'공구팀', proposal_summary:'파운데이션 공구 완료', product:'글로우업 파운데이션', conditions:'공구 완료, 결산 완료' },
    ai_thread_context:'글로우업 파운데이션 공구 완료' },

  // === OPS/CS THREADS (25 total: 20 unprocessed, 5 processed) ===
  // t21~t33: IG post comment threads (13개)
  { id:'t21', platform:'instagram', message_type:'comment', origin_id:'o13', origin_type:'post',
    message_ids:['m84','m85'], tags:['제품 질문'], priority_score:60, processed:false,
    last_message_at:'2026-05-02T10:00:00+09:00', is_stacked:false,
    ai_thread_context:'선크림 포스트 제품 질문' },

  { id:'t22', platform:'instagram', message_type:'comment', origin_id:'o13', origin_type:'post',
    message_ids:['m86','m87','m88'], tags:['구매 문의'], priority_score:55, processed:false,
    last_message_at:'2026-05-01T17:00:00+09:00', is_stacked:true,
    ai_thread_context:'선크림 포스트 구매 문의' },

  { id:'t23', platform:'instagram', message_type:'comment', origin_id:'o14', origin_type:'post',
    message_ids:['m89','m90'], tags:['제품 질문'], priority_score:58, processed:false,
    last_message_at:'2026-05-01T09:00:00+09:00', is_stacked:false,
    ai_thread_context:'스킨케어 루틴 포스트 성분 질문' },

  { id:'t24', platform:'youtube', message_type:'comment', origin_id:'o15', origin_type:'post',
    message_ids:['m91','m92'], tags:['링크 요청'], priority_score:52, processed:false,
    last_message_at:'2026-04-30T15:00:00+09:00', is_stacked:false,
    ai_thread_context:'봄 메이크업 영상 제품 링크 요청' },

  { id:'t25', platform:'instagram', message_type:'comment', origin_id:'o16', origin_type:'post',
    message_ids:['m93','m94','m95'], tags:['구매 문의','이벤트-오픈'], priority_score:68, processed:false,
    last_message_at:'2026-04-30T11:00:00+09:00', is_stacked:true,
    ai_thread_context:'공구 오픈 포스트 구매 문의' },

  { id:'t26', platform:'youtube', message_type:'comment', origin_id:'o17', origin_type:'post',
    message_ids:['m96','m97'], tags:['제품 질문'], priority_score:55, processed:false,
    last_message_at:'2026-04-29T14:00:00+09:00', is_stacked:false,
    ai_thread_context:'다이어트 영상 식단 제품 질문' },

  { id:'t27', platform:'instagram', message_type:'comment', origin_id:'o18', origin_type:'post',
    message_ids:['m98','m99'], tags:['제품 질문'], priority_score:57, processed:false,
    last_message_at:'2026-04-28T10:00:00+09:00', is_stacked:false,
    ai_thread_context:'파운데이션 리뷰 포스트 색상 질문' },

  { id:'t28', platform:'tiktok', message_type:'comment', origin_id:'o19', origin_type:'post',
    message_ids:['m100','m101'], tags:['링크 요청'], priority_score:53, processed:false,
    last_message_at:'2026-04-27T20:00:00+09:00', is_stacked:false,
    ai_thread_context:'틱톡 메이크업 챌린지 제품 링크 요청' },

  { id:'t29', platform:'instagram', message_type:'dm', origin_id:'o20', origin_type:'sender',
    message_ids:['m102','m103'], tags:['배송 문의'], priority_score:62, processed:false,
    last_message_at:'2026-04-26T13:00:00+09:00', is_stacked:false,
    ai_thread_context:'공구 배송 지연 문의' },

  { id:'t30', platform:'instagram', message_type:'dm', origin_id:'o21', origin_type:'sender',
    message_ids:['m104','m105'], tags:['CS/환불'], priority_score:65, processed:false,
    last_message_at:'2026-04-25T11:00:00+09:00', is_stacked:false,
    ai_thread_context:'제품 불량 환불 요청' },

  { id:'t31', platform:'youtube', message_type:'comment', origin_id:'o22', origin_type:'sender',
    message_ids:['m106','m107'], tags:['제품 질문'], priority_score:50, processed:false,
    last_message_at:'2026-04-24T09:00:00+09:00', is_stacked:false,
    ai_thread_context:'유튜브 구독자 제품 추천 질문' },

  { id:'t32', platform:'youtube', message_type:'comment', origin_id:'o15', origin_type:'post',
    message_ids:['m108','m109'], tags:['구매 문의'], priority_score:58, processed:false,
    last_message_at:'2026-04-23T10:00:00+09:00', is_stacked:false,
    ai_thread_context:'유튜브 봄 메이크업 영상 공구 링크 문의' },

  { id:'t33', platform:'naver_mail', message_type:'email', origin_id:'o24', origin_type:'sender',
    message_ids:['m110','m111'], tags:['CS/환불'], priority_score:63, processed:false,
    last_message_at:'2026-04-22T14:00:00+09:00', is_stacked:false,
    ai_thread_context:'네이버 메일 환불 처리 요청' },

  { id:'t34', platform:'instagram', message_type:'comment', origin_id:'o54', origin_type:'post',
    message_ids:['m112','m113'], tags:['제품 질문'], priority_score:54, processed:false,
    last_message_at:'2026-04-21T11:00:00+09:00', is_stacked:false,
    ai_thread_context:'하울 영상 포스트 제품명 질문' },

  { id:'t35', platform:'instagram', message_type:'dm', origin_id:'o55', origin_type:'sender',
    message_ids:['m114','m115'], tags:['링크 요청'], priority_score:51, processed:false,
    last_message_at:'2026-04-20T13:00:00+09:00', is_stacked:false,
    ai_thread_context:'인스타 DM 링크 요청' },

  { id:'t36', platform:'instagram', message_type:'dm', origin_id:'o56', origin_type:'sender',
    message_ids:['m116','m117'], tags:['배송 문의'], priority_score:60, processed:false,
    last_message_at:'2026-04-19T10:00:00+09:00', is_stacked:false,
    ai_thread_context:'배송 주소 변경 문의' },

  { id:'t37', platform:'youtube', message_type:'comment', origin_id:'o51', origin_type:'sender',
    message_ids:['m118','m119'], tags:['제품 질문'], priority_score:53, processed:false,
    last_message_at:'2026-04-18T15:00:00+09:00', is_stacked:false,
    ai_thread_context:'유튜브 댓글 제품 추천 요청' },

  { id:'t38', platform:'instagram', message_type:'comment', origin_id:'o13', origin_type:'post',
    message_ids:['m120','m121'], tags:['구매 문의'], priority_score:57, processed:false,
    last_message_at:'2026-04-17T10:00:00+09:00', is_stacked:false,
    ai_thread_context:'선크림 포스트 추가 구매 문의' },

  { id:'t39', platform:'instagram', message_type:'comment', origin_id:'o14', origin_type:'post',
    message_ids:['m122','m123'], tags:['제품 질문'], priority_score:55, processed:false,
    last_message_at:'2026-04-16T09:00:00+09:00', is_stacked:false,
    ai_thread_context:'스킨케어 루틴 성분 추가 질문' },

  { id:'t40', platform:'instagram', message_type:'comment', origin_id:'o16', origin_type:'post',
    message_ids:['m124','m125','m126'], tags:['구매 문의','이벤트-오픈'], priority_score:67, processed:false,
    last_message_at:'2026-04-15T14:00:00+09:00', is_stacked:true,
    ai_thread_context:'공구 포스트 재고 문의' },

  // t41~t45: processed OPS threads
  { id:'t41', platform:'youtube', message_type:'comment', origin_id:'o15', origin_type:'post',
    message_ids:['m127','m128','m129'], tags:['링크 요청'], priority_score:52, processed:true,
    last_message_at:'2026-04-14T10:00:00+09:00', is_stacked:false,
    ai_thread_context:'봄 메이크업 영상 링크 처리 완료' },

  { id:'t42', platform:'instagram', message_type:'dm', origin_id:'o52', origin_type:'sender',
    message_ids:['m130','m131','m132'], tags:['CS/환불'], priority_score:63, processed:true,
    last_message_at:'2026-04-13T11:00:00+09:00', is_stacked:false,
    ai_thread_context:'CS 환불 처리 완료' },

  { id:'t43', platform:'youtube', message_type:'comment', origin_id:'o17', origin_type:'post',
    message_ids:['m133','m134','m135'], tags:['배송 문의'], priority_score:58, processed:true,
    last_message_at:'2026-04-12T14:00:00+09:00', is_stacked:false,
    ai_thread_context:'다이어트 영상 유튜브 댓글 배송 문의 처리 완료' },

  { id:'t44', platform:'youtube', message_type:'comment', origin_id:'o17', origin_type:'post',
    message_ids:['m136','m137'], tags:['제품 질문'], priority_score:55, processed:true,
    last_message_at:'2026-04-11T10:00:00+09:00', is_stacked:false,
    ai_thread_context:'다이어트 영상 댓글 처리 완료' },

  { id:'t45', platform:'naver_mail', message_type:'email', origin_id:'o24', origin_type:'sender',
    message_ids:['m138','m139'], tags:['구매 문의'], priority_score:56, processed:true,
    last_message_at:'2026-04-10T09:00:00+09:00', is_stacked:false,
    ai_thread_context:'네이버 구매 문의 처리 완료' },

  // === SOCIAL THREADS (20 total: 16 unprocessed, 4 processed) ===
  { id:'t46', platform:'instagram', message_type:'dm', origin_id:'o25', origin_type:'sender',
    message_ids:['m140','m141'], tags:['셀럽','VIP'], priority_score:85, processed:false,
    last_message_at:'2026-05-02T14:00:00+09:00', is_stacked:false,
    ai_thread_context:'셀럽 유나 콜라보 제안 DM' },

  { id:'t47', platform:'instagram', message_type:'dm', origin_id:'o26', origin_type:'sender',
    message_ids:['m142','m143'], tags:['VIP팬'], priority_score:45, processed:false,
    last_message_at:'2026-05-01T20:00:00+09:00', is_stacked:false,
    ai_thread_context:'VIP팬 지수 응원 DM' },

  { id:'t48', platform:'youtube', message_type:'comment', origin_id:'o27', origin_type:'sender',
    message_ids:['m144','m145'], tags:['일반팬'], priority_score:35, processed:false,
    last_message_at:'2026-05-01T11:00:00+09:00', is_stacked:false,
    ai_thread_context:'유튜브 팬 서진 응원 댓글' },

  { id:'t49', platform:'instagram', message_type:'dm', origin_id:'o28', origin_type:'sender',
    message_ids:['m146','m147'], tags:['브랜드'], priority_score:42, processed:false,
    last_message_at:'2026-04-30T13:00:00+09:00', is_stacked:false,
    ai_thread_context:'브랜드 콜라보 비공식 DM' },

  { id:'t50', platform:'tiktok', message_type:'dm', origin_id:'o29', origin_type:'sender',
    message_ids:['m148','m149'], tags:['일반팬'], priority_score:33, processed:false,
    last_message_at:'2026-04-29T21:00:00+09:00', is_stacked:false,
    ai_thread_context:'틱톡 팬 나리 응원 메시지' },

  { id:'t51', platform:'instagram', message_type:'dm', origin_id:'o30', origin_type:'sender',
    message_ids:['m150','m151'], tags:['고민상담'], priority_score:38, processed:false,
    last_message_at:'2026-04-28T19:00:00+09:00', is_stacked:false,
    ai_thread_context:'팬 민지 피부 고민 상담 DM' },

  { id:'t52', platform:'instagram', message_type:'dm', origin_id:'o31', origin_type:'sender',
    message_ids:['m152','m153'], tags:['콘텐츠 요청'], priority_score:36, processed:false,
    last_message_at:'2026-04-27T18:00:00+09:00', is_stacked:false,
    ai_thread_context:'팬 은비 콘텐츠 요청 DM' },

  { id:'t53', platform:'youtube', message_type:'comment', origin_id:'o32', origin_type:'sender',
    message_ids:['m154','m155'], tags:['일반팬'], priority_score:34, processed:false,
    last_message_at:'2026-04-26T10:00:00+09:00', is_stacked:false,
    ai_thread_context:'유튜브 팬 수연 긍정 댓글' },

  { id:'t54', platform:'instagram', message_type:'dm', origin_id:'o33', origin_type:'sender',
    message_ids:['m156','m157'], tags:['고민상담'], priority_score:37, processed:false,
    last_message_at:'2026-04-25T20:00:00+09:00', is_stacked:false,
    ai_thread_context:'팬 다혜 다이어트 고민 상담' },

  { id:'t55', platform:'instagram', message_type:'dm', origin_id:'o34', origin_type:'sender',
    message_ids:['m158','m159'], tags:['VIP팬'], priority_score:43, processed:false,
    last_message_at:'2026-04-24T17:00:00+09:00', is_stacked:false,
    ai_thread_context:'VIP팬 채린 생일 축하 DM' },

  { id:'t56', platform:'instagram', message_type:'dm', origin_id:'o35', origin_type:'sender',
    message_ids:['m160','m161'], tags:['셀럽'], priority_score:82, processed:false,
    last_message_at:'2026-04-23T15:00:00+09:00', is_stacked:false,
    ai_thread_context:'셀럽 지연 협업 문의 DM' },

  { id:'t57', platform:'instagram', message_type:'dm', origin_id:'o50', origin_type:'sender',
    message_ids:['m162','m163'], tags:['일반팬'], priority_score:32, processed:false,
    last_message_at:'2026-04-22T12:00:00+09:00', is_stacked:false,
    ai_thread_context:'팬 연희 일상 공유 DM' },

  { id:'t58', platform:'instagram', message_type:'comment', origin_id:'o13', origin_type:'post',
    message_ids:['m164','m165'], tags:['일반팬'], priority_score:31, processed:false,
    last_message_at:'2026-04-21T10:00:00+09:00', is_stacked:false,
    ai_thread_context:'선크림 포스트 팬 응원 댓글' },

  { id:'t59', platform:'youtube', message_type:'comment', origin_id:'o15', origin_type:'post',
    message_ids:['m166','m167'], tags:['콘텐츠 요청'], priority_score:35, processed:false,
    last_message_at:'2026-04-20T09:00:00+09:00', is_stacked:false,
    ai_thread_context:'유튜브 봄 메이크업 영상 요청 댓글' },

  { id:'t60', platform:'tiktok', message_type:'comment', origin_id:'o19', origin_type:'post',
    message_ids:['m168','m169'], tags:['일반팬'], priority_score:33, processed:false,
    last_message_at:'2026-04-19T20:00:00+09:00', is_stacked:false,
    ai_thread_context:'틱톡 챌린지 응원 댓글' },

  { id:'t61', platform:'instagram', message_type:'dm', origin_id:'o53', origin_type:'sender',
    message_ids:['m170','m171'], tags:['브랜드'], priority_score:40, processed:false,
    last_message_at:'2026-04-18T14:00:00+09:00', is_stacked:false,
    ai_thread_context:'브랜드 팬 태연 협업 문의' },

  // t62~t65: processed SOCIAL threads
  { id:'t62', platform:'instagram', message_type:'dm', origin_id:'o26', origin_type:'sender',
    message_ids:['m172','m173','m174'], tags:['VIP팬'], priority_score:44, processed:true,
    last_message_at:'2026-04-17T11:00:00+09:00', is_stacked:false,
    ai_thread_context:'VIP팬 팬미팅 감사 DM 처리 완료' },

  { id:'t63', platform:'youtube', message_type:'comment', origin_id:'o27', origin_type:'sender',
    message_ids:['m175','m176'], tags:['일반팬'], priority_score:34, processed:true,
    last_message_at:'2026-04-16T10:00:00+09:00', is_stacked:false,
    ai_thread_context:'유튜브 팬 댓글 답변 완료' },

  { id:'t64', platform:'instagram', message_type:'dm', origin_id:'o30', origin_type:'sender',
    message_ids:['m177','m178'], tags:['고민상담'], priority_score:38, processed:true,
    last_message_at:'2026-04-15T18:00:00+09:00', is_stacked:false,
    ai_thread_context:'팬 고민상담 답변 완료' },

  { id:'t65', platform:'instagram', message_type:'comment', origin_id:'o18', origin_type:'post',
    message_ids:['m179','m180'], tags:['일반팬'], priority_score:32, processed:true,
    last_message_at:'2026-04-14T09:00:00+09:00', is_stacked:false,
    ai_thread_context:'파운데이션 리뷰 포스트 팬 댓글 완료' },

  // === DIRECT CHECK THREADS (9 total: 7 unprocessed, 2 processed) ===
  { id:'t66', platform:'instagram', message_type:'dm', origin_id:'o36', origin_type:'sender',
    message_ids:['m181','m182'], tags:[], priority_score:28, processed:false,
    last_message_at:'2026-05-02T18:00:00+09:00', is_stacked:false,
    ai_thread_context:'미분류 인스타 DM 확인 필요' },

  { id:'t67', platform:'instagram', message_type:'dm', origin_id:'o37', origin_type:'sender',
    message_ids:['m183','m184'], tags:[], priority_score:25, processed:false,
    last_message_at:'2026-05-01T16:00:00+09:00', is_stacked:false,
    ai_thread_context:'서브 계정 미분류 DM' },

  { id:'t68', platform:'youtube', message_type:'comment', origin_id:'o15', origin_type:'post',
    message_ids:['m185','m186'], tags:[], priority_score:22, processed:false,
    last_message_at:'2026-04-30T12:00:00+09:00', is_stacked:false,
    ai_thread_context:'유튜브 봄 메이크업 영상 댓글 내용 불명확' },

  { id:'t69', platform:'tiktok', message_type:'dm', origin_id:'o39', origin_type:'sender',
    message_ids:['m187','m188'], tags:[], priority_score:20, processed:false,
    last_message_at:'2026-04-29T10:00:00+09:00', is_stacked:false,
    ai_thread_context:'틱톡 익명 DM 문의 대기' },

  { id:'t70', platform:'other_mail', message_type:'email', origin_id:'o40', origin_type:'sender',
    message_ids:['m189','m190'], tags:[], priority_score:22, processed:false,
    last_message_at:'2026-04-28T14:00:00+09:00', is_stacked:false,
    ai_thread_context:'기타 메일 도메인 불명확' },

  { id:'t71', platform:'tiktok', message_type:'dm', origin_id:'o41', origin_type:'sender',
    message_ids:['m191','m192'], tags:[], priority_score:21, processed:false,
    last_message_at:'2026-04-27T19:00:00+09:00', is_stacked:false,
    ai_thread_context:'틱톡 익명 DM 분류 불가' },

  { id:'t72', platform:'instagram', message_type:'dm', origin_id:'o42', origin_type:'sender',
    message_ids:['m193','m194'], tags:[], priority_score:24, processed:false,
    last_message_at:'2026-04-26T11:00:00+09:00', is_stacked:false,
    ai_thread_context:'신규 사용자 DM 직접 확인' },

  // t73~t74: processed DIRECT threads
  { id:'t73', platform:'instagram', message_type:'dm', origin_id:'o36', origin_type:'sender',
    message_ids:['m195','m196','m197'], tags:[], priority_score:26, processed:true,
    last_message_at:'2026-04-24T15:00:00+09:00', is_stacked:false,
    ai_thread_context:'미분류 DM 직접 확인 완료' },

  { id:'t74', platform:'youtube', message_type:'comment', origin_id:'o17', origin_type:'post',
    message_ids:['m198','m199','m200'], tags:[], priority_score:23, processed:true,
    last_message_at:'2026-04-22T10:00:00+09:00', is_stacked:false,
    ai_thread_context:'다이어트 영상 유튜브 댓글 직접 확인 완료' },
];

const messages = [
  // ===== BUSINESS LONG THREAD 1: t1 루미에 뷰티 협찬 협상 A→B→C→B→D =====
  // Phase A: 첫 인사·제안 (m1~m4)
  { id:'m1', thread_id:'t1', sender_id:'partner@lumiebeauty.co.kr', direction:'incoming',
    body:'안녕하세요, 루미에 뷰티 마케팅팀입니다. 인플루언서 협찬 제안 드리고 싶어 연락드립니다.',
    attachments:[{ name:'루미에_협찬제안서_2026.pdf', type:'pdf' }],
    sent_at:'2026-04-14T10:00:00+09:00', read_at:'2026-04-14T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'루미에 협찬 첫 제안 수신', ai_context_cumulative:'루미에 첫 협찬 제안 수신' },

  { id:'m2', thread_id:'t1', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'안녕하세요! 관심 가져주셔서 감사합니다. 제안서 확인 후 연락드리겠습니다.',
    attachments:[], sent_at:'2026-04-14T14:00:00+09:00', read_at:null, processed_at:'2026-04-14T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'루미에 제안 수신 확인 답장', ai_context_cumulative:'루미에 제안 수신 확인 중' },

  { id:'m3', thread_id:'t1', sender_id:'partner@lumiebeauty.co.kr', direction:'incoming',
    body:'감사합니다! 피드 3회, 스토리 5회 조건입니다. 단가는 회당 100만원 기준으로 제안드립니다.',
    attachments:[], sent_at:'2026-04-15T09:00:00+09:00', read_at:'2026-04-15T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'피드/스토리 단가 100만원 제안', ai_context_cumulative:'루미에 단가 100만원 협의 시작' },

  { id:'m4', thread_id:'t1', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'제안 내용 확인했습니다. 단가 부분에서 조율이 필요할 것 같습니다. 검토 후 회신드릴게요.',
    attachments:[], sent_at:'2026-04-15T15:00:00+09:00', read_at:null, processed_at:'2026-04-15T15:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'단가 조율 필요 의사 전달', ai_context_cumulative:'루미에 단가 조율 의사 전달' },

  // Phase B: 단가 협의 (m5~m8)
  { id:'m5', thread_id:'t1', sender_id:'partner@lumiebeauty.co.kr', direction:'incoming',
    body:'혹시 단가 기준이 어떻게 되시나요? 저희도 유연하게 협의할 용의가 있습니다.',
    attachments:[], sent_at:'2026-04-16T10:00:00+09:00', read_at:'2026-04-16T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'루미에 단가 기준 질의', ai_context_cumulative:'루미에 단가 기준 상호 협의 중' },

  { id:'m6', thread_id:'t1', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'피드 기준 80만원, 스토리 기준 30만원으로 협의 가능합니다. 전체 패키지 350만원 제안드립니다.',
    attachments:[], sent_at:'2026-04-16T16:00:00+09:00', read_at:null, processed_at:'2026-04-16T16:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'피드 80만+스토리 30만 역제안', ai_context_cumulative:'루미에 역단가 350만원 역제안' },

  { id:'m7', thread_id:'t1', sender_id:'partner@lumiebeauty.co.kr', direction:'incoming',
    body:'감사합니다. 피드 3회 80만원은 수용 가능하나 스토리 30만원은 좀 높습니다. 25만원으로 가능할까요?',
    attachments:[], sent_at:'2026-04-17T09:30:00+09:00', read_at:'2026-04-17T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'스토리 단가 25만원 역제안', ai_context_cumulative:'루미에 스토리 25만원 역제안 중' },

  { id:'m8', thread_id:'t1', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'스토리 25만원으로 진행 가능합니다. 최종 단가 피드 80만+스토리 25만 확인하겠습니다.',
    attachments:[], sent_at:'2026-04-17T14:00:00+09:00', read_at:null, processed_at:'2026-04-17T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'스토리 25만원 단가 수용', ai_context_cumulative:'루미에 단가 합의 피드80+스토리25' },

  // Phase C: 일정 조정 (m9~m12)
  { id:'m9', thread_id:'t1', sender_id:'partner@lumiebeauty.co.kr', direction:'incoming',
    body:'단가 합의 감사드립니다. 콘텐츠 업로드 일정은 5월 1~3주차 가능하실까요?',
    attachments:[], sent_at:'2026-04-18T10:00:00+09:00', read_at:'2026-04-18T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'5월 업로드 일정 제안', ai_context_cumulative:'단가 합의 후 5월 일정 논의 시작' },

  { id:'m10', thread_id:'t1', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'5월 2주차(12~16일)에 피드 2회, 3주차(19~23일)에 피드 1회+스토리 일정으로 제안드립니다.',
    attachments:[], sent_at:'2026-04-18T15:00:00+09:00', read_at:null, processed_at:'2026-04-18T15:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'5월 2~3주차 업로드 일정 제안', ai_context_cumulative:'5월 2~3주차 콘텐츠 일정 협의 중' },

  { id:'m11', thread_id:'t1', sender_id:'partner@lumiebeauty.co.kr', direction:'incoming',
    body:'3주차는 저희 신제품 출시일과 겹칩니다. 5월 2주차에 집중하는 방향은 어떨까요?',
    attachments:[], sent_at:'2026-04-19T09:00:00+09:00', read_at:'2026-04-19T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'3주차 겹침 2주차 집중 요청', ai_context_cumulative:'루미에 신제품 출시 일정 충돌로 재조정 요청' },

  { id:'m12', thread_id:'t1', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'확인했습니다. 5월 2주차에 피드 3회+스토리 5회 모두 업로드하는 일정으로 진행하겠습니다.',
    attachments:[], sent_at:'2026-04-19T14:00:00+09:00', read_at:null, processed_at:'2026-04-19T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'5월 2주차 집중 일정 확정', ai_context_cumulative:'5월 2주차 전체 업로드 일정 확정' },

  // Phase B2: 단가 재조정 (m13~m16)
  { id:'m13', thread_id:'t1', sender_id:'partner@lumiebeauty.co.kr', direction:'incoming',
    body:'죄송합니다. 내부 검토 결과 예산이 변경되어 피드 단가를 70만원으로 조정 요청드립니다.',
    attachments:[], sent_at:'2026-04-22T10:00:00+09:00', read_at:'2026-04-22T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안','중요'], ai_context_solo:'예산 변경으로 피드 70만 재요청', ai_context_cumulative:'일정 확정 후 루미에 단가 재인하 요청' },

  { id:'m14', thread_id:'t1', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'예산 변경은 이해하지만 이미 합의된 단가 변경은 어렵습니다. 피드 80만원 유지 요청드립니다.',
    attachments:[], sent_at:'2026-04-22T16:00:00+09:00', read_at:null, processed_at:'2026-04-22T16:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안','중요'], ai_context_solo:'합의 단가 80만원 유지 요청', ai_context_cumulative:'루미에 단가 인하 요청 거절, 재협상 중' },

  { id:'m15', thread_id:'t1', sender_id:'partner@lumiebeauty.co.kr', direction:'incoming',
    body:'이해합니다. 피드 75만원 + 스토리 25만원으로 절충안을 제안드립니다. 검토 부탁드립니다.',
    attachments:[], sent_at:'2026-04-23T10:00:00+09:00', read_at:'2026-04-23T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안','중요'], ai_context_solo:'피드 75만+스토리 25만 절충안 제안', ai_context_cumulative:'루미에 피드 75만 절충안 협의 중' },

  { id:'m16', thread_id:'t1', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'피드 75만원+스토리 25만원 절충안 수용합니다. 최종 확인 계약서 공유 부탁드립니다.',
    attachments:[], sent_at:'2026-04-24T09:00:00+09:00', read_at:null, processed_at:'2026-04-24T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안','중요'], ai_context_solo:'절충안 수용 계약서 요청', ai_context_cumulative:'루미에 최종 단가 피드75+스토리25 합의' },

  // Phase D: 계약·후속 (m17~m20)
  { id:'m17', thread_id:'t1', sender_id:'partner@lumiebeauty.co.kr', direction:'incoming',
    body:'계약서 초안 첨부드립니다. 검토 후 서명 부탁드립니다.',
    attachments:[{ name:'루미에_계약서_초안_2026.pdf', type:'pdf' }],
    sent_at:'2026-04-25T10:00:00+09:00', read_at:'2026-04-25T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안','중요'], ai_context_solo:'계약서 초안 수신', ai_context_cumulative:'루미에 계약서 검토 단계 진입' },

  { id:'m18', thread_id:'t1', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'계약서 검토 완료했습니다. 3항 결제 조건 수정 필요합니다. 수정본 첨부드립니다.',
    attachments:[{ name:'루미에_계약서_수정본.pdf', type:'pdf' }],
    sent_at:'2026-04-28T14:00:00+09:00', read_at:null, processed_at:'2026-04-28T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안','중요'], ai_context_solo:'계약서 수정 조건 전달', ai_context_cumulative:'루미에 계약서 수정안 송부' },

  { id:'m19', thread_id:'t1', sender_id:'partner@lumiebeauty.co.kr', direction:'incoming',
    body:'수정안 확인했습니다. 3항 수정 내용 수용합니다. 최종 계약서 날인 후 보내드리겠습니다.',
    attachments:[], sent_at:'2026-04-30T10:00:00+09:00', read_at:'2026-04-30T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안','중요'], ai_context_solo:'수정 계약서 수용 날인 예정', ai_context_cumulative:'루미에 계약 최종 확인 날인 대기' },

  { id:'m20', thread_id:'t1', sender_id:'partner@lumiebeauty.co.kr', direction:'incoming',
    body:'날인 완료된 계약서 첨부드립니다. 5월 2주차에 제품 발송 예정입니다. 잘 부탁드립니다!',
    attachments:[{ name:'루미에_최종계약서_날인완료.pdf', type:'pdf' }],
    sent_at:'2026-05-02T16:30:00+09:00', read_at:'2026-05-02T17:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안','중요'], ai_context_solo:'최종 계약서 수신 제품 발송 예정', ai_context_cumulative:'루미에 계약 체결 완료, 5월 2주차 발송 예정' },

  // ===== BUSINESS LONG THREAD 2: t2 스킨핏 공구 협업 A→B→C→B→D =====
  // Phase A: 공구 제안 (m21~m24)
  { id:'m21', thread_id:'t2', sender_id:'@skinfit_official', direction:'incoming',
    body:'안녕하세요! 스킨핏 공구팀입니다. 마스크팩 한정 공구 협업 제안드립니다.',
    attachments:[], sent_at:'2026-04-12T10:00:00+09:00', read_at:'2026-04-12T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'스킨핏 공구 첫 제안 수신', ai_context_cumulative:'스킨핏 공구 제안 수신' },

  { id:'m22', thread_id:'t2', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'안녕하세요! 공구 제안 감사합니다. 상세 조건 알려주시면 검토해볼게요.',
    attachments:[], sent_at:'2026-04-12T14:00:00+09:00', read_at:null, processed_at:'2026-04-12T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'공구 조건 상세 요청', ai_context_cumulative:'스킨핏 공구 조건 확인 요청' },

  { id:'m23', thread_id:'t2', sender_id:'@skinfit_official', direction:'incoming',
    body:'500개 한정, 마스크팩 10종 세트입니다. 마진 30% 제공, 판매가 25,000원 제안드립니다.',
    attachments:[{ name:'스킨핏_공구제안서.pdf', type:'pdf' }],
    sent_at:'2026-04-13T09:00:00+09:00', read_at:'2026-04-13T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'마진 30%, 25000원 공구 조건 제시', ai_context_cumulative:'스킨핏 마진 30% 공구 조건 확인' },

  { id:'m24', thread_id:'t2', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'조건 확인했습니다. 수량과 마진 부분 좀 더 논의가 필요할 것 같습니다.',
    attachments:[], sent_at:'2026-04-13T15:00:00+09:00', read_at:null, processed_at:'2026-04-13T15:00:00+09:00', depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'수량·마진 추가 논의 의사', ai_context_cumulative:'스킨핏 공구 수량·마진 협의 시작' },

  // Phase B: 수량·마진 협의 (m25~m28)
  { id:'m25', thread_id:'t2', sender_id:'@skinfit_official', direction:'incoming',
    body:'수량은 최소 300개부터 가능합니다. 마진은 최대 35%까지 가능합니다.',
    attachments:[], sent_at:'2026-04-14T10:00:00+09:00', read_at:'2026-04-14T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'최소 300개 마진 35% 수용 가능', ai_context_cumulative:'스킨핏 수량 300개 마진 35% 협의 중' },

  { id:'m26', thread_id:'t2', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'300개, 마진 35%로 진행하겠습니다. 판매가는 22,000원으로 낮추는 건 가능한가요?',
    attachments:[], sent_at:'2026-04-14T16:00:00+09:00', read_at:null, processed_at:'2026-04-14T16:00:00+09:00', depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'판매가 22000원 인하 역제안', ai_context_cumulative:'스킨핏 300개 마진 35%+판매가 22000 역제안' },

  { id:'m27', thread_id:'t2', sender_id:'@skinfit_official', direction:'incoming',
    body:'판매가 22,000원은 수익 구조상 어렵습니다. 23,500원으로 절충은 가능합니다.',
    attachments:[], sent_at:'2026-04-15T09:30:00+09:00', read_at:'2026-04-15T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'판매가 23500원 절충안', ai_context_cumulative:'스킨핏 판매가 23500 절충안 협의' },

  { id:'m28', thread_id:'t2', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'23,500원, 마진 35%로 확정하겠습니다. 다음 단계 진행해주세요.',
    attachments:[], sent_at:'2026-04-15T14:00:00+09:00', read_at:null, processed_at:'2026-04-15T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'23500원 마진 35% 합의', ai_context_cumulative:'스킨핏 공구 단가·마진 1차 합의' },

  // Phase C: 디자인 검토 (m29~m32)
  { id:'m29', thread_id:'t2', sender_id:'@skinfit_official', direction:'incoming',
    body:'공구 상세 페이지 디자인 초안 공유드립니다. 수정 사항 있으면 알려주세요.',
    attachments:[{ name:'스킨핏_공구페이지_디자인초안.jpg', type:'image' }],
    sent_at:'2026-04-17T10:00:00+09:00', read_at:'2026-04-17T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'공구 디자인 초안 수신', ai_context_cumulative:'합의 후 공구 디자인 검토 단계 진입' },

  { id:'m30', thread_id:'t2', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'디자인 확인했습니다. 썸네일 텍스트 폰트 변경 요청드립니다. 볼드체로 수정 부탁드려요.',
    attachments:[], sent_at:'2026-04-17T16:00:00+09:00', read_at:null, processed_at:'2026-04-17T16:00:00+09:00', depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'썸네일 폰트 볼드 수정 요청', ai_context_cumulative:'스킨핏 공구 디자인 수정 요청' },

  { id:'m31', thread_id:'t2', sender_id:'@skinfit_official', direction:'incoming',
    body:'폰트 수정 완료했습니다. 최종 디자인 확인 부탁드립니다.',
    attachments:[{ name:'스킨핏_공구페이지_수정본.jpg', type:'image' }],
    sent_at:'2026-04-18T10:00:00+09:00', read_at:'2026-04-18T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'디자인 수정본 수신', ai_context_cumulative:'스킨핏 공구 디자인 최종 검토 중' },

  { id:'m32', thread_id:'t2', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'수정본 확인했습니다. 디자인 최종 승인합니다. 진행해 주세요.',
    attachments:[], sent_at:'2026-04-18T14:00:00+09:00', read_at:null, processed_at:'2026-04-18T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'공구 디자인 최종 승인', ai_context_cumulative:'스킨핏 디자인 승인, 발주 단계 대기' },

  // Phase B2: 마진 재조정 (m33~m36)
  { id:'m33', thread_id:'t2', sender_id:'@skinfit_official', direction:'incoming',
    body:'죄송합니다, 원자재 가격 인상으로 마진을 30%로 조정해야 할 것 같습니다.',
    attachments:[], sent_at:'2026-04-22T09:00:00+09:00', read_at:'2026-04-22T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'원자재 인상으로 마진 30% 재요청', ai_context_cumulative:'디자인 승인 후 마진 재인하 요청 발생' },

  { id:'m34', thread_id:'t2', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'이미 합의된 35%에서 변경은 어렵습니다. 최소 32%는 유지해야 합니다.',
    attachments:[], sent_at:'2026-04-22T15:00:00+09:00', read_at:null, processed_at:'2026-04-22T15:00:00+09:00', depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'마진 최소 32% 유지 요구', ai_context_cumulative:'스킨핏 마진 재협상 32% 역제안' },

  { id:'m35', thread_id:'t2', sender_id:'@skinfit_official', direction:'incoming',
    body:'32%로 타협하겠습니다. 최종 마진 32%, 판매가 23,500원으로 확정하겠습니다.',
    attachments:[], sent_at:'2026-04-23T10:00:00+09:00', read_at:'2026-04-23T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'마진 32% 최종 합의', ai_context_cumulative:'스킨핏 마진 32% 재합의 완료' },

  { id:'m36', thread_id:'t2', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'마진 32% 확인했습니다. 최종 조건 확정 후 발주 진행해 주세요.',
    attachments:[], sent_at:'2026-04-23T14:00:00+09:00', read_at:null, processed_at:'2026-04-23T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'마진 확인 발주 요청', ai_context_cumulative:'스킨핏 마진 재합의 후 발주 대기' },

  // Phase D: 발주·런칭 (m37~m40)
  { id:'m37', thread_id:'t2', sender_id:'@skinfit_official', direction:'incoming',
    body:'발주 진행 완료했습니다. 런칭 예정일은 5월 10일입니다. 홍보 게시물 준비 부탁드립니다.',
    attachments:[], sent_at:'2026-04-28T10:00:00+09:00', read_at:'2026-04-28T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'발주 완료 런칭 5월10일 안내', ai_context_cumulative:'스킨핏 발주 완료 런칭 준비 단계' },

  { id:'m38', thread_id:'t2', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'런칭일 확인했습니다. 5월 9일 선공개 스토리, 10일 피드 업로드로 진행하겠습니다.',
    attachments:[], sent_at:'2026-04-28T15:00:00+09:00', read_at:null, processed_at:'2026-04-28T15:00:00+09:00', depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'5월 9일 선공개 10일 피드 계획', ai_context_cumulative:'스킨핏 런칭 홍보 일정 확정' },

  { id:'m39', thread_id:'t2', sender_id:'@skinfit_official', direction:'incoming',
    body:'홍보 일정 완벽합니다! 제품은 5월 7일에 발송 예정입니다. 잘 부탁드립니다.',
    attachments:[], sent_at:'2026-04-30T09:00:00+09:00', read_at:'2026-04-30T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'제품 5월7일 발송 예정', ai_context_cumulative:'스킨핏 공구 런칭 D-10, 발송 일정 확정' },

  { id:'m40', thread_id:'t2', sender_id:'@skinfit_official', direction:'incoming',
    body:'추가로 런칭 당일 라이브 방송 가능하신지요? 협의 가능하면 별도 사례금 검토하겠습니다.',
    attachments:[], sent_at:'2026-05-02T11:00:00+09:00', read_at:'2026-05-02T12:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'런칭 라이브 방송 추가 제안', ai_context_cumulative:'스킨핏 공구 런칭 추가 라이브 방송 요청' },
  // ===== BUSINESS SHORT THREADS (t3~t20) =====
  // t3: 핏랩 협찬 (2 msgs)
  { id:'m41', thread_id:'t3', sender_id:'collab@fitlab.kr', direction:'incoming',
    body:'안녕하세요, 핏랩입니다. 유튜브 운동 채널 협찬 제안드립니다. 단백질 쉐이크 60만원 제안.',
    attachments:[{ name:'핏랩_제안서.pdf', type:'pdf' }],
    sent_at:'2026-05-01T10:00:00+09:00', read_at:'2026-05-01T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'핏랩 단백질쉐이크 협찬 60만 제안', ai_context_cumulative:'핏랩 유튜브 협찬 제안 수신' },
  { id:'m42', thread_id:'t3', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'제안 감사합니다. 검토 후 회신드리겠습니다.',
    attachments:[], sent_at:'2026-05-01T14:00:00+09:00', read_at:null, processed_at:'2026-05-01T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'핏랩 제안 검토 후 회신 예정', ai_context_cumulative:'핏랩 협찬 검토 진행 중' },

  // t4: 글로우업 시딩 (2 msgs)
  { id:'m43', thread_id:'t4', sender_id:'@glowup_cosmetics', direction:'incoming',
    body:'안녕하세요! 글로우업 신제품 쿠션 시딩 제안드립니다. 5종 발송 의향 있으세요?',
    attachments:[], sent_at:'2026-04-30T09:00:00+09:00', read_at:'2026-04-30T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['시딩 제안'], ai_context_solo:'글로우업 신쿠션 시딩 5종 제안', ai_context_cumulative:'글로우업 시딩 제안 수신' },
  { id:'m44', thread_id:'t4', sender_id:'@jiwoo_beauty', direction:'outgoing',
    body:'시딩 제안 감사합니다! 주소 전달드릴게요.',
    attachments:[], sent_at:'2026-04-30T10:00:00+09:00', read_at:null, processed_at:'2026-04-30T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['시딩 제안'], ai_context_solo:'시딩 수락 주소 전달', ai_context_cumulative:'글로우업 시딩 수락' },

  // t5: 하루케어 협찬 (3 msgs)
  { id:'m45', thread_id:'t5', sender_id:'biz@harucare.com', direction:'incoming',
    body:'안녕하세요, 하루케어입니다. 수분크림 협찬 제안드립니다. 단가 협의 가능합니다.',
    attachments:[], sent_at:'2026-04-29T09:00:00+09:00', read_at:'2026-04-29T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'하루케어 수분크림 협찬 문의', ai_context_cumulative:'하루케어 협찬 제안 수신' },
  { id:'m46', thread_id:'t5', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'안녕하세요! 단가 기준 알려주시면 검토해볼게요.',
    attachments:[], sent_at:'2026-04-29T14:00:00+09:00', read_at:null, processed_at:'2026-04-29T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'하루케어 단가 기준 요청', ai_context_cumulative:'하루케어 단가 협의 시작' },
  { id:'m47', thread_id:'t5', sender_id:'biz@harucare.com', direction:'incoming',
    body:'피드 1회 기준 70만원 제안드립니다. 협의 가능합니다.',
    attachments:[], sent_at:'2026-04-29T15:00:00+09:00', read_at:'2026-04-29T16:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'피드 1회 70만원 단가 제안', ai_context_cumulative:'하루케어 단가 70만원 제안 검토 중' },

  // t6: 프레시스킨 전속 모델 (3 msgs, 중요)
  { id:'m48', thread_id:'t6', sender_id:'ad@freshskin.co.kr', direction:'incoming',
    body:'안녕하세요, 프레시스킨 대표입니다. 전속 모델 제안 드립니다. 월 200만원 조건입니다.',
    attachments:[{ name:'프레시스킨_전속계약_제안.pdf', type:'pdf' }],
    sent_at:'2026-04-28T09:00:00+09:00', read_at:'2026-04-28T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안','중요'], ai_context_solo:'프레시스킨 전속 월 200만 제안', ai_context_cumulative:'프레시스킨 전속 모델 제안 수신' },
  { id:'m49', thread_id:'t6', sender_id:'contact@jiwoo-brand.kr', direction:'outgoing',
    body:'전속 제안 감사합니다. 세부 조건 확인 후 답변드리겠습니다.',
    attachments:[], sent_at:'2026-04-28T14:00:00+09:00', read_at:null, processed_at:'2026-04-28T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안','중요'], ai_context_solo:'프레시스킨 전속 제안 검토 중', ai_context_cumulative:'프레시스킨 전속 조건 검토 진행' },
  { id:'m50', thread_id:'t6', sender_id:'ad@freshskin.co.kr', direction:'incoming',
    body:'추가로 SNS 독점 조항도 포함되어 있습니다. 계약 기간은 6개월입니다.',
    attachments:[], sent_at:'2026-04-28T09:30:00+09:00', read_at:'2026-04-28T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안','중요'], ai_context_solo:'SNS 독점+6개월 계약 추가 조건', ai_context_cumulative:'프레시스킨 독점 조항 포함 전속 협상' },

  // t7: 퓨어클린 시딩 (2 msgs)
  { id:'m51', thread_id:'t7', sender_id:'marketing@pureclean.kr', direction:'incoming',
    body:'안녕하세요, 퓨어클린입니다. 친환경 클렌저 3종 시딩 제안드립니다.',
    attachments:[], sent_at:'2026-04-27T10:00:00+09:00', read_at:'2026-04-27T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['시딩 제안'], ai_context_solo:'퓨어클린 친환경 클렌저 시딩 3종', ai_context_cumulative:'퓨어클린 시딩 제안 수신' },
  { id:'m52', thread_id:'t7', sender_id:'jiwoo@naver.com', direction:'outgoing',
    body:'시딩 감사합니다. 주소 전달드릴게요.',
    attachments:[], sent_at:'2026-04-27T11:00:00+09:00', read_at:null, processed_at:'2026-04-27T11:00:00+09:00', depth:1, parent_message_id:null,
    tags:['시딩 제안'], ai_context_solo:'퓨어클린 시딩 수락', ai_context_cumulative:'퓨어클린 시딩 수락' },

  // t8: 문랩 행사 (2 msgs)
  { id:'m53', thread_id:'t8', sender_id:'collab@moonlab.kr', direction:'incoming',
    body:'안녕하세요, 문랩입니다. 신제품 발표회 게스트 초청 제안드립니다. 사례금 50만원 포함.',
    attachments:[], sent_at:'2026-04-26T13:00:00+09:00', read_at:'2026-04-26T14:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['행사/오프라인 제안'], ai_context_solo:'문랩 신제품 발표회 게스트 초청 50만', ai_context_cumulative:'문랩 팝업 게스트 제안 수신' },
  { id:'m54', thread_id:'t8', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'초청 제안 감사합니다. 일정 확인 후 답변드리겠습니다.',
    attachments:[], sent_at:'2026-04-26T14:00:00+09:00', read_at:null, processed_at:'2026-04-26T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['행사/오프라인 제안'], ai_context_solo:'문랩 행사 일정 확인 예정', ai_context_cumulative:'문랩 행사 제안 일정 검토 중' },

  // t9: 데일리푸드 공구 (3 msgs)
  { id:'m55', thread_id:'t9', sender_id:'@dailyfood_kr', direction:'incoming',
    body:'안녕하세요! 데일리푸드 공구팀입니다. 건강 그래놀라 공구 협업 제안드립니다.',
    attachments:[], sent_at:'2026-04-25T09:00:00+09:00', read_at:'2026-04-25T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'데일리푸드 그래놀라 공구 제안', ai_context_cumulative:'데일리푸드 공구 제안 수신' },
  { id:'m56', thread_id:'t9', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'공구 제안 감사합니다. 마진 조건 알려주시겠어요?',
    attachments:[], sent_at:'2026-04-25T10:00:00+09:00', read_at:null, processed_at:'2026-04-25T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'데일리푸드 마진 조건 문의', ai_context_cumulative:'데일리푸드 공구 마진 협의 시작' },
  { id:'m57', thread_id:'t9', sender_id:'@dailyfood_kr', direction:'incoming',
    body:'마진 20% 제안드립니다. 수량 200개 한정입니다.',
    attachments:[], sent_at:'2026-04-25T10:00:00+09:00', read_at:'2026-04-25T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'마진 20% 200개 공구 조건', ai_context_cumulative:'데일리푸드 마진 20% 조율 필요' },

  // t10: 스타일리시코 행사 (2 msgs)
  { id:'m58', thread_id:'t10', sender_id:'event@stylishco.kr', direction:'incoming',
    body:'안녕하세요, 스타일리시코 패션쇼 인플루언서 초청 제안드립니다. 교통비+식사 제공.',
    attachments:[], sent_at:'2026-04-24T12:00:00+09:00', read_at:'2026-04-24T13:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['행사/오프라인 제안'], ai_context_solo:'스타일리시코 패션쇼 초청', ai_context_cumulative:'스타일리시코 패션쇼 초청 제안 수신' },
  { id:'m59', thread_id:'t10', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'초청 감사합니다. 일정 확인 중입니다.',
    attachments:[], sent_at:'2026-04-24T13:00:00+09:00', read_at:null, processed_at:'2026-04-24T13:00:00+09:00', depth:1, parent_message_id:null,
    tags:['행사/오프라인 제안'], ai_context_solo:'스타일리시코 패션쇼 일정 확인 중', ai_context_cumulative:'스타일리시코 패션쇼 일정 검토 중' },

  // t11: 핑크로즈 시딩 (2 msgs)
  { id:'m60', thread_id:'t11', sender_id:'@pinkrose_official', direction:'incoming',
    body:'안녕하세요! 핑크로즈 립스틱 신상 5종 시딩 제안드립니다.',
    attachments:[], sent_at:'2026-04-23T14:00:00+09:00', read_at:'2026-04-23T15:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['시딩 제안'], ai_context_solo:'핑크로즈 립스틱 5종 시딩', ai_context_cumulative:'핑크로즈 립스틱 시딩 제안 수신' },
  { id:'m61', thread_id:'t11', sender_id:'@jiwoo_beauty', direction:'outgoing',
    body:'시딩 감사합니다! 주소 보내드릴게요.',
    attachments:[], sent_at:'2026-04-23T15:00:00+09:00', read_at:null, processed_at:'2026-04-23T15:00:00+09:00', depth:1, parent_message_id:null,
    tags:['시딩 제안'], ai_context_solo:'핑크로즈 시딩 수락', ai_context_cumulative:'핑크로즈 시딩 수락' },

  // t12: 네이처글로우 협찬 (2 msgs)
  { id:'m62', thread_id:'t12', sender_id:'sponsor@natureglow.com', direction:'incoming',
    body:'안녕하세요, 네이처글로우입니다. 비건 선크림 협찬 제안드립니다. 단가 70만원.',
    attachments:[], sent_at:'2026-04-22T09:00:00+09:00', read_at:'2026-04-22T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'네이처글로우 비건 선크림 70만 협찬', ai_context_cumulative:'네이처글로우 협찬 제안 수신' },
  { id:'m63', thread_id:'t12', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'제안 감사합니다. 검토 후 연락드리겠습니다.',
    attachments:[], sent_at:'2026-04-22T10:00:00+09:00', read_at:null, processed_at:'2026-04-22T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'네이처글로우 제안 검토 중', ai_context_cumulative:'네이처글로우 협찬 검토 진행' },

  // t13: 블룸 기타 제안 (2 msgs)
  { id:'m64', thread_id:'t13', sender_id:'@bloom_official', direction:'incoming',
    body:'안녕하세요, 블룸입니다. 향수 브랜디드 콘텐츠 편당 100만원 제안드립니다.',
    attachments:[], sent_at:'2026-04-21T13:00:00+09:00', read_at:'2026-04-21T14:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['기타 제안'], ai_context_solo:'블룸 향수 브랜디드 콘텐츠 100만 제안', ai_context_cumulative:'블룸 향수 브랜디드 제안 수신' },
  { id:'m65', thread_id:'t13', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'제안 잘 받았습니다. 세부 내용 확인 후 회신드리겠습니다.',
    attachments:[], sent_at:'2026-04-21T14:00:00+09:00', read_at:null, processed_at:'2026-04-21T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['기타 제안'], ai_context_solo:'블룸 제안 세부 확인 예정', ai_context_cumulative:'블룸 향수 제안 검토 중' },

  // t14: 비비드 협찬 (2 msgs)
  { id:'m66', thread_id:'t14', sender_id:'biz@vivid.co.kr', direction:'incoming',
    body:'안녕하세요, 비비드입니다. 뷰티 고데기 협찬 제안드립니다. 단가 협의 원합니다.',
    attachments:[], sent_at:'2026-04-20T10:00:00+09:00', read_at:'2026-04-20T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'비비드 고데기 협찬 단가 협의 요청', ai_context_cumulative:'비비드 고데기 협찬 제안 수신' },
  { id:'m67', thread_id:'t14', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'고데기 협찬 제안 감사합니다. 단가 확인 후 연락드리겠습니다.',
    attachments:[], sent_at:'2026-04-20T11:00:00+09:00', read_at:null, processed_at:'2026-04-20T11:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'비비드 단가 확인 후 답장 예정', ai_context_cumulative:'비비드 협찬 단가 검토 중' },

  // t15: 써니데이 시딩 (2 msgs)
  { id:'m68', thread_id:'t15', sender_id:'pr@sunnyday.kr', direction:'incoming',
    body:'안녕하세요, 써니데이입니다. 여름 선스틱 2종 시딩 제안드립니다.',
    attachments:[], sent_at:'2026-04-19T09:00:00+09:00', read_at:'2026-04-19T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['시딩 제안'], ai_context_solo:'써니데이 선스틱 2종 시딩', ai_context_cumulative:'써니데이 선스틱 시딩 제안 수신' },
  { id:'m69', thread_id:'t15', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'선스틱 시딩 감사합니다! 주소 전달드릴게요.',
    attachments:[], sent_at:'2026-04-19T09:00:00+09:00', read_at:null, processed_at:'2026-04-19T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['시딩 제안'], ai_context_solo:'써니데이 시딩 수락', ai_context_cumulative:'써니데이 시딩 수락' },

  // t16: 코스모 행사 (2 msgs)
  { id:'m70', thread_id:'t16', sender_id:'event@cosmo.kr', direction:'incoming',
    body:'안녕하세요, 코스모뷰티페어 2026 참가 초청 드립니다. 부스 참가+교통비 제공.',
    attachments:[], sent_at:'2026-04-18T13:00:00+09:00', read_at:'2026-04-18T14:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['행사/오프라인 제안'], ai_context_solo:'코스모뷰티페어 부스 참가 초청', ai_context_cumulative:'코스모뷰티페어 초청 제안 수신' },
  { id:'m71', thread_id:'t16', sender_id:'jiwoo@naver.com', direction:'outgoing',
    body:'코스모뷰티페어 초청 감사합니다. 일정 확인 중입니다.',
    attachments:[], sent_at:'2026-04-18T14:00:00+09:00', read_at:null, processed_at:'2026-04-18T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['행사/오프라인 제안'], ai_context_solo:'코스모 행사 일정 확인 중', ai_context_cumulative:'코스모뷰티페어 일정 검토 중' },

  // t17: 콜라보에이전시K 기타 (3 msgs, processed)
  { id:'m72', thread_id:'t17', sender_id:'@collab_agency_k', direction:'incoming',
    body:'안녕하세요, 콜라보에이전시K입니다. 멀티채널 브랜드 패키지 제안드립니다.',
    attachments:[], sent_at:'2026-04-15T10:00:00+09:00', read_at:'2026-04-15T11:00:00+09:00', processed_at:'2026-04-17T13:00:00+09:00', depth:1, parent_message_id:null,
    tags:['기타 제안'], ai_context_solo:'콜라보K 멀티채널 패키지 제안', ai_context_cumulative:'콜라보K 멀티 제안 수신' },
  { id:'m73', thread_id:'t17', sender_id:'@jiwoo_beauty', direction:'outgoing',
    body:'제안 검토 완료했습니다. 진행 의사 있습니다.',
    attachments:[], sent_at:'2026-04-16T10:00:00+09:00', read_at:null, processed_at:'2026-04-16T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['기타 제안'], ai_context_solo:'콜라보K 제안 수락 의사 전달', ai_context_cumulative:'콜라보K 계약 진행 의사 전달' },
  { id:'m74', thread_id:'t17', sender_id:'@collab_agency_k', direction:'incoming',
    body:'감사합니다! 계약서 발송드리겠습니다.',
    attachments:[], sent_at:'2026-04-17T13:00:00+09:00', read_at:'2026-04-17T14:00:00+09:00', processed_at:'2026-04-17T13:00:00+09:00', depth:1, parent_message_id:null,
    tags:['기타 제안'], ai_context_solo:'콜라보K 계약서 발송 예정', ai_context_cumulative:'콜라보K 계약 완료 처리' },

  // t18: 트렌드랩 협찬 (3 msgs, processed)
  { id:'m75', thread_id:'t18', sender_id:'ad@trendlab.kr', direction:'incoming',
    body:'안녕하세요, 트렌드랩입니다. 앱 광고 협찬 단가 90만원 제안드립니다.',
    attachments:[], sent_at:'2026-04-14T10:00:00+09:00', read_at:'2026-04-14T11:00:00+09:00', processed_at:'2026-04-16T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'트렌드랩 앱 광고 90만 협찬 제안', ai_context_cumulative:'트렌드랩 협찬 제안 수신' },
  { id:'m76', thread_id:'t18', sender_id:'jiwoo.daily@gmail.com', direction:'outgoing',
    body:'단가 90만원 수용 가능합니다. 계약서 공유 부탁드립니다.',
    attachments:[], sent_at:'2026-04-15T09:00:00+09:00', read_at:null, processed_at:'2026-04-15T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'트렌드랩 90만 수용 계약 요청', ai_context_cumulative:'트렌드랩 단가 합의 계약 단계' },
  { id:'m77', thread_id:'t18', sender_id:'ad@trendlab.kr', direction:'incoming',
    body:'계약서 날인 완료했습니다. 콘텐츠 제작 일정 공유 부탁드립니다.',
    attachments:[], sent_at:'2026-04-16T10:00:00+09:00', read_at:'2026-04-16T11:00:00+09:00', processed_at:'2026-04-16T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'트렌드랩 계약 완료 일정 요청', ai_context_cumulative:'트렌드랩 계약 완료' },

  // t19: 그린코 협찬 (3 msgs, processed)
  { id:'m78', thread_id:'t19', sender_id:'hello@greenco.kr', direction:'incoming',
    body:'안녕하세요, 그린코입니다. 친환경 텀블러+에코백 협찬 제안드립니다.',
    attachments:[], sent_at:'2026-04-13T10:00:00+09:00', read_at:'2026-04-13T11:00:00+09:00', processed_at:'2026-04-15T11:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'그린코 텀블러+에코백 협찬 제안', ai_context_cumulative:'그린코 협찬 제안 수신' },
  { id:'m79', thread_id:'t19', sender_id:'contact@jiwoo-brand.kr', direction:'outgoing',
    body:'친환경 협찬 감사합니다. 주소 전달드리겠습니다.',
    attachments:[], sent_at:'2026-04-14T09:00:00+09:00', read_at:null, processed_at:'2026-04-14T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'그린코 협찬 수락 주소 전달', ai_context_cumulative:'그린코 협찬 수락' },
  { id:'m80', thread_id:'t19', sender_id:'hello@greenco.kr', direction:'incoming',
    body:'제품 발송 완료했습니다. 리뷰는 편하게 올려주세요!',
    attachments:[], sent_at:'2026-04-15T11:00:00+09:00', read_at:'2026-04-15T12:00:00+09:00', processed_at:'2026-04-15T11:00:00+09:00', depth:1, parent_message_id:null,
    tags:['광고/협찬 제안'], ai_context_solo:'그린코 제품 발송 완료', ai_context_cumulative:'그린코 협찬 제품 수령 완료' },

  // t20: 글로우업 공구 완료 (3 msgs, processed)
  { id:'m81', thread_id:'t20', sender_id:'@glowup_cosmetics', direction:'incoming',
    body:'파운데이션 공구 결산 완료했습니다. 수익금 정산 내역 첨부드립니다.',
    attachments:[{ name:'글로우업_공구_정산내역.xlsx', type:'xlsx' }],
    sent_at:'2026-04-12T10:00:00+09:00', read_at:'2026-04-12T11:00:00+09:00', processed_at:'2026-04-14T15:00:00+09:00', depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'글로우업 공구 정산 내역 수신', ai_context_cumulative:'글로우업 파운데이션 공구 결산 단계' },
  { id:'m82', thread_id:'t20', sender_id:'@jiwoo_beauty', direction:'outgoing',
    body:'정산 내역 확인했습니다. 문제 없습니다. 감사합니다!',
    attachments:[], sent_at:'2026-04-13T09:00:00+09:00', read_at:null, processed_at:'2026-04-13T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'정산 확인 완료', ai_context_cumulative:'글로우업 공구 정산 확인 완료' },
  { id:'m83', thread_id:'t20', sender_id:'@glowup_cosmetics', direction:'incoming',
    body:'감사합니다! 다음 공구도 함께 해요 :)',
    attachments:[], sent_at:'2026-04-14T15:00:00+09:00', read_at:'2026-04-14T16:00:00+09:00', processed_at:'2026-04-14T15:00:00+09:00', depth:1, parent_message_id:null,
    tags:['공구 제안'], ai_context_solo:'글로우업 재공구 제안', ai_context_cumulative:'글로우업 공구 완료 재협업 의사' },
  // ===== OPS/CS MESSAGES (t21~t45) =====
  // t21: 선크림 포스트 제품 질문
  { id:'m84', thread_id:'t21', sender_id:'@user_minseo22', direction:'incoming',
    body:'선크림 추천 영상에서 3번째 제품 성분 알려주실 수 있나요?',
    attachments:[], sent_at:'2026-05-02T09:00:00+09:00', read_at:'2026-05-02T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'선크림 3번째 제품 성분 질문', ai_context_cumulative:'선크림 포스트 성분 질문' },
  { id:'m85', thread_id:'t21', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'해당 제품은 징크옥사이드 기반 무기자차입니다. 민감성 피부에도 좋아요!',
    attachments:[], sent_at:'2026-05-02T10:00:00+09:00', read_at:null, processed_at:'2026-05-02T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'무기자차 성분 설명 답변', ai_context_cumulative:'선크림 성분 답변 완료' },

  // t22: 선크림 구매 문의 (stacked)
  { id:'m86', thread_id:'t22', sender_id:'@user_hyunji_0', direction:'incoming',
    body:'선크림 TOP5 중에서 뭐 사면 좋을까요? 지성 피부인데요.',
    attachments:[], sent_at:'2026-05-01T16:00:00+09:00', read_at:'2026-05-01T17:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['구매 문의'], ai_context_solo:'지성 피부 선크림 추천 문의', ai_context_cumulative:'선크림 구매 추천 질문' },
  { id:'m87', thread_id:'t22', sender_id:'@user_fan_minji', direction:'incoming',
    body:'저도 궁금해요! 복합성이면 어떤 게 좋을까요?',
    attachments:[], sent_at:'2026-05-01T17:00:00+09:00', read_at:'2026-05-01T17:00:00+09:00', processed_at:null, depth:2, parent_message_id:'m86',
    tags:['구매 문의'], ai_context_solo:'복합성 피부 선크림 추천 대댓글', ai_context_cumulative:'지성·복합성 선크림 추천 요청' },
  { id:'m88', thread_id:'t22', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'지성은 2번, 복합성은 4번 추천드려요! 둘 다 가볍고 세정력 좋아요.',
    attachments:[], sent_at:'2026-05-01T17:00:00+09:00', read_at:null, processed_at:'2026-05-01T17:00:00+09:00', depth:1, parent_message_id:null,
    tags:['구매 문의'], ai_context_solo:'피부 타입별 선크림 추천 답변', ai_context_cumulative:'선크림 피부타입별 추천 답변' },

  // t23: 스킨케어 루틴 성분 질문
  { id:'m89', thread_id:'t23', sender_id:'@user_minseo22', direction:'incoming',
    body:'스킨케어 루틴에 나온 토너, 방부제 성분 있나요?',
    attachments:[], sent_at:'2026-05-01T08:30:00+09:00', read_at:'2026-05-01T09:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'토너 방부제 성분 질문', ai_context_cumulative:'스킨케어 루틴 토너 성분 문의' },
  { id:'m90', thread_id:'t23', sender_id:'@jiwoo_beauty', direction:'outgoing',
    body:'해당 토너는 무방부제 제품입니다. 민감성 피부 분들께 추천드려요!',
    attachments:[], sent_at:'2026-05-01T09:00:00+09:00', read_at:null, processed_at:'2026-05-01T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'무방부제 토너 답변', ai_context_cumulative:'토너 성분 답변 완료' },

  // t24: 봄 메이크업 링크 요청
  { id:'m91', thread_id:'t24', sender_id:'YT_user_habin', direction:'incoming',
    body:'봄 메이크업 영상에서 쓰신 쿠션 링크 알 수 있을까요?',
    attachments:[], sent_at:'2026-04-30T14:00:00+09:00', read_at:'2026-04-30T15:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['링크 요청'], ai_context_solo:'봄 메이크업 쿠션 링크 요청', ai_context_cumulative:'봄 메이크업 영상 제품 링크 요청' },
  { id:'m92', thread_id:'t24', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'프로필 링크 바이오에 있어요! 쿠션은 3번째 링크입니다 :)',
    attachments:[], sent_at:'2026-04-30T15:00:00+09:00', read_at:null, processed_at:'2026-04-30T15:00:00+09:00', depth:1, parent_message_id:null,
    tags:['링크 요청'], ai_context_solo:'쿠션 링크 바이오 안내', ai_context_cumulative:'봄 메이크업 링크 안내 완료' },

  // t25: 공구 오픈 구매 문의 (stacked, 이벤트-오픈)
  { id:'m93', thread_id:'t25', sender_id:'@user_hyunji_0', direction:'incoming',
    body:'공구 마스크팩 주문은 어떻게 하나요? 링크가 없어요.',
    attachments:[], sent_at:'2026-04-30T10:00:00+09:00', read_at:'2026-04-30T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['구매 문의','이벤트-오픈'], ai_context_solo:'공구 마스크팩 주문 링크 요청', ai_context_cumulative:'공구 오픈 구매 방법 문의' },
  { id:'m94', thread_id:'t25', sender_id:'@user_fan_eunbi', direction:'incoming',
    body:'저도 구매하고 싶어요! 재고 남아있나요?',
    attachments:[], sent_at:'2026-04-30T10:30:00+09:00', read_at:'2026-04-30T11:00:00+09:00', processed_at:null, depth:2, parent_message_id:'m93',
    tags:['구매 문의','이벤트-오픈'], ai_context_solo:'공구 재고 문의 대댓글', ai_context_cumulative:'공구 재고·주문 방법 중복 문의' },
  { id:'m95', thread_id:'t25', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'프로필 링크에서 주문 가능합니다! 재고 500개 중 200개 남았어요. 서두르세요!',
    attachments:[], sent_at:'2026-04-30T11:00:00+09:00', read_at:null, processed_at:'2026-04-30T11:00:00+09:00', depth:1, parent_message_id:null,
    tags:['구매 문의','이벤트-오픈'], ai_context_solo:'공구 링크+재고 200개 안내', ai_context_cumulative:'공구 구매 링크 및 재고 안내' },

  // t26: 다이어트 영상 제품 질문
  { id:'m96', thread_id:'t26', sender_id:'YT_user_habin', direction:'incoming',
    body:'7일 챌린지 식단에 쓰신 닭가슴살 브랜드 알려주세요!',
    attachments:[], sent_at:'2026-04-29T13:00:00+09:00', read_at:'2026-04-29T14:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'다이어트 닭가슴살 브랜드 질문', ai_context_cumulative:'다이어트 영상 닭가슴살 브랜드 문의' },
  { id:'m97', thread_id:'t26', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'곰곰 닭가슴살 사용했어요! 마트에서 쉽게 구매 가능합니다.',
    attachments:[], sent_at:'2026-04-29T14:00:00+09:00', read_at:null, processed_at:'2026-04-29T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'닭가슴살 브랜드 곰곰 안내', ai_context_cumulative:'닭가슴살 브랜드 답변 완료' },

  // t27: 파운데이션 리뷰 색상 질문
  { id:'m98', thread_id:'t27', sender_id:'@user_minseo22', direction:'incoming',
    body:'파운데이션 비교 리뷰에서 2번 제품 21호랑 23호 중 뭐가 나을까요? 밝은 피부인데요.',
    attachments:[], sent_at:'2026-04-28T09:30:00+09:00', read_at:'2026-04-28T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'파운데이션 21호 vs 23호 질문', ai_context_cumulative:'파운데이션 색상 선택 문의' },
  { id:'m99', thread_id:'t27', sender_id:'@jiwoo_beauty', direction:'outgoing',
    body:'밝은 편이시면 21호 추천드려요. 커버력은 23호가 더 좋긴 해요.',
    attachments:[], sent_at:'2026-04-28T10:00:00+09:00', read_at:null, processed_at:'2026-04-28T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'21호 추천 색상 답변', ai_context_cumulative:'파운데이션 색상 추천 답변' },

  // t28: 틱톡 메이크업 링크 요청
  { id:'m100', thread_id:'t28', sender_id:'@tiktok_fan_nari', direction:'incoming',
    body:'메이크업 챌린지에서 쓰신 아이섀도우 팔레트 뭔가요?',
    attachments:[], sent_at:'2026-04-27T19:30:00+09:00', read_at:'2026-04-27T20:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['링크 요청'], ai_context_solo:'틱톡 아이섀도우 팔레트 질문', ai_context_cumulative:'틱톡 챌린지 팔레트 링크 요청' },
  { id:'m101', thread_id:'t28', sender_id:'@jiwoo_tiktok', direction:'outgoing',
    body:'어반디케이 팔레트예요! 프로필 링크에 있어요 :)',
    attachments:[], sent_at:'2026-04-27T20:00:00+09:00', read_at:null, processed_at:'2026-04-27T20:00:00+09:00', depth:1, parent_message_id:null,
    tags:['링크 요청'], ai_context_solo:'어반디케이 팔레트 링크 안내', ai_context_cumulative:'틱톡 팔레트 링크 안내' },

  // t29: 배송 문의
  { id:'m102', thread_id:'t29', sender_id:'@user_minseo22', direction:'incoming',
    body:'공구 주문한 지 5일 됐는데 아직 배송 출발도 안 했어요. 어떻게 된 건가요?',
    attachments:[], sent_at:'2026-04-26T12:00:00+09:00', read_at:'2026-04-26T13:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['배송 문의'], ai_context_solo:'공구 배송 5일 미출발 문의', ai_context_cumulative:'공구 배송 지연 항의' },
  { id:'m103', thread_id:'t29', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'불편을 드려 죄송합니다. 브랜드에 확인 후 오늘 중으로 연락드리겠습니다.',
    attachments:[], sent_at:'2026-04-26T13:00:00+09:00', read_at:null, processed_at:'2026-04-26T13:00:00+09:00', depth:1, parent_message_id:null,
    tags:['배송 문의'], ai_context_solo:'배송 지연 확인 안내', ai_context_cumulative:'배송 지연 확인 대응 중' },

  // t30: CS/환불 요청
  { id:'m104', thread_id:'t30', sender_id:'@user_hyunji_0', direction:'incoming',
    body:'받은 마스크팩 1개가 터져있어요. 환불 원합니다.',
    attachments:[], sent_at:'2026-04-25T10:00:00+09:00', read_at:'2026-04-25T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['CS/환불'], ai_context_solo:'마스크팩 불량 환불 요청', ai_context_cumulative:'제품 불량 환불 클레임' },
  { id:'m105', thread_id:'t30', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'불편 드려 정말 죄송합니다. 브랜드 CS팀에 즉시 전달하겠습니다.',
    attachments:[], sent_at:'2026-04-25T11:00:00+09:00', read_at:null, processed_at:'2026-04-25T11:00:00+09:00', depth:1, parent_message_id:null,
    tags:['CS/환불'], ai_context_solo:'불량 환불 CS 전달 안내', ai_context_cumulative:'마스크팩 불량 CS 접수' },

  // t31: 유튜브 제품 질문
  { id:'m106', thread_id:'t31', sender_id:'YT_user_habin', direction:'incoming',
    body:'봄 메이크업 영상에서 쓰신 프라이머 브랜드가 뭔가요? 찾아도 모르겠어요.',
    attachments:[], sent_at:'2026-04-24T08:30:00+09:00', read_at:'2026-04-24T09:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'유튜브 프라이머 브랜드 질문', ai_context_cumulative:'봄 메이크업 프라이머 제품 질문' },
  { id:'m107', thread_id:'t31', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'에뛰드 로렌 프라이머예요! 영상 설명란 링크 참고해주세요.',
    attachments:[], sent_at:'2026-04-24T09:00:00+09:00', read_at:null, processed_at:'2026-04-24T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'에뛰드 프라이머 링크 안내', ai_context_cumulative:'프라이머 제품 질문 답변 완료' },

  // t32: 이메일 구매 방법 문의
  { id:'m108', thread_id:'t32', sender_id:'sora_lee_yt', direction:'incoming',
    body:'안녕하세요, 공구 구매는 어디서 하나요? 인스타 링크 찾기 어렵네요.',
    attachments:[], sent_at:'2026-04-23T09:30:00+09:00', read_at:'2026-04-23T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['구매 문의'], ai_context_solo:'이메일 공구 구매 링크 문의', ai_context_cumulative:'이메일 공구 구매 방법 안내 필요' },
  { id:'m109', thread_id:'t32', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'안녕하세요! 인스타 @jiwoo_daily 프로필 링크 클릭 후 공구 페이지로 이동하시면 됩니다.',
    attachments:[], sent_at:'2026-04-23T10:00:00+09:00', read_at:null, processed_at:'2026-04-23T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['구매 문의'], ai_context_solo:'공구 링크 안내 이메일 답장', ai_context_cumulative:'공구 구매 링크 안내 완료' },

  // t33: 네이버 메일 환불
  { id:'m110', thread_id:'t33', sender_id:'junho.park@naver.com', direction:'incoming',
    body:'주문한 제품이 파손되어 배송됐어요. 환불 신청하고 싶습니다.',
    attachments:[], sent_at:'2026-04-22T13:00:00+09:00', read_at:'2026-04-22T14:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['CS/환불'], ai_context_solo:'파손 배송 환불 신청 메일', ai_context_cumulative:'파손 제품 환불 요청 접수' },
  { id:'m111', thread_id:'t33', sender_id:'jiwoo@naver.com', direction:'outgoing',
    body:'불편 드려 죄송합니다. 브랜드 CS에 파손 사진과 함께 전달하겠습니다.',
    attachments:[], sent_at:'2026-04-22T14:00:00+09:00', read_at:null, processed_at:'2026-04-22T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['CS/환불'], ai_context_solo:'파손 환불 CS 전달 안내', ai_context_cumulative:'파손 환불 CS 접수 안내' },

  // t34: 하울 제품명 질문
  { id:'m112', thread_id:'t34', sender_id:'@user_fan_chaerin', direction:'incoming',
    body:'여름 하울 영상에서 마지막에 입으신 원피스 브랜드가 뭔가요?',
    attachments:[], sent_at:'2026-04-21T10:30:00+09:00', read_at:'2026-04-21T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'하울 원피스 브랜드 질문', ai_context_cumulative:'하울 영상 원피스 브랜드 문의' },
  { id:'m113', thread_id:'t34', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'에잇세컨즈 원피스예요! 지금도 온라인에서 구매 가능해요.',
    attachments:[], sent_at:'2026-04-21T11:00:00+09:00', read_at:null, processed_at:'2026-04-21T11:00:00+09:00', depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'에잇세컨즈 원피스 안내', ai_context_cumulative:'하울 원피스 브랜드 답변' },

  // t35: 인스타 링크 요청 DM
  { id:'m114', thread_id:'t35', sender_id:'@user_jungho', direction:'incoming',
    body:'안녕하세요! 최근 선크림 포스트에서 쓰신 제품 링크 DM으로 받을 수 있을까요?',
    attachments:[], sent_at:'2026-04-20T12:30:00+09:00', read_at:'2026-04-20T13:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['링크 요청'], ai_context_solo:'선크림 링크 DM 요청', ai_context_cumulative:'인스타 선크림 링크 DM 요청' },
  { id:'m115', thread_id:'t35', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'프로필 링크 눌러보시면 전 제품 링크 모아놨어요!',
    attachments:[], sent_at:'2026-04-20T13:00:00+09:00', read_at:null, processed_at:'2026-04-20T13:00:00+09:00', depth:1, parent_message_id:null,
    tags:['링크 요청'], ai_context_solo:'프로필 링크 안내', ai_context_cumulative:'선크림 링크 프로필 안내' },

  // t36: 배송 주소 변경 DM
  { id:'m116', thread_id:'t36', sender_id:'@user_hyunwoo', direction:'incoming',
    body:'공구 주문 후 이사했는데 배송 주소 변경 가능한가요?',
    attachments:[], sent_at:'2026-04-19T09:30:00+09:00', read_at:'2026-04-19T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['배송 문의'], ai_context_solo:'공구 배송 주소 변경 요청', ai_context_cumulative:'배송 주소 변경 문의' },
  { id:'m117', thread_id:'t36', sender_id:'@jiwoo_beauty', direction:'outgoing',
    body:'브랜드에 바로 연락해볼게요. 출발 전이면 변경 가능합니다.',
    attachments:[], sent_at:'2026-04-19T10:00:00+09:00', read_at:null, processed_at:'2026-04-19T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['배송 문의'], ai_context_solo:'배송 주소 변경 확인 중', ai_context_cumulative:'배송 주소 변경 처리 대응' },

  // t37: 유튜브 제품 추천
  { id:'m118', thread_id:'t37', sender_id:'YT_user_gyuwon', direction:'incoming',
    body:'건성 피부인데 겨울 보습 크림 추천해주실 수 있나요?',
    attachments:[], sent_at:'2026-04-18T14:00:00+09:00', read_at:'2026-04-18T15:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'건성 피부 겨울 보습 크림 추천 요청', ai_context_cumulative:'유튜브 건성 피부 보습 크림 추천 문의' },
  { id:'m119', thread_id:'t37', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'라로슈포제 또는 세타필 보습 크림 추천드려요! 둘 다 순해서 좋아요.',
    attachments:[], sent_at:'2026-04-18T15:00:00+09:00', read_at:null, processed_at:'2026-04-18T15:00:00+09:00', depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'라로슈포제 세타필 보습 추천', ai_context_cumulative:'겨울 보습 크림 추천 답변' },

  // t38: 선크림 추가 구매 문의
  { id:'m120', thread_id:'t38', sender_id:'@user_fan_dahye', direction:'incoming',
    body:'선크림 공구 재판매 계획 있으신가요? 품절 됐던데요.',
    attachments:[], sent_at:'2026-04-17T09:00:00+09:00', read_at:'2026-04-17T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['구매 문의'], ai_context_solo:'선크림 공구 재판매 문의', ai_context_cumulative:'공구 선크림 재판매 요청' },
  { id:'m121', thread_id:'t38', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'재판매 계획은 미정이에요. 수요 파악 후 고려해볼게요!',
    attachments:[], sent_at:'2026-04-17T10:00:00+09:00', read_at:null, processed_at:'2026-04-17T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['구매 문의'], ai_context_solo:'재판매 미정 수요 파악 답변', ai_context_cumulative:'선크림 재판매 수요 파악 중' },

  // t39: 스킨케어 루틴 추가 질문
  { id:'m122', thread_id:'t39', sender_id:'@user_bomi', direction:'incoming',
    body:'루틴에서 에센스랑 세럼 차이가 뭔가요? 같이 쓰면 되나요?',
    attachments:[], sent_at:'2026-04-16T08:30:00+09:00', read_at:'2026-04-16T09:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'에센스 vs 세럼 차이 질문', ai_context_cumulative:'스킨케어 에센스·세럼 차이 문의' },
  { id:'m123', thread_id:'t39', sender_id:'@jiwoo_beauty', direction:'outgoing',
    body:'에센스는 수분 공급, 세럼은 특정 기능(미백/주름) 집중 케어예요. 같이 써도 돼요!',
    attachments:[], sent_at:'2026-04-16T09:00:00+09:00', read_at:null, processed_at:'2026-04-16T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'에센스·세럼 차이 설명 답변', ai_context_cumulative:'에센스·세럼 차이 답변' },

  // t40: 공구 재고 문의 (stacked, 이벤트-오픈)
  { id:'m124', thread_id:'t40', sender_id:'@user_taeyeon_fan', direction:'incoming',
    body:'마스크팩 공구 재고 아직 있나요? 오늘 주문 가능한가요?',
    attachments:[], sent_at:'2026-04-15T13:00:00+09:00', read_at:'2026-04-15T14:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['구매 문의','이벤트-오픈'], ai_context_solo:'공구 마스크팩 재고 문의', ai_context_cumulative:'공구 재고 오늘 주문 가능 여부 문의' },
  { id:'m125', thread_id:'t40', sender_id:'@user_fan_jisu', direction:'incoming',
    body:'재고 확인해주세요! 내일까지 주문하면 되나요?',
    attachments:[], sent_at:'2026-04-15T13:30:00+09:00', read_at:'2026-04-15T14:00:00+09:00', processed_at:null, depth:2, parent_message_id:'m124',
    tags:['구매 문의','이벤트-오픈'], ai_context_solo:'공구 내일 주문 마감 여부 대댓글', ai_context_cumulative:'공구 마감 시한 중복 문의' },
  { id:'m126', thread_id:'t40', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'재고 100개 남았어요! 오늘까지 주문 가능합니다. 빠르게 주문해주세요!',
    attachments:[], sent_at:'2026-04-15T14:00:00+09:00', read_at:null, processed_at:'2026-04-15T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['구매 문의','이벤트-오픈'], ai_context_solo:'재고 100개 오늘 마감 안내', ai_context_cumulative:'공구 재고·마감 안내 완료' },

  // t41: 봄 메이크업 링크 (processed)
  { id:'m127', thread_id:'t41', sender_id:'YT_user_gyuwon', direction:'incoming',
    body:'봄 메이크업 영상 립스틱 브랜드 알려주세요!',
    attachments:[], sent_at:'2026-04-12T09:30:00+09:00', read_at:'2026-04-12T10:00:00+09:00', processed_at:'2026-04-14T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['링크 요청'], ai_context_solo:'봄 메이크업 립스틱 브랜드 질문', ai_context_cumulative:'봄 메이크업 립스틱 링크 요청' },
  { id:'m128', thread_id:'t41', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'맥 립스틱이에요! 영상 설명란에 링크 있어요.',
    attachments:[], sent_at:'2026-04-13T10:00:00+09:00', read_at:null, processed_at:'2026-04-13T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['링크 요청'], ai_context_solo:'맥 립스틱 링크 안내', ai_context_cumulative:'봄 메이크업 립스틱 링크 안내' },
  { id:'m129', thread_id:'t41', sender_id:'YT_user_gyuwon', direction:'incoming',
    body:'감사합니다! 찾았어요 :)',
    attachments:[], sent_at:'2026-04-14T10:00:00+09:00', read_at:'2026-04-14T10:30:00+09:00', processed_at:'2026-04-14T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['링크 요청'], ai_context_solo:'링크 확인 감사 메시지', ai_context_cumulative:'봄 메이크업 링크 안내 처리 완료' },

  // t42: CS 환불 (processed)
  { id:'m130', thread_id:'t42', sender_id:'@user_bomi', direction:'incoming',
    body:'주문한 마스크팩에 이물질이 들어있어요. 환불해 주세요.',
    attachments:[], sent_at:'2026-04-11T10:00:00+09:00', read_at:'2026-04-11T11:00:00+09:00', processed_at:'2026-04-13T11:00:00+09:00', depth:1, parent_message_id:null,
    tags:['CS/환불'], ai_context_solo:'마스크팩 이물질 환불 요청', ai_context_cumulative:'CS 이물질 환불 클레임' },
  { id:'m131', thread_id:'t42', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'정말 죄송합니다. 즉시 브랜드에 전달하고 환불 처리해 드리겠습니다.',
    attachments:[], sent_at:'2026-04-12T09:00:00+09:00', read_at:null, processed_at:'2026-04-12T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['CS/환불'], ai_context_solo:'이물질 환불 CS 전달 완료', ai_context_cumulative:'CS 환불 처리 완료' },
  { id:'m132', thread_id:'t42', sender_id:'@user_bomi', direction:'incoming',
    body:'환불 완료됐습니다. 감사해요.',
    attachments:[], sent_at:'2026-04-13T11:00:00+09:00', read_at:'2026-04-13T11:30:00+09:00', processed_at:'2026-04-13T11:00:00+09:00', depth:1, parent_message_id:null,
    tags:['CS/환불'], ai_context_solo:'환불 완료 감사 메시지', ai_context_cumulative:'CS 환불 완료 처리됨' },

  // t43: 배송 문의 (processed)
  { id:'m133', thread_id:'t43', sender_id:'sora.lee@email.com', direction:'incoming',
    body:'공구 주문 3일 지났는데 운송장이 안 와요.',
    attachments:[], sent_at:'2026-04-10T10:00:00+09:00', read_at:'2026-04-10T11:00:00+09:00', processed_at:'2026-04-12T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['배송 문의'], ai_context_solo:'공구 운송장 미수령 문의', ai_context_cumulative:'공구 운송장 확인 요청' },
  { id:'m134', thread_id:'t43', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'확인해보니 내일 발송 예정입니다. 운송장은 발송 후 문자로 받으실 거예요.',
    attachments:[], sent_at:'2026-04-11T09:00:00+09:00', read_at:null, processed_at:'2026-04-11T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['배송 문의'], ai_context_solo:'내일 발송 예정 운송장 안내', ai_context_cumulative:'공구 운송장 발송 일정 안내' },
  { id:'m135', thread_id:'t43', sender_id:'sora.lee@email.com', direction:'incoming',
    body:'네, 운송장 받았습니다. 감사합니다.',
    attachments:[], sent_at:'2026-04-12T14:00:00+09:00', read_at:'2026-04-12T14:30:00+09:00', processed_at:'2026-04-12T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['배송 문의'], ai_context_solo:'운송장 수령 확인 감사', ai_context_cumulative:'배송 문의 처리 완료' },

  // t44: 다이어트 영상 댓글 (processed)
  { id:'m136', thread_id:'t44', sender_id:'YT_user_habin', direction:'incoming',
    body:'7일 식단 중 5일차 레시피 좀 더 자세히 알려주시면 좋겠어요!',
    attachments:[], sent_at:'2026-04-09T10:00:00+09:00', read_at:'2026-04-09T11:00:00+09:00', processed_at:'2026-04-11T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'식단 5일차 레시피 요청', ai_context_cumulative:'다이어트 영상 레시피 상세 요청' },
  { id:'m137', thread_id:'t44', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'5일차는 닭가슴살 샐러드예요! 영상 설명란 레시피 링크 확인해보세요.',
    attachments:[], sent_at:'2026-04-11T10:00:00+09:00', read_at:null, processed_at:'2026-04-11T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['제품 질문'], ai_context_solo:'5일차 닭샐러드 레시피 링크 안내', ai_context_cumulative:'다이어트 레시피 안내 완료' },

  // t45: 네이버 구매 문의 (processed)
  { id:'m138', thread_id:'t45', sender_id:'junho.park@naver.com', direction:'incoming',
    body:'마스크팩 공구 재구매 하고 싶은데 어디서 하나요?',
    attachments:[], sent_at:'2026-04-08T10:00:00+09:00', read_at:'2026-04-08T11:00:00+09:00', processed_at:'2026-04-10T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['구매 문의'], ai_context_solo:'마스크팩 재구매 경로 문의', ai_context_cumulative:'공구 재구매 방법 문의' },
  { id:'m139', thread_id:'t45', sender_id:'jiwoo@naver.com', direction:'outgoing',
    body:'현재는 공구 종료되었고 다음 공구 시 인스타에서 안내드릴게요!',
    attachments:[], sent_at:'2026-04-10T09:00:00+09:00', read_at:null, processed_at:'2026-04-10T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['구매 문의'], ai_context_solo:'공구 종료 다음 공구 안내', ai_context_cumulative:'공구 재구매 문의 처리 완료' },
  // ===== SOCIAL MESSAGES (t46~t65) =====
  // t46: 셀럽 유나 DM
  { id:'m140', thread_id:'t46', sender_id:'@star_yuna_kr', direction:'incoming',
    body:'안녕하세요 지우님! 유나예요. 콜라보 영상 같이 하고 싶어요 :)',
    attachments:[], sent_at:'2026-05-02T13:00:00+09:00', read_at:'2026-05-02T14:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['셀럽','VIP'], ai_context_solo:'셀럽 유나 콜라보 제안 DM', ai_context_cumulative:'셀럽 유나 콜라보 제안 수신' },
  { id:'m141', thread_id:'t46', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'유나님! 반가워요! 콜라보 너무 좋죠 일정 조율해요~',
    attachments:[], sent_at:'2026-05-02T14:00:00+09:00', read_at:null, processed_at:'2026-05-02T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['셀럽','VIP'], ai_context_solo:'셀럽 콜라보 긍정 답변', ai_context_cumulative:'셀럽 유나 콜라보 일정 조율 시작' },

  // t47: VIP팬 지수 DM
  { id:'m142', thread_id:'t47', sender_id:'@vip_fan_jisu', direction:'incoming',
    body:'지우님 영상 항상 보고 있어요! 팬미팅 언제 하시나요? 꼭 가고 싶어요!',
    attachments:[], sent_at:'2026-05-01T19:00:00+09:00', read_at:'2026-05-01T20:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['VIP팬'], ai_context_solo:'VIP팬 지수 팬미팅 문의', ai_context_cumulative:'VIP팬 팬미팅 일정 문의' },
  { id:'m143', thread_id:'t47', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'지수님 감사해요! 팬미팅은 준비 중이에요. 공지 올리면 꼭 알려드릴게요!',
    attachments:[], sent_at:'2026-05-01T20:00:00+09:00', read_at:null, processed_at:'2026-05-01T20:00:00+09:00', depth:1, parent_message_id:null,
    tags:['VIP팬'], ai_context_solo:'팬미팅 준비 중 공지 예정 답변', ai_context_cumulative:'VIP팬 팬미팅 일정 미정 안내' },

  // t48: 유튜브 팬 서진 댓글
  { id:'m144', thread_id:'t48', sender_id:'YT_fan_seojin', direction:'incoming',
    body:'항상 영상 잘 보고 있어요! 지우님 덕분에 스킨케어 시작했어요 ㅎㅎ',
    attachments:[], sent_at:'2026-05-01T10:00:00+09:00', read_at:'2026-05-01T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'유튜브 팬 스킨케어 시작 응원 댓글', ai_context_cumulative:'유튜브 팬 응원 댓글 수신' },
  { id:'m145', thread_id:'t48', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'서진님 감사해요! 앞으로도 좋은 정보 많이 드릴게요 :)',
    attachments:[], sent_at:'2026-05-01T11:00:00+09:00', read_at:null, processed_at:'2026-05-01T11:00:00+09:00', depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'팬 응원 감사 답글', ai_context_cumulative:'유튜브 팬 응원 답글 완료' },

  // t49: 브랜드 콜라보 DM
  { id:'m146', thread_id:'t49', sender_id:'@brand_collab_kr', direction:'incoming',
    body:'안녕하세요! 소규모 뷰티 브랜드인데 협업 가능할까요?',
    attachments:[], sent_at:'2026-04-30T12:00:00+09:00', read_at:'2026-04-30T13:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['브랜드'], ai_context_solo:'소규모 뷰티 브랜드 협업 DM', ai_context_cumulative:'브랜드 협업 DM 수신' },
  { id:'m147', thread_id:'t49', sender_id:'@jiwoo_beauty', direction:'outgoing',
    body:'안녕하세요! 세부 내용 알려주시면 검토해볼게요.',
    attachments:[], sent_at:'2026-04-30T13:00:00+09:00', read_at:null, processed_at:'2026-04-30T13:00:00+09:00', depth:1, parent_message_id:null,
    tags:['브랜드'], ai_context_solo:'브랜드 협업 세부 내용 요청', ai_context_cumulative:'브랜드 협업 검토 진행 중' },

  // t50: 틱톡 팬 나리 DM
  { id:'m148', thread_id:'t50', sender_id:'@tiktok_fan_nari', direction:'incoming',
    body:'틱톡 영상 보고 팔로우했어요! 메이크업 너무 예쁘세요 ㅠㅠ',
    attachments:[], sent_at:'2026-04-29T20:30:00+09:00', read_at:'2026-04-29T21:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'틱톡 팬 나리 팔로우 응원', ai_context_cumulative:'틱톡 팬 응원 DM 수신' },
  { id:'m149', thread_id:'t50', sender_id:'@jiwoo_tiktok', direction:'outgoing',
    body:'나리님 감사해요! 앞으로도 예쁜 영상 많이 올릴게요!',
    attachments:[], sent_at:'2026-04-29T21:00:00+09:00', read_at:null, processed_at:'2026-04-29T21:00:00+09:00', depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'틱톡 팬 감사 답장', ai_context_cumulative:'틱톡 팬 응원 답변' },

  // t51: 팬 민지 피부 고민 상담
  { id:'m150', thread_id:'t51', sender_id:'@user_fan_minji', direction:'incoming',
    body:'지우님, 여드름 흉터 케어 어떻게 하면 좋을까요? 고민돼요 ㅠ',
    attachments:[], sent_at:'2026-04-28T18:30:00+09:00', read_at:'2026-04-28T19:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['고민상담'], ai_context_solo:'팬 민지 여드름 흉터 고민 상담', ai_context_cumulative:'팬 피부 고민 상담 DM' },
  { id:'m151', thread_id:'t51', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'흉터 케어는 나이아신아마이드 성분이 도움이 돼요! 꾸준히 바르면 옅어져요.',
    attachments:[], sent_at:'2026-04-28T19:00:00+09:00', read_at:null, processed_at:'2026-04-28T19:00:00+09:00', depth:1, parent_message_id:null,
    tags:['고민상담'], ai_context_solo:'나이아신아마이드 흉터 케어 추천', ai_context_cumulative:'팬 피부 고민 상담 답변 완료' },

  // t52: 팬 은비 콘텐츠 요청
  { id:'m152', thread_id:'t52', sender_id:'@user_fan_eunbi', direction:'incoming',
    body:'지우님 로드샵 메이크업 룩 영상 만들어주세요! 저렴하게 꾸미고 싶어요.',
    attachments:[], sent_at:'2026-04-27T17:00:00+09:00', read_at:'2026-04-27T18:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['콘텐츠 요청'], ai_context_solo:'로드샵 메이크업 영상 요청', ai_context_cumulative:'팬 로드샵 메이크업 콘텐츠 요청' },
  { id:'m153', thread_id:'t52', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'로드샵 메이크업 영상 기획해볼게요! 좋은 아이디어 고마워요 :)',
    attachments:[], sent_at:'2026-04-27T18:00:00+09:00', read_at:null, processed_at:'2026-04-27T18:00:00+09:00', depth:1, parent_message_id:null,
    tags:['콘텐츠 요청'], ai_context_solo:'로드샵 메이크업 기획 예정 답변', ai_context_cumulative:'로드샵 메이크업 콘텐츠 요청 반영 예정' },

  // t53: 유튜브 팬 수연 댓글
  { id:'m154', thread_id:'t53', sender_id:'YT_fan_sooyeon', direction:'incoming',
    body:'5년째 구독 중인데 갈수록 영상 퀄리티가 높아지네요! 감사합니다.',
    attachments:[], sent_at:'2026-04-26T09:30:00+09:00', read_at:'2026-04-26T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'5년 구독자 응원 댓글', ai_context_cumulative:'유튜브 장기 구독자 응원 수신' },
  { id:'m155', thread_id:'t53', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'수연님 5년 감사해요! 계속 노력할게요 :)',
    attachments:[], sent_at:'2026-04-26T10:00:00+09:00', read_at:null, processed_at:'2026-04-26T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'5년 구독 감사 답글', ai_context_cumulative:'장기 구독자 응원 답글 완료' },

  // t54: 팬 다혜 다이어트 고민
  { id:'m156', thread_id:'t54', sender_id:'@user_fan_dahye', direction:'incoming',
    body:'지우님 다이어트 식단 해봤는데 3일 만에 포기했어요 ㅠㅠ 어떻게 하셨어요?',
    attachments:[], sent_at:'2026-04-25T19:00:00+09:00', read_at:'2026-04-25T20:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['고민상담'], ai_context_solo:'팬 다혜 다이어트 포기 고민 상담', ai_context_cumulative:'팬 다이어트 고민 상담 DM' },
  { id:'m157', thread_id:'t54', sender_id:'@jiwoo_beauty', direction:'outgoing',
    body:'처음엔 다 힘들어요! 주 3일로 시작해서 점점 늘려보세요. 할 수 있어요!',
    attachments:[], sent_at:'2026-04-25T20:00:00+09:00', read_at:null, processed_at:'2026-04-25T20:00:00+09:00', depth:1, parent_message_id:null,
    tags:['고민상담'], ai_context_solo:'다이어트 점진적 시작 조언', ai_context_cumulative:'팬 다이어트 고민 조언 답변' },

  // t55: VIP팬 채린 생일 DM
  { id:'m158', thread_id:'t55', sender_id:'@user_fan_chaerin', direction:'incoming',
    body:'지우님! 오늘 제 생일인데 DM 주시면 너무 행복할 것 같아요 ㅠ',
    attachments:[], sent_at:'2026-04-24T16:00:00+09:00', read_at:'2026-04-24T17:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['VIP팬'], ai_context_solo:'VIP팬 채린 생일 DM 요청', ai_context_cumulative:'VIP팬 생일 DM 요청 수신' },
  { id:'m159', thread_id:'t55', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'채린님 생일 축하해요!! 항상 응원해줘서 고마워요~',
    attachments:[], sent_at:'2026-04-24T17:00:00+09:00', read_at:null, processed_at:'2026-04-24T17:00:00+09:00', depth:1, parent_message_id:null,
    tags:['VIP팬'], ai_context_solo:'VIP팬 채린 생일 축하 DM', ai_context_cumulative:'VIP팬 생일 DM 답장 완료' },

  // t56: 셀럽 지연 협업 DM
  { id:'m160', thread_id:'t56', sender_id:'@celeb_jiyeon', direction:'incoming',
    body:'안녕하세요 지우님! 지연이에요. 인스타 라이브 같이 하면 어떨까요?',
    attachments:[], sent_at:'2026-04-23T14:00:00+09:00', read_at:'2026-04-23T15:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['셀럽'], ai_context_solo:'셀럽 지연 인스타 라이브 협업 제안', ai_context_cumulative:'셀럽 지연 라이브 협업 DM 수신' },
  { id:'m161', thread_id:'t56', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'지연님 안녕하세요! 라이브 좋죠~ 일정 맞춰봐요!',
    attachments:[], sent_at:'2026-04-23T15:00:00+09:00', read_at:null, processed_at:'2026-04-23T15:00:00+09:00', depth:1, parent_message_id:null,
    tags:['셀럽'], ai_context_solo:'셀럽 라이브 협업 긍정 답변', ai_context_cumulative:'셀럽 지연 라이브 일정 조율 시작' },

  // t57: 팬 연희 일상 DM
  { id:'m162', thread_id:'t57', sender_id:'@fan_yeonhee', direction:'incoming',
    body:'지우님 오늘도 예쁘세요! 일상 브이로그 더 많이 올려주세요~',
    attachments:[], sent_at:'2026-04-22T11:00:00+09:00', read_at:'2026-04-22T12:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'팬 연희 브이로그 요청', ai_context_cumulative:'팬 일상 브이로그 요청 DM' },
  { id:'m163', thread_id:'t57', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'연희님 감사해요! 브이로그 더 자주 올리도록 할게요 :)',
    attachments:[], sent_at:'2026-04-22T12:00:00+09:00', read_at:null, processed_at:'2026-04-22T12:00:00+09:00', depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'브이로그 더 자주 예정 답변', ai_context_cumulative:'팬 브이로그 요청 답변 완료' },

  // t58: 선크림 포스트 팬 응원 댓글
  { id:'m164', thread_id:'t58', sender_id:'@user_fan_jisu', direction:'incoming',
    body:'오늘도 유용한 정보 감사해요! 선크림 정보 덕분에 잘 고를 수 있었어요.',
    attachments:[], sent_at:'2026-04-21T09:30:00+09:00', read_at:'2026-04-21T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'선크림 정보 도움 됐다는 팬 댓글', ai_context_cumulative:'선크림 포스트 팬 응원 댓글' },
  { id:'m165', thread_id:'t58', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'도움이 됐다니 기뻐요! 앞으로도 좋은 정보 드릴게요~',
    attachments:[], sent_at:'2026-04-21T10:00:00+09:00', read_at:null, processed_at:'2026-04-21T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'팬 응원 감사 답글', ai_context_cumulative:'선크림 포스트 팬 댓글 답글 완료' },

  // t59: 유튜브 봄 메이크업 영상 요청
  { id:'m166', thread_id:'t59', sender_id:'YT_fan_sooyeon', direction:'incoming',
    body:'가을 메이크업 튜토리얼도 만들어주세요! 봄 영상 너무 좋았어요.',
    attachments:[], sent_at:'2026-04-20T08:30:00+09:00', read_at:'2026-04-20T09:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['콘텐츠 요청'], ai_context_solo:'유튜브 가을 메이크업 튜토리얼 요청', ai_context_cumulative:'유튜브 가을 메이크업 콘텐츠 요청' },
  { id:'m167', thread_id:'t59', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'가을 메이크업 기획 중이에요! 기대해주세요 :)',
    attachments:[], sent_at:'2026-04-20T09:00:00+09:00', read_at:null, processed_at:'2026-04-20T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['콘텐츠 요청'], ai_context_solo:'가을 메이크업 기획 중 답글', ai_context_cumulative:'가을 메이크업 콘텐츠 기획 예정' },

  // t60: 틱톡 챌린지 응원 댓글
  { id:'m168', thread_id:'t60', sender_id:'@tiktok_fan_nari', direction:'incoming',
    body:'메이크업 챌린지 따라해봤는데 재밌어요!! 영상 올릴게요 ㅎㅎ',
    attachments:[], sent_at:'2026-04-19T19:30:00+09:00', read_at:'2026-04-19T20:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'틱톡 챌린지 참여 응원 댓글', ai_context_cumulative:'틱톡 챌린지 참여 팬 댓글' },
  { id:'m169', thread_id:'t60', sender_id:'@jiwoo_tiktok', direction:'outgoing',
    body:'오 영상 꼭 보고 싶어요! 태그해주세요~',
    attachments:[], sent_at:'2026-04-19T20:00:00+09:00', read_at:null, processed_at:'2026-04-19T20:00:00+09:00', depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'챌린지 참여 태그 요청 답글', ai_context_cumulative:'틱톡 팬 챌린지 참여 답변' },

  // t61: 브랜드팬 태연 협업 문의
  { id:'m170', thread_id:'t61', sender_id:'@user_taeyeon_fan', direction:'incoming',
    body:'안녕하세요! 소규모 핸드크림 브랜드 운영 중인데 소개해주실 수 있나요?',
    attachments:[], sent_at:'2026-04-18T13:00:00+09:00', read_at:'2026-04-18T14:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:['브랜드'], ai_context_solo:'소규모 핸드크림 브랜드 소개 요청', ai_context_cumulative:'소규모 브랜드 협업 문의 DM' },
  { id:'m171', thread_id:'t61', sender_id:'@jiwoo_beauty', direction:'outgoing',
    body:'안녕하세요! 제품 샘플 먼저 보내주시면 검토해볼게요.',
    attachments:[], sent_at:'2026-04-18T14:00:00+09:00', read_at:null, processed_at:'2026-04-18T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:['브랜드'], ai_context_solo:'샘플 선 발송 검토 요청', ai_context_cumulative:'소규모 브랜드 샘플 검토 요청' },

  // t62: VIP팬 팬미팅 감사 (processed)
  { id:'m172', thread_id:'t62', sender_id:'@vip_fan_jisu', direction:'incoming',
    body:'팬미팅 너무 좋았어요! 직접 만나서 반가웠어요 ㅠㅠ',
    attachments:[], sent_at:'2026-04-15T10:00:00+09:00', read_at:'2026-04-15T11:00:00+09:00', processed_at:'2026-04-17T11:00:00+09:00', depth:1, parent_message_id:null,
    tags:['VIP팬'], ai_context_solo:'팬미팅 감사 DM', ai_context_cumulative:'VIP팬 팬미팅 후 감사 DM' },
  { id:'m173', thread_id:'t62', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'지수님도 와주셔서 감사했어요! 다음에 또 만나요~',
    attachments:[], sent_at:'2026-04-16T09:00:00+09:00', read_at:null, processed_at:'2026-04-16T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['VIP팬'], ai_context_solo:'팬미팅 감사 답장', ai_context_cumulative:'VIP팬 팬미팅 감사 답변' },
  { id:'m174', thread_id:'t62', sender_id:'@vip_fan_jisu', direction:'incoming',
    body:'다음 팬미팅도 꼭 가요! 응원할게요.',
    attachments:[], sent_at:'2026-04-17T11:00:00+09:00', read_at:'2026-04-17T11:30:00+09:00', processed_at:'2026-04-17T11:00:00+09:00', depth:1, parent_message_id:null,
    tags:['VIP팬'], ai_context_solo:'팬미팅 재참여 다짐', ai_context_cumulative:'VIP팬 팬미팅 처리 완료' },

  // t63: 유튜브 팬 서진 댓글 (processed)
  { id:'m175', thread_id:'t63', sender_id:'YT_fan_seojin', direction:'incoming',
    body:'메이크업 영상 퀄리티 진짜 최고예요!! 오래오래 해주세요.',
    attachments:[], sent_at:'2026-04-14T09:30:00+09:00', read_at:'2026-04-14T10:00:00+09:00', processed_at:'2026-04-16T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'유튜브 팬 퀄리티 칭찬 댓글', ai_context_cumulative:'유튜브 팬 응원 댓글 처리' },
  { id:'m176', thread_id:'t63', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'서진님 감사해요! 열심히 할게요 :)',
    attachments:[], sent_at:'2026-04-16T10:00:00+09:00', read_at:null, processed_at:'2026-04-16T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'팬 칭찬 답글', ai_context_cumulative:'유튜브 팬 댓글 답변 완료' },

  // t64: 팬 민지 고민 상담 (processed)
  { id:'m177', thread_id:'t64', sender_id:'@user_fan_minji', direction:'incoming',
    body:'지우님 취업 스트레스가 너무 심해서요 어떻게 마음 다잡으세요?',
    attachments:[], sent_at:'2026-04-13T17:00:00+09:00', read_at:'2026-04-13T18:00:00+09:00', processed_at:'2026-04-15T18:00:00+09:00', depth:1, parent_message_id:null,
    tags:['고민상담'], ai_context_solo:'팬 취업 스트레스 고민 상담', ai_context_cumulative:'팬 취업 스트레스 상담 DM' },
  { id:'m178', thread_id:'t64', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'힘내요! 운동이나 취미 활동으로 잠깐 쉬어가는 것도 중요해요. 잘 될 거예요!',
    attachments:[], sent_at:'2026-04-15T18:00:00+09:00', read_at:null, processed_at:'2026-04-15T18:00:00+09:00', depth:1, parent_message_id:null,
    tags:['고민상담'], ai_context_solo:'취업 스트레스 운동·취미 조언', ai_context_cumulative:'팬 고민 상담 답변 완료' },

  // t65: 파운데이션 포스트 팬 댓글 (processed)
  { id:'m179', thread_id:'t65', sender_id:'@user_fan_eunbi', direction:'incoming',
    body:'파운데이션 비교 영상 덕에 딱 맞는 제품 찾았어요! 감사해요.',
    attachments:[], sent_at:'2026-04-12T09:00:00+09:00', read_at:'2026-04-12T10:00:00+09:00', processed_at:'2026-04-14T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'파운데이션 비교 덕분에 구매 완료 댓글', ai_context_cumulative:'파운데이션 포스트 팬 댓글 처리' },
  { id:'m180', thread_id:'t65', sender_id:'@jiwoo_beauty', direction:'outgoing',
    body:'도움이 됐다니 기뻐요! 좋은 제품 만났으면 좋겠어요 :)',
    attachments:[], sent_at:'2026-04-14T09:00:00+09:00', read_at:null, processed_at:'2026-04-14T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:['일반팬'], ai_context_solo:'파운데이션 팬 댓글 감사 답글', ai_context_cumulative:'파운데이션 팬 댓글 답변 완료' },
  // ===== DIRECT CHECK MESSAGES (t66~t74) =====
  // t66: 인스타 미분류 DM (unprocessed)
  { id:'m181', thread_id:'t66', sender_id:'@unknown_user_01', direction:'incoming',
    body:'안녕하세요. 혹시 문의 가능할까요?',
    attachments:[], sent_at:'2026-05-02T17:00:00+09:00', read_at:'2026-05-02T18:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'내용 불명확 인스타 DM', ai_context_cumulative:'미분류 인스타 DM 수신' },
  { id:'m182', thread_id:'t66', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'안녕하세요! 어떤 문의인지 알려주세요.',
    attachments:[], sent_at:'2026-05-02T18:00:00+09:00', read_at:null, processed_at:'2026-05-02T18:00:00+09:00', depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'문의 내용 요청 답변', ai_context_cumulative:'미분류 DM 내용 확인 요청' },

  // t67: 서브 계정 미분류 DM
  { id:'m183', thread_id:'t67', sender_id:'@unknown_user_02', direction:'incoming',
    body:'뷰티 쪽으로 연락드리고 싶은데요.',
    attachments:[], sent_at:'2026-05-01T15:00:00+09:00', read_at:'2026-05-01T16:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'서브 계정 뷰티 관련 DM', ai_context_cumulative:'서브 계정 미분류 DM 수신' },
  { id:'m184', thread_id:'t67', sender_id:'@jiwoo_beauty', direction:'outgoing',
    body:'안녕하세요! 자세한 내용 알려주시면 검토해볼게요.',
    attachments:[], sent_at:'2026-05-01T16:00:00+09:00', read_at:null, processed_at:'2026-05-01T16:00:00+09:00', depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'내용 요청 답변', ai_context_cumulative:'서브 계정 DM 내용 확인 중' },

  // t68: 익명 이메일
  { id:'m185', thread_id:'t68', sender_id:'anon_user_yt', direction:'incoming',
    body:'안녕하세요. 제안드릴 것이 있어서 연락드립니다.',
    attachments:[], sent_at:'2026-04-30T11:00:00+09:00', read_at:'2026-04-30T12:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'익명 이메일 제안 내용 불명확', ai_context_cumulative:'익명 이메일 수신 내용 미상' },
  { id:'m186', thread_id:'t68', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'안녕하세요! 제안 내용 더 자세히 알려주시면 검토하겠습니다.',
    attachments:[], sent_at:'2026-04-30T12:00:00+09:00', read_at:null, processed_at:'2026-04-30T12:00:00+09:00', depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'익명 이메일 내용 상세 요청', ai_context_cumulative:'익명 이메일 내용 확인 요청' },

  // t69: 네이버 익명 메일
  { id:'m187', thread_id:'t69', sender_id:'@realname_tiktok', direction:'incoming',
    body:'안녕요~ 혹시 DM 보셨나요? 답장 주시면 감사해요!',
    attachments:[], sent_at:'2026-04-29T09:00:00+09:00', read_at:'2026-04-29T10:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'내용 불명확한 틱톡 DM', ai_context_cumulative:'틱톡 익명 DM 수신' },
  { id:'m188', thread_id:'t69', sender_id:'@jiwoo_tiktok', direction:'outgoing',
    body:'안녕하세요! 어떤 문의인지 알려주세요ㅎㅎ',
    attachments:[], sent_at:'2026-04-29T10:00:00+09:00', read_at:null, processed_at:'2026-04-29T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'틱톡 DM 내용 확인 요청', ai_context_cumulative:'틱톡 DM 내용 확인 요청' },

  // t70: 기타 메일
  { id:'m189', thread_id:'t70', sender_id:'misc@domain.com', direction:'incoming',
    body:'Hello, I would like to propose a collaboration.',
    attachments:[], sent_at:'2026-04-28T13:00:00+09:00', read_at:'2026-04-28T14:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'영문 협업 제안 기타 메일', ai_context_cumulative:'기타 도메인 영문 메일 수신' },
  { id:'m190', thread_id:'t70', sender_id:'contact@jiwoo-brand.kr', direction:'outgoing',
    body:'Hello! Please share more details about the proposal.',
    attachments:[], sent_at:'2026-04-28T14:00:00+09:00', read_at:null, processed_at:'2026-04-28T14:00:00+09:00', depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'영문 제안 내용 요청 답변', ai_context_cumulative:'기타 메일 내용 확인 중' },

  // t71: 틱톡 익명 DM
  { id:'m191', thread_id:'t71', sender_id:'@tiktok_unknown_01', direction:'incoming',
    body:'저한테 DM 주실 수 있어요??',
    attachments:[], sent_at:'2026-04-27T18:30:00+09:00', read_at:'2026-04-27T19:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'틱톡 익명 DM 요청', ai_context_cumulative:'틱톡 익명 DM 수신' },
  { id:'m192', thread_id:'t71', sender_id:'@jiwoo_tiktok', direction:'outgoing',
    body:'어떤 용건인지 알려주시면 확인해볼게요!',
    attachments:[], sent_at:'2026-04-27T19:00:00+09:00', read_at:null, processed_at:'2026-04-27T19:00:00+09:00', depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'틱톡 익명 DM 내용 요청', ai_context_cumulative:'틱톡 익명 DM 내용 확인 요청' },

  // t72: 신규 사용자 DM
  { id:'m193', thread_id:'t72', sender_id:'@new_user_abc', direction:'incoming',
    body:'안녕하세요 저 팔로우 해주실 수 있나요??',
    attachments:[], sent_at:'2026-04-26T10:00:00+09:00', read_at:'2026-04-26T11:00:00+09:00', processed_at:null, depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'신규 사용자 팔로우 요청 DM', ai_context_cumulative:'신규 사용자 DM 분류 필요' },
  { id:'m194', thread_id:'t72', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'안녕하세요! 직접 확인 후 답변드릴게요.',
    attachments:[], sent_at:'2026-04-26T11:00:00+09:00', read_at:null, processed_at:'2026-04-26T11:00:00+09:00', depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'신규 DM 직접 확인 예정', ai_context_cumulative:'신규 사용자 DM 직접 확인 중' },

  // t73: 미분류 DM 처리 완료 (processed)
  { id:'m195', thread_id:'t73', sender_id:'@unknown_user_01', direction:'incoming',
    body:'사실 협찬 관련해서 여쭤보려고 했는데요.',
    attachments:[], sent_at:'2026-04-22T14:00:00+09:00', read_at:'2026-04-22T15:00:00+09:00', processed_at:'2026-04-24T15:00:00+09:00', depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'협찬 관련 재문의', ai_context_cumulative:'미분류 DM 협찬 관련 확인' },
  { id:'m196', thread_id:'t73', sender_id:'@jiwoo_daily', direction:'outgoing',
    body:'협찬 문의는 이메일로 제안서 보내주시면 검토해드릴게요.',
    attachments:[], sent_at:'2026-04-23T09:00:00+09:00', read_at:null, processed_at:'2026-04-23T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'이메일 협찬 제안서 안내', ai_context_cumulative:'미분류 DM 이메일 안내 처리' },
  { id:'m197', thread_id:'t73', sender_id:'@unknown_user_01', direction:'incoming',
    body:'알겠습니다. 이메일로 보내볼게요. 감사합니다.',
    attachments:[], sent_at:'2026-04-24T15:00:00+09:00', read_at:'2026-04-24T15:30:00+09:00', processed_at:'2026-04-24T15:00:00+09:00', depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'이메일 전송 의사 확인', ai_context_cumulative:'미분류 DM 처리 완료' },

  // t74: 익명 이메일 처리 완료 (processed)
  { id:'m198', thread_id:'t74', sender_id:'anon@email.com', direction:'incoming',
    body:'안녕하세요. 광고 에이전시인데 협의 가능한지 여쭤봤습니다.',
    attachments:[], sent_at:'2026-04-20T10:00:00+09:00', read_at:'2026-04-20T11:00:00+09:00', processed_at:'2026-04-22T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'광고 에이전시 협의 문의', ai_context_cumulative:'익명 이메일 광고 에이전시 확인' },
  { id:'m199', thread_id:'t74', sender_id:'jiwoo_daily_yt', direction:'outgoing',
    body:'안녕하세요! 공식 이메일로 제안서 보내주시면 검토하겠습니다.',
    attachments:[], sent_at:'2026-04-21T09:00:00+09:00', read_at:null, processed_at:'2026-04-21T09:00:00+09:00', depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'공식 이메일로 제안서 요청', ai_context_cumulative:'익명 이메일 공식 채널 안내' },
  { id:'m200', thread_id:'t74', sender_id:'anon@email.com', direction:'incoming',
    body:'알겠습니다. 공식 이메일로 다시 연락드리겠습니다.',
    attachments:[], sent_at:'2026-04-22T10:00:00+09:00', read_at:'2026-04-22T10:30:00+09:00', processed_at:'2026-04-22T10:00:00+09:00', depth:1, parent_message_id:null,
    tags:[], ai_context_solo:'공식 채널 재연락 확인', ai_context_cumulative:'익명 이메일 직접 확인 완료' },
];

const savedReplies = [
  { id: 'sr1',  category: 'business',     text: '안녕하세요! 협찬 문의 주셔서 감사합니다. 단가표 확인 후 회신드리겠습니다.', generated_by: 'ai' },
  { id: 'sr2',  category: 'business',     text: '제안서 잘 받았습니다. 검토 후 빠른 시일 내 답변드리겠습니다.', generated_by: 'user' },
  { id: 'sr3',  category: 'business',     text: '일정 조율은 다음 주 중으로 가능합니다. 구체적인 날짜를 알려주시면 확인해보겠습니다.', generated_by: 'user' },
  { id: 'sr4',  category: 'business',     text: '계약서 초안 검토 완료했습니다. 수정 사항 첨부 파일로 보내드립니다.', generated_by: 'ai' },
  { id: 'sr5',  category: 'ops',          text: '구매해 주셔서 감사합니다! 배송은 영업일 기준 2~3일 소요됩니다.', generated_by: 'user' },
  { id: 'sr6',  category: 'ops',          text: '불편을 드려 죄송합니다. 환불 신청은 구매 후 7일 이내 가능하며 고객센터로 연락 주세요.', generated_by: 'ai' },
  { id: 'sr7',  category: 'ops',          text: '링크는 프로필 바이오에서 확인하실 수 있습니다. 감사합니다!', generated_by: 'user' },
  { id: 'sr8',  category: 'ops',          text: '제품 관련 질문은 브랜드 공식 고객센터에 문의하시면 더 정확한 안내가 가능합니다.', generated_by: 'ai' },
  { id: 'sr9',  category: 'social',       text: '응원해 주셔서 정말 감사해요! 앞으로도 좋은 콘텐츠로 찾아올게요 :)', generated_by: 'user' },
  { id: 'sr10', category: 'social',       text: '고민 털어놔 주셔서 감사해요. 힘내세요, 잘 될 거예요!', generated_by: 'ai' },
  { id: 'sr11', category: 'social',       text: '콘텐츠 요청 감사해요! 아이디어 참고할게요. 언제 올라올지는 미정이지만 기대해 주세요!', generated_by: 'user' },
  { id: 'sr12', category: 'direct_check', text: '메시지 확인했습니다. 조금 더 자세히 알려주시면 빠르게 답변드리겠습니다.', generated_by: 'ai' },
  { id: 'sr13', category: 'direct_check', text: '안녕하세요! 어떤 도움이 필요하신지 편하게 말씀해 주세요.', generated_by: 'user' },
];

const ai_drafts = {
  // 비즈니스 미처리
  't3':  '핏랩 협찬 제안 잘 받았습니다. 단가 및 세부 조건 검토 후 빠르게 연락드리겠습니다.',
  't5':  '하루케어 수분크림 협찬 검토 중입니다. 단가 조율하여 이번 주 내 회신드리겠습니다.',
  't8':  '문랩 행사 초청 감사합니다. 일정 확인 후 참석 여부 빠르게 답변드리겠습니다.',
  't9':  '데일리푸드 공구 제안 감사합니다. 마진 조건 검토 후 이번 주 내 연락드리겠습니다.',
  't12': '네이처글로우 비건 선크림 협찬 제안 감사합니다. 세부 조건 확인 후 회신드리겠습니다.',
  't13': '블룸 향수 브랜디드 콘텐츠 제안 잘 받았습니다. 검토 후 연락드리겠습니다.',
  // 운영/CS 미처리
  't21': '선크림 성분 질문 감사합니다. 징크옥사이드 무기자차 기반 제품입니다!',
  't24': '봄 메이크업 영상 링크는 영상 설명란 또는 프로필 바이오에서 확인하세요!',
  't29': '배송 지연 불편을 드려 죄송합니다. 브랜드 측에 즉시 확인 후 연락드리겠습니다.',
  't30': '제품 불량으로 불편을 드려 정말 죄송합니다. 즉시 환불 처리 진행해 드리겠습니다.',
  // 소통 미처리
  't47': '팬미팅 일정은 준비 중이에요! 확정되면 인스타에 가장 먼저 공지할게요 :)',
  't51': '여드름 흉터 고민 공유해 주셔서 감사해요. 나이아신아마이드 성분 꾸준히 써보세요!',
  't56': '지연님 인스타 라이브 콜라보 너무 좋죠! 다음 달 일정 맞춰봐요~',
  // 직접확인 미처리
  't66': '안녕하세요! 어떤 문의인지 좀 더 자세히 알려주시면 빠르게 답변드리겠습니다.',
  't68': '제안 내용 더 구체적으로 알려주시면 검토 후 회신드리겠습니다.',
};

window.MOCK_DATA = {
  channel,
  origins,
  threads,
  messages,
  savedReplies,
  automations: [],
  AUTOMATION_TEMPLATES: [],
  ai_drafts,
  TAG_CATALOG,
  CATEGORIES,
  PLATFORM_LOGOS,
};
