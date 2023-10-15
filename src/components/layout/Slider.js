import React, { useRef } from "react";
import useSlider from "../../hooks/useSlider";

const Slider = ({ children, className }) => {
  const refContainerSlider = useRef();
  const refSlider = useRef();

  const { starDragHandler, finishDragging, draggingHandler } = useSlider({
    container: refContainerSlider,
    slider: refSlider,
  });
  return (
    <div
      className={`${className} w-full md:w-1/2 h-[360px] sm:h-[380px] md:h-[470px] relative cursor-grab overflow-auto md:overflow-hidden no-scrollbar `}
      ref={refContainerSlider}
      onMouseDown={starDragHandler}
      onMouseMove={draggingHandler}
      onMouseUp={finishDragging}
    >
      <ul className="grid gap-6 md:gap-8 auto-cols-[230px] md:auto-cols-[280px] 2xl:auto-cols-[200px] grid-flow-col z-20 h-full absolute left-0 top-0 px-4 py-0 pointer-events-none" ref={refSlider}>
        {children}
      </ul>
    </div>
  );
};

export default Slider;
