import React from "react";
import LayoutSections from "../layout/LayoutSections";
import classes from "./About.module.css";
import ImgGiraffe from "../../assets/giraffe.png";

const About = () => {
  return (
    <section className={classes.section}>
      <LayoutSections
        title="About us"
        subtitle="Who We Are: A Passionate Team Dedicated to Wildlife Conservation."
        className={classes.content}
      >
        <ul className={classes.valuesList}>
          <li>Huynh Van Phu</li>
          <li>Vo Ngoc Truc Lam</li>
          <li>Nguyen Thanh Binh</li>
          <li>Do Thanh Bo</li>
        </ul>

        <a href="/" className="btn-verde">
          See more
        </a>
      </LayoutSections>
      <div className={classes.img}>
        <img src={ImgGiraffe} alt="girafa" />
        <div className={classes.detail1}></div>
      </div>
    </section>
  );
};

export default About;
