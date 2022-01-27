import React, { useState } from "react";
import Styles from "./Crud.module.scss";
import DataPanel from "./DataPanel";
import DataEntity from "./DataEntity";
import SpecificDataPanel from "./SpecificDataPanel/SpecificDataPanel";
import { listOfDataTypes, listOfSpecificDataTypes } from "./utils";

const Crud = () => {
  const [activeDataType, setActiveDataType] = useState(null);
  const [activeData, setActiveData] = useState(null);
  console.log({ activeDataType });
  const handleActiveDataType = (data, index) => () => {
    setActiveDataType(data.title);
    setActiveData({});
  };
  const handleActiveData = (param) => () => setActiveData(param);
  console.log({ activeData });

  return (
    <div className={Styles["crud-body"]}>
      <DataPanel
        dataList={listOfDataTypes}
        activeDataType={activeDataType}
        setActiveDataType={handleActiveDataType}
      />

      <SpecificDataPanel
        activeDataType={activeDataType}
        setActiveData={handleActiveData}
      />

      {activeData?.id && (
        <DataEntity activeDataType={activeDataType} activeData={activeData} />
      )}
    </div>
  );
};

export default Crud;
