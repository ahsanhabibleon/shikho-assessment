import React from "react";

const Divider = (props) => {
  const { width = "auto", height = "20px", ...rest } = props;
  return (
    <div className={`shikho-divider`} style={{ width, height, ...rest }} />
  );
};

export default React.memo(Divider);
