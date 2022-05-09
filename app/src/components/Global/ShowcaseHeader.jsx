import React from "react";
import { Link } from "react-router-dom";

const ShowcaseHeader = ({ title, children }) => (
  <>
    <Link
      to={-1}
      className="btn btn-outline-primary font-weight-bold btn-sm mb-1"
    >
      <i className="fas fa-arrow-left text-left "></i> <span>Volver</span>
    </Link>
    <div className="card py-3 shadow-lg rounded-0 ">
      <h5 className="text-primary  font-weight-bolder responsive-text-header">
        <div className="row">
          <div className="col-12"></div>
          <div className="col-12 text-center">
            <span className="mx-auto">{title}</span>
          </div>
        </div>
      </h5>

      {children}
    </div>
  </>
);

export default ShowcaseHeader;
