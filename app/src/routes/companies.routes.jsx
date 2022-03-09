import Companies from "../pages/Admin/Companies/Companies";
import Add from "../pages/Admin/Companies/Add";
import Edit from "../pages/Admin/Companies/Edit";
import IsAdmin from "../components/Authentication/IsAdmin";
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
];

export default Routes;
