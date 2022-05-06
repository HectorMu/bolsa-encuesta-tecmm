import { useEffect, useState, useCallback } from "react";
import moment from "moment/min/moment-with-locales";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

//Importando componentes
import Modal from "@/components/Global/Modal";
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

//Importando hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import useGraduatedCurriculum from "@/hooks/useGraduatedCurriculum";

//Importando helpers
import helpers from "@/helpers/helpers";

//Importando servicios
import jobsService from "@/services/Graduated/jobs.service";

const Showcase = ({ refreshData }) => {
  const [selectedJob, setSelectedJob] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [loadingPostulation, setLoadingPostulation] = useState(false);
  const [currentPostulation, setCurrentPostulation] = useState({});
  const { params, location, navigate } = useRouterHooks();
  const { graduatedCurriculum } = useGraduatedCurriculum();
  const { verifySession } = useSession();

  const postulationRegisterHandler = async () => {
    const results = await verifySession(() =>
      jobsService.registerPostulation(params.id)
    );
    if (!results.status) {
      return toast.error(results.statusText);
    }

    toast.success("Curriculum enviado");
    getPostulationHandler();
  };

  const deletePostulationHandler = async () => {
    Swal.fire({
      text: `¿Desea cancelar su postulación?`,
      icon: "info",
      ...helpers.alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const results = await verifySession(() =>
          jobsService.deletePostulation(params.id)
        );
        if (!results.status) {
          return toast.error(results.statusText);
        }
        toast.success("Postulación cancelada");
        navigate("/graduated/jobbank/postulations");
        await getPostulationHandler();
        await refreshData();
        setSelectedJob(null);
      }
    });
  };

  const getPostulationHandler = useCallback(async () => {
    if (!params.id) return;
    setLoadingPostulation(true);
    const postulationFetched = await verifySession(() =>
      jobsService.getPostulation(params.id)
    );
    if (!postulationFetched.id) {
      setCurrentPostulation({});
      setLoadingPostulation(false);
      return;
    }
    setCurrentPostulation(postulationFetched);
    setLoadingPostulation(false);
  }, [params.id]);

  const handleGetJobFromFetch = useCallback(async () => {
    if (!params.id) return;

    if (location.state !== null) {
      setSelectedJob(location.state);
      return;
    }
    setIsLoading(true);
    const fetchedJob = await verifySession(() =>
      jobsService.getOneJob(params.id)
    );

    if (fetchedJob?.error) {
      setSelectedJob(fetchedJob);
      setIsLoading(false);
      return;
    }
    setSelectedJob(fetchedJob);
    setIsLoading(false);
  }, [params.id, location.state]);

  useEffect(() => {
    handleGetJobFromFetch();
    getPostulationHandler();
  }, [handleGetJobFromFetch, getPostulationHandler]);

  if (selectedJob?.error) {
    return isLoading ? (
      <Loading />
    ) : (
      <ErrorDisplayer message={selectedJob.message} />
    );
  }

  return (
    <div className="p-2">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {selectedJob?.fk_vacante ? (
            <>
              <h4 className="text-primary btn-link text-left font-weight-bolder">
                {selectedJob.vacante}
              </h4>
              <div className="d-flex flex-column flex-lg-row flex-xl-row mt-3">
                <p className="font-weight-bold">
                  {selectedJob.nombre_comercial}
                </p>
                <ul className="custom-list">
                  <li>
                    <p>{selectedJob.ubicacion}</p>
                  </li>
                  <li>
                    <span className="badge p-2 badge-primary">
                      <i className="fas fa-clock"></i>{" "}
                      {moment(selectedJob.fecha_creacion)
                        .locale("es")
                        .fromNow()}
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <p>
                  <i className="fas fa-building text-primary"></i>:{" "}
                  {selectedJob.tamaño} empleados
                </p>
                <p className="text-black"> {selectedJob.descripcion}</p>
              </div>
              {loadingPostulation ? (
                <Loading />
              ) : currentPostulation?.id ? (
                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                  <h5>Tu curriculum ha sido enviado.</h5>
                  <h6>
                    Estado:{" "}
                    <span className="text-primary">
                      {currentPostulation.status}
                    </span>{" "}
                  </h6>
                  <Modal
                    title="Mi curriculum"
                    buttonText="Ver mi curriculum"
                    buttonClass="btn btn-primary btn-lg mt-3"
                    modalClass="modal-dialog modal-xl modal-dialog-scrollable"
                    buttonCloseText="Cerrar"
                  >
                    <object
                      data={graduatedCurriculum}
                      type="application/pdf"
                      frameBorder="0"
                      width="100%"
                      style={{ height: "100vh", width: "100%" }}
                    >
                      <div className="d-flex flex-column justify-content-center">
                        <p className="text-center">
                          El navegador no soporta la visualizacion de PDF.{" "}
                        </p>
                        <a
                          className="btn btn-primary"
                          href={graduatedCurriculum}
                          download
                        >
                          Descargar PDF
                        </a>
                      </div>
                    </object>
                  </Modal>

                  <button
                    onClick={deletePostulationHandler}
                    className="btn btn-primary btn-sm mt-5 align-self-end"
                  >
                    Cancelar postulación <i className="fas fa-times"></i>
                  </button>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                  <button
                    onClick={postulationRegisterHandler}
                    className="btn btn-primary btn-lg mt-3"
                  >
                    Postularme
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="d-flex justify-content-center align-content-center h-50 text-black">
              <h3 className="text-primary font-weight-bolder text-center">
                ¡Selecciona una postulación!
              </h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Showcase;
