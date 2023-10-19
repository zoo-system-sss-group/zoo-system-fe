import React from "react";
import LayoutSections from "../layout/LayoutSections";
import classes from "./About.module.css";
import ImgGiraffe from "../../assets/giraffe.png";

const About = () => {
  return (
    <section className="bg-cor5 text-cor2 overflow-hidden flex">
      <LayoutSections
        title="About us"
        subtitle="Who We Are: A Passionate Team Dedicated to Wildlife Conservation."
        className={classes.content}
      >
        <div className="grid grid-cols-2 gap-5 place-content-stretch mb-8 w-full">
          <div className="p-4 rounded-[0.2rem] bg-cor4 text-center">
            Huynh Van Phu
          </div>
          <div className="p-4 rounded-[0.2rem] bg-cor4 text-center">
            Vo Ngoc Truc Lam
          </div>
          <div className="p-4 rounded-[0.2rem] bg-cor4 text-center">
            Nguyen Thanh Binh
          </div>
          <div className="p-4 rounded-[0.2rem] bg-cor4 text-center">
            Do Thanh Bo
          </div>
        </div>
      </LayoutSections>
      <div className="w-1/2 relative pt-8 order-first">
        <img
          src={ImgGiraffe}
          alt="girafa"
          className="relative z-10 mx-0 my-auto w-[380px]"
        />
        <div className={classes.detail1}></div>
      </div>
    </section>
  );
};

export default About;
