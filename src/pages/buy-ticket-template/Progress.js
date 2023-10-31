export function Progress({ value, max }) {
  return (
    <div className="mx-10 block h-6">
      <process
        className={"progress block transition h-6 progress-success"}
        value={value}
        max={max}
      /> 
    </div>
  );
}
