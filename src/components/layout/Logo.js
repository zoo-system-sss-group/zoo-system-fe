import React from "react";

import { ReactComponent as LogoSvg } from "../../assets/logo.svg";
const Logo = ({ className }) => {
  return (
    <span className={`text-cor1 font-extrabold text-center uppercase flex text-xl ${className}`}>
      <LogoSvg className="w-6 fill-cor1 mr-2"/>
      <div className="">FZoo</div>
    </span>
  );
};

export default Logo;
