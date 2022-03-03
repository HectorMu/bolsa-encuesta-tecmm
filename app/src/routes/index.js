import Index from "../pages/Index";
import NotFound from "../pages/status/NotFound";
import AuthRoutes from "./auth.routes";
import AdminsRoutes from "./admins.routes";
import CompaniesRoutes from "./companies.routes";
import GraduatedRoutes from "./graduated.routes";
import IsLoggedIn from "../components/Authentication/IsLoggedIn";

const Routes = [
  //Index route
  {
    path: "/",
    element: <IsLoggedIn view={Index} />,
  },
  //Here goes all the routes
  ...AuthRoutes,
  ...AdminsRoutes,
  ...CompaniesRoutes,
  ...GraduatedRoutes,

  //Not found route, must be at the last of the routes of the app
  {
    path: "*",
    element: <NotFound />,
  },
];

export default Routes;
