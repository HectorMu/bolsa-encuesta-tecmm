import Index from "../pages/Index";
import NotFound from "../pages/status/NotFound";
import AuthRoutes from "./auth.routes";

const Routes = [
  //Index route
  {
    path: "/",
    element: <Index />,
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
