import { useRef } from "react";
import { useEffect } from "react";

export function Progress({ value, max }) {
  const p = useRef();
  useEffect(() => {
    p.current.style.width = ((value - 1) / max) * 100 + "%";
    p.current.style.width = (value / max) * 100 + "%";
  }, [value]);
  return (
    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div ref={p} class={`bg-blue-600 h-2.5 rounded-full transition`}></div>
    </div>
  );
}
