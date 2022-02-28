import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Session } from "../../context/SessionProvider";

const IsAlreadyLogged = ({ view: View }) => {
  const { user } = useContext(Session);
  if (user !== null) return <Navigate to="/" replace={true} />;
  return <View />;
};

export default IsAlreadyLogged;
