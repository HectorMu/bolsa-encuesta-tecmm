import { useState, useLayoutEffect, useMemo } from "react";
import Navbar from "../Navigation/Navbar";
import CustomSidebar from "../Navigation/CustomSidebar";
import useWindowSize from "@/hooks/useWindowResize";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(
    window.localStorage.getItem("BETHEME") ?? "light"
  );
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const size = useWindowSize();

  const toggleTheme = () =>
    currentTheme === "light"
      ? setCurrentTheme("dark")
      : setCurrentTheme("light");

  useMemo(() => {
    window.localStorage.setItem("BETHEME", currentTheme);
  }, [currentTheme]);

  const handleSidebarToggle = () => setSidebarToggled(!sidebarToggled);

  const handleToggleOnBody = (e) => {
    switch (e.detail) {
      case 1:
        if (size.width < 600 && sidebarToggled) setSidebarToggled(false);
        break;
    }
  };

  return (
    <div id="wrapper" onClick={handleToggleOnBody} className="wrapper">
      <CustomSidebar sidebarControl={{ sidebarToggled, handleSidebarToggle }} />
      <div id="content-wrapper" className="content d-flex flex-column ">
        <Navbar
          currentTheme={currentTheme}
          toggleTheme={toggleTheme}
          sidebarControl={{ sidebarToggled, handleSidebarToggle }}
        />
        <div
          className={`content theme-${currentTheme}`}
          style={{ paddingTop: "90px" }}
        >
          {children}
        </div>
        <Footer currentTheme={currentTheme} webSite="TecMM" />
      </div>
    </div>
  );
};
export default Layout;
