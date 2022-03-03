import Companies from "../pages/Admin/Companies/Companies";
import Add from "../pages/Admin/Companies/Add";
import IsLoggedIn from "../components/Authentication/IsLoggedIn";
const Routes = [
  {
    path: "/companies",
    element: <IsLoggedIn view={Companies} />,
  },
  {
    path: "/companies/add",
    element: <IsLoggedIn view={Add} />,
  },
];

export default Routes;
