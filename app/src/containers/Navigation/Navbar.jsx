import React from "react";
//Importando componentes de navegacion
import NotificationsBadge from "../../components/Navigation/Navbar/NotificationsBadge";
import SessionDropdown from "../../components/Navigation/Navbar/SessionDropdown";
import useSession from "../../hooks/useSession";

const Navbar = ({ sidebarControl: { handleSidebarToggle } }) => {
  const { user, setUser } = useSession();
  return (
    <nav className="navbar navbar-expand navbar-light bg-green topbar mb-4 static-top shadow">
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
