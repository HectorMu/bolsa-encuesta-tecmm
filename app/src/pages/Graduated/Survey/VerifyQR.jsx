import { useLayoutEffect } from "react";
import useServiceFetchV2 from "@/hooks/useServiceFetchV2";
import surveyService from "@/services/Graduated/survey.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import toast from "react-hot-toast";
import Loading from "@/components/Global/Loading";
import moment from "moment/min/moment-with-locales";

const VerifyQR = () => {
  const { params } = useRouterHooks();
  const { hookData: tokenValidation, isLoading } = useServiceFetchV2(
    () => surveyService.verifyQRToken(params.token),
    [params.token]
  );

  const userData = tokenValidation?.responsePayload;

  return (
    <div className="container-fluid">
      {isLoading ? (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h2 className="text-primary font-weight-bold mb-3">
            Espera mientras validamos la informacion...
          </h2>
          <Loading />
        </div>
      ) : tokenValidation?.status ? (
        <div className="col-lg-8 mx-auto">
          <div className="card border-0 shadow-lg">
            <div className="card-body">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="mb-3 text-black font-weight-bold">Valido</h1>
                <button className="btn btn-primary px-4">
                  <i className="fas fa-check fa-5x text-center "></i>
                </button>

                <h3 className="mt-4 text-black font-weight-bold text-center">
                  El egresado:{" "}
                  <span className="text-primary">
                    {userData.nombre_completo}
                  </span>{" "}
                  contesto la encuesta
                </h3>

                <div className="text-black text-center mt-3">
                  <h4>No. control: </h4>
                  <h5 className="text-primary font-weight-bold mb-3">
                    {userData.no_control}
                  </h5>
                  <h4>CURP: </h4>
                  <h5 className="text-primary font-weight-bold">
                    {userData.curp}
                  </h5>
                </div>
                <h5>
                  <span className="badge badge-primary ">
                    Contestada el: {userData?.fecha.split(" ")[0]} a las{" "}
                    {userData?.fecha.split(" ")[1]}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-lg-8 mx-auto">
          <div className="card border-0 shadow-lg">
            <div className="card-body">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="mb-3 text-black font-weight-bold">No valido</h1>
                <button className="btn btn-danger px-4">
                  <i className="fas fa-times fa-5x text-center "></i>
                </button>

                {tokenValidation?.statusText?.length > 0 && (
                  <>
                    <h2 className="text-primary mt-4 font-weight-bold">
                      {tokenValidation?.statusText}
                    </h2>
                  </>
                )}

                {!tokenValidation.statusText && (
                  <>
                    <h3 className="mt-4 text-black font-weight-bold">
                      El egresado:{" "}
                      <span className="text-primary">
                        {userData?.nombre_completo}
                      </span>{" "}
                      no contesto la encuesta
                    </h3>
                    <div className="text-black text-center mt-3">
                      <h4>No. control: </h4>
                      <h5 className="text-primary font-weight-bold mb-3">
                        {userData?.no_control}
                      </h5>
                      <h4>CURP: </h4>
                      <h5 className="text-primary font-weight-bold">
                        {userData?.curp}
                      </h5>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyQR;
