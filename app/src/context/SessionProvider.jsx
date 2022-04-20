import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "@/services/Auth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const Session = createContext();

function SessionProvider({ children }) {
  const userData = JSON.parse(window.localStorage.getItem("BETECMMSession"));
  const [user, setUser] = useState(userData);

  const verifySession = async (serviceCall, onEffectCall) => {
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
          preConfirm: (password) => {
            if (!password.length > 0) {
              return Swal.showValidationMessage("Ingresa una contraseña.");
            }
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

          toast.success("Sesión revalidada.");
          onEffectCall && onEffectCall();
        }
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
