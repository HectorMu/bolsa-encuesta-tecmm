import React from "react";
import { NavLink } from "react-router-dom";
import useSession from "../../hooks/useSession";
import Section from "../../components/Navigation/Sidebar/Section";
import SidebarDropdown from "../../components/Navigation/Sidebar/SidebarDropdown";

const CustomSidebar = ({
  sidebarControl: { sidebarToggled, handleSidebarToggle },
}) => {
  const { user } = useSession();

  if (user === null) {
    return <></>;
  }
  return (
    <aside className={`c-sidebar  ${sidebarToggled ? `active ` : ``} `}>
      <div className="d-flex justify-content-end">
        <button
          onClick={() => handleSidebarToggle(!sidebarToggled)}
          className="btn btn-sm btn-purple d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <h3>Admin</h3>
      <nav className="menu">
        <NavLink to="/users" className="menu-item">
          Cuentas
        </NavLink>
        <NavLink to="/companies" className="menu-item ">
          Empresas
        </NavLink>
        <NavLink to="/graduated" className="menu-item">
          Egresados
        </NavLink>
      </nav>
    </aside>
  );
};

export default CustomSidebar;
