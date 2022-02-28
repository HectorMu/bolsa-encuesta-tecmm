import Index from "../pages/Index";
import NotFound from "../pages/status/NotFound";
import AuthRoutes from "./auth.routes";
import IsLoggedIn from "../components/Authentication/IsLoggedIn";

const Routes = [
  //Index route
  {
    path: "/",
    element: <IsLoggedIn view={Index} />,
  },
  //Here goes all the routes
  ...AuthRoutes,

  //Not found route, must be at the last of the routes of the app
  {
    path: "*",
    element: <NotFound />,
  },
];

export default Routes;
