# Cat Merge Cafe Agent Office

React + TypeScript + Vite 기반의 **로컬호스트 실행형 에이전트 오피스 + Unity WebGL 래퍼 프로토타입**입니다.

현재 목표는 `Cat Merge Cafe`를 `Appintoos` 우선 환경에 맞춰 배포할 수 있도록, 우리 에이전트들이 사무실 공간에서 일하는 모습을 보여주면서 동시에 Unity 게임 본체 바깥에서 아래 책임을 담당하는 래퍼를 유지하는 것입니다.

- 브랜드 로딩 화면
- Unity WebGL 캔버스 장착
- 로딩/오류/재시도 UX
- 브라우저 라이프사이클 처리
- 저장/광고/분석 브리지 표면 정의

## 현재 상태

- 메인 화면은 `Star-Office-UI` 감성의 **픽셀 오피스 장면**으로 재구성됨
- 현재 메인 오피스 배경은 `Star-Office-UI` 레퍼런스 배경 구성을 직접 반영함
- 배경뿐 아니라 소파/책상/커피머신/서버룸/식물/고양이/버그/메인 캐릭터/게스트 역할 캐릭터도 원본 자산 URL 기준으로 직접 반영함
- 에이전트 6명이 각 존에서 상태에 따라 일하는 모습을 볼 수 있음
- 각 존에 책상, 모니터, 보드, 소파 같은 픽셀 소품을 배치해 사무실 톤을 강화함
- 현재 에이전트 캐릭터는 `Star-Office-UI`의 guest role 자산을 직접 사용해 배치함
- 로컬 mock 상태 전환 버튼으로 장면을 바로 시연 가능
- 오른쪽/하단 보드에 `Unity ↔ Wrapper` 상태, 마일스톤, 로그, 블로커 정보를 통합
- 실제 Unity 빌드 URL은 아직 연결되지 않음
- `public/unity/config.json`을 통해 실제 Unity WebGL 빌드 경로를 주입하도록 준비됨
- `Chronicle` 운영 저널은 `localStorage`에 누적되며, 새로고침 후에도 유지됨

## 참고 라이선스

- `Star-Office-UI`의 **코드/로직은 MIT**
- 하지만 원본 README 기준 **미술 에셋은 non-commercial only**
- 따라서 현재 원본 자산 직접 반영 상태는 로컬 데모/학습용으로만 보는 것이 안전함

## 개발 명령어

```bash
npm install
npm run dev
npm run lint
npm run build
```

기본적으로 `npm run dev` 후 브라우저에서 로컬호스트 주소를 열면 바로 장면을 볼 수 있습니다.

## GitHub 업로드 빠른 시작

현재 환경처럼 제가 직접 `git push`를 실행할 수 없는 경우를 위해, 아래 PowerShell 스크립트를 함께 넣어 두었습니다.

```powershell
cd C:\Users\LIMMM\unity-webgl-wrapper
powershell -ExecutionPolicy Bypass -File .\push-to-agent-office.ps1
```

이 스크립트는 아래를 순서대로 처리합니다.

- `unity-webgl-wrapper`를 독립 git 저장소로 초기화
- 원격 저장소를 `https://github.com/mmporong/agent-office.git`로 설정
- 파일 add / commit
- `main` 브랜치로 push

## GitHub Pages 배포

현재 프로젝트는 **`mmporong/agent-office` 저장소를 GitHub Pages로 배포해 `https://mmporong.github.io/agent-office/`로 여는 방식** 기준으로 정리해 두었습니다.

### 1. build base 경로

`vite.config.ts`는 `VITE_BASE_PATH` 환경 변수를 읽습니다.

- 사용자/조직 Pages 저장소(`https://<user>.github.io/`)라면 `VITE_BASE_PATH=/`
- 프로젝트 Pages 저장소(`https://<user>.github.io/<repo>/`)라면 `VITE_BASE_PATH=/repo/`
- 사용자 Pages 저장소의 **하위 폴더**에 올릴 때는 `VITE_BASE_PATH=/folder-name/`

설정하지 않으면 기본값은 `/` 입니다.

### 2. 필요한 GitHub 설정

소스 저장소에서 `.github/workflows/deploy-pages.yml`을 사용하려면 아래 설정을 사용할 수 있습니다.

- Repository variable: `PAGES_REPOSITORY`
  - 값 예시: `your-account/your-pages-repo`
  - 현재 기본값은 `mmporong/agent-office`
- Optional repository variable: `PAGES_BASE_PATH`
  - 값 예시: `/`
  - 프로젝트 사이트면 `/repo-name/`
  - 현재 기본값은 `/agent-office/`
- Optional repository variable: `PAGES_TARGET_FOLDER`
  - 값 예시: `agent-office`
  - 별도 Pages 저장소를 루트로 쓸 때는 비워 둔다
  - 현재 기본값은 비어 있음
- Repository secret: `PAGES_PUBLISH_TOKEN`
  - 별도 Pages 저장소에 push 권한이 있는 PAT

워크플로는 소스 저장소에서 build를 수행한 뒤, 결과물 `dist/`를 별도 Pages 저장소의 `main` 브랜치에 배포합니다.

즉, **지금 상태에서는 `PAGES_PUBLISH_TOKEN`만 준비되면 수동 실행 기준으로 바로 배포 시도**가 가능합니다. 다른 값은 워크플로 기본값으로 이미 들어 있습니다.

추가로 `workflow_dispatch` 수동 실행 시에는 Actions 화면에서 아래 값을 직접 넣어 덮어쓸 수 있습니다.

- `pages_repository`
- `pages_base_path`
- `pages_target_folder`

`PAGES_BASE_PATH`는 사용자/조직 루트 Pages에서는 생략 가능하지만, **프로젝트 Pages 저장소라면 반드시 설정**하는 것이 안전합니다.

이 프로젝트는 아래 조합을 기본 배포값으로 잡아 두었습니다.

- `PAGES_REPOSITORY = mmporong/agent-office`
- `PAGES_TARGET_FOLDER = ''`
- `PAGES_BASE_PATH = /agent-office/`

이렇게 하면 최종 주소는 `https://mmporong.github.io/agent-office/` 형태가 됩니다.

### 2-1. `public/unity/config.json` 경로 작성 규칙

`unity/config.json` 자체는 현재 Pages base 경로를 반영해 fetch됩니다.

다만 JSON 안의 Unity build 경로도 일관되게 작성해야 합니다.

- 상대 경로 예시: `Build/game.loader.js`
  - `config.json` 파일 위치를 기준으로 해석됨
- 절대 경로 예시: `/repo/Build/game.loader.js`
  - 이미 완성된 공개 경로를 직접 지정할 때 사용
- 전체 URL 예시: `https://cdn.example.com/game.loader.js`
  - 외부 CDN 자산일 때 사용

즉, Unity build 파일을 `public/unity/...` 아래에 둘 경우 상대 경로를 사용하는 편이 가장 안전합니다.

### 3. 저장 데이터 주의사항

운영 저널은 `localStorage`를 사용합니다.

- `http://localhost:5173`에서 쌓인 Chronicle 데이터
- GitHub Pages 도메인에서 쌓인 Chronicle 데이터

이 둘은 **서로 다른 origin**으로 취급되므로 자동으로 공유되지 않습니다.

### 4. 외부 자산 주의사항

현재 일부 오피스 배경/캐릭터 자산은 `raw.githubusercontent.com`의 Star-Office 자산 URL을 직접 참조합니다.

- GitHub Pages 자체 배포는 가능
- 다만 외부 자산 가용성과 라이선스 조건은 별도로 계속 점검해야 합니다

## 다음 우선 작업

1. 실제 Unity WebGL 빌드 산출물 경로 연결
2. mock 상태 -> 실제 세션/브리지 상태 연동
3. `wrapper:boot-ready`, `unity:runtime-ready` 등 메시지 브리지 고도화
4. IndexedDB 기반 저장 계층 추가
5. 보상형/전면형 광고 브리지와 복귀 처리 구현
