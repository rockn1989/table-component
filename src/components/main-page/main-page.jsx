import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Filter from "../filter/filter";
import Pagination from "../pagination/pagination";
import Table from "../table/table";
import { connect } from "react-redux";
import { ActionCreator } from "../../store/action";

const MainPage = ({
  postList,
  postsAtPage,
  activePage,
  currentPage,
  getPostsAtPage,
  setCurrentPage,
  setFilterId,
}) => {
  const intActivePage = parseInt(activePage, 10);
  //console.log(intActivePage);
  useEffect(() => {
    getPostsAtPage();
    setCurrentPage(currentPage || activePage);
  }, [getPostsAtPage, activePage, currentPage]);

  return (
    <main className="main-page">
      <Filter postsAtPage={postsAtPage} setFilterId={setFilterId} />
      <Table postsAtPage={postsAtPage} />
      <Pagination postListLength={postList.length} activePage={intActivePage} />
    </main>
  );
};

MainPage.propTypes = {
  postList: PropTypes.array.isRequired,
  postsAtPage: PropTypes.array.isRequired,
  activePage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  getPostsAtPage: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setFilterId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  postList: state.postList,
  postsAtPage: state.postsAtPage,
  activePage: state.activePage,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentPage(page) {
    dispatch(ActionCreator.setCurrentPage(page));
  },
  getPostsAtPage() {
    dispatch(ActionCreator.getPostsAtPage());
  },
  setFilterId(payload) {
    dispatch(ActionCreator.setFilterId(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
