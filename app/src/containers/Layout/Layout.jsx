import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import CustomSidebar from "../Navigation/CustomSidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [sidebarToggled, setSidebarToggled] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarToggled(!sidebarToggled);
  };

  return (
    <div id="wrapper" className="wrapper">
      <CustomSidebar sidebarControl={{ sidebarToggled, handleSidebarToggle }} />
      <div id="content-wrapper" className="content d-flex flex-column">
        <Navbar sidebarControl={{ sidebarToggled, handleSidebarToggle }} />
        <div className="content" style={{ paddingTop: "100px" }}>
          {children}
        </div>
        <Footer webSite="TecMM" />
      </div>
    </div>
  );
};
export default Layout;
