import React from "react";
//Importando componentes de navegacion
import NotificationsBadge from "../../components/Navigation/Navbar/NotificationsBadge";
import SessionDropdown from "../../components/Navigation/Navbar/SessionDropdown";
import useSession from "../../hooks/useSession";
import navLogo from "@/assets/LogoTec.svg";
import { Link } from "react-router-dom";

const Navbar = ({ sidebarControl: { handleSidebarToggle } }) => {
  const { user, setUser } = useSession();
  return (
    <nav className="navbar navbar-expand navbar-light bg-green topbar static-top shadow fixed-top">
      <Link className="navbar-brand text-white font-weight-bolder" to="/">
        <img src={navLogo} className="ml-2 navbar-responsive-size" alt="" />
      </Link>

      <ul className="navbar-nav ml-auto">
        {user !== null ? (
          <>
            <NotificationsBadge />
            <SessionDropdown user={user} setUser={setUser} />
          </>
        ) : null}
      </ul>
      <button
        className="btn btn-primary d-md-block d-lg-none d-xl-none btn-sm "
        onClick={handleSidebarToggle}
      >
        <i className="fa fa-bars"></i>
      </button>
    </nav>
  );
};

export default Navbar;
