import React from "react";
import { Link } from "react-router-dom";

const ShowcaseHeader = ({ title, children }) => (
  <div className="card py-3 px-2 shadow-lg rounded-0 animated--grow-in">
    <div className="d-flex justify-content-between">
      <Link to={-1} className="btn " style={{ zIndex: "20" }}>
        <i className="fas fa-arrow-left text-primary fa-2x"></i>
      </Link>
      <h3 className="position-absolute w-100 text-center text-purple font-weight-bolder responsive-text-header ">
        {title}
      </h3>

      {children}
    </div>
  </div>
);

export default ShowcaseHeader;
