import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";

const Routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
];

export default Routes;
