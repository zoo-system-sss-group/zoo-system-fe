import React from "react";

import { ReactComponent as IconFacebook } from "../../assets/facebook.svg";
import { ReactComponent as IconInstagram } from "../../assets/instagram.svg";
import { ReactComponent as IconYoutube } from "../../assets/youtube.svg";
const MediasLink = ({ className }) => {
  return (
    <address className={`text-cor2 flex items-center ${className}`}>
      <a className="flex items-center" href="/" aria-label="facebook">
        <IconFacebook />
      </a>
      <a className="flex items-center ml-4" href="/" aria-label="instagram">
        <IconInstagram />
      </a>
      <a className="flex items-center ml-4" href="/" aria-label="youtube">
        <IconYoutube />
      </a>
    </address>
  );
};

export default MediasLink;
