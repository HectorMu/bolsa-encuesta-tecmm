import { useState, createContext, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "@/services/Auth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const Session = createContext();

function SessionProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const verifySession = async (serviceCall) => {
    const response = await serviceCall();

    if ("authorized" in response) {
      if (!response.authorized) {
        const { value: password } = await Swal.fire({
          title: "Tu sesión ha expirado.",
          input: "password",
          inputLabel: "Ingresa tu contraseña para seguir utilizando la app.",
          inputPlaceholder: "Tu contraseña",
          inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off",
          },
        });

        if (password) {
          const credentials = {
            correo: user.correo,
            clave: password,
          };
          const loginResults = await Auth.Login(credentials);
          if (!loginResults.status) {
            return toast.error(loginResults.statusText);
          }
          const sessionData = loginResults.SessionData;
          window.localStorage.setItem(
            "BETECMMSession",
            JSON.stringify(sessionData)
          );

          setUser(JSON.parse(window.localStorage.getItem("BETECMMSession")));
          toast.success(`${loginResults.statusText}`);
        }
        return;
      }
    }
    return response;
  };
  useLayoutEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem("BETECMMSession"));
    if (!userData?.id) return;
    setUser(userData);
  }, []);
  return (
    <Session.Provider value={{ user, setUser, verifySession }}>
      {children}
    </Session.Provider>
  );
}

export default SessionProvider;
