import React from "react";
//Importando componentes de navegacion
import NotificationsBadge from "../../components/Navigation/Navbar/NotificationsBadge";
import SessionDropdown from "../../components/Navigation/Navbar/SessionDropdown";
import useSession from "../../hooks/useSession";
import { Link } from "react-router-dom";

const Navbar = ({ sidebarControl: { handleSidebarToggle } }) => {
  const { user, setUser } = useSession();
  return (
    <nav className="navbar navbar-expand navbar-light bg-green topbar mb-4 static-top shadow fixed-top">
      <Link class="navbar-brand text-white font-weight-bolder" to="/">
        TECMM
      </Link>
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
        onClick={handleSidebarToggle}
      >
        <i className="fa fa-bars"></i>
      </button>

      <ul className="navbar-nav ml-auto">
        {user !== null ? (
          <>
            <NotificationsBadge />
            <SessionDropdown user={user} setUser={setUser} />
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
