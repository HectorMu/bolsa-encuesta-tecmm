import Index from "../pages/Index";
import NotFound from "../pages/status/NotFound";
import AuthRoutes from "./auth.routes";
import AdminRoutes from "./admin.routes";

import IsLoggedIn from "../components/Authentication/IsLoggedIn";

const Routes = [
  //Index route
  {
    path: "/",
    element: <IsLoggedIn view={Index} />,
  },
  //Aqui van todas las rutas
  ...AuthRoutes,
  ...AdminRoutes,
  //Si no se encuentra la ruta, el 404 va al final de todas las rutas
  {
    path: "*",
    element: <NotFound />,
  },
];

export default Routes;
