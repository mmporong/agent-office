# public/data

## operations-journal.json

데일리 스탠드업 회의록 원본이다. 배열 **맨 앞**에 새 `JournalEntry`를 추가한다.

- 스키마는 `src/data/operationsJournal.ts`의 `JournalEntry` 인터페이스를 따른다.
- `id` 형식: `YYYY-MM-DDT04:00:00-daily-standup`
- 로드 경로: `src/hooks/usePersistentJournal.ts` → `fetch(withBasePath('data/operations-journal.json'))`

2026-08-08 이전에는 이 배열이 `src/data/operationsJournal.ts`에 인라인돼 있었고,
실빌드 단일 청크 3,079 KB의 91%(2.8 MB)를 차지하며 스탠드업 1회당 +31 KB씩 상한 없이
증가했다. 분리 이후 `operationsJournal.ts`에는 타입과 상수만 남는다.
**회의록을 TS 파일에 다시 인라인하지 않는다.**
