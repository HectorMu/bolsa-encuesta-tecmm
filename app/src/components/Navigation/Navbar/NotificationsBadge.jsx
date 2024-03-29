import React from "react";
const NotificationsBadge = () => {
  return (
    <li className="nav-item dropdown no-arrow mx-1 ">
      <a
        className="nav-link dropdown-toggle"
        href="#xd"
        id="alertsDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-bell fa-fw text-white"></i>

        <span className="badge badge-danger badge-counter">3+</span>
      </a>

      <div
        className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="alertsDropdown"
      >
        <h6 className="bg-green text-white w-100 py-2 text-center font-weight-bold">
          Alerts Center
        </h6>
        <a className="dropdown-item d-flex align-items-center" href="#xd">
          <div className="mr-3">
            <div className="icon-circle bg-primary">
              <i className="fas fa-file-alt text-white"></i>
            </div>
          </div>
          <div>
            <div className="small text-gray-500">December 12, 2019</div>
            <span className="font-weight-bold">
              A new monthly report is ready to download!
            </span>
          </div>
        </a>
        <a className="dropdown-item d-flex align-items-center" href="#xd">
          <div className="mr-3">
            <div className="icon-circle bg-success">
              <i className="fas fa-donate text-white"></i>
            </div>
          </div>
          <div>
            <div className="small text-gray-500">December 7, 2019</div>
            $290.29 has been deposited into your account!
          </div>
        </a>
        <a className="dropdown-item text-center small text-gray-500" href="#xd">
          Show All Alerts
        </a>
      </div>
    </li>
  );
};

export default NotificationsBadge;
