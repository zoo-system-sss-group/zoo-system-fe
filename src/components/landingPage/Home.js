import React from "react";
import classes from "./Home.module.css";
import MediasLink from "../layout/MediasLink";
import Logo from "../layout/Logo";
import { ReactComponent as IconPin } from "../../assets/pin.svg";

const Home = () => {
  return (
    <section className={classes.entrada}>
      <header className={classes.header}>
        <Logo className={classes.logo} />
        <MediasLink className={classes.linksMedia} />
        <a className="btn-verde" href="/Login">
          Login
        </a>
      </header>

      <div className={classes.entradaContainer}>
        <div className={classes.titleAndTexts}>
          <p className={classes.description}>
            Sở thú kiêm rạp xiếc trung ương hàng hàng đầu FPT
          </p>

          <h1>Welcome to the best zoo in FPT University ecosystem</h1>

          <a href="/" className="btn-verde">
            Buy ticket here!
          </a>
        </div>

        <div className={classes.aside}>
          <ul>
            <li>
              <span>2506</span>
              <p>animals</p>
            </li>
            <li>
              <span>315</span>
              <p>species</p>
            </li>
            <li>
              <span>+20</span>
              <p>areas</p>
            </li>
          </ul>

          <address>
            <span>
            D1 Street, Saigon Hi-tech Park, Long Thanh My Ward, Thu Duc City, Ho Chi Minh City <IconPin />
            </span>
          </address>
        </div>
      </div>
    </section>
  );
};

export default Home;
