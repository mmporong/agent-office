import type { OfficeAgent, OfficeZone } from '../types/office'

export const officeZones: OfficeZone[] = [
  {
    id: 'pm-desk',
    name: 'PM 책상',
    description: '기획과 우선순위를 잠그는 구역',
    accent: 'gold',
  },
  {
    id: 'research-lab',
    name: '리서치 룸',
    description: '시장, 자료, 리스크를 조사하는 구역',
    accent: 'mint',
  },
  {
    id: 'dev-desk',
    name: '개발 책상',
    description: '실제 기능을 구현하는 구역',
    accent: 'violet',
  },
  {
    id: 'qa-zone',
    name: 'QA 존',
    description: '검증, 회귀, 브라우저 확인 구역',
    accent: 'sky',
  },
  {
    id: 'debug-corner',
    name: '디버그 코너',
    description: '막힘과 오류를 정리하는 구역',
    accent: 'rose',
  },
  {
    id: 'briefing-board',
    name: '브리핑 보드',
    description: '회의, 보고, 동기화 구역',
    accent: 'amber',
  },
  {
    id: 'lounge',
    name: '라운지',
    description: '대기와 재정비를 위한 구역',
    accent: 'slate',
  },
]

export const agents: OfficeAgent[] = [
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    role: '범위 확정 / 우선순위 / 핸드오프 총괄',
    status: 'planning',
    zone: 'pm-desk',
    taskSummary: 'Cat Merge Cafe와 Agent Office 흐름을 한 화면으로 정리 중',
    lastUpdate: '오피스 리디자인 시작',
    priority: 'high',
    energy: 88,
    characterKey: 'ember',
  },
  {
    id: 'analyst',
    name: 'Analyst',
    role: '시장성 / 리텐션 / 수익화 가설 검토',
    status: 'researching',
    zone: 'research-lab',
    taskSummary: 'Appintoos 제약과 WebGL 저장 리스크를 다시 검토 중',
    lastUpdate: '런치 체크리스트 재정리',
    priority: 'medium',
    energy: 71,
    characterKey: 'leaf',
  },
  {
    id: 'designer',
    name: 'Designer',
    role: 'UI/UX 구조 / 장면 구성 / 시선 흐름 개선',
    status: 'planning',
    zone: 'research-lab',
    taskSummary: 'Star-Office-UI 감성을 Cat Merge Cafe 톤으로 재해석 중',
    lastUpdate: '오피스 존 구조 확정',
    priority: 'high',
    energy: 79,
    characterKey: 'bloom',
  },
  {
    id: 'executor',
    name: 'Executor',
    role: '프런트엔드 구현 / 상태 모델 반영 / 장면 완성',
    status: 'building',
    zone: 'dev-desk',
    taskSummary: '로컬호스트에서 바로 보는 에이전트 오피스를 구현 중',
    lastUpdate: '메인 오피스 장면 연결',
    priority: 'high',
    energy: 93,
    characterKey: 'spark',
  },
  {
    id: 'test-engineer',
    name: 'Test Engineer',
    role: '빌드 / 회귀 / 브라우저 / 입력 검증',
    status: 'verifying',
    zone: 'qa-zone',
    taskSummary: 'mock 상태 전환과 브리지 로그 노출 흐름을 검증 준비 중',
    lastUpdate: '검증 시나리오 갱신',
    priority: 'medium',
    energy: 64,
    characterKey: 'wave',
  },
  {
    id: 'release-ops',
    name: 'ReleaseOps',
    role: 'PR / 스토어 문안 / CI·CD / 로컬 런 가이드 관리',
    status: 'syncing',
    zone: 'briefing-board',
    taskSummary: 'README, 로컬 실행 흐름, 다음 세션 인계를 동기화 중',
    lastUpdate: '문서 동기화 준비됨',
    priority: 'medium',
    energy: 66,
    characterKey: 'moon',
  },
]

export const currentProject = {
  name: 'Cat Merge Cafe Agent Office',
  phase: 'Star Office 레이아웃 반영',
  risk: '실제 Unity 프로젝트 경로와 WebGL 빌드 연결은 아직 미확정',
}

export const todayGoals = [
  'Star-Office-UI의 단일 오피스 룸 구성과 동선을 화면에 반영하기',
  'Cat Merge Cafe wrapper 정보를 오피스 보드 안으로 흡수하기',
  '오리지널 몬스터 파트너풍 캐릭터와 로컬호스트 실행 흐름을 유지하기',
]

export const upcomingTasks = [
  '실제 Unity 프로젝트 경로 찾기',
  'public/unity/config.json에 WebGL 빌드 경로 연결',
  '상태 mock -> 실제 세션 동기화 연결',
  '오리지널 크리처 캐릭터 시각 자산 고도화',
  '브라우저용 로컬 smoke 체크 정리',
]
