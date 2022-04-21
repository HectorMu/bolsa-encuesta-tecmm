import { useLayoutEffect } from "react";
import useRouterHooks from "@/hooks/useRouterHooks";
import useServiceFetchV2 from "@/hooks/useServiceFetchV2";
import Form from "@/containers/ResetPassword/Form";
import { Link } from "react-router-dom";
import Auth from "@/services/Auth";
import Loading from "@/components/Global/Loading";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { params, navigate } = useRouterHooks();
  const { hookData: tokenValidation, isLoading } = useServiceFetchV2(
    () => Auth.validateRecoverPasswordToken(params.token),
    [params.token]
  );

  useLayoutEffect(() => {
    if (!tokenValidation.status) {
      if (tokenValidation?.statusText?.length > 0) {
        toast.error(tokenValidation?.statusText);
      }

      navigate("/login");
    }
  }, [tokenValidation.statusText]);

  console.log(tokenValidation);
  return (
    <div className="container">
      {isLoading ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h3 className="mb-2 text-black">
            Espera mientras validamos el enlace...
          </h3>
          <Loading />
        </div>
      ) : (
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
                          Ingresa tu nueva contraseña
                        </h5>
                      </div>
                      <Form />
                      <hr />
                      <div className="text-center">
                        <Link className="small text-purple" to="/login">
                          <i className="fas fa-arrow-left"></i> Ir al Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
