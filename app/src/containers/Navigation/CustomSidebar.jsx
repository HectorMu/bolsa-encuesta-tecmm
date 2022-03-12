import React from "react";
import { NavLink } from "react-router-dom";
import useSession from "../../hooks/useSession";

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
      {/* Opciones para administrador */}
      {user.fk_rol === 1 ? (
        <>
          <div className="heading ">
            <i className="fas fa-users"></i> <p>Usuarios</p>
          </div>
          <nav className="menu">
            <NavLink
              to="/accounts"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              Cuentas
            </NavLink>
            <NavLink
              to="/companies"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              Empresas
            </NavLink>
            <NavLink
              to="/graduated"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              Egresados
            </NavLink>
          </nav>
        </>
      ) : null}
      {/* /Opciones para administrador */}
      {/* Opciones para egresado */}
      {user.fk_rol === 2 ? (
        <>
          <div className="heading">
            <p>Menu</p>
          </div>
          <nav className="menu">
            <NavLink
              to="/graduated/survey"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-poll-h"></i> Encuesta
            </NavLink>
            <NavLink
              to="/graduated/jobbank"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-briefcase"></i> Trabajos
            </NavLink>
          </nav>
        </>
      ) : null}
      {/* /Opciones para egresado */}
      {/* Opciones para empresa */}
      {user.fk_rol === 3 ? (
        <>
          <div className="heading">
            <p>Menu</p>
          </div>
          <nav className="menu">
            <NavLink
              to="/company/survey"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-poll-h"></i> Encuesta
            </NavLink>
            <NavLink
              to="/company/jobbank"
              className="menu-item"
              onClick={() => handleSidebarToggle(!sidebarToggled)}
            >
              <i className="fas fa-briefcase"></i> Trabajos
            </NavLink>
          </nav>
        </>
      ) : null}
      {/* /Opciones para empresa */}
    </aside>
  );
};

export default CustomSidebar;
