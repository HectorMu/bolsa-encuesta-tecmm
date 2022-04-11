import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  console.log(location.pathname.includes("jobbank"));
  return (
    <div className="container-fluid mb-3">
      <div className="d-flex justify-content-center mb-2">
        <div className="btn-group" role="group" aria-label="Basic example">
          <NavLink
            to={"/graduated/jobbank/jobs"}
            className={`btn btn-outline-primary ${
              location.pathname.includes("jobbank") &&
              !location.pathname.includes("postulations")
                ? "active"
                : ""
            }`}
          >
            Buscar trabajos
          </NavLink>
          <NavLink
            to={"/graduated/jobbank/postulations"}
            className={`btn btn-primary btn-outline-primary `}
          >
            Mis postulaciones
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Dashboard;
