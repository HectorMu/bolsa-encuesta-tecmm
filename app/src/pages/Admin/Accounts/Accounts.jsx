import React from "react";
import { Link } from "react-router-dom";
import List from "../../../containers/Admin/Accounts/List";

const Users = () => {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Cuentas</h1>
        <Link
          to={"/accounts/add"}
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-plus fa-sm text-white"></i> Nueva cuenta
        </Link>
      </div>
      <List />
    </div>
  );
};

export default Users;
