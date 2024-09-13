import React, { useState } from "react";
import { useSelector } from "react-redux";


function InfoPageHeading({ setFilterQuery,pageType }) {
  return (
    <div className="table-header">
      <div className="table-heading">
        <h1>Manage {pageType}s</h1>
        <input
          type="text"
          id="searchKeyword"
          className="fadeIn first"
          placeholder="Keyword"
          onChange={(e) => setFilterQuery(e.target.value)}
        />
      </div>
      <hr />
    </div>
  );
}

export default InfoPageHeading;
