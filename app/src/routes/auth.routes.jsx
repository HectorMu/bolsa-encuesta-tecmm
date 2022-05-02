import Login from "../pages/Auth/Login";
import RecoverPassword from "@/pages/Auth/RecoverPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";

const Routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot",
    element: <RecoverPassword />,
  },
  {
    path: "/reset/:token/",
    element: <ResetPassword />,
  },
];

export default Routes;
