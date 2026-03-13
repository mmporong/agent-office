interface TaskTickerProps {
  items: string[]
}

export function TaskTicker({ items }: TaskTickerProps) {
  return (
    <ul className="task-ticker">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
