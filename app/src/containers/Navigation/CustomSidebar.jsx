import React from "react";
import { NavLink } from "react-router-dom";
import useSession from "@/hooks/useSession";
import useWindowSize from "@/hooks/useWindowResize";

const CustomSidebar = ({
  sidebarControl: { sidebarToggled, handleSidebarToggle },
}) => {
  const { user } = useSession();
  const size = useWindowSize();

  const handleSidebarToggleOnLink = () =>
    size.width < 900 && handleSidebarToggle(!sidebarToggled);

  if (user === null) {
    return <></>;
  }
  return (
    <aside className={`c-sidebar  ${sidebarToggled ? `active ` : ``} `}>
      <button
        onClick={() => handleSidebarToggle(!sidebarToggled)}
        className="btn btn-primary rounded-right floating-btn btn-sm p-0 py-4"
      >
        {size.width < 600 ? (
          <>
            {" "}
            {sidebarToggled ? (
              <i className="fas fa-chevron-left"></i>
            ) : (
              <i className="fas fa-chevron-right"></i>
            )}
          </>
        ) : (
          <>
            {sidebarToggled ? (
              <i className="fas fa-chevron-right"></i>
            ) : (
              <i className="fas fa-chevron-left"></i>
            )}
          </>
        )}
      </button>
      <div className="d-flex justify-content-end"></div>
      {/* Opciones para administrador */}
      {user.fk_rol === 1 ? (
        <>
          <nav className="menu">
            <NavLink
              to="/"
              className="menu-item"
              onClick={handleSidebarToggleOnLink}
            >
              <i className="fas fa-fw fa-tachometer-alt"></i>{" "}
              <span>Dashboard</span>
            </NavLink>
            <hr className="c-sidebar-divider" />
            <div className="heading">
              <p>Usuarios</p>
            </div>
            <NavLink
              to="/accounts"
              className="menu-item"
              onClick={handleSidebarToggleOnLink}
            >
              <i className="fas fa-users"></i> <span>Cuentas</span>
            </NavLink>
            <NavLink
              to="/companies"
              className="menu-item"
              onClick={handleSidebarToggleOnLink}
            >
              <i className="fas fa-building"></i> <span>Empresas</span>
            </NavLink>
            <NavLink
              to="/graduates"
              className="menu-item"
              onClick={handleSidebarToggleOnLink}
            >
              <i className="fas fa-user-graduate"></i> <span>Egresados</span>
            </NavLink>
            <hr className="c-sidebar-divider" />
            <div className="heading">
              <p>Bolsa de trabajo</p>
            </div>
            <NavLink
              to="/jobbank"
              className="menu-item"
              onClick={handleSidebarToggleOnLink}
            >
              <i className="fas fa-envelope"></i> <span>Postulaciones</span>
            </NavLink>{" "}
            <hr className="c-sidebar-divider" />
            <div className="heading">
              <p>Encuestas</p>
            </div>
            <NavLink
              to="/surveys/reports/"
              className="menu-item"
              onClick={handleSidebarToggleOnLink}
            >
              <i className="fas fa-print"></i> <span>Reportes</span>
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
              onClick={handleSidebarToggleOnLink}
            >
              <i className="fas fa-poll-h"></i> <span>Encuesta</span>
            </NavLink>
            <hr className="c-sidebar-divider" />
            <div className="heading">
              <p>Bolsa de trabajo</p>
            </div>
            <NavLink
              to="/graduated/jobbank/jobs"
              className="menu-item"
              onClick={handleSidebarToggleOnLink}
            >
              <i className="fas fa-briefcase"></i> <span>Trabajos</span>
            </NavLink>
            <NavLink
              to="/graduated/jobbank/postulations"
              className="menu-item"
              onClick={handleSidebarToggleOnLink}
            >
              <i className="fas fa-envelope"></i> <span>Mis postulaciones</span>
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
              onClick={handleSidebarToggleOnLink}
            >
              <i className="fas fa-fw fa-tachometer-alt"></i>{" "}
              <span>Dashboard</span>
            </NavLink>
            <hr className="c-sidebar-divider" />
            <NavLink
              to="/company/survey"
              className="menu-item"
              onClick={handleSidebarToggleOnLink}
            >
              <i className="fas fa-poll-h"></i> <span>Encuesta</span>
            </NavLink>

            <hr className="c-sidebar-divider" />

            <div className="heading">
              <p>Bolsa de trabajo</p>
            </div>
            <NavLink
              to="/company/jobbank"
              className="menu-item"
              onClick={handleSidebarToggleOnLink}
            >
              <i className="fas fa-briefcase"></i> <span>Mis vacantes</span>
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
