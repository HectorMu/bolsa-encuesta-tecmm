import React from "react";
//Importando componentes de navegacion
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
      {user !== null ? (
        <>
          <ul className="navbar-nav ml-auto">
            <SessionDropdown user={user} setUser={setUser} />
          </ul>
          <button
            className="btn btn-primary  btn-sm "
            onClick={handleSidebarToggle}
          >
            <i className="fa fa-bars"></i>
          </button>
        </>
      ) : null}
    </nav>
  );
};

export default Navbar;
