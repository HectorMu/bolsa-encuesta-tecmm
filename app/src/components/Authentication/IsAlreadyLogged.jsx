import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Session } from "../../context/SessionContextProvider";

const IsAlreadyLogged = ({ view: View }) => {
  const { user } = useContext(Session);
  if (user !== null) return <Navigate to="/notes" replace={true} />;
  return <View />;
};

export default IsAlreadyLogged;
