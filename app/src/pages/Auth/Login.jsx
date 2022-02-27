import React from "react";
import { Link } from "react-router-dom";
import FloatingLabelInput from "../../components/Global/FloatingLabelInput";

const Login = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
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
                    <form className="user">
                      <FloatingLabelInput
                        inputId="txtCorreo"
                        type="text"
                        placeholder="Correo Electronico"
                        setClass="rounded-pill"
                      />
                      <FloatingLabelInput
                        inputId="txtClave"
                        type="password"
                        placeholder="Clave"
                        setClass="rounded-pill"
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
        </div>
      </div>
    </div>
  );
};

export default Login;
