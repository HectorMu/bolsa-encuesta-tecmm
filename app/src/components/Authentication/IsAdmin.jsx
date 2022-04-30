import React from "react";
import { Navigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import useRouterHooks from "@/hooks/useRouterHooks";

const IsAdmin = ({ view: View }) => {
  const { user } = useSession();
  const { location } = useRouterHooks();
  if (user !== null && user.fk_rol === 1) return <View />;
  return (
    <Navigate
      to="/login"
      replace={true}
      state={{ prevLocation: location.pathname }}
    />
  );
};

export default IsAdmin;
