import { useEffect } from "react";
import useRouterHooks from "./useRouterHooks";

const useDocTitleRename = () => {
  const { location } = useRouterHooks();
  useEffect(() => {
    let titleFormmated = "";
    if (location.pathname === "/") {
      titleFormmated = "Dashboard";
    }
    if (location.pathname === "/profile") {
      titleFormmated = "Perfil";
    }
    if (location.pathname.includes("/login")) {
      titleFormmated = "Login";
    }
    if (location.pathname.includes("/accounts")) {
      titleFormmated = "Cuentas";
    }
    if (location.pathname.includes("/graduates")) {
      titleFormmated = "Egresados";
    }
    if (location.pathname.includes("/companies")) {
      titleFormmated = "Empresas";
    }
    if (location.pathname.includes("/jobbank")) {
      titleFormmated = "Bolsa de trabajo";
    }
    if (location.pathname.includes("/reports")) {
      titleFormmated = "Reportes";
    }

    if (location.pathname.includes("/graduated/survey")) {
      titleFormmated = "Encuesta - Egresado";
    }
    if (location.pathname.includes("/company/survey")) {
      titleFormmated = "Encuesta - Empresa";
    }
    if (location.pathname.includes("/forgot")) {
      titleFormmated = "Recuperacion de cuenta";
    }
    if (location.pathname.includes("/reset")) {
      titleFormmated = "Reestablecer contraseña";
    }

    document.title = `Control de Egresados | ${titleFormmated}`;
  }, [location.pathname]);
};

export default useDocTitleRename;
