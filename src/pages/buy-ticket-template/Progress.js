export function Progress({value,max}) {
  return (
    <progress className={"progress transition h-6 progress-success"}  value={value} max={max}></progress>
  )
}
