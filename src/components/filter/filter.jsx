import React, { useEffect } from "react";
import "./filter.css";

import { connect } from "react-redux";
import { ActionCreator } from "../../store/action";
import PropTypes from "prop-types";

const Filter = ({ id, filterId, filterPost, getPostsAtPage }) => {
  const filtration = (evt) => {
    filterId(parseInt(evt.target.value, 10));
  };

  useEffect(() => {
    if (!id || id === "") {
      getPostsAtPage();
    } else {
      filterPost();
    }
  }, [id, filterPost, getPostsAtPage]);

  return (
    <form action="" className="filter-form">
      <input type="text" placeholder="Введите user id" onChange={filtration} />
    </form>
  );
};

const mapStateToProps = (state) => ({
  id: state.filterId,
});

const mapDispatchToProps = (dispatch) => ({
  filterId(payload) {
    dispatch(ActionCreator.filterId(payload));
  },
  filterPost(posts) {
    dispatch(ActionCreator.filterPost(posts));
  },
  getPostsAtPage() {
    dispatch(ActionCreator.getPostsAtPage());
  },
});

Filter.propTypes = {
  id: PropTypes.number.isRequired,
  filterId: PropTypes.func.isRequired,
  filterPost: PropTypes.func.isRequired,
  getPostsAtPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
