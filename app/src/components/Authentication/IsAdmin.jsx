import React from "react";
import { Navigate } from "react-router-dom";
import useSession from "../../hooks/useSession";

const IsAdmin = ({ view: View }) => {
  const { user } = useSession();
  if (user !== null && user.fk_rol === 1) return <View />;
  return <Navigate to="/login" replace={true} />;
};

export default IsAdmin;
