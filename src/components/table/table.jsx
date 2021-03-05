import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import "./table.css";

import PropTypes from "prop-types";

const Table = ({ postsAtPage }) => {
  const [sortedField, setSortedField] = useState({
    fields: [],
    direction: "down",
  });

  useEffect(() => {
    setSortedField((state) => ({
      ...state,
      fields: postsAtPage,
    }));
  }, [postsAtPage]);

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
  );
};

Table.propTypes = {
  postsAtPage: PropTypes.array.isRequired,
};

export default Table;
