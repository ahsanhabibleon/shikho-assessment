import React from "react";
import { capitalize } from "../../utils";
import Styles from "./Entity.module.scss";

const SearchAndTag = ({ activeDataType, value, onChange }) => {
  return (
    <div className={Styles["input-group"]}>
      <label htmlFor="tag">{capitalize(activeDataType)}</label>
      <p className={Styles.subtitle}>
        Search A {capitalize(activeDataType.slice(0, -1))} and Tag this{" "}
        {activeDataType === "posts" ? "Comment" : "Post"}
      </p>
      <input
        id="tag"
        type="text"
        placeholder="Search and tag"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchAndTag;
