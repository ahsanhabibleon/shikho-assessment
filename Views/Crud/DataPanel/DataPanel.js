import React, { useEffect, useState } from "react";
import Styles from "./DataPanel.module.scss";

const DataPanel = (props) => {
  const { dataList, activeDataType, setActiveDataType, icon } = props;

  return (
    <div className={Styles["data-panel"]}>
      {dataList.length ? (
        <ul className={Styles["data-list"]}>
          {dataList.map((data, index) => (
            <li
              key={index}
              className={
                activeDataType === data.title ? Styles["active-data-list"] : ""
              }
              onClick={setActiveDataType(data, index)}
            >
              {icon && icon}
              <span>{data.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className={Styles["create-new-data"]}>
          No data found! Please create new {activeDataType} first.
        </div>
      )}
    </div>
  );
};

export default DataPanel;
