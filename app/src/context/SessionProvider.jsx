import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "@/services/Auth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import profileSevice from "@/services/Admin/profile.service";

export const Session = createContext();

function SessionProvider({ children }) {
  const userData = JSON.parse(window.localStorage.getItem("BETECMMSession"));
  const [user, setUser] = useState(userData);
  const navigate = useNavigate();

  const verifySession = async (serviceCall, continueTask = null) => {
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
            toast.error(loginResults.statusText);
            await verifySession(serviceCall, continueTask);
            return;
          }
          const sessionData = loginResults.SessionData;
          window.localStorage.setItem(
            "BETECMMSession",
            JSON.stringify(sessionData)
          );

          setUser(JSON.parse(window.localStorage.getItem("BETECMMSession")));

          if (continueTask !== null) {
            toast.success("Sesión revalidada, reanudando...");
            continueTask();
            return;
          }
          toast.dismiss();
          toast.success("Sesión revalidada, intentalo de nuevo...");
        }
        return;
      }
    }
    return response;
  };

  const verifySessionOnLoad = async () => {
    const response = await profileSevice.getProfile();

    if (response === undefined || response === null) return;

    if ("authorized" in response) {
      if (!response.authorized) {
        setUser(null);
        window.localStorage.removeItem("BETECMMSession");
        navigate("/login");
        toast.error("Tu sesión expiro.");
      }
    }
  };

  useEffect(() => {
    verifySessionOnLoad();
  }, []);

  useEffect(() => {
    window.addEventListener("storage", () => {
      //Seteamos el usuario con el json parseado,
      setUser(JSON.parse(window.localStorage.getItem("BETECMMSession")));
    });
    return () => {
      //Removemos el listener en la funcion limpiadora y seteamos el usuario a nulo
      window.removeEventListener("storage", setUser(null));
    };
  }, []);

  return (
    <Session.Provider value={{ user, setUser, verifySession }}>
      {children}
    </Session.Provider>
  );
}

export default SessionProvider;
