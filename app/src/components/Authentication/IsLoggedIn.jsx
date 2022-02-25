import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Session } from "../../context/SessionContextProvider";

const IsLoggedIn = ({ view: View }) => {
  const { user } = useContext(Session);
  if (user !== null) return <View />;
  return <Navigate to="/login" replace={true} />;
};

export default IsLoggedIn;
