import React from "react";
import Styles from "./Button.module.scss";

const Button = (props) => {
  const { text, icon, onClick, type } = props;
  return (
    <button type={type} className={Styles.button} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
