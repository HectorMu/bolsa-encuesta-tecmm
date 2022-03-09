import Accounts from "../pages/Admin/Accounts/Accounts";
import Add from "../pages/Admin/Accounts/Add";
import IsAdmin from "../components/Authentication/IsAdmin";
const Routes = [
  {
    path: "/accounts",
    element: <IsAdmin view={Accounts} />,
  },
  {
    path: "/accounts/add",
    element: <IsAdmin view={Add} />,
  },
];

export default Routes;
