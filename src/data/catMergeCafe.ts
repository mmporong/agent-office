export type ShellStageId = 'booting' | 'loading' | 'ready' | 'degraded'
export type HealthStatus = 'ready' | 'pending' | 'blocked'

export interface ShellStage {
  id: ShellStageId
  label: string
  headline: string
  description: string
  accent: string
}

export interface StatusItem {
  title: string
  detail: string
  status: HealthStatus
}

export interface BridgeContract {
  direction: 'Wrapper -> Unity' | 'Unity -> Wrapper'
  name: string
  payload: string
  purpose: string
}

export interface MilestoneCard {
  title: string
  summary: string
  deliverables: string[]
}

export interface CollectionPreviewItem {
  tier: string
  name: string
  mood: string
}

export const projectSummary = {
  name: 'Cat Merge Cafe',
  tagline: 'Pixel cat merge game for Appintoos, shipped as Unity WebGL + wrapper',
  platform: 'Appintoos first',
  build: 'Unity WebGL + React wrapper',
  focus: 'Collection/Growth 70 + Reaction/Action 30',
}

export const shellStages: ShellStage[] = [
  {
    id: 'booting',
    label: 'Wrapper Boot',
    headline: '브랜드 셸과 런처를 먼저 올립니다',
    description:
      '캔버스 마운트, 로딩 화면, 브라우저 라이프사이클 훅, 장애 복구 UI를 래퍼에서 선행 준비합니다.',
    accent: 'mint',
  },
  {
    id: 'loading',
    label: 'Unity Loading',
    headline: 'Unity WebGL 로더를 안정적으로 붙입니다',
    description:
      'manifest fetch, loader script, progress bar, timeout, retry, 성능 로그를 한 흐름으로 묶습니다.',
    accent: 'amber',
  },
  {
    id: 'ready',
    label: 'Gameplay Ready',
    headline: '게임 시작 이후의 저장/광고/분석 브리지를 활성화합니다',
    description:
      'visibilitychange 저장, reward callback, interstitial gate, analytics queue를 여기서 관리합니다.',
    accent: 'sky',
  },
  {
    id: 'degraded',
    label: 'Recovery Mode',
    headline: '로딩 실패나 플랫폼 제약 시 재시도 경로를 보여줍니다',
    description:
      'Appintoos 제약, 저장 불가, 광고 브리지 실패, Unity load fail에 대비한 안전한 폴백 상태입니다.',
    accent: 'rose',
  },
]

export const readinessChecks: StatusItem[] = [
  {
    title: 'Unity WebGL 캔버스 마운트',
    detail: '실제 Unity build URL 연결 전이므로 현재는 셸 단계까지만 준비됨',
    status: 'pending',
  },
  {
    title: 'Wrapper 로딩/오류 UX',
    detail: '브랜드 헤더, 상태 표시, 재시도 동선 설계를 우선 구현 대상으로 설정',
    status: 'ready',
  },
  {
    title: '저장 전략',
    detail: 'PlayerPrefs 단독 의존 금지, IndexedDB 기반 저장 경로가 필요',
    status: 'pending',
  },
  {
    title: '광고 브리지',
    detail: '보상형/전면형은 명시적 callback 이후에만 처리해야 함',
    status: 'pending',
  },
  {
    title: '실제 수박게임 코어 프로젝트 위치',
    detail: '이번 세션에서 홈 디렉터리 하위에서는 발견하지 못해 경로 확인이 필요',
    status: 'blocked',
  },
]

export const bridgeContracts: BridgeContract[] = [
  {
    direction: 'Wrapper -> Unity',
    name: 'wrapper:boot-ready',
    payload: '{ platform, locale, safeArea, wrapperVersion }',
    purpose: 'Unity가 초기 플랫폼 정보를 받고 런타임을 시작할 수 있게 함',
  },
  {
    direction: 'Unity -> Wrapper',
    name: 'unity:runtime-ready',
    payload: '{ buildVersion, saveVersion }',
    purpose: '캔버스 로딩 완료 후 CTA와 HUD를 활성화',
  },
  {
    direction: 'Unity -> Wrapper',
    name: 'unity:save-requested',
    payload: '{ slot, reason, snapshot }',
    purpose: '가시성 변경/결과 화면 전환 시 안전한 저장을 요청',
  },
  {
    direction: 'Wrapper -> Unity',
    name: 'wrapper:reward-result',
    payload: '{ placement, granted, transactionId }',
    purpose: '보상형 광고 보상 승인 여부를 Unity 도메인에 전달',
  },
  {
    direction: 'Unity -> Wrapper',
    name: 'unity:interstitial-requested',
    payload: '{ placement, cooldownKey }',
    purpose: '결과 화면 같은 안전 구간에서만 전면형 노출을 위임',
  },
  {
    direction: 'Wrapper -> Unity',
    name: 'wrapper:lifecycle-change',
    payload: '{ state: visible | hidden | focused | blurred }',
    purpose: '백그라운드 복귀/일시정지 시 입력 및 저장 동작을 안정화',
  },
]

export const milestones: MilestoneCard[] = [
  {
    title: 'M1. Merge board vertical slice',
    summary: '기존 수박게임 코어 재사용 여부를 빠르게 검증하는 단계',
    deliverables: ['드롭/머지', '점수', '게임오버', '결과 화면 초안'],
  },
  {
    title: 'M2. Growth shell',
    summary: 'Cat Merge Cafe로 느껴지게 만드는 최소 메타 레이어',
    deliverables: ['도감', '신규 고양이 해금', '얕은 카페 성장 표현', '저장 데이터'],
  },
  {
    title: 'M3. Ads + analytics',
    summary: 'Appintoos 대응 수익화와 이벤트 계측을 안전하게 연결',
    deliverables: ['보상형 이어하기', '결과 화면 전면형', 'event queue', 'frequency gate'],
  },
  {
    title: 'M4. Wrapper hardening',
    summary: 'WebGL 래퍼를 실제 배포 가능한 수준으로 안정화',
    deliverables: ['retry UX', 'visibility save', 'resize 대응', 'browser smoke checklist'],
  },
]

export const launchBlockers = [
  '저장 손실',
  '광고 보상 중복 또는 누락',
  '전면형 광고 복귀 후 입력 멈춤',
  'WebGL 로딩 실패 후 재시도 불가',
  '실제 Unity 코어 프로젝트 경로 미확정',
]

export const collectionPreview: CollectionPreviewItem[] = [
  { tier: 'Tier 1', name: 'Fish Treat', mood: '첫 머지 학습용 스타터 오브젝트' },
  { tier: 'Tier 4', name: 'Yarn Ball Cat', mood: '초반 만족감을 주는 실루엣 보상' },
  { tier: 'Tier 7', name: 'Barista Cat', mood: '카페 성장 셸과 연결되는 대표 고양이' },
  { tier: 'Tier 9', name: 'Crown Cat', mood: '런 종료 후 가장 강한 수집 동기를 주는 목표' },
]

export const runtimeEvents = [
  'webgl_load_start',
  'webgl_load_complete',
  'game_start',
  'item_drop',
  'merge_created',
  'collection_unlocked',
  'rescue_ad_offer_shown',
  'rescue_ad_accepted',
  'run_complete',
  'session_end',
]
