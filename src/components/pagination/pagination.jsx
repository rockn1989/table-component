import React from "react";

import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { MAX_POSTS } from "../../const";
import PropTypes from "prop-types";
import "./pagination.css";

const Pagination = ({ activePage, postListLength }) => {
  const [pagination, setPagination] = React.useState([]);
  const count = postListLength;

  const createLink = (i) => {
    return (
      <li key={v4()}>
        <Link to={`/page/` + i}>{i}</Link>
      </li>
    );
  };

  const createActiveItem = (i) => {
    return (
      <li key={v4()}>
        <span>{i}</span>
      </li>
    );
  };

  const renderPagination = (counter) => {
    const TOTAL_ELEMENTS = MAX_POSTS;
    const TOTAL_PAGES = counter / TOTAL_ELEMENTS;
    const paginationElements = [];

    for (let i = 1; i <= TOTAL_PAGES; i++) {
      if (activePage === i) {
        paginationElements.push(createActiveItem(i));
      } else {
        paginationElements.push(createLink(i));
      }
    }

    setPagination(paginationElements);
  };

  React.useEffect(() => {
    renderPagination(count);
  }, [count, activePage]);

  return <ul className="pagination">{pagination}</ul>;
};

Pagination.propTypes = {
  postListLength: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
};

export default Pagination;
