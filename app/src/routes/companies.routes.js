import Companies from "../pages/Admin/Companies/Companies";
import Add from "../pages/Admin/Companies/Add";
import Edit from "../pages/Admin/Companies/Edit";
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
  {
    path: "/companies/edit/:id",
    element: <IsLoggedIn view={Edit} />,
  },
];

export default Routes;
