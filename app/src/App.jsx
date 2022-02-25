// Importing app styles
import "./css/sb-admin-2.css";
import "./css/main.css";
import "../../node_modules/aos/dist/aos";

// Importing react and hooks
import React, { useEffect } from "react";

//Importing aos for animations
import Aos from "aos";

//Importing toaster for toasts
import { Toaster } from "react-hot-toast";

//Importing react router elements
import { Routes, Route } from "react-router-dom";

//Importing main container layout
import Layout from "./containers/Layout/Layout";

//Importing all routes
import AppRoutes from "./routes";

function App() {
  //Initializing AOS for animations
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <Layout>
      <Routes>
        {/* Protected Routes to use after */}
        {/* <Route path="/" element={<IsAlreadyLogged view={Index} />} /> */}
        {/* <Route path="/home" element={<IsLoggedIn view={Home} />} /> */}

        {/* All app routes */}
        {AppRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {/* /All app routes */}
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
