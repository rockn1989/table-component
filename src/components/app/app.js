import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ActionCreator } from "../../store/action";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Preloader from "../preloader/preloader";
import PageNotFound from "../pagenotfound/pagenotfound";
import Api from "../../api/api";
import "./app.css";

import MainPage from "../main-page/main-page";

import PropTypes from "prop-types";

const api = new Api();

const App = ({ getAllPosts }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    api.getPost().then((result) => {
      getAllPosts(result);
      setIsLoaded(true);
    });
  }, [getAllPosts]);

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
              return <MainPage currentPage={1} />;
            }}
          ></Route>

          <Route
            path="/page/:num"
            exact
            render={({ match }) => {
              const num = parseInt(match.params.num, 10);
              return <MainPage currentPage={num} />;
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
});

App.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
