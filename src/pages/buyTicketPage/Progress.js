import { useRef } from "react";
import { useEffect } from "react";

export default function Progress({ value, max }) {
  const progress = useRef();
  useEffect(() => {
	  progress.current.style.width = `${(value / max) * 100}%`;
	  console.log(value, progress.current.style.width,max);
  }, [value]);

  return (
    <div className="h-3 shadow-md  w-full max-w-[650px] rounded-2xl relative max transition-all bg-cor5">
      <div
        className="absolute inset-0 bg-cor3 rounded-2xl"
        ref={progress}
      ></div>
    </div>
  );
}
