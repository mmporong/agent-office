export interface ChronicleItem {
  title: string
  description: string
}

export interface ChroniclePhase {
  title: string
  summary: string
  implementationDetail: string
  coreLogic: string
  outcomes: ChronicleItem[]
}

export interface SupportAgentRole {
  name: string
  role: string
  detail: string
}

export interface CliAgentGroup {
  title: string
  summary: string
  agents: ChronicleItem[]
}

export const chroniclePhases: ChroniclePhase[] = [
  {
    title: '1. Wrapper shell 계획 수립',
    summary:
      '게임 본체보다 먼저 웹 래퍼를 설계해, 런타임이 없어도 제품 구조와 진입 흐름을 설명할 수 있는 기반을 만들었다.',
    implementationDetail:
      '초기 구현은 설정 로드, 상태 표시, 로딩 실패 대응을 처리하는 웹 셸을 잡는 데 집중했다. Unity가 없어도 로컬에서 구조와 사용자 흐름을 먼저 검토할 수 있게 한 것이 핵심이다.',
    coreLogic:
      '진입점은 Unity가 아니라 wrapper다. config 로더와 브리지 이벤트 이름을 먼저 고정해, 나중에 실제 WebGL 빌드가 들어와도 같은 계약으로 연결되게 설계했다.',
    outcomes: [
      { title: 'config 로더', description: '빌드 경로와 제품 설정을 wrapper가 먼저 읽는 구조를 확정했다.' },
      { title: '브리지 계약', description: 'Unity와 wrapper가 주고받을 이벤트 이름과 책임 범위를 먼저 정의했다.' },
    ],
  },
  {
    title: '2. Agent Office 대시보드 구현',
    summary:
      '실제 빌드가 없어도 프로젝트가 어떻게 굴러가는지 보여주기 위해, wrapper를 오피스형 운영 대시보드로 재구성했다.',
    implementationDetail:
      '메인 화면은 단순 로더가 아니라 에이전트들이 사무실에서 일하는 장면으로 바뀌었다. 우측과 하단 패널에는 목표, 상태, 블로커, 진행 보드를 배치해 데모이면서도 운영 화면처럼 읽히게 구성했다.',
    coreLogic:
      '주요 로직은 상태값과 존 매핑이다. planning, researching, building 같은 상태가 위치, 카드, 패널에 함께 반영되도록 묶어 하나의 상태 변화가 화면 전체에서 읽히게 만들었다.',
    outcomes: [
      { title: '상태 기반 배치', description: '에이전트 상태가 바뀌면 장면 위치와 설명 패널이 함께 갱신된다.' },
      { title: '운영 보드 통합', description: '브리지 상태, 목표, 블로커를 하나의 로컬 데모 화면에서 확인할 수 있다.' },
    ],
  },
  {
    title: '3. 레퍼런스 반영과 다음 단계',
    summary:
      '화면은 Star-Office 계열 레퍼런스를 바탕으로 정리했고, 현재는 실제 Unity 런타임 연결을 준비하는 중간 단계로 정리되어 있다.',
    implementationDetail:
      '오피스는 하나의 방처럼 읽히도록 장면 구성을 다시 정리했고, 로컬 사이트에는 Chronicle과 에이전트 조사 탭도 함께 넣었다. 즉, 구현 결과뿐 아니라 의사결정과 역할 구조도 웹에서 바로 확인할 수 있게 했다.',
    coreLogic:
      '핵심은 시각 데모와 실연결 준비를 분리한 구조다. 현재 화면은 로컬에서 맥락과 운영 방식을 설명하는 레이어이고, 다음 단계는 실제 Unity 빌드 경로와 브리지 진입점을 연결하는 것이다.',
    outcomes: [
      { title: 'Chronicle 탭', description: '작업 배경과 구현 의도를 포트폴리오형 카드로 정리해 웹에 노출했다.' },
      { title: '다음 우선순위', description: '실제 Unity 프로젝트 경로 확보와 WebGL 브리지 연결이 남아 있다.' },
    ],
  },
]

export const supportAgentRoles: SupportAgentRole[] = [
  {
    name: 'Architect',
    role: '실제 Unity 런타임 연결 구조와 브리지 확장 검토',
    detail: 'mock 기반 로컬 데모를 실제 Unity WebGL 연결 구조로 넘길 때, 어디까지를 wrapper 책임으로 둘지 정리하는 역할이다.',
  },
  {
    name: 'Chronicle',
    role: '개발일지, 기술 블로그, 포트폴리오 글 초안 정리',
    detail: '세션 내용을 길게 나열하지 않고, 문제-접근-구현-다음 단계가 읽히는 카드형 서술로 정리하는 역할이다.',
  },
  {
    name: 'Art Direction',
    role: '오피스 감성과 캐릭터 자산 방향 조율',
    detail: '레퍼런스를 그대로 복제하기보다, 어떤 분위기와 밀도를 유지할지 시각적 방향을 조정하는 역할이다.',
  },
  {
    name: 'Audio',
    role: '오피스/게임 전환에 맞는 사운드 계층 설계',
    detail: '오피스 데모, 로딩, 실제 플레이 전환 시 어떤 사운드 레이어가 필요한지 구조를 정리하는 역할이다.',
  },
  {
    name: 'Community',
    role: '배포 후 소개글, 공지, 메시지 흐름 관리',
    detail: '완성된 결과물을 사용자에게 어떻게 설명하고 공지할지, 외부 커뮤니케이션 흐름을 정리하는 역할이다.',
  },
]

export const cliAgentGroups: CliAgentGroup[] = [
  {
    title: '탐색 / 조사',
    summary: '프로젝트 위치, 세션 문맥, 요구사항, 기술적 제약을 빠르게 복구하고 방향을 세우는 데 쓰는 그룹이다.',
    agents: [
      { title: 'explore', description: '코드베이스와 파일 구조를 빠르게 탐색해 현재 상태를 파악한다.' },
      { title: 'analyst', description: '요구사항과 우선순위를 정리해 무엇을 먼저 할지 판단을 돕는다.' },
      { title: 'planner', description: '작업 순서와 의존성을 구조적으로 정리한다.' },
    ],
  },
  {
    title: '구현 / 수정',
    summary: '실제 코드 변경, 레이아웃 수정, 최소 수정 빌드 복구처럼 손을 대는 구현 작업에 쓰는 그룹이다.',
    agents: [
      { title: 'executor', description: '주요 기능과 UI 변경을 직접 구현하는 기본 실행 에이전트다.' },
      { title: 'build-fixer', description: '빌드나 컴파일 오류가 생겼을 때 최소 수정으로 복구하는 데 적합하다.' },
      { title: 'designer', description: '화면 구조와 시각 흐름을 더 읽기 좋게 다듬는 데 사용한다.' },
    ],
  },
  {
    title: '검증 / 리뷰',
    summary: '구현 이후 동작 확인, 회귀 점검, 품질 검토를 분담해 결과물을 안정화하는 데 쓰는 그룹이다.',
    agents: [
      { title: 'test-engineer', description: '테스트 전략과 검증 포인트를 잡아 구현 누락을 줄인다.' },
      { title: 'qa-tester', description: '실제 사용 흐름처럼 조작하며 UI/동작 문제를 확인한다.' },
      { title: 'verifier', description: '완료라고 말할 수 있는 근거가 충분한지 마지막으로 점검한다.' },
    ],
  },
  {
    title: '문서 / 정리',
    summary: 'README, 인계 문서, Chronicle 글감, 커밋 정리처럼 결과물을 다음 사람도 이해할 수 있게 만드는 그룹이다.',
    agents: [
      { title: 'writer', description: '기술 블로그, README, 인계 문서를 읽기 쉽게 정리한다.' },
      { title: 'document-specialist', description: '외부 문서 기준으로 설명과 레퍼런스를 보강한다.' },
      { title: 'git-master', description: '변경 이력을 정리하고 커밋 흐름을 다듬는 데 적합하다.' },
    ],
  },
]
