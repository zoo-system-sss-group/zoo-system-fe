import React from "react";

import { ReactComponent as LogoSvg } from "../../assets/logo.svg";
import { useLocation } from "react-router";
const Logo = ({ className }) => {
  const location = useLocation();
  const logoColor = location.pathname.includes('management')  ? "cor1" : "cor2" 
  return (
    <span className={`text-${logoColor} font-extrabold text-center uppercase flex text-xl ${className}`}>
      <LogoSvg className={`w-6 fill-${logoColor} mr-2`}/>
      <div className="">FZoo</div>
    </span>
  );
};

export default Logo;
