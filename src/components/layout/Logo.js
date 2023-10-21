import React from "react";

import { ReactComponent as LogoSvg } from "../../assets/logo.svg";
const Logo = ({ className }) => {
  return (
    <span className={`text-cor2 border-cor font-extrabold text-center uppercase flex text-xl ${className}`}>
      <LogoSvg className="w-6 fill-cor2 mr-2"/>
      <div>FZoo</div>
    </span>
  );
};

export default Logo;
