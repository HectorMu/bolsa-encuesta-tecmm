import React from "react";
import { Link } from "react-router-dom";
import List from "../../../containers/Company/JobBank/List";

const JobBank = () => {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Mis vacantes</h1>
        <Link
          to={"/company/jobbank/add"}
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-plus fa-sm text-white"></i> Nueva vacante
        </Link>
      </div>
      <List />
    </div>
  );
};

export default JobBank;