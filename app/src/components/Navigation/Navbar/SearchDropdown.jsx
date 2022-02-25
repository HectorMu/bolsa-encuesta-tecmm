import React from "react";
const SearchDropdown = () => {
  return (
    <li className="nav-item dropdown no-arrow d-sm-none">
      <a
        className="nav-link dropdown-toggle"
        href="#xd"
        id="searchDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-search fa-fw"></i>
      </a>
      <div
        className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
        aria-labelledby="searchDropdown"
      >
        <form className="form-inline mr-auto w-100 navbar-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </li>
  );
};

export default SearchDropdown;
