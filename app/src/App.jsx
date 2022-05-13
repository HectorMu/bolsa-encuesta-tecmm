// Importing suspense and hooks
import { useEffect } from "react";
import useDocTitleRename from "./hooks/useDocTitleRename";

// Importing app styles
import "./css/sb-admin-2.css";
import "./css/main.css";
//importing aos styles
import "../../node_modules/aos/dist/aos.css";
//Sweet alert 2 alerts styles
import "../../node_modules/sweetalert2/dist/sweetalert2.css";

//Importing aos for animations
import Aos from "aos";

//Importing toaster for toasts
import { Toaster } from "react-hot-toast";

//Importing react router elements
import { Routes, Route } from "react-router-dom";

//Importing main container layout
import Layout from "./containers/Layout/Layout";
import ReloadPrompt from "./components/Global/ReloadPrompt";
import useRouterHooks from "./hooks/useRouterHooks";

//Importing all routes
import AppRoutes from "./routes";

//importing session context
import SessionProvider from "./context/SessionProvider";
import CurriculumProvider from "./context/CurriculumProvider";

function App() {
  const { location } = useRouterHooks();
  //Initializing AOS for animations
  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      window.localStorage.setItem(
        "TECBE_beforeCloseLocation",
        location.pathname
      );
    });
    return () => {
      window.removeEventListener("beforeunload", () => {
        window.localStorage.setItem(
          "TECBE_beforeCloseLocation",
          location.pathname
        );
      });
    };
  }, [location.pathname]);
  useDocTitleRename();
  return (
    <SessionProvider>
      <CurriculumProvider>
        <Layout>
          <Routes>
            {AppRoutes?.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Layout>
      </CurriculumProvider>
      <Toaster />
      <ReloadPrompt />
    </SessionProvider>
  );
}

export default App;
