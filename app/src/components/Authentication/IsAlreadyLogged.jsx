import React from "react";
import { Navigate } from "react-router-dom";
import useSession from "../../hooks/useSession";

const IsAlreadyLogged = ({ view: View }) => {
  const { user } = useSession();
  if (user !== null) return <Navigate to="/" replace={true} />;
  return <View />;
};

export default IsAlreadyLogged;
