import Login from "../pages/Auth/Login";
import IsAlreadyLogged from "../components/Authentication/IsAlreadyLogged";

const Routes = [
  {
    path: "/login",
    element: <IsAlreadyLogged view={Login} />,
  },
];

export default Routes;
