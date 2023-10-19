import React from "react";

const LayoutSections = ({title, children, className }) => {
  return (
    <div className={`w-full md:w-1/2 flex items-center md:items-start text-center md:text-left flex-col z-10 px-16 md:px-20 py-6 md:py-12 lg:p-24 ${className}`}>
      <h2 className="w-max-[30rem] my-4 font-medium text-5xl leading-[3rem]">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default LayoutSections;
