import React from "react";
import { NavLink } from "react-router-dom";
import useSession from "@/hooks/useSession";

const CustomSidebar = ({
  sidebarControl: { sidebarToggled, handleSidebarToggle },
}) => {
  const { user } = useSession();

  if (user === null) {
    return <></>;
  }
  return (
    <aside className={`c-sidebar  ${sidebarToggled ? `active ` : ``} `}>
      <div className="d-flex justify-content-end"></div>
      {/* Opciones para administrador */}
      {user.fk_rol === 1 ? (
        <>
          <nav className="menu">
            <NavLink
              to="/"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-fw fa-tachometer-alt"></i> Dashboard
            </NavLink>
            <hr className="c-sidebar-divider" />
            <div className="heading">
              <p>Usuarios</p>
            </div>
            <NavLink
              to="/accounts"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-users"></i> Cuentas
            </NavLink>
            <NavLink
              to="/companies"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-building"></i> Empresas
            </NavLink>
            <NavLink
              to="/graduates"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-user-graduate"></i> Egresados
            </NavLink>
            <hr className="c-sidebar-divider" />
            <div className="heading">
              <p>Bolsa de trabajo</p>
            </div>
            <NavLink
              to="/jobbank"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-envelope"></i> Postulaciones
            </NavLink>{" "}
            <hr className="c-sidebar-divider" />
            <div className="heading">
              <p>Encuestas</p>
            </div>
            <NavLink
              to="/surveys/reports/"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-print"></i> Reportes
            </NavLink>
            <hr className="c-sidebar-divider" />
          </nav>
        </>
      ) : null}
      {/* /Opciones para administrador */}
      {/* Opciones para egresado */}
      {user.fk_rol === 2 ? (
        <>
          <nav className="menu">
            <NavLink
              to="/graduated/survey"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-poll-h"></i> Encuesta
            </NavLink>
            <hr className="c-sidebar-divider" />
            <div className="heading">
              <p>Bolsa de trabajo</p>
            </div>
            <NavLink
              to="/graduated/jobbank/jobs"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-briefcase"></i> Trabajos
            </NavLink>
            <NavLink
              to="/graduated/jobbank/postulations"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-envelope"></i> Mis postulaciones
            </NavLink>
            <hr className="c-sidebar-divider" />
          </nav>
        </>
      ) : null}
      {/* /Opciones para egresado */}
      {/* Opciones para empresa */}
      {user.fk_rol === 3 ? (
        <>
          <nav className="menu">
            <NavLink
              to="/"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-fw fa-tachometer-alt"></i> Dashboard
            </NavLink>
            <hr className="c-sidebar-divider" />
            <NavLink
              to="/company/survey"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-poll-h"></i> Encuesta
            </NavLink>

            <hr className="c-sidebar-divider" />

            <div className="heading">
              <p>Bolsa de trabajo</p>
            </div>
            <NavLink
              to="/company/jobbank"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-briefcase"></i> Mis vacantes
            </NavLink>
            <hr className="c-sidebar-divider" />
          </nav>
        </>
      ) : null}
      {/* /Opciones para empresa */}
    </aside>
  );
};

export default CustomSidebar;
