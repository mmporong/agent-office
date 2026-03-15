# LIM Studio Agent Office

React + TypeScript + Vite 기반의 **에이전트 오피스 대시보드**입니다.
7명의 에이전트가 픽셀 사무실에서 **MeowBeat(냥비트)** 개발 현황을 실시간으로 보여줍니다.

**배포 주소**: https://mmporong.github.io/agent-office/

## 주요 기능

- **픽셀 오피스 장면** — Star-Office-UI 감성의 사무실에서 에이전트 7명이 상태에 따라 이동
- **실시간 동기화** — `status.json` 폴링으로 Claude Code 세션/Git 커밋 등 실제 작업 상태 반영
- **수동 시뮬레이션** — 동기화 없이도 업무 라운드 버튼으로 시나리오 시연 가능
- **멀티 페이지** — Home, Office, Chronicle, Projects 4개 페이지
- **Chronicle 저널** — 운영 기록이 localStorage에 누적, 새로고침 후에도 유지

## 페이지 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| Home | `/` | LIM Studio 소개, 에이전트 오피스 미리보기, 프로젝트 현황 |
| Office | `/office` | 픽셀 사무실 대시보드, 에이전트 상태 관리 |
| Chronicle | `/chronicle` | 개발 히스토리, 연구 기록, 회의 결정 |
| Projects | `/projects` | MeowBeat 등 프로젝트 소개 |

## 에이전트 동기화

`status.json` 파일 기반으로 외부 작업 상태를 에이전트 오피스에 반영합니다.

### 동작 방식

```
Claude Code / 스크립트 → status.json 갱신 → git push → GitHub Pages 배포
Agent Office → 30초마다 fetch('/status.json') → 에이전트 상태 자동 반영
```

- **자동 모드** (기본): status.json을 30초마다 폴링, 에이전트 위치와 상태 자동 갱신
- **수동 모드**: 기존 시뮬레이션 버튼으로 시나리오 재현
- status.json이 없으면 에러 없이 수동 모드로 동작 (graceful degradation)

### status.json 스키마

```json
{
  "lastUpdated": "2026-03-15T14:30:00Z",
  "source": "claude-code",
  "agents": {
    "orchestrator": { "status": "planning", "task": "스프린트 계획 중" },
    "developer": { "status": "building", "task": "UI 프리팹 교체 작업" }
  }
}
```

유효한 status 값: `idle`, `planning`, `researching`, `building`, `verifying`, `blocked`, `syncing`

에이전트 ID: `orchestrator`, `game-designer`, `developer`, `qa-tester`, `content-writer`, `devops`, `art-director`

### CLI에서 상태 업데이트

```powershell
# 에이전트 상태 변경
./scripts/update-agent-status.ps1 -AgentId developer -Status building -Task "UI 구현 중"

# 변경 후 바로 push
./scripts/update-agent-status.ps1 -AgentId developer -Status building -Task "UI 구현 중" -Push
```

## 개발 명령어

```bash
npm install
npm run dev      # 로컬 개발 서버
npm run build    # 프로덕션 빌드
npm run lint     # 린트 검사
```

## GitHub Pages 배포

`main` 브랜치에 push하면 GitHub Actions가 자동 배포합니다.

- `Settings > Pages > Source`를 **GitHub Actions**로 설정
- build base 경로: `VITE_BASE_PATH` 환경 변수 (기본 `/`)
- 이 저장소는 `/agent-office/`로 고정

## 고양이 스프라이트 동기화

Unity 프로젝트의 고양이 스프라이트를 웹에 반영:

```powershell
powershell -ExecutionPolicy Bypass -File .\sync-catrush-cat-assets.ps1
```

| 상태 | 스프라이트 |
|------|-----------|
| idle | SleepingCat |
| planning / researching | WinkCat |
| building / syncing | RunningCat |
| verifying / blocked | Cat |

## 참고 라이선스

- Star-Office-UI 코드/로직: MIT
- Star-Office-UI 미술 에셋: non-commercial only (로컬 데모/학습용)

## 프로젝트 구조

```
src/
  App.tsx                        # 라우터 + 레이아웃 셸
  contexts/OfficeContext.tsx      # 에이전트 상태 관리 (동기화 포함)
  pages/
    HomePage.tsx                 # LIM Studio 소개 + 오피스 미리보기
    OfficePage.tsx               # 픽셀 오피스 대시보드
    ChroniclePage.tsx            # 개발 히스토리
    ProjectsPage.tsx             # 프로젝트 소개
  components/
    layout/                      # NavBar, Footer, ScrollToTop
    office/                      # OfficeMap, AgentSprite, AgentStatusCard
  hooks/
    useAgentSync.ts              # status.json 폴링 동기화 훅
    usePersistentJournal.ts      # localStorage 저널 훅
    useUnityBridge.ts            # Unity WebGL 브리지 훅
    useScrollReveal.ts           # 스크롤 애니메이션 훅
  data/                          # agents, meowbeat, chronicle, journal
  types/                         # office.ts, unity.ts
  styles/                        # tokens, reset, base, animations
public/
  status.json                    # 에이전트 상태 (외부 연동용)
  unity/config.json              # Unity WebGL 빌드 설정
  catrush-cats/                  # 고양이 스프라이트 에셋
scripts/
  update-agent-status.ps1        # CLI 상태 업데이트 스크립트
```
