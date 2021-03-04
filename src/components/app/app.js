import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ActionCreator } from "../../store/action";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Preloader from "../preloader/preloader";
import Table from "../table/table";
import PageNotFound from "../pagenotfound/pagenotfound";
import Api from "../../api/api";
import "./app.css";

import PropTypes from "prop-types";

const api = new Api();

const App = ({ getAllPosts, setCurrentPage, getPostsAtPage }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    api.getPost().then((result) => {
      getAllPosts(result);
      getPostsAtPage();
      setCurrentPage(1);
      setIsLoaded(true);
    });
  }, [getAllPosts, setCurrentPage, getPostsAtPage]);

  if (!isLoaded) {
    return <Preloader />;
  }

  return (
    <div className="App">
      <Router basename="/table-component">
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return <Table currentPage={1} />;
            }}
          ></Route>

          <Route
            path="/page/:num"
            exact
            render={({ match }) => {
              const num = match.params.num;
              return <Table currentPage={num} />;
            }}
          ></Route>
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getAllPosts(posts) {
    dispatch(ActionCreator.getAllPosts(posts));
  },
  setCurrentPage(page) {
    dispatch(ActionCreator.setCurrentPage(page));
  },
  getPostsAtPage() {
    dispatch(ActionCreator.getPostsAtPage());
  },
});

App.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  getPostsAtPage: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
