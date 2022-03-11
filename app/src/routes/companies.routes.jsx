import Companies from "../pages/Admin/Companies/Companies";
import Add from "../pages/Admin/Companies/Add";
import Edit from "../pages/Admin/Companies/Edit";
import IsAdmin from "../components/Authentication/IsAdmin";
import Details from "../pages/Admin/Companies/Details";
const Routes = [
  {
    path: "/companies",
    element: <IsAdmin view={Companies} />,
  },
  {
    path: "/companies/add",
    element: <IsAdmin view={Add} />,
  },
  {
    path: "/companies/edit/:id",
    element: <IsAdmin view={Edit} />,
  },
  {
    path: "/companies/details/:id",
    element: <IsAdmin view={Details} />,
  },
];

export default Routes;
