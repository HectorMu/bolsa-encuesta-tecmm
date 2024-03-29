import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
//Importing input personalizado
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
//Importando servicios
import Auth from "@/services/Auth";
//Importando hook de sesion
import useSession from "@/hooks/useSession";
//Router hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import usePrevLocationRedirect from "@/hooks/usePrevLocationRedirect";

//Estado inicial para las entradas de texto
const initialState = {
  correo: "",
  clave: "",
};

const Form = () => {
  const { user, setUser } = useSession();
  const [credentials, setCredentials] = useState(initialState);
  const { navigate, location } = useRouterHooks();

  //Funcion para el manejo de el cambio de los input
  const handleCredentialsChange = (key, value) =>
    setCredentials({ ...credentials, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tLoading = toast.loading("Autenticando...");
    //Verificamos que el usuario exista pasandole las credenciales
    const results = await Auth.Login(credentials);

    //si hay un error externo a las validaciones del backend
    if (results?.error) {
      return toast.error(results.message, {
        id: tLoading,
      });
    }
    //si el usuario no existe, reemplazamos la toast de autenticando por una toast de error y salimos de la funcion
    if (!results.status) {
      return toast.error(results.statusText, {
        id: tLoading,
      });
    }

    //si el usuario existe, seteamos los datos de la session en el local storage
    window.localStorage.setItem(
      "BETECMMSession",
      JSON.stringify(results.SessionData)
    );
    //Seteamos el usuario con el json parseado, y mostramos al usuario un mensaje de bienvenida
    setUser(JSON.parse(window.localStorage.getItem("BETECMMSession")));

    navigate("/");
    toast.success("Bienvenid@", {
      id: tLoading,
    });
  };

  useEffect(() => {
    window.addEventListener("storage", () => {
      //Seteamos el usuario con el json parseado
      setUser(JSON.parse(window.localStorage.getItem("BETECMMSession")));
    });
    return () => {
      //Removemos el listener en la funcion limpiadora y seteamos el usuario a nulo
      window.removeEventListener("storage", () => setUser(null));
    };
  }, []);

  usePrevLocationRedirect(user);
  return (
    <>
      <form className="user" onSubmit={handleSubmit} autoComplete="off">
        <FloatingLabelInput
          inputId="txtCorreo"
          type="text"
          placeholder="Correo electrónico"
          setClass="rounded-pill"
          setValue={(e) => handleCredentialsChange("correo", e.target.value)}
          value={credentials.correo}
        />
        <FloatingLabelInput
          inputId="txtClave"
          type="password"
          placeholder="Clave"
          setClass="rounded-pill"
          setValue={(e) => handleCredentialsChange("clave", e.target.value)}
          value={credentials.clave}
        />

        <button className="btn btn-primary btn-user btn-block">
          Iniciar sesión
        </button>
      </form>
      <hr />
      <div className="text-center">
        <Link className="small text-purple" to="/forgot">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </>
  );
};

export default Form;
