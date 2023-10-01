import React from "react";
import classes from "./EmailSection.module.css";

const EmailSection = () => {
  return (
    <section className={classes.section}>
      <h2>For more information, contact us at</h2>
      <form className={classes.form}>
        <label htmlFor="email">Send email</label>
        <input
          type="email"
          placeholder="exemplo@email.com"
          id="email"
          className={classes.email}
        />
        <button className={`btn-preto ${classes.btn}`}>Send</button>
      </form>
    </section>
  );
};

export default EmailSection;
