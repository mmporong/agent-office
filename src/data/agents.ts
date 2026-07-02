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
    role: '스프린트 계획 / 태스크 라우팅 / 핸드오프 총괄',
    status: 'planning',
    zone: 'pm-desk',
    taskSummary: '**🟢 진단 3일째 반복 + 바깥 시계 등장(7/3)**: 신규 커밋 agent-office 844233a **1건뿐**·NumLink·MeowBeat 오늘도 **0건** / 미커밋 NumLink **41파일**·MeowBeat 37파일 / 이전 액션아이템 **3건 전부 미완료 3중 실측**(126행 deltaTime 잔존·폰트 SDF 7종 수정상태·ApplyVolume 부재) / MeowBeat HEAD는 farm 기능·QA 툴 정비로 P0 무관 작업 적체 지속. **🔑 메타**: 금요일·D+40·Beatstar 10/31 종료로 실행에 바깥 시계가 붙음.',
    lastUpdate: '7/3 금요일 스탠드업(🟢 진단 3일째 반복 확정 — 신규 커밋 agent-office 1건뿐·NumLink 미커밋 41파일·이전 액션 3건 전부 미완료 3중 실측·Beatstar 공백으로 바깥 마감 압력 등장): **🔴 P0[이월 3일째] NoteSpawner.cs:126 dspTime 앵커링 오늘 단일 태스크(run_regression.py 검증 포함·사용자 세션)** + **🟡 P1 NumLink 폰트 7종 복구+Tools 기준선 결합** + **🟢 P2[자율 완료✅] deploy-pages timeout-minutes 7일 연속 전진**.',
    priority: 'high',
    energy: 88,
    characterKey: 'ember',
  },
  {
    id: 'game-designer',
    name: 'Game Designer',
    role: 'GDD / 이코노미 밸런싱 / 차별화 전략',
    status: 'researching',
    zone: 'research-lab',
    taskSummary: '**🎮 🔑 시장 공백 발견(Beatstar 종료·7/3)**: 모바일 리듬게임 1위 **Beatstar**(누적 **6천만 DL**·첫해 **$73M**)가 **2025-10-31 서버 영구종료** 예고·운영사 Space Ape 팀은 듀오링고 인수로 해체·**후속작 없음** → 수천만 유저 공백이 MeowBeat 출시 시점과 겹침. 라이선스 음원 종말 = AI 생성곡(Lyria·라이선스 0) 구조적 기회. **한국 퍼즐 이탈**: 지루함 42%·반복성 33%(1.3만명 조사) — NumLink 기믹 회전 관건.',
    lastUpdate: '7/3 금요일 리서치(금요일·D+40·Beatstar 10/31 영구종료 누적 6천만 DL 첫해 $73M 팀 해체 후속작 없음 리듬게임 시장 공백·한국 퍼즐 이탈요인 지루함 42% 반복성 33% 신규·미검증 수치 폐기 후 원문 확인 3건만 보고): **🟢 P2 MeowBeat GDD "Beatstar 공백 흡수 전략" 섹션 신설(곡 해금 구조·판정 UX 벤치마크+AI 생성곡 차별점 3개 정의)**. P0/P1 후. Sources: PocketGamer.biz·Water & Music·Udonis.',
    priority: 'high',
    energy: 84,
    characterKey: 'leaf',
  },
  {
    id: 'developer',
    name: 'Developer',
    role: 'Unity C# 구현 / 프리팹 배치 / 시스템 연동',
    status: 'building',
    zone: 'dev-desk',
    taskSummary: '**💻 신규(Input System·safeArea 픽스·7/3)**: **Input System 1.15.0** 출시 — Android 회전벡터 센서·리바인딩 억제 API(6.0/6.2/6.3 대응·두 게임 모두 InputAction 기반이라 업그레이드 대상) / **Unity 6000.3 패치**에 Android 11+ safeArea/컷아웃 값 오류 픽스(**UUM-119964**) — 노치 대응 UI 직결(틀린 값은 HUD 겹침·버튼 가림). **코드 부채**: Revive 신설(+15/-9)은 진짜 픽스나 **플래그식 부활**이라 상태머신(GameState enum) 부재가 잠재 부채.',
    lastUpdate: '7/3 금요일 리서치(금요일·Input System 1.15.0 출시 Android 회전벡터 센서·리바인딩 억제 API·Unity 6000.3 Android 11+ safeArea 컷아웃 픽스 UUM-119964·Revive 플래그식 부활 상태머신 부재 부채 신규): **🟢 P2 NumLink·MeowBeat 양 프로젝트 Input System 1.15.0 업그레이드+터치 입력 회귀 테스트(에디터 열 때 한 번에·기준선 확보 후)**. Sources: Unity Discussions·Input System Changelog·6000.3.0f1 릴리스노트·Firebase 릴리스노트.',
    priority: 'high',
    energy: 84,
    characterKey: 'spark',
  },
  {
    id: 'qa-tester',
    name: 'QA Tester',
    role: '빌드 검증 / 회귀 테스트 / 버그 리포트',
    status: 'verifying',
    zone: 'qa-zone',
    taskSummary: '**🔍 미해결 3건 집계(7/3)**: ① NumLink **폰트 SDF 붕괴 미커밋 지속**(Maplestory Bold 2048→1 재확인·수정 폰트 7종+삭제 4파일 대기) ② MeowBeat dspTime(**qa_static exit 2**·NoteSpawner.cs:126 검출 지속) ③ volume 4중 경로 회귀. **인프라 비대칭**: Feedme는 known_bugs 7패턴 중 실검출 error 1건으로 정상 작동 / NumLink는 Tools·known_bugs.json **모두 부재·검증 무방비**. **최대 리스크**: 붕괴 폰트 커밋 시 전 텍스트 깨짐 — 커밋 전 git checkout 필수.',
    lastUpdate: '7/3 금요일 리서치(금요일·미해결 3건 — 폰트 SDF 붕괴 미커밋 지속 Maplestory Bold 2048→1·dspTime qa_static exit 2 검출 지속·volume 회귀 이월·Feedme known_bugs 7패턴 실검출 1건 정상 작동 vs NumLink 검증 무방비 비대칭): **🟡 P1 NumLink 폰트 .asset 7종 git checkout 복구 후 _ProjectTemplate Tools 복사·unity_validate.py 0 error 기준선 확보(복구+기준선 한 세션 결합 — 복구만 하면 재발 시 못 잡음)**. Sources: git status·qa_static.py 실행·known_bugs.json 실측.',
    priority: 'high',
    energy: 72,
    characterKey: 'wave',
  },
  {
    id: 'content-writer',
    name: 'Content Writer',
    role: '블로그 / 스토어 설명 / SNS 콘텐츠',
    status: 'researching',
    zone: 'research-lab',
    taskSummary: '**📦 신규 1순위(스토어 이벤트 카드·7/3)**: iOS **인앱이벤트(IAE)** 활성 시 제품페이지 전환율 평균 **+17%**(검색·Today 탭·개발자 페이지 추가 노출·비용 0) / 구글플레이 **프로모션 콘텐츠** 운영 시 28일 활성유저 **+2%**·매출 **+4%**. **📦 2순위(쇼츠 1위)**: 유튜브 쇼츠 참여율 **5.91%**로 숏폼 1위·Z세대 **53%**가 쇼츠 보고 구매 경험 — 7/2 유기형 UGC 클립의 배포 채널 1순위 근거. **적용**: 출시 첫 달 이벤트 캘린더(소재는 콘텐츠 업데이트 재활용·제작비 0).',
    lastUpdate: '7/3 금요일 리서치(금요일·iOS 인앱이벤트 IAE 활성 시 제품페이지 전환율 +17%·구글플레이 프로모션 콘텐츠 28일 활성유저 +2% 매출 +4%·유튜브 쇼츠 참여율 5.91% 숏폼 1위 Z세대 53% 쇼츠 구매 경험 신규): **🟢 P2 MeowBeat 신곡·NumLink 레벨팩 소재 출시 첫 달 인앱이벤트/프로모션 콘텐츠 캘린더 초안(콘텐츠 업데이트 재활용·추가 제작비 0)**. 7/2 Spark Ads UGC 전략과 상호보완. Sources: MobileAction·ASOMobile·Loopex·ShortsIntel.',
    priority: 'high',
    energy: 81,
    characterKey: 'pearl',
  },
  {
    id: 'devops',
    name: 'DevOps',
    role: 'CI/CD (GitHub Actions) / 스토어 제출 / Git 관리',
    status: 'syncing',
    zone: 'briefing-board',
    taskSummary: '**🛡 CI 이상 없음 + timeout 봉합(7/3)**: 최근 런 5건 **전원 success**·Pages 정상 라이브(workflow 빌드형 status null 정상)·dependabot 보안 그룹화만 미적용(P3). **🛡 자율 조치(7일 연속)**: deploy-pages **build/deploy 잡 timeout-minutes: 10** 추가 — 빌드 34~58초인데 기본 타임아웃 360분이라 행 걸리면 러너 6시간 낭비. **신규 제안**: **zizmor+actionlint** 워크플로우 정적 감사 CI 잡(SHA 핀 이후 인젝션·권한 오설정 자동 검출층·SARIF→Security 탭).',
    lastUpdate: '7/3 금요일 리서치(금요일·최근 런 5건 전원 success 이상 없음·Pages 정상 라이브·zizmor+actionlint 정적 감사 신규 제안): **🟢 P2[자율 완료✅] deploy-pages build/deploy 잡 timeout-minutes: 10 추가(기본 360분 행 방지·순수 증분·자율 칼끝 6/26→7/03 7일 연속)** + **🟢 P2[적재] zizmor+actionlint 정적 감사 CI 잡(SARIF→Security 탭 연동)**. Sources: gh run list·gh api pages·zizmor GitHub·Trail of Bits 블로그.',
    priority: 'high',
    energy: 80,
    characterKey: 'moon',
  },
  {
    id: 'art-director',
    name: 'Art Director',
    role: '에셋 방향 / 스프라이트 스펙 / 리디자인 가이드',
    status: 'researching',
    zone: 'research-lab',
    taskSummary: '**🎨 신규 1순위(리절트 단계별 리빌·7/3)**: 2026 리절트 화면 표준은 **단계별 리빌(staged reveal)** — 결과를 순차 공개해 성취의 리듬 형성. 단 유저 리뷰에서 **스킵 불가 연출이 이탈 사유**로 확인 → **탭 스킵(tap-to-skip) 필수 정설**. **적용안**: NumLink 별 순차 팝→점수 카운트업 / MeowBeat 판정 집계(Perfect/Good/Miss) 순차 공개+마스코트 리액션·둘 다 탭 스킵. **🎨 AI 클리셰 갱신**: 민트+다크에 이어 **네온 시안+바이올렛 그라데이션**이 신종 AI 전형색 — 회피 목록 추가.',
    lastUpdate: '7/3 금요일 리서치(금요일·2026 리절트 화면 표준 단계별 리빌 staged reveal·스킵 불가 연출 이탈 유발 탭 스킵 필수 정설·네온 시안+바이올렛 그라데이션 신종 AI 클리셰 회피 대상 신규): **🟢 P2 리절트 화면 단계별 리빌 공통 구현(NumLink 별 순차 팝→점수 카운트업·MeowBeat 판정 집계 순차 공개+마스코트 리액션·탭 스킵 지원·씬 배치+SetActive 토글)**. Sources: Pixune·Tubik·Superdesign·Recursion.',
    priority: 'high',
    energy: 79,
    characterKey: 'bloom',
  },
]

import { projects } from './projects'

export const currentProject = {
  name: projects[0]?.name ?? 'LIM Studio',
  phase: projects[0]?.phase ?? '',
  risk: projects[0]?.risk ?? '',
}

export const todayGoals = [
  '🔴 P0 [이월 3일째·탐지기 생존·바깥 시계 등장·사용자 세션] MeowBeat NoteSpawner.cs:126 dspTime 앵커링 — 오늘 단일 태스크, run_regression.py 검증 포함. Orchestrator·QA 3중 실측: 126행 elapsedTime += Time.deltaTime 잔존·qa_static.py exit 2 검출 지속·dspTime은 탐지기(921e0cf)만 커밋된 상태·HEAD는 farm 기능 등 P0 무관 작업만 적체. 적용: ① 필드 dspSongStartTime(double) → ② 곡 시작 시 musicSource.PlayScheduled(AudioSettings.dspTime + 0.1) → ③ 126행을 elapsedTime = (float)(AudioSettings.dspTime - dspSongStartTime) 절대차분으로 교체 → ④ run_regression.py + qa_static.py 0 error 검증 후 커밋. Beatstar 공백(10/31)이라는 바깥 시계가 생겨 더 미룰 수 없음',
  '🟡 P1 [이월·검증 기준선 결합·사용자 세션] NumLink 붕괴 폰트 SDF 7종 git checkout 복구 + _ProjectTemplate Tools 복사로 unity_validate.py 기준선 확보. QA 재확인: Maplestory Bold m_Width 2048→1 붕괴 지속·수정상태 폰트 7종+AutoGenTests 삭제 4파일 대기·커밋 시 전 텍스트 깨지는 최대 리스크 유지(절대 스테이징 금지). 오늘 결합 제안: 복구만 하면 재발 시 못 잡으므로 ① 폰트 .asset 7종 git checkout 복구 → ② C:/Unity/_ProjectTemplate/Tools 복사(CLAUDE.md 규칙 미실행 누적 해소) → ③ unity_validate.py 0 error 기준선 → ④ AutoGenTests 삭제 커밋 정리를 한 세션에 결합',
  '🟡 P1 [이월 3일째·사용자 세션] MeowBeat bgmPlayer.volume 4중 경로 → SongManager.ApplyVolume() 단일 경로 통합. Orchestrator grep 재확인: ApplyVolume 메서드 여전히 부재. bgmPlayer.volume이 4곳(SongManager:89·144, OptionManager:191, GameManager:363·540 하드코딩)에서 제각각 계산돼 슬라이더 무력화 회귀 지속. SongManager.ApplyVolume() 신설 → 모든 호출처 통합 + VOLUME_KEY 상수화',
  '🟢 P2 [자율 완료 ✅·7일 연속 전진] deploy-pages build/deploy 잡 timeout-minutes: 10 추가 — 기본 360분 행 방지. DevOps 점검 중 발견한 작은 구멍 회의 중 자율 봉합: 빌드 34~58초인데 잡 기본 타임아웃 360분 → 행 걸리면 러너 6시간 낭비. 순수 증분·자율 칼끝 6/26→7/03 7일 연속. 후속 적재: zizmor+actionlint 워크플로우 정적 감사 CI 잡(SARIF→Security 탭 연동)',
  '🟢 P2 [신규 적재 — 모두 P0/P1 후]: Game Designer — MeowBeat GDD "Beatstar 공백 흡수 전략" 섹션 신설(리듬게임 1위 Beatstar 10/31 영구종료·누적 6천만 DL·첫해 $73M·팀 해체 후속작 없음 → 곡 해금 구조·판정 UX 벤치마크+AI 생성곡 차별점 3개 정의). Art Director — 리절트 화면 단계별 리빌 공통 구현(NumLink 별 순차 팝→점수 카운트업·MeowBeat 판정 집계 순차 공개+마스코트 리액션·탭 스킵 필수·씬 배치+SetActive). Content Writer — 출시 첫 달 인앱이벤트/프로모션 콘텐츠 캘린더 초안(iOS IAE +17%·GP 프로모션 +2%/+4%·콘텐츠 업데이트 재활용 제작비 0). Developer — 양 프로젝트 Input System 1.15.0 업그레이드+터치 회귀 테스트(Unity 6000.3 safeArea 픽스 UUM-119964 함께 검토)',
]

export const upcomingTasks = [
  'S2: 폰트 교체 (Fredoka/Nunito/Orbitron)',
  'S2: 앱 아이콘/스플래시 교체',
  'S2: UI 프리팹 교체',
  'S3: 고양이 캐릭터 HUD 배치',
  'S4: 머지 그리드 UI + 이펙트',
  'S5: Suno Pro 곡 30개 생성 → 20개 선별',
  'S7: 포토 앨범 UI + SNS 공유',
  'Android 빌드 테스트',
]
