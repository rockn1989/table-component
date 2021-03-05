import React from "react";
import "./filter.css";

import PropTypes from "prop-types";

const Filter = ({ setFilterId }) => {
  const filtration = (evt) => {
    setFilterId(parseInt(evt.target.value, 10));
  };

  return (
    <form action="" className="filter-form">
      <input type="text" placeholder="Введите user id" onChange={filtration} />
    </form>
  );
};

Filter.propTypes = {
  setFilterId: PropTypes.func.isRequired,
};

export default Filter;
