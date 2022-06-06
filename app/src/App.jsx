// Importing suspense and hooks
import { useEffect, Suspense } from "react";
import Fallback from "./components/Global/Fallback";
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

//Importing all routes
import AppRoutes from "./routes";

//importing session context
import SessionProvider from "./context/SessionProvider";
import CurriculumProvider from "./context/CurriculumProvider";

function App() {
  //Initializing AOS for animations
  useEffect(() => {
    Aos.init();
  }, []);

  useDocTitleRename();

  return (
    <SessionProvider>
      <CurriculumProvider>
        <Layout>
          <Suspense fallback={<Fallback />}>
            <Routes>
              {AppRoutes?.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Suspense>
        </Layout>
      </CurriculumProvider>
      <Toaster />
      <ReloadPrompt />
    </SessionProvider>
  );
}

export default App;
