import React from "react";

const GuestLayout = ({ title, children, className }) => {
  return (
    <main className={"pt-4"}>
      <h1 className="m-8 font-bold text-5xl leading-10">{title}</h1>
      <div className={className}>{children}</div>
    </main>
  );
};

export default GuestLayout;
