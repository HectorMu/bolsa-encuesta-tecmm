import React from "react";
import useRouterHooks from "@/hooks/useRouterHooks";
import Loading from "./Loading";

const DashboardCard = ({
  metric = "10",
  title = "Title",
  icon = "fas fa-question",
  to = "/",
  isLoading,
}) => {
  const { navigate } = useRouterHooks();

  const redirect = () => navigate(to);
  return (
    <div
      onClick={redirect}
      style={{ cursor: "pointer" }}
      className="card shadow border-0 border-left-primary rounded-sm py-0"
    >
      <div className="card-body py-1">
        <div
          style={{ gap: "30px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <i className={`${icon} text-primary fa-3x`}></i>
          {isLoading ? (
            <Loading />
          ) : (
            <span className="text-center display-4 p-0 text-primary font-weight-bold">
              {metric}
            </span>
          )}
        </div>
      </div>
      <div className="card-footer py-1">
        <h5 className="text-center p-0 font-weight-bold">{title}</h5>
      </div>
    </div>
  );
};

export default DashboardCard;
