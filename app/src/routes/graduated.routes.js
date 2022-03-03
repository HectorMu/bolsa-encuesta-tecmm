import Graduated from "../pages/Admin/Graduated/Graduated";
import Add from "../pages/Admin/Graduated/Add";
import IsLoggedIn from "../components/Authentication/IsLoggedIn";
const Routes = [
  {
    path: "/graduated",
    element: <IsLoggedIn view={Graduated} />,
  },
  {
    path: "/graduated/add",
    element: <IsLoggedIn view={Add} />,
  },
];

export default Routes;
