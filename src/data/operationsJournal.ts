export interface JournalItem {
  title: string
  description: string
}

export interface MeetingItem {
  speaker: string
  note: string
}

export interface JournalEntry {
  id: string
  date: string
  researchTitle: string
  researchSummary: string
  researchItems: JournalItem[]
  meetingTitle: string
  meetingSummary: string
  meetingItems: MeetingItem[]
  decisions: JournalItem[]
}

export const journalStorageKey = 'lim-studio-ops-journal-v1'

export const journalMemoryRules: JournalItem[] = [
  {
    title: '일자별 누적',
    description: '리서치와 회의 기록은 날짜 단위로 쌓이며, 이전 기록을 덮어쓰지 않는 구조를 기본으로 유지한다.',
  },
  {
    title: '웹 메모리 유지',
    description: '사이트에 보이는 운영 기록은 새로고침 후에도 남아 있어야 하므로 브라우저 저장소를 기준으로 보존한다.',
  },
  {
    title: '배포 origin 분리',
    description: 'localhost와 GitHub Pages는 서로 다른 origin이므로 Chronicle 기록은 각 환경에서 독립적으로 누적된다.',
  },
  {
    title: '회의 중심 정리',
    description: '리서치 결과는 최종적으로 에이전트 회의 결정으로 연결되며, 웹에서는 두 흐름을 함께 보여준다.',
  },
]

export const seedJournalEntries: JournalEntry[] = [
  {
    id: '2026-03-13T06:18:27-pages-migration-plan',
    date: '2026-03-13',
    researchTitle: 'GitHub Pages 이전 전략 점검',
    researchSummary:
      '현재 Office / Chronicle / Agents 사이트를 별도 GitHub Pages 저장소로 옮기기 위해, Vite base 경로와 정적 fetch 경로, 그리고 배포 후 브라우저 저장소 동작 차이를 먼저 정리했다.',
    researchItems: [
      {
        title: '배포 경로 점검',
        description: 'Vite 기본 설정에는 base가 없어 별도 Pages 저장소 경로에서 자산 URL과 fetch 경로가 깨질 가능성이 확인되었다.',
      },
      {
        title: '운영 메모리 영향',
        description: 'Chronicle 저널은 localStorage 기반이므로 GitHub Pages 배포 후에도 유지되지만, localhost 기록이 자동으로 공유되지는 않는다.',
      },
      {
        title: '자산 현황',
        description: 'Star-Office 배경과 캐릭터 일부는 raw GitHub 자산을 직접 참조하고 있어, 이번 단계에서는 유지하되 README에 운영 주의사항을 남기기로 했다.',
      },
    ],
    meetingTitle: 'GitHub Pages 이전 범위 정리 회의',
    meetingSummary:
      '회의에서는 현재 소스 저장소와 별도 Pages 저장소를 분리해 운영하기로 하고, 먼저 Pages-safe 경로 처리와 배포 워크플로, 문서 정리를 한 묶음으로 진행하기로 합의했다.',
    meetingItems: [
      {
        speaker: 'Orchestrator',
        note: '소스 저장소는 그대로 두고, 별도 Pages 저장소로 공개용 정적 사이트를 배포하는 흐름으로 고정한다.',
      },
      {
        speaker: 'Analyst',
        note: '핵심 리스크는 base path와 config fetch 절대 경로이며, 이 둘을 먼저 정리해야 GitHub Pages에서 같은 UI를 재현할 수 있다.',
      },
      {
        speaker: 'Executor',
        note: '코드 수정은 Vite 설정, Unity config path, 배포 워크플로, README 갱신 중심으로 최소 범위로 묶는 것이 적절하다.',
      },
      {
        speaker: 'ReleaseOps',
        note: '현재 환경에서는 pwsh가 없어 빌드 검증이 막혀 있으므로, 배포 설정과 함께 검증 blocker를 문서에 명확히 남겨야 한다.',
      },
    ],
    decisions: [
      {
        title: '배포 구조 확정',
        description: '현재 앱은 별도 GitHub Pages 전용 저장소로 배포하며, 소스 저장소는 개발 기준 저장소로 유지한다.',
      },
      {
        title: 'Pages-safe 수정 우선',
        description: 'Vite base와 `unity/config.json` fetch 경로를 먼저 수정해 정적 하위 경로에서도 앱이 깨지지 않게 한다.',
      },
      {
        title: '운영 메모 문서화',
        description: 'localStorage origin 분리와 외부 raw 자산 사용 현황을 README와 Chronicle 기록에서 모두 확인 가능하게 남긴다.',
      },
    ],
  },
  {
    id: '2026-03-12T23:40:00-ops-memory-direction',
    date: '2026-03-12',
    researchTitle: '운영 메모리형 웹 UI 방향 정리',
    researchSummary:
      '현재 로컬 사이트는 단순 Agent Office 데모를 넘어서, 서브에이전트 조사와 전체 에이전트 회의 결과가 날짜별로 누적되는 운영 메모리 UI로 확장되는 방향을 채택했다.',
    researchItems: [
      {
        title: '제품 방향',
        description: '웹 UI를 단순 데모가 아니라 날짜 기반 운영 저널이자 팀 메모리 허브로 정리한다.',
      },
      {
        title: '표시 대상',
        description: '서브에이전트 리서치, 전체 회의 결과, 역할별 조사 내용을 화면에서 바로 확인 가능하게 한다.',
      },
      {
        title: '현재 제약',
        description: '실제 Unity 경로 부재, config 플레이스홀더, 브리지 미완성, pwsh 부재가 현재의 핵심 제약이다.',
      },
    ],
    meetingTitle: 'Agent Office 운영 메모리 전환 회의',
    meetingSummary:
      '데모 성격의 Unity 래퍼는 유지하되, 우선순위는 운영 기록이 누적되는 웹 UI 저널 경험을 먼저 구축하는 것으로 정리되었다.',
    meetingItems: [
      {
        speaker: 'Orchestrator',
        note: '로컬 사이트를 운영 메모리의 메인 진입점으로 두고, 날짜별 누적 구조를 우선 완성한다.',
      },
      {
        speaker: 'Analyst',
        note: '현재 리스크는 실제 Unity 연결 경로와 검증 환경 부재이며, 기록 데이터 범위를 명확히 관리해야 한다.',
      },
      {
        speaker: 'Designer',
        note: 'Star-Office 감성은 유지하되, 회의록과 리서치 로그가 잘 읽히는 정보 패널 중심 UI가 적합하다.',
      },
      {
        speaker: 'Executor',
        note: '실제 빌드 연동 전까지는 웹 UI 축의 누적 데이터 흐름을 먼저 고도화한다.',
      },
    ],
    decisions: [
      {
        title: '핵심 역할 재정의',
        description: '현재 사이트의 1차 목적을 Unity 쇼케이스보다 운영 기록 가시화에 둔다.',
      },
      {
        title: '데이터 우선순위',
        description: '운영 에이전트와 지원 역할 기록을 날짜 단위 저널로 누적 표시한다.',
      },
      {
        title: '블로커 관리',
        description: 'Unity 경로, config, bridge, pwsh 이슈는 명시적 제약으로 유지하고 웹 레이어부터 진행한다.',
      },
    ],
  },
  {
    id: '2026-03-12T23:46:56-web-research-meeting',
    date: '2026-03-12',
    researchTitle: '웹 리서치 기반 현재 프로젝트 점검',
    researchSummary:
      'Star-Office-UI 레퍼런스와 기술 블로그형 기록 방식을 함께 참고해, 현재 프로젝트를 단순 시각 데모가 아니라 지속형 운영 저널로 발전시키는 방향을 재정리했다.',
    researchItems: [
      {
        title: '웹 리서치',
        description: 'Star-Office-UI는 상태 가시화와 어제/오늘 작업 흐름을 보여주는 운영 보드 성격이 강하다는 점을 확인했다.',
      },
      {
        title: '현재 프로젝트 파악',
        description: '현재 로컬 사이트는 Agent Office, Chronicle, Agents 탭을 갖춘 상태이며 실제 Unity 연결 전 단계의 운영 UI 역할을 수행하고 있다.',
      },
      {
        title: '발전 방향',
        description: '다음 단계는 리서치/회의 기록의 누적 고도화, 실제 Unity 경로 연결, 그리고 운영 로그를 더 명확히 보여주는 구조 강화다.',
      },
    ],
    meetingTitle: '웹 리서치 공유 및 발전 방향 회의',
    meetingSummary:
      '리서치 결과를 공유한 뒤, 현재 프로젝트를 설명 가능한 웹 운영 허브로 더 밀도 있게 발전시키는 방향에 대해 전체 에이전트가 합의했다.',
    meetingItems: [
      {
        speaker: 'Orchestrator',
        note: '웹 리서치와 현재 프로젝트 파악 결과를 일지에 남기고, 이후 모든 회의도 날짜별로 누적되도록 유지한다.',
      },
      {
        speaker: 'Analyst',
        note: '현재 프로젝트는 시각 데모를 넘어 운영 기록과 의사결정을 보여주는 방향이 제품 설명력 측면에서 더 강하다.',
      },
      {
        speaker: 'Designer',
        note: '정보량은 많아도 카드 구조는 짧고 읽기 쉬워야 하며, 각 항목은 반드시 설명형으로 보여야 한다.',
      },
      {
        speaker: 'ReleaseOps',
        note: '웹 기록이 증발하지 않는다는 점 자체가 다음 세션 인수인계와 포트폴리오 활용성을 높여준다.',
      },
    ],
    decisions: [
      {
        title: '리서치 반영 원칙',
        description: '웹에서 확인한 레퍼런스와 현재 프로젝트 파악 결과를 매 회차 저널에 직접 반영한다.',
      },
      {
        title: '회의 기록 고정',
        description: '모든 주요 회의는 웹에 남기고, 리서치-회의-결정 순서가 한 카드 안에서 보이도록 유지한다.',
      },
      {
        title: '발전 방향',
        description: '운영 저널 누적, 실제 Unity 경로 연결, 검증 체계 정리를 다음 개선 방향으로 유지한다.',
      },
    ],
  },
  {
    id: '2026-03-13T00:00:00-real-web-research-meeting',
    date: '2026-03-13',
    researchTitle: 'Cat Merge Cafe 웹 UI 전환을 위한 실제 웹 리서치',
    researchSummary:
      'Star-Office-UI, OpenClaw, 브라우저 저장 구조를 실제로 검토한 결과, 현재 프로젝트는 시각 데모보다 운영 기록과 상태 메모리를 남기는 지속형 웹 UI로 발전시키는 것이 더 적절한 방향으로 정리되었다.',
    researchItems: [
      {
        title: 'Star-Office-UI 레퍼런스',
        description: '상태, 히스토리, 전일 메모를 한 화면에 엮는 정보 배치가 현재 Agent Office 방향과 가장 직접적으로 맞물린다는 점을 확인했다.',
      },
      {
        title: 'OpenClaw 연계 맥락',
        description: '다중 에이전트 운영 맥락과 연결되는 사례로서, 향후 Cat Merge Cafe를 운영 콘솔처럼 확장하는 데 참고 가치가 높다고 판단했다.',
      },
      {
        title: 'localStorage 지속성',
        description: '브라우저 재실행 이후에도 데이터를 유지할 수 있어, 운영 메모리와 최근 활동 기록을 저장하는 1차 수단으로 적절하다고 정리했다.',
      },
    ],
    meetingTitle: '실제 웹 리서치 공유 및 전체 에이전트 회의',
    meetingSummary:
      '회의에서는 현재 결과물을 Star-Office풍 Unity wrapper 데모로 규정하고, 다음 단계 목표를 브라우저에 남는 operational memory UI 골격 완성으로 재정의했다.',
    meetingItems: [
      {
        speaker: 'Orchestrator',
        note: '웹 리서치 결과를 기준으로 현재 프로젝트의 중심 목표를 지속형 운영 메모리 UI로 다시 고정한다.',
      },
      {
        speaker: 'Analyst',
        note: '실제 Unity 경로, config placeholder, 브리지 미완성이 공통 병목이며 지금은 저장 구조와 상태 가시화가 더 중요한 우선순위라고 정리했다.',
      },
      {
        speaker: 'Designer',
        note: '장식보다 상태, 기록, 전일 메모가 잘 읽히는 카드 구조가 제품 설명력 측면에서 더 중요하다고 판단했다.',
      },
      {
        speaker: 'Executor',
        note: 'real bridge가 완전히 연결되기 전까지는 localStorage 기반 누적 메모리 구조를 먼저 완성하는 것이 가장 현실적이라고 보았다.',
      },
      {
        speaker: 'ReleaseOps',
        note: 'pwsh 부재로 자동 검증이 제한되는 만큼, 웹 UI 내부 진단과 기록 구조가 다음 세션 인수인계에도 핵심이 된다고 정리했다.',
      },
    ],
    decisions: [
      {
        title: '저장 우선순위 확정',
        description: '최근 활동, 전일 메모, 선택 뷰, 마지막 Unity 상태를 localStorage 기반 구조로 먼저 유지한다.',
      },
      {
        title: '연동 가시화 강화',
        description: 'config placeholder 여부와 Unity 경로 누락, 브리지 연결 상태를 UI에서 명시적으로 보여준다.',
      },
      {
        title: '현재 단계 목표 재정의',
        description: '다음 마일스톤은 예쁜 화면 자체가 아니라 에이전트 운영 기록이 남는 지속형 웹 UI 골격 완성으로 유지한다.',
      },
    ],
  },
]
