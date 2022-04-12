import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [previousPage, setPreviousPage] = useState("");

  //To save the previous state of the prePage to return the user o the page that was actually watching
  useEffect(() => {
    if (location.state?.prevPage === null) return;

    setPreviousPage(location.state?.prevPage);
  }, [location.state]);

  return (
    <div className="container-fluid mb-3">
      <div className="d-flex justify-content-center mb-2">
        <div className="btn-group" role="group" aria-label="Basic example">
          <NavLink
            to={
              previousPage?.length > 0
                ? previousPage
                : "/graduated/jobbank/jobs"
            }
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
            state={{ prevPage: location.pathname }}
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
