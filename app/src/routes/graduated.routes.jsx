import Graduated from "../pages/Admin/Graduated/Graduated";
import Add from "../pages/Admin/Graduated/Add";
import Edit from "../pages/Admin/Graduated/Edit";
import Details from "../pages/Admin/Graduated/Details";
import IsAdmin from "../components/Authentication/IsAdmin";
const Routes = [
  {
    path: "/graduated",
    element: <IsAdmin view={Graduated} />,
  },
  {
    path: "/graduated/add",
    element: <IsAdmin view={Add} />,
  },
  {
    path: "/graduated/edit/:id",
    element: <IsAdmin view={Edit} />,
  },
  {
    path: "/graduated/details/:id",
    element: <IsAdmin view={Details} />,
  },
];

export default Routes;
