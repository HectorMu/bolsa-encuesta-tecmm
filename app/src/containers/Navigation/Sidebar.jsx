//Importing react router link
import React from "react";
import { NavLink } from "react-router-dom";
//importing local sidebar components
import SidebarDropdown from "../../components/Navigation/Sidebar/SidebarDropdown";
import Section from "../../components/Navigation/Sidebar/Section";
import SidebarLink from "../../components/Navigation/Sidebar/SidebarLink";
//Importing hooks
import useSession from "../../hooks/useSession";

const Sidebar = ({
  sidebarControl: { sidebarToggled, handleSidebarToggle },
}) => {
  const { user } = useSession();

  //si no hay un usuario autenticado no dibujamos la sidebar
  if (user === null) {
    return <></>;
  }
  return (
    <ul
      className={`navbar-nav bg-sidebar sidebar sidebar-light accordion ${
        sidebarToggled ? `toggled` : ``
      }`}
      id="accordionSidebar"
    >
      <NavLink
        className="sidebar-brand d-flex bg-green align-items-center justify-content-center text-white"
        to="/"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Brand</div>
      </NavLink>

      <hr className="sidebar-divider my-0"></hr>
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </NavLink>
      </li>
      <hr className="sidebar-divider" />

      <Section SectionName="Egresados">
        <SidebarLink
          icon="fas fa-poll-h"
          title="Encuesta"
          to="/graduated/survey"
        />
        <SidebarLink
          icon="fas fa-briefcase"
          title="Bolsa de trabajo"
          to="/graduated/jobbank"
        />
      </Section>
      <Section SectionName="Empresa">
        <SidebarLink
          icon="fas fa-poll-h"
          title="Encuesta"
          to="/company/survey"
        />
        <SidebarLink
          icon="fas fa-briefcase"
          title="Bolsa de trabajo"
          to="/company/jobbank"
        />
      </Section>

      <Section SectionName="Administrador">
        <SidebarDropdown title="Usuarios" icon="fas fa-users">
          <NavLink className="collapse-item" to="/users/graduated">
            Egresados
          </NavLink>
          <NavLink className="collapse-item" to="/users/companies">
            Empresas
          </NavLink>
        </SidebarDropdown>
      </Section>

      <div
        style={{ color: "black", fontSize: "16px" }}
        className="text-center d-none d-md-inline"
      >
        <button
          onClick={handleSidebarToggle}
          className="rounded-circle border-0"
          id="sidebarToggle"
        ></button>
      </div>
    </ul>
  );
};

export default Sidebar;
