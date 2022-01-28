import React from "react";
import Button from "../../Molicules/Button/Button";
function CreateNewData(props) {
  const { type, clearFields, createMode } = props;

  return (
    <Button
      text={
        !createMode
          ? `CREATE NEW ${type.slice(0, -1).toUpperCase()}`
          : "EXIT CREATE MODE"
      }
      onClick={clearFields}
    />
  );
}

export default CreateNewData;
