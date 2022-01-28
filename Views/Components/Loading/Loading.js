import React from "react";
import Styles from "./Loading.module.scss";

function Loading({ size, borderSize, color, style }) {
  return (
    <span
      className={Styles["loading-animation"]}
      style={{
        ...style,
        width: `${size}`,
        height: `${size}`,
        backgroundColor: "transparent",
        borderRadius: "100%",
        border: `${borderSize} solid ${color}`,
        borderRightColor: "transparent",
      }}
    />
  );
}

export default Loading;
