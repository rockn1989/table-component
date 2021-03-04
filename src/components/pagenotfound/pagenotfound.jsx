import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <>
      <h1>Данная страница не найдена</h1>
      <p>
        Пожалуйста, вернитесь на <Link to="/">главную страницу</Link>
      </p>
    </>
  );
};

export default PageNotFound;
