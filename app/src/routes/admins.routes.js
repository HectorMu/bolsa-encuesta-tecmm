import Accounts from "../pages/Admin/Accounts/Accounts";
import Add from "../pages/Admin/Accounts/Add";
import IsLoggedIn from "../components/Authentication/IsLoggedIn";
const Routes = [
  {
    path: "/accounts",
    element: <IsLoggedIn view={Accounts} />,
  },
  {
    path: "/accounts/add",
    element: <IsLoggedIn view={Add} />,
  },
];

export default Routes;
