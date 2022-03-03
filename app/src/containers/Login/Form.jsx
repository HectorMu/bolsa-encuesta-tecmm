import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
//Importing input personalizado
import FloatingLabelInput from "../../components/Global/FloatingLabelInput";
//Importando servicios
import Auth from "../../services/Auth";
//Importando hook de sesion
import useSession from "../../hooks/useSession";

//Estado inicial para las entradas de texto
const initialState = {
  correo: "",
  clave: "",
};

const Form = () => {
  const { setUser } = useSession();
  const [credentials, setCredentials] = useState(initialState);
  const navigate = useNavigate();

  //Funcion para el manejo de el cambio de los input
  const handleCredentialsChange = (key, value) =>
    setCredentials({ ...credentials, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tLoading = toast.loading("Autenticando...");
    //Verificamos que el usuario exista pasandole las credenciales
    const results = await Auth.Login(credentials);
    //si el usuario no existe, reemplazamos la toast de autenticando por una toast de error y salimos de la funcion
    if (!results.status) {
      return toast.error(results.statusText, {
        id: tLoading,
      });
    }

    console.log(results);

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

  return (
    <div className="card o-hidden border-0 shadow-lg my-5">
      <div className="card-body p-0">
        <div className="row">
          <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
          <div className="col-lg-6">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">¡Bienvenido!</h1>
                <h5 className=" text-gray-900 mb-4">
                  Inicia sesión para continuar.
                </h5>
              </div>
              <form className="user" onSubmit={handleSubmit}>
                <FloatingLabelInput
                  inputId="txtCorreo"
                  type="text"
                  placeholder="Correo Electronico"
                  setClass="rounded-pill"
                  setValue={(e) =>
                    handleCredentialsChange("correo", e.target.value)
                  }
                  value={credentials.correo}
                />
                <FloatingLabelInput
                  inputId="txtClave"
                  type="password"
                  placeholder="Clave"
                  setClass="rounded-pill"
                  setValue={(e) =>
                    handleCredentialsChange("clave", e.target.value)
                  }
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
