import React from "react";
const SessionDropdown = () => {
  return (
    <>
      <div className="topbar-divider d-none d-sm-block"></div>
      <li className="nav-item dropdown no-arrow">
        <a
          className="nav-link dropdown-toggle"
          href="#xd"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="mr-2 d-none d-lg-inline text-gray-600 small">
            Douglas McGee
          </span>
          <img
            className="img-profile rounded-circle"
            src="img/undraw_profile.svg"
          />
        </a>
        <div
          className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <a className="dropdown-item" href="#xd">
            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            Profile
          </a>
          <a className="dropdown-item" href="#xd">
            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
            Settings
          </a>
          <a className="dropdown-item" href="#xd">
            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
            Activity Log
          </a>
          <div className="dropdown-divider"></div>
          <a
            className="dropdown-item"
            href="#xd"
            data-toggle="modal"
            data-target="#logoutModal"
          >
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </li>
    </>
  );
};

export default SessionDropdown;
