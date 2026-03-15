# Agent Office 대시보드 전면 리디자인

## 프로젝트 위치
`C:\Users\LIMMM\unity-webgl-wrapper`

## 기술 스택
- React 19 + TypeScript + Vite 7
- 외부 라이브러리 추가 가능 (framer-motion, react-router 등 필요하면 설치)
- 배포: GitHub Pages (mmporong.github.io)

## 현재 구조

```
src/
├── App.tsx              ← 메인 (846줄, 단일 파일에 Office/Chronicle/Agents 3탭)
├── App.css              ← 전체 CSS (1046줄, 단일 파일)
├── index.css            ← 글로벌 리셋
├── main.tsx             ← 엔트리
├── components/office/
│   ├── AgentSprite.tsx   ← 픽셀 캐릭터 스프라이트
│   ├── AgentStatusCard.tsx
│   ├── OfficeMap.tsx     ← Star Office 스타일 오피스 맵
│   ├── PhaseHeader.tsx
│   └── TaskTicker.tsx
├── data/
│   ├── agents.ts         ← 에이전트 정의, 프로젝트 정보, 목표, 태스크
│   ├── meowbeat.ts       ← 마일스톤, 블로커, 이벤트, readiness 체크
│   ├── chronicle.ts      ← 개발 히스토리 (3 페이즈)
│   └── operationsJournal.ts ← 운영 저널 엔트리
├── hooks/
│   ├── usePersistentJournal.ts ← localStorage 기반 저널 저장
│   └── useUnityBridge.ts      ← Unity WebGL 브리지 (유지)
├── types/
│   ├── office.ts         ← AgentStatus, OfficeAgent, OfficeZone 타입
│   └── unity.ts          ← Unity 설정 타입
└── utils/
    └── publicPath.ts
```

## 리디자인 목표

### 1. 전체 컨셉: "인디 개발자의 데브로그"
- 개발자 블로그/데브로그 느낌의 대시보드
- 방문자가 "이 개발자가 어떤 프로젝트를 어떻게 만들고 있는지" 한눈에 파악
- 포트폴리오 + 개발일지 + 에이전트 오피스가 자연스럽게 통합
- 톤: 깔끔하고 모던한 다크 테마, 개발자 감성 (터미널/IDE 느낌 가미 가능)

### 2. 페이지 구조 (탭 → 라우터 기반 페이지)

#### 홈 (`/`)
- 히어로 영역: 개발자 소개 (mmporong / LIM Studio)
- 현재 프로젝트 카드 (MeowBeat 상태 요약)
- 최근 업데이트 타임라인 (최근 저널에서 추출)
- Agent Office 미니맵 (축소된 오피스 맵, 클릭하면 /office로)

#### 크로니클 (`/chronicle`)
- **게시판 형태** — 카드 리스트 or 타임라인 피드
- 각 항목은 개발일지 포스트처럼 보여야 함
- 날짜, 제목, 요약, 태그, 펼치면 상세 내용
- 필터/검색: 날짜, 카테고리(리서치/회의/결정)
- 새 글 작성은 없어도 됨 (데이터는 코드에서 관리)

#### 에이전트 오피스 (`/office`)
- 기존 Star Office 스타일 오피스 맵 유지 (AgentSprite, OfficeMap)
- 사이드바: 선택된 에이전트 상태 카드
- 업무 라운드 진행/전원 대기 등 인터랙션 유지
- 브리핑 보드, 태스크 티커 유지

#### 프로젝트 (`/projects`)
- MeowBeat 프로젝트 상세 페이지 (포트폴리오용)
- 스프린트별 진행 상황 시각화 (프로그레스 바 or 칸반)
- 마일스톤 카드, 기술 스택 표시
- 스크린샷/GIF 갤러리 영역 (추후 에셋 추가용 빈 슬롯)

### 3. 디자인 & CSS 요구사항

#### 인터랙티브 요소
- 스크롤 기반 애니메이션 (Intersection Observer 또는 scroll-driven animations)
- 페이지 전환 트랜지션 (View Transitions API 또는 framer-motion)
- 카드 hover 시 미세한 lift + glow 효과
- 스켈레톤 로딩 or 부드러운 fade-in
- 다크/라이트 토글 (선택사항이지만 있으면 좋음)

#### 최신 CSS 기법 활용
- CSS Container Queries (`@container`)로 카드 반응형
- CSS Nesting (네이티브)
- `color-mix()`, `oklch()` 컬러 시스템
- CSS `scroll-timeline` / `animation-timeline` (지원되는 브라우저에서)
- `@layer`로 CSS 우선순위 관리
- CSS Grid subgrid 활용
- `has()` 셀렉터로 상태 기반 스타일링
- `@starting-style`로 entry 애니메이션
- Popover API 활용 (에이전트 상세 팝오버 등)
- Anchor positioning (지원 시)
- `text-wrap: balance` / `pretty`
- 현재 단일 App.css를 컴포넌트별 CSS 모듈 or co-located CSS로 분리

#### 타이포그래피 & 컬러
- 코드/터미널 느낌의 모노스페이스 폰트 (제목이나 액센트에)
- 본문은 깔끔한 산세리프
- 다크 배경 (#0a0a0f ~ #141420 계열)
- 액센트: 민트/시안 계열 (#8bffd2 유지 가능) + 따뜻한 오렌지/앰버 보조
- 의미 있는 컬러 토큰 (--color-surface, --color-accent 등)

### 4. 포트폴리오 요소
- 개발자 프로필 섹션 (이름, 역할, 링크)
- 프로젝트 카드에 기술 스택 배지
- 개발 과정을 보여주는 타임라인
- "이 사이트 자체가 React+TS+Vite로 만든 포트폴리오" 메타 언급

### 5. 주의사항
- Unity WebGL 브리지 관련 코드(`useUnityBridge.ts`, config 로딩)는 유지
- `usePersistentJournal.ts`의 localStorage 저널 시스템 유지
- 기존 data/ 파일의 타입과 데이터 구조는 유지 (내용은 업데이트 가능)
- Star Office 에셋 참조(OfficeMap의 GitHub raw URL)는 유지
- AgentSprite 캐릭터 시스템 유지
- 한글 UI 텍스트 유지
- `types/office.ts`, `types/unity.ts` 타입 확장 가능하지만 기존 필드 삭제 금지
- 빌드가 깨지지 않아야 함 (작업 중간중간 `npx tsc --noEmit` 확인)

### 6. 작업 순서 제안
1. react-router 설치 + 페이지 라우팅 구조 세팅
2. CSS 아키텍처 리셋 (App.css 분리, 컬러 토큰, @layer)
3. 홈 페이지 구현 (히어로 + 프로젝트 카드 + 타임라인)
4. 크로니클 게시판 페이지
5. 에이전트 오피스 페이지 (기존 코드 이전 + 개선)
6. 프로젝트 상세 페이지
7. 인터랙티브 요소 추가 (애니메이션, 트랜지션)
8. 반응형 + 접근성 점검
9. 빌드 테스트 + GitHub Pages 배포 확인

## 참고 데이터

### 개발자 프로필
- **이름**: mmporong (LIM Studio)
- **역할**: 1인 Unity 개발자 + AI 도구 활용
- **현재 프로젝트**: MeowBeat (냥비트) — 고양이 리듬 캐주얼 게임
- **기술**: Unity (C#), React+TypeScript, Python, AI Agent 오케스트레이션
- **GitHub**: github.com/mmporong

### MeowBeat 프로젝트 현황
- Phase 2 코드 완료 (8 스프린트)
- 에셋/UI 연결 대기 중
- 킥 5개: 먹이주기, 냥냥합체, AI음악, 냥스타그램, 냥카페
- MVP: Sprint 0-3 + Sprint 5 (최소 10곡)
