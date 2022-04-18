import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "@/services/Auth";
import toast from "react-hot-toast";

export const Session = createContext();
function SessionProvider({ children }) {
  const navigate = useNavigate();
  const userData = JSON.parse(window.localStorage.getItem("BETECMMSession"));
  const [user, setUser] = useState(userData);

  const verifySession = async (serviceCall) => {
    const response = await serviceCall();

    if ("authorized" in response) {
      if (!response.authorized) {
        Auth.Logout();
        setUser(null);

        navigate("/login");
        toast.error("Tu sesión ha expirado.");
        return;
      }
    }
    return response;
  };
  return (
    <Session.Provider value={{ user, setUser, verifySession }}>
      {children}
    </Session.Provider>
  );
}

export default SessionProvider;
