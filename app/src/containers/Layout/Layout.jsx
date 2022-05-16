import { useState } from "react";
import Navbar from "../Navigation/Navbar";
import CustomSidebar from "../Navigation/CustomSidebar";
import useWindowSize from "@/hooks/useWindowResize";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const size = useWindowSize();

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
      <div id="content-wrapper" className="content d-flex flex-column">
        <Navbar sidebarControl={{ sidebarToggled, handleSidebarToggle }} />
        <div className="content" style={{ paddingTop: "90px" }}>
          {children}
        </div>
        <Footer webSite="TecMM" />
      </div>
    </div>
  );
};
export default Layout;
