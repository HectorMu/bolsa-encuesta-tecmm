import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import Sidebar from "../Navigation/Sidebar";
import CustomSidebar from "../Navigation/CustomSidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [sidebarToggled, setSidebarToggled] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarToggled(!sidebarToggled);
    // if (sidebarToggled) {
    //   document.body.classList.toggle("sidebar-toggled");
    // }
  };

  return (
    <>
      <Navbar sidebarControl={{ sidebarToggled, handleSidebarToggle }} />
      <div className="wrapper">
        <CustomSidebar
          sidebarControl={{ sidebarToggled, handleSidebarToggle }}
        />

        <div className="content">
          {children} <Footer webSite="TecMM" />
        </div>
      </div>
    </>
  );
};
export default Layout;
