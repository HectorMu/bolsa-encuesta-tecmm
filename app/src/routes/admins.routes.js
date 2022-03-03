import Admins from "../pages/Admin/Admins/Admins";
import Add from "../pages/Admin/Admins/Add";
import IsLoggedIn from "../components/Authentication/IsLoggedIn";
const Routes = [
  {
    path: "/admins",
    element: <IsLoggedIn view={Admins} />,
  },
  {
    path: "/admins/add",
    element: <IsLoggedIn view={Add} />,
  },
];

export default Routes;
