import React, { useState } from "react";

export const Session = React.createContext();
function SessionProvider({ children }) {
  const userData = JSON.parse(window.localStorage.getItem("BETECMMSession"));
  const [user, setUser] = useState(userData);

  return (
    <Session.Provider value={{ user, setUser }}>{children}</Session.Provider>
  );
}

export default SessionProvider;
