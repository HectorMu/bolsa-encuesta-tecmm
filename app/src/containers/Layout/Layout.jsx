import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import Sidebar from "../Navigation/Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [sidebarToggled, setSidebarToggled] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarToggled(!sidebarToggled);
    if (sidebarToggled) {
      document.body.classList.toggle("sidebar-toggled");
    }
  };

  return (
    <div id="wrapper" className="">
      <Sidebar sidebarControl={{ sidebarToggled, handleSidebarToggle }} />
      <div id="content-wrapper" className="d-flex flex-column">
        <Navbar sidebarControl={{ sidebarToggled, handleSidebarToggle }} />
        <div id="content" className="bg-dark">
          {children}
        </div>
        <Footer webSite="TecMM" />
      </div>
    </div>
  );
};
export default Layout;
