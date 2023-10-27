import React, { useEffect, useRef, useState } from "react";
import classes from "./Header.module.css";
import MediasLink from "../layout/MediasLink";
import Logo from "../layout/Logo";
import { Link, NavLink, useLocation } from "react-router-dom";

const listLinks = [
  {route: "animals", title: "animals", description: "" },
  {route: "news", title: "news", description: "" },
  {route: "buyticket", title: "buy ticket", description: "" },
];

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const refBtn = useRef();
  const location = useLocation();

  useEffect(() => {
    const checkClickTarget = (e) => {
      if (e.target !== refBtn.current && !refBtn.current.contains(e.target)) {
        setIsMenuVisible(false);
      }
    };

    window.addEventListener("click", checkClickTarget);

    return () => window.removeEventListener("click", checkClickTarget);
  }, []);

  const openMenuHandler = () => {
    setIsMenuVisible((currState) => !currState);
  };

  return (
    <header className="fixed duration-[400ms] z-50 bg-cor6 p-6 flex items-center text-center flex-row lg: w-full h-16">
      <Link className="mr-auto" to="/">
        <Logo />
      </Link>
      <nav className={`${classes.nav} ${isMenuVisible ? classes.visible : ""} text-cor2 m-auto `}>
        <ul className="flex flex-row gap-8">
          {listLinks.map((link) => (

            <li key={link.route}>
              <NavLink  to={`/${link.route}`} className="duration-200 hover:text-cor1">
                <span className="capitalize">{link.title}</span>
                <p className="text-xs text-cor7 uppercase duration-200 hover:text-cor1">{link.description}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <MediasLink />
      <Link className="btn btn-md btn-primary h-10 !min-h-8 ml-4" to="/login">
          Login
        </Link>
      <button
        className={`${classes.menuBtn} ${isMenuVisible ? classes.visible : ""}`}
        ref={refBtn}
        onClick={openMenuHandler}
        aria-label="menu"
      >
        <div className={classes.btnDash}></div>
      </button>
    </header>
  );
};

export default Header;
