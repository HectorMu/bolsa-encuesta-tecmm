import Form from "@/containers/RecoverPassword/Form";
import { Link } from "react-router-dom";

const RecoverPassword = () => {
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
                      <h1 className="h4 text-gray-900 mb-4">
                        Recuperación de contraseña
                      </h1>
                      <h5 className=" text-gray-900 mb-4">
                        Ingresa tu correo electrónico
                      </h5>
                    </div>
                    <Form />
                    <hr />
                    <div className="text-center">
                      <Link className="small text-purple" to="/login">
                        <i className="fas fa-arrow-left"></i> Volver
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

export default RecoverPassword;
