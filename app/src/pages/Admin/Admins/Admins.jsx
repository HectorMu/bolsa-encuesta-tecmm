import React from "react";
import { Link } from "react-router-dom";
import List from "../../../containers/Admin/Admins/List";

const Users = () => {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Administradores</h1>
        <Link
          to={"/admins/add"}
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-plus fa-sm text-white"></i> Nuevo administrador
        </Link>
      </div>
      <List />
    </div>
  );
};

export default Users;
