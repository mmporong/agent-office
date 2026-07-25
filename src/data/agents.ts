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
    taskSummary: '**🔴 🔑 23일 블랙아웃 원인 규명(7/26·23일 만의 재개)**: 스탠드업은 실패가 아니라 **트리거 미발화** — `daily_standup.log`가 7/3→7/26으로 직접 점프(시도 라인 0건)·`StartWhenAvailable=False`·이벤트 로그 교차검증 결과 7/04~7/25 중 **04:00에 PC가 켜져 있던 날 0일**. **회의 중 자율 복구 완료**. **안쪽 실측**: NumLink·MeowBeat 커밋 **0건**, `find -newermt`로 작업트리까지 뒤져도 수정 파일 0건(**코드 물리적 정지**) / MeowBeat 정지 **35일**·ahead 3 미푸시 / 미커밋 41·37파일 / 액션 3건 **26일째 이월** / SPRINT.md 57일·**110일** 미갱신.',
    lastUpdate: '7/26 일요일 스탠드업(🔴 23일 공백 후 재개 — 침묵 원인은 스케줄러 StartWhenAvailable=False + 04:00 PC 가동일 0일로 3중 교차검증 규명·같은 기간 게임 코드 0줄 변화·액션 3건 26일째 이월): **🔴 P0[자율 완료✅] DailyStandup_ClaudeCode StartWhenAvailable=True 설정으로 재발 차단(WakeToRun은 사용자 확인 사항으로 보류)** + **🔴 P0[신규·D-36] Play targetSdk 36 전환** + **🟡 P1 dspTime·폰트+테스트 동시 복구**.',
    priority: 'high',
    energy: 90,
    characterKey: 'ember',
  },
  {
    id: 'game-designer',
    name: 'Game Designer',
    role: 'GDD / 이코노미 밸런싱 / 차별화 전략',
    status: 'researching',
    zone: 'research-lab',
    taskSummary: '**🎮 7월 신작 2건 실측(7/26)**: **Rhythm Heaven Groove** 일본 첫 주 **393,378장**(물리 한정·시리즈 최고 초동·전작 2배·Famitsu) → 짧은 세션 포맷 수요 건재 = MeowBeat 방향 방증. **hololive Dreams**(7/23·사전등록 **150만**·초기 150곡)가 런칭에 **오토플레이 모드 + 유저 채보 에디터**를 탑재 — 현재 모바일 리듬의 표준. UGC 채보는 라이선스 음원 게임엔 법무 지뢰지만 **자체 생성곡인 MeowBeat는 마찰 0**(구조적 우위·MVP 밖). **퍼즐**: 광고매출 **53%** 점유하되 Match-3 월 DL 9,000만→7,000만(**-20%+**) — 성장은 신규 서브장르로 이동, "숫자 연결"은 미분류 틈새라 유리·수익은 광고 중심이 데이터에 부합.',
    lastUpdate: '7/26 일요일 리서치(일요일·D+63·Rhythm Heaven Groove 日 첫주 39.3만장 시리즈 최고·hololive Dreams 7/23 출시 사전등록 150만 오토플레이+채보에디터 런칭 탑재·퍼즐 광고매출 53% Match-3 -20%+ Sort 3위 등극 신규·미확인 수치 6건 전부 폐기): **🟢 P2 MeowBeat FTUE 오토플레이 데모 1곡(대표곡 15~20초 자동 연주 → "직접 해보기" 전환·입력 무시+자동 Perfect라 기존 판정 파이프라인 재사용·신규 시스템 0)**. P0/P1 후. Sources: Nintendo Everything(Famitsu)·hololive/CyberAgent 공식·Sensor Tower·Gamigion.',
    priority: 'high',
    energy: 85,
    characterKey: 'leaf',
  },
  {
    id: 'developer',
    name: 'Developer',
    role: 'Unity C# 구현 / 프리팹 배치 / 시스템 연동',
    status: 'building',
    zone: 'dev-desk',
    taskSummary: '**💻 🔑 하드 게이트 발견(D-36·7/26)**: Play 공식 — *"Starting August 31, 2026: New apps and app updates must target Android 16 (API level 36) or higher"*. 실측 **NumLink 34·MeowBeat 35**로 둘 다 미달이고 미출시라 "new apps" **예외 없음** → 그날 넘기면 **제출 자체 불가**(연장 신청 11/1까지). **좋은 소식**: Unity **6000.3.5f2가 이미 API 36 지원** — 엔진 업그레이드 없이 ProjectSettings 한 줄. **나쁜 소식**: API 36은 **edge-to-edge opt-out 폐지** + **sw≥600dp에서 방향 고정 무시**(MeowBeat Portrait 고정이 태블릿에서 풀림 → 노트 레인 검증 필요). iOS는 **4/28부터 iOS 26 SDK 빌드 필수**로 이미 시행 중(맥 환경 선행).',
    lastUpdate: '7/26 일요일 리서치(일요일·Google Play API 36 강제 8/31 잔여 36일 NumLink 34 MeowBeat 35 미달·Unity 6000.3이 이미 API 36 지원해 엔진 업그레이드 불필요·edge-to-edge opt-out 폐지 및 대화면 방향고정 무시·16KB 페이지 GoogleMobileAds 병목 가능·6000.3.20f1 UUM-145498 비동기 사운드 데이터레이스 픽스 신규): **🔴 P0 NumLink 34→36·MeowBeat 35→36 전환 + 각각 Android 빌드 1회 통과 확인(C# 0줄·ProjectSettings만·빌드 1회로 16KB 이슈까지 동시 노출)**. Sources: developer.android.com target-sdk·behavior-changes-16·Unity 6.3 Android requirements·Apple Developer News.',
    priority: 'high',
    energy: 88,
    characterKey: 'spark',
  },
  {
    id: 'qa-tester',
    name: 'QA Tester',
    role: '빌드 검증 / 회귀 테스트 / 버그 리포트',
    status: 'verifying',
    zone: 'qa-zone',
    taskSummary: '**🔍 3건 전부 미해결·23일간 해결 0건이나 리스크는 상승(7/26)**: ① NumLink 폰트 — 아틀라스 2048→1에 더해 **글리프 테이블 Bold 29→0·Light 43→0 전멸** ② dspTime — `qa_static.py` **exit=2** 검출 지속·`grep dspTime` 0건 ③ volume — 대입 5개 지점 전수 확인(GameManager 363·540 `=1.0f` 하드코딩). **🔍 신규**: 같은 작업트리에 `[Test]` **30개**짜리 테스트 4파일이 **삭제 대기**, 대체처는 빈 디렉토리 → **`git add -A` 한 번에 전 텍스트 붕괴 + 테스트 30개 소실 동시 발생**. **비대칭 유지**: MeowBeat 탐지기 3종 전부 건강(qa_static 2·validate 0·regression **2/2**) vs NumLink Tools 부재로 커버리지 **0%**.',
    lastUpdate: '7/26 일요일 리서치(일요일·미해결 3건 23일간 해결 0건·폰트 글리프 29·43→0 전멸로 리스크 상승·테스트 30개 동반 삭제 대기 신규 발견·MeowBeat 탐지기 3종 exit code 실측 전부 정상 vs NumLink 커버리지 0% 유지): **🟡 P1 폰트 7종 + 테스트 4파일 동시 git checkout 복구 → _ProjectTemplate Tools 이식 → unity_validate.py 0 error 기준선(절대 일괄 스테이징 금지·복구와 기준선을 한 세션에)**. Sources: git diff/numstat·qa_static.py·unity_validate.py·run_regression.py exit code 실측.',
    priority: 'high',
    energy: 70,
    characterKey: 'wave',
  },
  {
    id: 'content-writer',
    name: 'Content Writer',
    role: '블로그 / 스토어 설명 / SNS 콘텐츠',
    status: 'researching',
    zone: 'research-lab',
    taskSummary: '**📦 🔑 미출시 앱에 직결되는 랭킹 변화(7/26)**: Apple 논문(arXiv 2602.23234·SIGIR 2026) — App Store 랭커에 LLM 텍스트 관련성 라벨 투입, 전환율 **+0.24%**이되 핵심은 *"행동 관련성 라벨을 신뢰할 수 없는 롱테일에서 가장 큰 향상"* → **행동 신호가 0인 미출시 앱은 텍스트가 유일한 랭킹 수단**(자연어 서술형 롱테일로). **앱 프리뷰 영상**: 게임 CVR **+8~18%**·iOS 15~30초·컷 1.5~2초·A/B 변형당 1,000 인스톨(directional 지표). **AI 정책 확정**: Play AI 콘텐츠 정책은 **런타임 AI 앱만 대상** — MeowBeat 표기 의무 **없음**. **실무 blocker**: 레포 4파일에 음악툴이 **Suno Pro(3곳) vs Lyria 3(1곳)**로 갈려 기록됨.',
    lastUpdate: '7/26 일요일 리서치(일요일·Apple LLM 텍스트 관련성 랭커 arXiv 2602.23234 롱테일 지배적 신호·앱 프리뷰 게임 CVR +8~18% iOS 15~30초·Play AI정책 런타임 앱만 대상이라 MeowBeat 표기 의무 없음·Lyria 3은 SynthID 강제 삽입 vs Suno 소유권 프레이밍 신규): **🟢 P2 음악 생성 툴 Suno Pro/Lyria 3 중 하나로 확정 + 레포 4파일 표기 통일 + 곡별 라이선스 원장 신설(미착수라 지금은 비용 0·30곡 생성 후엔 전량 재생성)**. Sources: arXiv 2602.23234·AppFollow·Play Console Help 14094294·terms.law·RightsDocket.',
    priority: 'high',
    energy: 82,
    characterKey: 'pearl',
  },
  {
    id: 'devops',
    name: 'DevOps',
    role: 'CI/CD (GitHub Actions) / 스토어 제출 / Git 관리',
    status: 'syncing',
    zone: 'briefing-board',
    taskSummary: '**🛡 🔑 "전원 success" 뒤의 사일런트 실패(7/26)**: 23일간 런 **11건 전원 success·실패 0건**인데 라이브 사이트는 `2026-W26`을 서빙, main은 **`W29`** — **3주째 낡은 화면**이고 deploy-pages 런은 7/3 이후 **0건**. 원인: GitHub이 재귀 방지로 **GITHUB_TOKEN이 만든 push에 워크플로를 붙이지 않음** → 수집은 3주 연속 성공했으나 배포가 한 번도 안 돎. **🛡 자율 조치(실행 완료)**: `weekly-insights.yml`에 `actions: write` + `gh workflow run deploy-pages.yml` 스텝 추가(dispatch는 재귀 방지의 **명시적 예외**·기존 스텝 무수정 순수 증분). **신규 발견**: Dependabot PR #123·#124가 **statusCheckRollup 빈 배열 = 무검증 머지 중**. 7/3의 timeout-minutes는 배포 미실행으로 **실전 검증 0회**.',
    lastUpdate: '7/26 일요일 리서치(일요일·런 11건 전원 success 뒤의 라이브 3주 정체 W26 vs W29 발견·GITHUB_TOKEN push가 워크플로 미트리거하는 재귀방지 규칙이 근본원인·Dependabot PR 2건 체크 0개 무검증 머지·checkout v7 7/20 발효·Node24 강제 4개 액션 SHA 조회로 전부 통과 확인·ubuntu-latest 26.04 승격 리스크 신규): **🟢 P2[자율 완료✅] weekly-insights → deploy-pages workflow_dispatch 트리거 신설(라이브 3주 정체 봉합)** + **🟢 P2[적재] pull_request 빌드 검증 워크플로 후 Dependabot 머지**. Sources: gh run list·gh api pages·curl 실측·github.blog changelog 4건.',
    priority: 'high',
    energy: 86,
    characterKey: 'moon',
  },
  {
    id: 'art-director',
    name: 'Art Director',
    role: '에셋 방향 / 스프라이트 스펙 / 리디자인 가이드',
    status: 'researching',
    zone: 'research-lab',
    taskSummary: '**🎨 🔑 게임의 킥이 사장 상태(7/26)**: `RhythmCatController.cs`는 idle·happy·excited·miss·eating **5감정 슬롯 완성 스크립트**인데 GUID 전수 검색 결과 **씬·프리팹 참조 0건**(`CatInteraction`은 FarmScene 정상 검출로 검색법 검증). `GameEvents.OnComboChanged`·`OnNoteHit`은 이미 발화 중인데 **듣는 고양이가 씬에 없어** 리듬 플레이 중 마스코트가 무반응. 동반 결함: `HandleNoteHit(bool)`이 **Perfect와 Good을 같은 스프라이트**로 매핑·콤보 임계값 주석 10 vs 코드 20. **무음 실측**: 사운드 온 **25~40%**(=**60~75%가 무음**·Metacore 원문) → 시각 반응이 판정 전달의 유일 채널. **NumLink**: 난이도 5색 대비비 **1.007~1.168:1**로 색상 단독 인코딩(팔레트 자체는 크림/브라운으로 AI 클리셰 회피 양호).',
    lastUpdate: '7/26 일요일 리서치(일요일·RhythmCatController GUID 참조 0건으로 게임 킥 미배선 발견·모바일 사운드 온 25~40%라 무음 60~75%·2026 마스코트는 stateful UI 컴포넌트·튜토리얼 소멸 10초 내 진입·NumLink 난이도 5색 명도차 1.007~1.17:1 실측 신규): **🟢 P2 MainScene에 고양이 미리 배치 후 RhythmCatController 배선(동적 Instantiate 금지 준수) + Perfect/Good 분리 + 콤보 임계값 정합 — 신규 에셋 제작 0**. Sources: Metacore Games·Wayline·DEV·indieradar·AppFollow·Pixune·UX Planet.',
    priority: 'high',
    energy: 83,
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
  '🔴 P0 [자율 완료 ✅·23일 블랙아웃 봉합] DailyStandup_ClaudeCode StartWhenAvailable=True 설정 — 놓친 실행 보정으로 재발 차단. Orchestrator가 로그·Task Scheduler·시스템 이벤트 로그(6005/6006/1074) 3중 교차검증으로 규명: StartWhenAvailable=False 상태에서 7/04~7/25 중 04:00에 PC가 켜져 있던 날이 0일 → 놓친 실행이 영영 보정되지 않아 22일 연속 미발화(MissedRuns=0으로 표시돼 겉보기엔 정상). 조치 완료 — 이제 04:00에 꺼져 있어도 부팅 직후 보정 실행된다. 미적용: WakeToRun(새벽에 PC를 강제로 깨우므로 사용자 확인 사항), 배터리 설정 2건(데스크톱이라 무의미)',
  '🔴 P0 [신규·하드 게이트 D-36·사용자 세션] Google Play targetSdk 36 전환 — NumLink 34→36·MeowBeat 35→36 + 각각 Android 빌드 1회 통과 확인. Play 공식: "Starting August 31, 2026: New apps and app updates must target Android 16 (API level 36) or higher to be submitted to Google Play." 두 게임 모두 미출시라 "new apps" 분류로 예외 없음 — 넘기면 제출 자체가 불가(연장 신청 11/1까지). 적용: ① ProjectSettings.asset의 AndroidTargetSdkVersion 수정(C# 0줄) → ② SDK Platform 36 설치 → ③ 각각 빌드 1회. Unity 6000.3.5f2가 이미 API 36 지원해 엔진 업그레이드 불필요. 빌드 1회로 16KB 페이지 이슈(두 프로젝트 모두 GoogleMobileAdsPlugin.androidlib 포함)까지 동시 노출. 후속: edge-to-edge opt-out 폐지 대응·sw≥600dp에서 방향 고정 무시로 MeowBeat Portrait 고정이 태블릿에서 풀림',
  '🟡 P1 [이월 26일째·사용자 세션] MeowBeat NoteSpawner.cs:126 dspTime 앵커링 — 탐지기는 26일째 정확히 지목 중. QA·Orchestrator 재실측: elapsedTime += Time.deltaTime 잔존·grep "dspTime|PlayScheduled" 0건(프로젝트 전체에 흔적 없음)·qa_static.py exit=2로 TIMING_DSPTIME_UNUSED 검출 지속. 처방은 6/29에 완성됨: ① 필드 dspSongStartTime(double) → ② musicSource.PlayScheduled(AudioSettings.dspTime + 0.1) → ③ 126행을 elapsedTime = (float)(AudioSettings.dspTime - dspSongStartTime) 절대차분으로 교체 → ④ run_regression.py + qa_static.py 0 error 검증 후 커밋. 오늘 P0가 두 건 생겨 순위는 내렸으나 이월 일수는 26일로 최장',
  '🟡 P1 [이월·리스크 상승·사용자 세션] NumLink 폰트 SDF 7종 + 테스트 4파일 동시 git checkout 복구 → _ProjectTemplate Tools 이식으로 검증 기준선 확보. QA 실측: 아틀라스 붕괴(m_Width 2048→1)에 더해 글리프 테이블이 Maplestory Bold 29→0·Light 43→0으로 전멸. 같은 작업트리에 Assets/Tests/Editor/ 4파일이 삭제(D) 대기 중인데 AutoGenTests.cs는 414줄·[Test] 30개이고 대체처 AutoQATests/는 빈 디렉토리 → git add -A 한 번이면 전 텍스트 붕괴와 테스트 30개 소실이 동시 발생(절대 일괄 스테이징 금지). ① 폰트 7종 복구 → ② 테스트 4파일 복구 → ③ _ProjectTemplate/Tools 복사(CLAUDE.md 규칙 23일째 미실행) → ④ unity_validate.py 0 error 기준선을 한 세션에',
  '🟢 P2 [자율 완료 ✅] weekly-insights → deploy-pages 트리거 신설 — 라이브 사이트 3주 정체(W26 vs W29) 봉합. DevOps가 "런 11건 전원 success" 뒤의 사일런트 실패 발견: deploy-pages 런이 7/3 이후 0건이라 라이브가 3주째 낡은 화면이었다. 원인은 GitHub이 재귀 방지로 GITHUB_TOKEN이 만든 push에 워크플로를 붙이지 않는 것. 조치: weekly-insights.yml에 permissions actions: write + Commit&Push 직후 gh workflow run deploy-pages.yml 스텝 추가(workflow_dispatch는 재귀 방지의 명시적 예외). 기존 스텝 무수정 순수 증분·YAML 파싱 검증 완료. 부수: 7/3의 timeout-minutes는 배포 미실행으로 실전 검증 0회였고 오늘 처음 확인됨',
  '🟢 P2 [신규 적재 — 모두 P0/P1 후]: Game Designer — MeowBeat FTUE 오토플레이 데모 1곡(대표곡 15~20초 자동 연주 → "직접 해보기" 전환·입력 무시+자동 Perfect라 기존 판정 파이프라인 재사용·신규 시스템 0·7/23 hololive Dreams가 런칭 탑재한 현재 표준). Art Director — MainScene에 고양이 미리 배치 후 RhythmCatController 배선(현재 GUID 참조 0건으로 게임 킥이 사장)·Perfect/Good 분리·콤보 임계값 주석 10 vs 코드 20 정합(무음 플레이 60~75%라 시각 반응이 판정 전달의 유일 채널). Content Writer — 음악 생성 툴을 Suno Pro/Lyria 3 중 하나로 확정 + 레포 4파일 표기 통일 + 곡별 라이선스 원장 신설(미착수라 지금은 비용 0). DevOps — pull_request 빌드 검증 워크플로 신설 후 통과 시에만 Dependabot 머지(현재 PR #123·#124 체크 0개). Developer — SongManager.ApplyVolume() 신설로 bgmPlayer.volume 5개 대입 지점 통합(GameManager:363·540의 =1.0f가 유저 설정을 덮어쓰는 실버그) + NumLink Revive()의 isTimerActive 미복구 의심 실기 확인. Art Director — NumLink 난이도 5색 명도 계단 또는 형태 중복 인코딩(현재 대비비 1.007~1.168:1)',
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
