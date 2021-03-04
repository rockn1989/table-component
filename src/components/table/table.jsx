import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import "./table.css";
import Filter from "../filter/filter";
import Pagination from "../pagination/pagination";
import { connect } from "react-redux";
import { ActionCreator } from "../../store/action";
import PropTypes from "prop-types";

const Table = ({ currentPage, postsAtPage, setCurrentPage }) => {
  const [sortedField, setSortedField] = useState({
    fields: [],
    direction: "down",
  });

  useEffect(() => {
    setCurrentPage(parseInt(currentPage, 10));
    setSortedField((state) => ({
      ...state,
      fields: postsAtPage,
    }));
  }, [postsAtPage, currentPage, setCurrentPage]);

  const sortTable = (val) => {
    const sortedFields = [...sortedField.fields];

    sortedFields.sort((a, b) => {
      if (a[val] < b[val]) {
        return sortedField.direction === "down" ? 1 : -1;
      }

      if (a[val] > b[val]) {
        return sortedField.direction === "down" ? -1 : 1;
      }

      return 0;
    });

    setSortedField((state) => ({
      ...state,
      fields: [...sortedFields],
      direction: state.direction === "down" ? "up" : "down",
    }));
  };

  const body = sortedField.fields.map((post) => {
    return (
      <tr key={v4()}>
        <td>{post.userId}</td>
        <td>{post.id}</td>
        <td className="text-left">{post.title}</td>
        <td className="text-left">{post.body}</td>
      </tr>
    );
  });

  return (
    <>
      <Filter />
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th onClick={() => sortTable("userId")}>User Id</th>
              <th onClick={() => sortTable("id")}>Title id</th>
              <th onClick={() => sortTable("title")}>Title</th>
              <th onClick={() => sortTable("body")}>Message</th>
            </tr>
          </thead>
          <tbody>
            {sortedField.fields.length === 0 && (
              <tr>
                <td colSpan="4">Ничего не найдено</td>
              </tr>
            )}

            {body}
          </tbody>
        </table>
      </div>
      <Pagination />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    postsAtPage: state.postsAtPage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentPage(page) {
    dispatch(ActionCreator.setCurrentPage(page));
  },
  getPostsAtPage() {
    dispatch(ActionCreator.getPostsAtPage());
  },
});

Table.propTypes = {
  postsAtPage: PropTypes.array.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  getPostsAtPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
