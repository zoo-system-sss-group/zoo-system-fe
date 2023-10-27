import React from "react";

import { ReactComponent as IconFacebook } from "../../assets/facebook.svg";
import { ReactComponent as IconInstagram } from "../../assets/instagram.svg";
import { ReactComponent as IconYoutube } from "../../assets/youtube.svg";
import { Link } from 'react-router-dom';
const MediasLink = ({ className }) => {
  return (
    <address className={`text-cor2 flex items-center ${className}`}>
      <Link className="flex items-center" to="/" aria-label="facebook">
        <IconFacebook />
      </Link>
      <Link className="flex items-center ml-4" to="/" aria-label="instagram">
        <IconInstagram />
      </Link>
      <Link className="flex items-center ml-4" to="/" aria-label="youtube">
        <IconYoutube />
      </Link>
    </address>
  );
};

export default MediasLink;
