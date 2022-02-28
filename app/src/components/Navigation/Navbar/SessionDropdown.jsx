import React from "react";
import { Link, useNavigate } from "react-router-dom";
//Importando servicios
import Auth from "../../../services/Auth";

const SessionDropdown = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    Auth.Logout();
    navigate("/login");
  };
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
          <span className="mr-2 d-none d-lg-inline text-white small">
            {user.correo}
          </span>
          <i className="fas fa-user text-white"></i>
        </a>
        <div
          className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <Link className="dropdown-item" to="/profile">
            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            Perfil
          </Link>
          <div className="dropdown-divider"></div>
          <button onClick={handleLogout} className="dropdown-item">
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Cerrar sesión
          </button>
        </div>
      </li>
    </>
  );
};

export default SessionDropdown;
