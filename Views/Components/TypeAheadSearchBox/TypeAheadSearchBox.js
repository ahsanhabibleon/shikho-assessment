import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";

const TypeAheadSearchBox = ({ options = [], handleSelected }) => {
  return (
    <Typeahead
      id="search"
      clearButton
      onChange={(selected) => handleSelected(selected)}
      options={options}
    />
  );
};

export default TypeAheadSearchBox;
