import React from "react";
import { connect } from "react-redux";
import { ActionCreator } from "../../store/action";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { MAX_POSTS } from "../../const";
import "./pagination.css";
import PropTypes from "prop-types";

const Pagination = ({ activePage, postList, getPostsAtPage }) => {
  const [pagination, setPagination] = React.useState([]);
  const count = postList.length;
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
    getPostsAtPage();
  }, [count, activePage, getPostsAtPage]);

  return <ul className="pagination">{pagination}</ul>;
};

const mapStateToProps = (state) => ({
  postList: state.postList,
  activePage: state.activePage,
});

const mapDispatchToProps = (dispatch) => ({
  getPostsAtPage() {
    dispatch(ActionCreator.getPostsAtPage());
  },
});

Pagination.propTypes = {
  postList: PropTypes.array.isRequired,
  activePage: PropTypes.number.isRequired,
  getPostsAtPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
