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
    taskSummary: '**🟢 픽스는 작동했다 — 회의가 세 번 발화해 세 번 다 사살됐다(8/07·12일 공백 후 재개)**: 지난번과 결정적 차이는 `daily_standup.log`에 **실행 시도 라인 3건 존재**(지난 블랙아웃은 0건 = 미발화). 7/29 06:43·8/6 06:34·8/7 전부 종료코드 **`0x40010004` DBG_TERMINATE_PROCESS**. 이벤트 교차검증: 7/29 가동창 **16분**·8/6 **60분**인데 회의 소요 실측 16~27분 → 7/29는 원천 불가능·8/6은 55분에 잘림. 1074 발신자 전부 사용자 직접 종료, **Kernel-Power 42/107 0건 + 109/6006만 3건 = S5 완전 차단이라 WakeToRun 무효 확정**. **더 아픈 2차 원인**: 7/26 픽스가 `DailyStandup` 한 개에만 걸려 `AutomationHealthCheck` 포함 5개가 `0x800710E0`으로 12일째 거부 — `healthcheck.log`가 7/26 03:30에서 멈춰 **침묵을 알릴 감시자가 같은 병으로 죽어 있었다**. **실측**: NumLink 정지 **37일**·MeowBeat **47일**(ahead 3 미푸시)·미커밋 41·37파일·SPRINT.md 69일·**122일** 미갱신.',
    lastUpdate: '8/07 금요일 스탠드업(🟢 12일 공백 후 재개 — 7/26 픽스는 작동했으나 세 번의 보정 실행이 전부 PC 완전 종료로 사살·원인이 설정에서 04:00 PC 가동 여부로 이동·WakeToRun은 S5라 무효 확정·헬스체크 5개가 같은 이유로 12일째 거부되어 침묵 감지 실패): **🟢 P0[자율 완료✅] 자동화 태스크 5개 StartWhenAvailable=True 일괄 적용 — 죽어 있던 AutomationHealthCheck 부활이 핵심(6개 전원 True 재조회 검증)** + **🔴 P0[D-24] Play targetSdk 36** + **🔴 P0[신규] NumLink IAP 무가드 폴백**.',
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
    taskSummary: '**🎮 신규 매치3 성공률 0.8% — 그런데 우리는 +74% 성장 축을 이미 갖고 있다(8/07)**: H1 2026 캐주얼 IAP $11B 보합 속 **하이브리드캐주얼만 +20% 성장해 $4.2B**(캐주얼 DL은 5년간 11.2B→6.34B로 **-43%** = 설치 대신 유저당 깊이로 버는 구조). 퍼즐 IAP **$4.9B로 캐주얼의 44%**·처음 RPG 추월했으나 **신규 매치3의 월 $10만 도달률 0.8%**(사실상 진입 불가), 반면 **Merge-2 매출 +74%·DL +24%**로 대형 장르 최고 성장 — **MeowBeat는 머지 티어 로직을 이미 가졌고 그리드 UI(S4-02)만 미완**이다. **리텐션 벤치마크(퍼즐)**: D1 **31.85%**/D7 **12.18%**/D30 5.35%, 소프트런치 **D1 25% 미만 = 킬**. **IAP 59% : 광고 41%** 구성인데 두 프로젝트는 41% 레인만 잡고 있음. **NumLink 진단**: 60레벨 = 1~3시간이라 **D7 직전 콘텐츠 고갈·엔드게임 없음**인데 히든 패턴 **9종이 이미 구현돼 있으면서 발견 피드백도 보상도 0**.',
    lastUpdate: '8/07 금요일 리서치(금요일·하이브리드캐주얼만 +20% $4.2B 성장하고 캐주얼 DL은 5년 -43%·신규 매치3 월$10만 도달률 0.8% vs Merge-2 매출 +74%로 MeowBeat 머지축이 시장정합인데 UI 미완·퍼즐 D1 31.9%/D7 12.2%/D30 5.35% 및 소프트런치 킬라인 D1 25%·2026 IAP의 84%가 LiveOps 게임에서 발생하고 메타레이어 깊이가 D30 강세와 D7 정체를 가름·소프트런치 지역은 퍼즐이면 폴란드/루마니아 4주 $11k~23k): **🟢 P2 NumLink 히든 패턴 도감 — 기존 HidePatternType 9종+SaveSystem+레벨선택 화면 재사용, 신규는 SaveData bool[9] 1개·9칸 그리드 1개·첫 발견 토스트 1개뿐(신규 아트 0개). 단 `SaveData.saveVersion` 필드 추가 P0가 스키마 변경보다 먼저**. Sources: AppMagic H1 2026·Sensor Tower State of Gaming·pocketgamer.biz·playio.co 리텐션·gamegrowthadvisor 소프트런치/LiveOps.',
    priority: 'high',
    energy: 85,
    characterKey: 'leaf',
  },
  {
    id: 'developer',
    name: 'Developer',
    role: 'Unity C# 구현 / 프리팹 배치 / 시스템 연동',
    status: 'researching',
    zone: 'dev-desk',
    taskSummary: '**📉 이 회의록 파일이 사이트 번들의 91%다(8/07)**: 실빌드 결과 단일 청크 **3,027 KB** 중 `operationsJournal.ts`가 **2,761.8 KB(117 엔트리·13,297줄)**. `React.lazy`·동적 `import()` **0건**이라 홈 방문자 전량 다운로드하고, 스탠드업 1회당 **+31 KB씩 상한 없이** 증가(6/20 2,371→7/26 2,748 KB, 현 속도면 6개월 뒤 5 MB). 소비처가 `usePersistentJournal` **한 곳뿐**이라 `public/data/` 분리 시 초기 JS **약 270 KB(-91%)**·수정 2파일. **신규 부채**: MeowBeat `ButtonController.cs:392`가 `yield return null` 페이드 루프 안에서 **매 프레임 `GameObject.Find`+`GetComponent`** 재조회(초당 60회·385행에서 이미 얻은 참조를 미캐싱·동일 체인 6곳·`GetChild(4)` 하드코딩). **건강 확인**: 이벤트 구독/해제 짝 양 프로젝트 **불일치 0건**. **오탐 정리**: react-router high 2건은 **RSC 한정이고 우리는 `HashRouter`라 무영향** — `audit fix --force`는 breaking 다운그레이드라 **금지**.',
    lastUpdate: '8/07 금요일 리서치(금요일·operationsJournal.ts 2.76MB가 실빌드 번들의 91%이고 회의 1회당 31KB 무한증가하는 자기참조적 부채 발견·MeowBeat ButtonController.cs:392 매프레임 GameObject.Find 신규·구독해제 짝은 양 프로젝트 0건 불일치로 건강·Play 7/15 공지에 콘텐츠 등급 미지정 게시 불가 명문화·react-router high는 HashRouter라 무영향으로 오탐 정리): **🟡 P1[자율 후보 1순위] seedJournalEntries를 public/data/operations-journal.json으로 분리 후 fetch 로드(3.03MB→270KB·소비처 1곳이라 회귀 위험 낮음·append 스크립트 경로도 동시 이전)**. Sources: npm run build 실측·OfficeContext.tsx:146·usePersistentJournal.ts:6·ButtonController.cs:384-392·Play 정책공지 17134731.',
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
    taskSummary: '**🔴 지난 최대 공포는 오진, 그 자리를 결제 구멍이 대신했다(8/07)**: **정정 — 폰트는 붕괴한 적 없다.** Maplestory 29→0·43→0은 사실이나 둘 다 `m_AtlasPopulationMode: 1`(Dynamic)+`m_ClearDynamicDataOnBuild: 1`이라 **TMP 정상 동작**이고 런타임에 TTF에서 재생성된다(소스·GUID·아틀라스·머티리얼 전부 온전). 결정적 반증: 같은 세션에서 플래그 0인 Cafe24는 249→**256 증가**. → **"전 텍스트 붕괴" 무효 / "테스트 30개 소실" 유효**(HEAD 414줄에 `[Test]` 15+`[UnityTest]` 15 확인). **🔴 신규 최상급**: NumLink `manifest.json`에서 `com.unity.purchasing` **제거된 채 미커밋** + `UNITY_PURCHASING` 심볼 전 플랫폼 **0건** → `IAPManager.cs` `#if` 26쌍이 전부 `#else`로 낙하하는데 그 `#else`가 **`UNITY_EDITOR` 가드 없이** `ProcessPurchaseReward()`로 힌트팩·`remove_ads`를 **결제 검증 없이 즉시 세이브**. 컴파일 **0 error**라 조용히 통과, 상점 UI 붙이는 즉시 유료 상품 전원 무료화. **`git add -A` 실측 갱신**: 7,821파일 **129.7 MiB**, 그중 Layer Lab **7,662개(~102 MiB)**.',
    lastUpdate: '8/07 금요일 리서치(금요일·폰트 글리프 전멸을 TMP Dynamic 정상동작으로 오진 정정하고 Cafe24 249→256 증가를 결정적 반증으로 제시·대신 IAP 패키지 제거 미커밋 + UNITY_EDITOR 가드 없는 무료지급 폴백을 신규 최상급으로 발굴·MeowBeat 탐지기 3종 여전히 건강 qa_static exit2/validate 0/regression 2:2): **🔴 P0[신규] NumLink IAP 무가드 폴백 — `#else`를 `#if UNITY_EDITOR`로 감싸거나 패키지 복원 중 택일 + `known_bugs.json`에 `IAP_FALLBACK_UNGUARDED` 등록** + **🟡 P1 테스트 4파일 git restore·NumLink Tools는 템플릿(4월본)보다 MeowBeat 최신본(6월본) 이식이 유리**. Sources: manifest.json diff·ProjectSettings scriptingDefineSymbols·IAPManager.cs:106~131·qa_static/unity_validate/run_regression exit code·git add -A dry-run 실측.',
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
    taskSummary: '**📦 패키지명을 바꾼 순간 MeowBeat는 신작이 됐다 — 캘린더 +14일(8/07)**: `applicationIdentifier`가 이미 **`com.mmporong.meowbeat`**로 변경(→ `productName`은 `hefeedmee` 잔존)돼 기존 등재의 리뷰·설치·랭킹을 **전혀 승계 못 하는 완전 신규 앱**. 따라서 (a) 스토어 등재 실험은 트래픽 확보 전 사용 불가, (b) 개인 계정 **12테스터×연속 14일 폐쇄 테스트 재적용** 가능성 → 문구가 완성돼도 프로덕션까지 **최소 +14일**(계정 생성일 2023-11-13 기준 확인이 선행). **마케팅 자산 두 레포 전수 0건** — 이름·짧은설명(80자)·전체설명·키워드·아이콘512·피처그래픽·스크린샷·개인정보URL·**콘텐츠 등급 설문**·데이터안전 등 **14개 항목 전멸**(`Marketing/` 폴더 자체 없음·MeowBeat는 README도 없음). 단 **빌드 없이 착수 가능한 유일 영역**. **랭킹 구조 변화**: `Ask Play`로 **설명문을 사람이 아니라 LLM이 읽는다**.',
    lastUpdate: '8/07 금요일 리서치(금요일·MeowBeat 패키지명 변경으로 완전 신규앱화되어 12테스터×14일 재적용 캘린더 폭탄 발견·마케팅 자산 14개 항목 두 레포 전수 0건·Play가 Gemini 커스텀 등재 자동생성 최대 50개 도입중이고 현지화 자동채움은 이미 사용가능·롱테일 3~4단어 전환시 60일 오가닉 +32%·스크린샷 개선 CVR Play +24.3%이며 첫 2장이 대부분 결정·아이콘 단독 25% 스윙·TikTok은 바이럴에도 위시리스트 전환 1% 미만이라 YouTube Shorts+Discord+이메일 조합·Play Shorts는 select partner 한정이라 계획 제외): **🟢 P2 빌드 없이 착수 가능한 롱테일 3~4단어 키워드 5개 세트 + 짧은 설명 80자 + 스크린샷 1·2번 카피 확정(NumLink P7-005와 정확히 일치)**. Sources: Android Developers I/O 2026·Play Console 커스텀등재/등재실험·MobileAction·ASO World·Screenhance·Kirro·Metricus·PrimeTestLab.',
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
    taskSummary: '**🛡 트리거는 성공했는데 낡은 커밋을 배포했다 — 초록불이 그걸 숨겼다(8/07)**: 런 **20건 전원 success·실패 0건**인데 라이브는 `7/27` 생성본(W30) 서빙, main은 `8/3`(W31) — **11일 stale**. `workflow_dispatch` 런은 7/27·8/3 **두 건 다 존재**하나 **headSha가 동일한 `9df266b`**: 8/3에 `ef92911` push **2초 뒤** dispatch를 걸어 GitHub의 `main` ref 해석이 직전 커밋을 가리킨 **레이스**(7/27엔 같은 간격으로 이김 = **주간 동전 던지기**). 이 사고가 통과한 이유는 **헬스체크가 HTTP 200만 보고 어떤 커밋인지는 안 봤기 때문**. **🛡 자율 조치(완료)**: dispatch에 SHA 명시 전달 + 배포 커밋 SHA·제목·시각을 Actions 요약에 노출. **남은 갭**: `pull_request` 트리거 두 워크플로 통틀어 **매치 0건** → Dependabot #126(12일)·#124(19일) 빈 statusCheckRollup은 "실패"가 아니라 **"체크 미정의"**. `PKM_StudyPush` **Disabled 13일째**.',
    lastUpdate: '8/07 금요일 리서치(금요일·런 20건 전원 success 뒤 라이브 11일 stale·8/3 dispatch가 push 2초 뒤 걸려 직전 SHA를 배포한 레이스를 headSha 동일로 입증·헬스체크가 200만 보고 SHA 미확인이라 초록불 통과·pull_request 트리거 0건이라 Dependabot 무검증·Actions 2026 로드맵 워크플로 lockfile+egress 방화벽·OIDC immutable claims는 레포 생성일 3/13이라 무영향): **🟢 P0[자율 완료✅] deploy-pages에 `inputs.sha` 추가 + checkout `ref: inputs.sha || github.sha` + weekly-insights가 push 직후 SHA를 `-f sha=`로 고정 + "Record deployed commit" 스텝으로 배포 커밋 요약 노출(YAML 파싱 검증 통과)** + **🟢 P2[적재] pull_request 최소 빌드 검증 잡 신설 후 #126·#124 머지**. Sources: gh run list headSha 대조·WebFetch insights.json·gh pr list statusCheckRollup·schtasks 실측·github.blog 2026 보안 로드맵.',
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
    taskSummary: '**🎨 미배선이 아니라 미존재였다 — 감정 에셋 0/5(8/07)**: `RhythmCatController`가 요구하는 `idle/happy/excited/miss/eating` 5슬롯에 대해 `Sprites/Cat/` **16장은 전부 품종·전신 이미지**(AmeShort·Cheeze·Ragdoll 등) — **감정 상태 변형 0장**. 씬을 열어도 **할당할 대상이 없으므로** 에디터 세션 과제가 아니라 **에셋 제작 과제**로 성격이 바뀐다. **신규 에셋 0개 우회로 발견**: 판정이 색 단독 구분인데 **Perfect↔Miss 상호 대비 2.43:1**, 밝은 배경에서 Perfect **1.29:1로 소실**(Good은 순백이라 동반 소실). 그런데 `PERFECT_`·`NICE_`·`MISS` 스프라이트 **3장이 있으면서 참조 0건**이고 대신 `HitEffectController`가 런타임 `new GameObject()`로 legacy Text 생성(컨벤션 2건 위반). **색약 신규 실측**: NumLink `connectionColors` 6색이 deuteranopia에서 혼동 임계(거리 60) 미만 **6쌍 전부**, 최악 코랄↔세이지 **거리 16.8**(사실상 동일색) — 다만 **실사용 0곳**이라 배선 시점이 수정 적기.',
    lastUpdate: '8/07 금요일 리서치(금요일·고양이 감정 스프라이트 0/5로 미배선이 아니라 에셋 부재가 선행 블로커임을 규명·판정 Perfect↔Miss 대비 2.43:1 및 밝은배경 1.29:1 소실 실측·미사용 판정 스프라이트 3장 회수 가능·NumLink 연결선 6색 색약 혼동 6쌍 전부·2026 모션 키워드는 절제로 애니메이션은 상태변화 전달시에만 존재·색약은 전체필터 아닌 요소단위 부호화·WCAG 2.2 SC 2.5.8 최소 24×24px): **🟡 P1 판정 이펙트를 색 단독 → 형태+모션 이중 부호화로 전환(기존 미사용 스프라이트 3장 재활용·씬 사전배치 Image 3개·Perfect 튐/Good 페이드/Miss 처짐 — 신규 에셋 0개, 컨벤션 위반 2건 동시 해소)**. Sources: Filament Games 색맹 접근성·ACM 3611026·rhythm-games.com 차팅가이드·wcag22aa.org·IconikAI Liquid Glass·echoVME.',
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
