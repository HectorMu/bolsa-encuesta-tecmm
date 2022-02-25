import React from "react";
import MessagesBadge from "../../components/Navigation/Navbar/MessagesBadge";
import NavbarSearchInput from "../../components/Navigation/Navbar/NavbarSearchInput";
import NotificationsBadge from "../../components/Navigation/Navbar/NotificationsBadge";
import SearchDropdown from "../../components/Navigation/Navbar/SearchDropdown";
import SessionDropdown from "../../components/Navigation/Navbar/SessionDropdown";

const Navbar = ({ sidebarControl: { handleSidebarToggle } }) => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
        onClick={handleSidebarToggle}
      >
        <i className="fa fa-bars"></i>
      </button>
      <NavbarSearchInput />

      <ul className="navbar-nav ml-auto">
        <SearchDropdown />
        <MessagesBadge />
        <NotificationsBadge />
        <SessionDropdown />
      </ul>
    </nav>
  );
};

export default Navbar;
