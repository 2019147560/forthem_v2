export interface Program {
  id: string
  title: string
  org: string
  region: string
  mode: string
  motive: string[]
  status: string
  period: string
  support: string[]
  deadline: string
  duration: string
  spots: number
  spotsLeft: number
  cover: string
  tag: string
  summary: string
  detail: string
  bullets: string[]
  applyUrl: string
  qualification?: string
  qualificationDetail?: string
  location?: string
  curriculum?: { week: string; content: string }[]
  contact?: {
    phone?: string
    kakao?: string
    openChat?: string
    email?: string
  }
}

export interface Review {
  id: string
  handle: string
  program: string
  body: string
  weeks: string
  color: string
}

export interface Support {
  id: string
  cat: string
  title: string
  org: string
  amount: string
  body: string
}

export const PROGRAMS: Program[] = [
  {
    id: 'p01',
    title: '천천히, 다시 만나는 일상',
    org: '경기 청년재단',
    region: '경기',
    mode: '온·오프라인',
    motive: ['일상 회복', '관계 형성'],
    status: '현재 신청 가능',
    period: '5회 이상',
    support: ['1:1 상담', '교통비'],
    deadline: '2026.05.18',
    duration: '8주 · 주 1회',
    spots: 12,
    spotsLeft: 4,
    cover: 'sage',
    tag: '회복 프로그램',
    summary: '아주 작은 외출에서 시작해, 또래와 함께 일상의 리듬을 천천히 되찾아가는 8주 프로그램.',
    detail: '집 밖으로 나오는 것조차 큰 결심이 필요한 분들을 위해, 처음 4주는 1:1 동행으로 시작해 점차 소그룹 활동으로 옮겨갑니다. 강요 없이, 본인의 속도에 맞춰 참여할 수 있어요.',
    bullets: ['주 1회, 회당 90분 이내 — 부담 없는 호흡', '동행 매니저가 지하철·약속 장소까지 함께', '결석에 대한 페널티 없음, 언제든 쉬어갈 수 있어요'],
    applyUrl: 'https://example.com/apply/p01',
    qualification: '만 19~34세 고립·은둔 청년',
    qualificationDetail: '현재 사회적 고립 또는 은둔 상태에 있는 만 19~34세 청년으로, 일상 회복과 관계 형성을 희망하는 분이라면 누구나 신청 가능합니다. 학력, 경력, 소득 제한 없이 참여하실 수 있습니다.',
    location: '경기도 수원시 (오프라인 활동 시)',
    curriculum: [
      { week: '1~2주차', content: '1:1 동행 프로그램 - 매니저와 함께 가까운 장소 방문, 외출 연습' },
      { week: '3~4주차', content: '소그룹 활동 전환 - 3~4명 소그룹으로 카페/공원 방문' },
      { week: '5~6주차', content: '문화 활동 체험 - 영화관, 전시회 등 문화공간 방문' },
      { week: '7~8주차', content: '자립 활동 - 혼자 또는 또래와 함께 자유 활동 계획 및 실천' },
    ],
    contact: { phone: '031-123-4567', kakao: '@경기청년재단', openChat: 'https://open.kakao.com/example', email: 'support@example.or.kr' },
  },
  {
    id: 'p02',
    title: '방 안에서 세상으로, 온라인 살롱',
    org: '다나와센터 수원',
    region: '경기',
    mode: '온라인',
    motive: ['관계 형성'],
    status: '현재 신청 가능',
    period: '2회-4회',
    support: ['1:1 상담'],
    deadline: '2026.05.10',
    duration: '4주 · 주 1회',
    spots: 20,
    spotsLeft: 11,
    cover: 'terracotta',
    tag: '온라인 모임',
    summary: '카메라를 켜지 않아도 괜찮아요. 텍스트와 음성만으로 시작하는 청년 살롱.',
    detail: '얼굴을 보이지 않아도, 자기 소개를 하지 않아도 됩니다. 글자로만, 혹은 목소리로만 참여할 수 있는 살롱 형식의 비대면 모임이에요.',
    bullets: ['익명 닉네임으로 참여', '발화 없이 듣기만 해도 출석 인정', '매주 다른 주제 — 음악, 책, 게임, 동물'],
    applyUrl: 'https://example.com/apply/p02',
  },
  {
    id: 'p03',
    title: '글쓰기로 나를 정리하는 시간',
    org: '서울 청년허브',
    region: '서울',
    mode: '온·오프라인',
    motive: ['일상 회복'],
    status: '모집 예정',
    period: '1회(원데이)',
    support: ['여행 경비'],
    deadline: '2026.06.01',
    duration: '하루 · 4시간',
    spots: 15,
    spotsLeft: 15,
    cover: 'cream',
    tag: '원데이',
    summary: '내 안에 머물러 있던 말들을 종이 위에 옮겨놓는 하루.',
    detail: '작가와 함께 글쓰기 워크숍. 결과물을 발표하지 않아도 됩니다. 가져가서 혼자 읽거나, 버려도 됩니다.',
    bullets: ['익명 글쓰기 가능', '점심·다과 제공', '소그룹(5명 이내)'],
    applyUrl: 'https://example.com/apply/p03',
  },
  {
    id: 'p04',
    title: '식물 돌봄, 나도 돌봄',
    org: '부산 청년정책연구원',
    region: '부산',
    mode: '오프라인',
    motive: ['일상 회복', '관계 형성'],
    status: '현재 신청 가능',
    period: '5회 이상',
    support: ['교통비', '재료비'],
    deadline: '2026.05.22',
    duration: '6주 · 주 1회',
    spots: 10,
    spotsLeft: 2,
    cover: 'sage',
    tag: '회복 프로그램',
    summary: '작은 화분 하나를 매주 만나며, 천천히 자라는 것의 리듬을 배웁니다.',
    detail: '식물을 매개로 한 그룹 케어. 말이 없어도, 식물에 물을 주는 행위만으로도 함께 있는 시간이 됩니다.',
    bullets: ['화분·흙·도구 모두 제공', '결석한 주는 강사가 식물 대리 돌봄', '6주차에 작은 정원 모임'],
    applyUrl: 'https://example.com/apply/p04',
  },
  {
    id: 'p05',
    title: '취업 전, 나를 알아가는 워크숍',
    org: '인천 청년센터',
    region: '인천',
    mode: '오프라인',
    motive: ['사회 복귀'],
    status: '현재 신청 가능',
    period: '5회 이상',
    support: ['1:1 상담', '교통비'],
    deadline: '2026.05.15',
    duration: '8주 · 주 2회',
    spots: 8,
    spotsLeft: 1,
    cover: 'terracotta',
    tag: '사회 복귀',
    summary: '이력서 쓰기 전에, 내가 무엇을 좋아하고 견딜 수 있는지부터.',
    detail: '바로 취업을 준비하는 것이 아니라, 자기 이해 워크숍을 거쳐 직무 탐색까지 8주에 걸쳐 진행합니다.',
    bullets: ['직무 검사 + 1:1 코칭', '소규모 모의 면접 (선택)', '수료 후 진로 컨설팅 6개월 연계'],
    applyUrl: 'https://example.com/apply/p05',
  },
  {
    id: 'p06',
    title: '늦은 밤 라디오, 청년 사연함',
    org: '광주 청년재단',
    region: '광주',
    mode: '온라인',
    motive: ['관계 형성'],
    status: '현재 신청 가능',
    period: '2회-4회',
    support: ['1:1 상담'],
    deadline: '2026.05.30',
    duration: '4주 · 주 1회',
    spots: 30,
    spotsLeft: 22,
    cover: 'cream',
    tag: '온라인 모임',
    summary: '밤 10시, 라디오처럼 듣고 익명으로 사연을 보내는 비대면 모임.',
    detail: '진행자의 목소리만 들으며 채팅으로 사연을 남기는 라이브. 듣기만 해도 됩니다.',
    bullets: ['익명 사연 채팅', '주 1회 1시간', '아카이빙 다시듣기 제공'],
    applyUrl: 'https://example.com/apply/p06',
  },
  {
    id: 'p07',
    title: '동네 한 바퀴, 산책 클럽',
    org: '대전 청년정책본부',
    region: '대전',
    mode: '오프라인',
    motive: ['일상 회복', '관계 형성'],
    status: '마감',
    period: '5회 이상',
    support: ['교통비'],
    deadline: '2026.04.10',
    duration: '6주 · 주 1회',
    spots: 12,
    spotsLeft: 0,
    cover: 'sage',
    tag: '회복 프로그램',
    summary: '말 없이도 괜찮은, 함께 걷기만 하는 모임.',
    detail: '대화 없이 30분간 동네를 걷고 헤어집니다. 침묵이 어색하지 않은 모임.',
    bullets: ['동행 매니저 1명 상시', '비올 때는 실내 코스', '걸음수 인증 시 소정의 굿즈'],
    applyUrl: 'https://example.com/apply/p07',
  },
  {
    id: 'p08',
    title: '게임으로 만나는 또래 살롱',
    org: '강원 청년허브',
    region: '강원',
    mode: '온라인',
    motive: ['관계 형성'],
    status: '모집 예정',
    period: '5회 이상',
    support: ['1:1 상담'],
    deadline: '2026.06.10',
    duration: '8주 · 주 1회',
    spots: 16,
    spotsLeft: 16,
    cover: 'terracotta',
    tag: '온라인 모임',
    summary: '말 대신 컨트롤러로. 협동 게임을 통해 천천히 친해지는 8주.',
    detail: 'PC·콘솔 협동 게임 중심. 마이크 사용은 자유, 채팅만으로도 충분히 즐길 수 있도록 설계했어요.',
    bullets: ['게임은 매주 투표로 결정', '플레이 장비 대여 가능', '게임 외 잡담방 운영'],
    applyUrl: 'https://example.com/apply/p08',
  },
]

export const REVIEWS: Review[] = [
  { id: 'r1', handle: '익명 청년 · 26', program: '천천히, 다시 만나는 일상', body: '처음엔 약속 장소에 가는 것조차 무서웠는데, 매니저님이 지하철역에서 같이 기다려주신다는 게 큰 안심이었어요. 8주 차에는 혼자서도 갈 수 있게 됐어요.', weeks: '8주 참여', color: 'sage' },
  { id: 'r2', handle: '익명 청년 · 24', program: '방 안에서 세상으로, 온라인 살롱', body: '카메라를 안 켜도 된다는 게 진짜 좋았어요. 텍스트로만 한 달 동안 참여했는데, 마지막 주에 처음으로 목소리를 냈어요.', weeks: '4주 참여', color: 'terracotta' },
  { id: 'r3', handle: '익명 청년 · 29', program: '식물 돌봄, 나도 돌봄', body: '말을 안 해도 같이 있는 시간이 어색하지 않다는 걸 처음 느꼈어요. 화분에 물 주는 일이 그렇게 큰 일이 될 줄 몰랐어요.', weeks: '6주 참여', color: 'cream' },
  { id: 'r4', handle: '익명 청년 · 27', program: '취업 전, 나를 알아가는 워크숍', body: '바로 취업하라는 압박이 없어서 좋았어요. 8주 동안 제가 뭘 견딜 수 있고 뭘 못하는지를 알아가는 시간이었어요.', weeks: '8주 수료', color: 'sage' },
  { id: 'r5', handle: '익명 청년 · 25', program: '늦은 밤 라디오, 청년 사연함', body: '잠 못 드는 밤에 켜놓을 수 있는 게 생겼다는 것만으로도 의미가 컸어요.', weeks: '4주 참여', color: 'terracotta' },
]

export const SUPPORTS: Support[] = [
  { id: 's1', cat: '경제', title: '청년 자립지원금', org: '보건복지부', amount: '월 50만원 · 최대 6개월', body: '만 19~34세 고립·은둔 청년 대상 자립 준비 지원금. 주거 이전, 학습, 의료비 등 지정 항목에 사용 가능.' },
  { id: 's2', cat: '심리', title: '청년 마음건강 바우처', org: '보건복지부', amount: '회당 8만원 · 10회', body: '전문 상담사와의 1:1 심리 상담 비용 지원. 비대면 상담 포함. 신청 후 평균 2주 내 매칭.' },
  { id: 's3', cat: '주거', title: '청년 월세 한시 특별지원', org: '국토교통부', amount: '월 20만원 · 12개월', body: '독립 거주 중인 저소득 청년 대상 월세 지원. 부모 소득 무관 본인 소득 기준.' },
  { id: 's4', cat: '의료', title: '청년 건강검진 무상지원', org: '국민건강보험공단', amount: '연 1회 무상', body: '비취업·비재학 청년 대상 종합 건강검진. 정신건강 항목 포함.' },
  { id: 's5', cat: '교육', title: '국민내일배움카드', org: '고용노동부', amount: '300~500만원', body: '직업 훈련 비용 지원. 은둔 청년 우선 배정 트랙 별도 운영.' },
  { id: 's6', cat: '경제', title: '청년 도약계좌', org: '금융위원회', amount: '월 최대 70만원 매칭', body: '5년간 저축 시 정부 매칭 지원. 만 19~34세 근로·사업소득 청년.' },
]

export const FILTER_DEFS = [
  { key: 'region', label: '지역', options: ['전체', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충청', '전라', '경상', '제주'] },
  { key: 'motive', label: '참여 동기', options: ['상관없어요', '일상 회복', '사회 복귀', '관계 형성'] },
  { key: 'mode', label: '온/오프라인', options: ['상관없어요', '온라인', '오프라인', '온·오프라인'] },
  { key: 'period', label: '참여 기간', options: ['전체', '1회(원데이)', '2회-4회', '5회 이상'] },
  { key: 'status', label: '모집 상태', options: ['전체', '현재 신청 가능', '모집 예정', '마감'] },
]
