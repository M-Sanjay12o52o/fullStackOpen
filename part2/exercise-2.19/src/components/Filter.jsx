import React from "react";

const Filter = (props) => {
  return (
    <div>
      <p>
        find countries -{" "}
        <input value={props.searchQuery} onChange={props.handleSearch} />
      </p>
    </div>
  );
};

export default Filter;
