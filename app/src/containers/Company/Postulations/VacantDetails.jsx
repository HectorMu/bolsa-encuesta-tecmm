import { useEffect, useState, useCallback } from "react";
import vacanciesService from "@/services/Company/vacancies.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import toast from "react-hot-toast";
import moment from "moment/min/moment-with-locales";
import ListButtons from "../JobBank/ListButtons";

const VacantDetails = () => {
  const [vacant, setVacant] = useState({});
  const [relativeTime, setRelativeTime] = useState(true);

  const { params, navigate } = useRouterHooks();

  const handleBackPage = () => navigate("/company/jobbank/");

  const toggleRelativeTime = () => setRelativeTime(!relativeTime);

  const getVacantDetailsHandler = useCallback(async () => {
    const fetchedVacant = await vacanciesService.GetOne(params.id);
    if (!fetchedVacant.folio) {
      toast.error("Esta vacante no existe.");
      navigate("/company/jobbank");
      return;
    }
    setVacant(fetchedVacant);
  }, [params.id]);

  useEffect(() => {
    getVacantDetailsHandler();
  }, [getVacantDetailsHandler]);

  return (
    <div data-aos="flip-right" className="col-lg-8 mx-auto mb-4">
      <div className="card p-3 shadow-lg">
        <div className="row">
          <div className="col-12 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <button onClick={handleBackPage} className="btn ">
                {" "}
                <i className="fas fa-arrow-left text-primary"></i>
              </button>
              <h6 className="text-primary font-weight-bold">
                Folio: {vacant?.folio}
              </h6>

              <ListButtons
                object={vacant}
                refreshCallback={getVacantDetailsHandler}
              />
            </div>
          </div>
          <div className="col-6">
            <h5 className="text-primary font-weight-bold">{vacant?.vacante}</h5>
            <p className="text-primary ">{vacant?.ubicacion}</p>
          </div>
          <div className="col-6"></div>
        </div>

        <div className="d-flex  justify-content-between align-items-end h-100">
          <div className="d-flex flex-column flex-sm-column flex-md-column flex-lg-column flex-xl-row">
            <p>
              <span className="badge badge-pill badge-primary mr-0 mr-xl-2  px-4">
                {vacant?.visitas} {vacant?.visitas === 1 ? "Visita" : "Visitas"}
              </span>
            </p>
            <p>
              <span className="badge badge-pill badge-primary  mr-0 mr-xl-2 py-1 px-4">
                {vacant?.solicitudes}{" "}
                {vacant?.solicitudes === 1 ? "Solicitud" : "Solicitudes"}
              </span>
            </p>
            <p>
              <span className="badge badge-pill badge-primary ml-0 ml-xl-2 py-1 px-4">
                {vacant?.status}
              </span>
            </p>
          </div>
          <div
            className="d-flex"
            onClick={toggleRelativeTime}
            style={{ cursor: "pointer" }}
          >
            <p>
              <span className="badge badge-pill badge-primary mr-2 py-1">
                Publicado:{" "}
                {relativeTime
                  ? moment(vacant?.fecha_creacion).locale("es").fromNow()
                  : vacant?.fecha_creacion}
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
  );
};

export default VacantDetails;
