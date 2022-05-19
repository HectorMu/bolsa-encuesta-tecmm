import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import moment from "moment/min/moment-with-locales";

import ListButtons from "../JobBank/ListButtons";

//Importando hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import useCleanAosAnimations from "@/hooks/useCleanAosAnimations";

//Importando componentes
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

//Importando servicios
import vacanciesCompanyService from "@/services/Company/vacancies.service";
import vacanciesAdminService from "@/services/Admin/jobs.service";

const VacantDetails = ({ removeOnRezise }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [vacant, setVacant] = useState({});
  const [relativeTime, setRelativeTime] = useState(true);

  const { verifySession, user } = useSession();
  const { params, navigate } = useRouterHooks();

  const handleBackPage = () =>
    user.fk_rol === 1 ? navigate("/jobbank") : navigate("/company/jobbank");

  const toggleRelativeTime = () => setRelativeTime(!relativeTime);

  const getVacantDetailsHandler = useCallback(async () => {
    if (user.fk_rol === 1) {
      setIsLoading(true);
      const fetchedVacant = await verifySession(
        () => vacanciesAdminService.GetOne(params.job_id),
        getVacantDetailsHandler
      );
      if (fetchedVacant?.error) {
        setVacant(fetchedVacant);
        setIsLoading(false);
        return;
      }
      if (!fetchedVacant.folio) {
        toast.error("Esta vacante no existe.");
        navigate("/company/jobbank");
        setIsLoading(false);
        return;
      }
      setVacant(fetchedVacant);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const fetchedVacant = await verifySession(
      () => vacanciesCompanyService.GetOne(params.job_id),
      getVacantDetailsHandler
    );
    if (!fetchedVacant.folio) {
      toast.error("Esta vacante no existe.");
      navigate("/company/jobbank");
      setIsLoading(false);
      return;
    }
    setVacant(fetchedVacant);
    setIsLoading(false);
  }, [params.job_id]);

  useEffect(() => {
    getVacantDetailsHandler();
  }, [getVacantDetailsHandler]);

  if (vacant?.error) {
    return isLoading ? (
      <Loading />
    ) : (
      <ErrorDisplayer message={vacant.message} />
    );
  }

  return (
    <div ref={useCleanAosAnimations()} data-aos="fade-up">
      {isLoading ? (
        <Loading />
      ) : (
        <div className={removeOnRezise}>
          <div className="card p-3 shadow">
            <div className="row">
              <div className="col-12 h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <button onClick={handleBackPage} className="btn ">
                    {" "}
                    <i className="fas fa-arrow-left text-primary"></i>
                  </button>
                  {user.fk_rol === 1 && (
                    <h6 className="text-primary font-weight-bold">
                      {vacant?.nombre_comercial}
                    </h6>
                  )}
                  <h5 className="text-black font-weight-bold">
                    Folio: {vacant?.folio}
                  </h5>
                  {user.fk_rol !== 1 && (
                    <ListButtons
                      object={vacant}
                      refreshCallback={getVacantDetailsHandler}
                    />
                  )}
                </div>
              </div>
              <div className="col-6">
                <h5 className=" font-weight-bolder text-black">
                  {vacant?.vacante}
                </h5>
                <p className=" text-gray-800 font-weight-bold">
                  {vacant?.ubicacion}
                </p>
              </div>
              <div className="col-6"></div>
            </div>

            <div className="d-flex  justify-content-between align-items-end h-100">
              <div className="d-flex flex-column flex-sm-column flex-md-column flex-lg-column flex-xl-row">
                <p>
                  <span className="badge badge-pill badge-primary mr-0 mr-xl-2  px-4">
                    <i className="fas fa-eye"></i> {vacant?.visitas}{" "}
                    {vacant?.visitas === 1 ? "Visita" : "Visitas"}
                  </span>
                </p>
                <p>
                  <span className="badge badge-pill badge-primary  mr-0 mr-xl-2 py-1 px-4">
                    <i className="fas fa-envelope"></i> {vacant?.solicitudes}{" "}
                    {vacant?.solicitudes === 1 ? "Solicitud" : "Solicitudes"}
                  </span>
                </p>
                <p>
                  <span className="badge badge-pill badge-primary ml-0 ml-xl-2 py-1 px-4">
                    {vacant?.status === "Abierta" ? (
                      <i className="fas fa-lock-open"></i>
                    ) : (
                      <i className="fas fa-lock"></i>
                    )}{" "}
                    {vacant?.status}
                  </span>
                </p>
              </div>
              <div
                className="d-flex flex-column flex-md-row"
                onClick={toggleRelativeTime}
                style={{ cursor: "pointer" }}
              >
                <p>
                  <span className="badge badge-pill badge-primary mr-0 mr-md-2  py-1">
                    Publicado:{" "}
                    {relativeTime
                      ? moment(vacant?.fecha_creacion).locale("es").fromNow()
                      : vacant?.fecha_creacion.replace("T", " ").split(" ")[0]}
                  </span>
                </p>
                <p>
                  <span className="badge badge-pill badge-primary  py-1">
                    Expira:{" "}
                    {relativeTime
                      ? moment(vacant?.fecha_expira).locale("es").fromNow()
                      : vacant?.fecha_expira}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacantDetails;
