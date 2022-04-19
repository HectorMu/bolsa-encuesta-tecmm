import { Suspense, lazy } from "react";
import Loading from "./components/Global/Loading";

// Importing app styles
import "./css/sb-admin-2.css";
import "./css/main.css";
//Sweet alert 2 alerts styles
import "../../node_modules/sweetalert2/dist/sweetalert2.css";

// Importing react and hooks
import React, { useEffect } from "react";

//Importing aos for animations
import Aos from "aos";
import "../../node_modules/aos/dist/aos.css";

//Importing toaster for toasts
import { Toaster } from "react-hot-toast";

//Importing react router elements
import { Routes, Route } from "react-router-dom";

//Importing main container layout
import Layout from "./containers/Layout/Layout";

//Importing all routes
import AppRoutes from "./routes";

//importing session context
import SessionProvider from "./context/SessionProvider";

//importing graduated nested pages
const JobBank = lazy(() => import("./pages/Graduated/JobBank/JobBank"));
const Postulations = lazy(() =>
  import("./pages/Graduated/JobBank/Postulations")
);
const Dashboard = lazy(() => import("./pages/Graduated/JobBank/Dashboard"));

function App() {
  //Initializing AOS for animations
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <SessionProvider>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            {AppRoutes?.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="/graduated/jobbank/" element={<Dashboard />}>
              <Route path="job/:id" element={<JobBank />} />
              <Route path="jobs" element={<JobBank />} />
              <Route path="postulations" element={<Postulations />} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
      <Toaster />
    </SessionProvider>
  );
}

export default App;
