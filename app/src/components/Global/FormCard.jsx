import React from "react";
import { Link } from "react-router-dom";

const FormCard = ({ title, children }) => {
  return (
    <div className="card shadow mb-4 animated--grow-in form-card">
      <div className="card-header py-3 d-flex">
        <Link to={-1} className="btn btn-primary btn-sm">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h5 className="m-0 font-weight-bold text-primary text-center mx-auto">
          {title}
        </h5>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default FormCard;
