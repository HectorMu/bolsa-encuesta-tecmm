import { useEffect, useState, useCallback } from "react";
import moment from "moment/min/moment-with-locales";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

//Importando componentes
import Loading from "@/components/Global/Loading";
import CurriculumModal from "@/components/Graduated/CurriculumModal";

//Importando los hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";

//Importando los servicios
import jobsService from "@/services/Graduated/jobs.service";

//Importando helpers
import helpers from "@/helpers/helpers";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";
import useWindowSize from "@/hooks/useWindowResize";

const Showcase = ({ setSearchTerm, jobs }) => {
  const size = useWindowSize();
  const [selectedJob, setSelectedJob] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPostulation, setLoadingPostulation] = useState(false);
  const [currentPostulation, setCurrentPostulation] = useState({});
  const { params, location } = useRouterHooks();
  const [error, setError] = useState({});
  const { verifySession } = useSession();

  const postulationRegisterHandler = async () => {
    const results = await verifySession(() =>
      jobsService.registerPostulation(params.id)
    );
    if (!results.status) {
      return toast.error(results.statusText);
    }

    toast.success("Currículum enviado");
    getPostulationHandler();
  };

  const deletePostulationHandler = async () => {
    Swal.fire({
      text: `¿Desea cancelar su postulacion?`,
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
        getPostulationHandler();
      }
    });
  };

  const getPostulationHandler = useCallback(async () => {
    if (!params.id) return;
    setLoadingPostulation(true);
    const postulationFetched = await verifySession(() =>
      jobsService.getPostulation(params.id)
    );
    if (postulationFetched?.error) {
      setError(postulationFetched);
      setLoadingPostulation(false);
      return;
    }
    if (!postulationFetched.id) {
      setCurrentPostulation({});
      setLoadingPostulation(false);
      return;
    }

    setCurrentPostulation(postulationFetched);
    setLoadingPostulation(false);
  }, [params.id]);

  const registerPostVisit = useCallback(async () => {
    if (!params.id) return;
    await verifySession(() => jobsService.registerJobVisit(params.id));
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
    registerPostVisit();
  }, [
    handleGetJobFromFetch,
    registerPostVisit,
    getPostulationHandler,
    size.width,
  ]);

  if (error?.error) {
    return <ErrorDisplayer message={error.message} />;
  }

  return (
    <div className="p-2">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {selectedJob.folio ? (
            <>
              <h4 className="text-primary btn-link text-left font-weight-bolder">
                {selectedJob.vacante}
              </h4>
              <div className="d-flex flex-column flex-lg-row flex-xl-row mt-3">
                <p
                  onClick={() => setSearchTerm(selectedJob.nombre_comercial)}
                  className="font-weight-bold text-primary"
                  style={{ cursor: "pointer" }}
                >
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
                  <h5>Tu currículum ha sido enviado.</h5>
                  <h6>
                    Estado:{" "}
                    <span className="text-primary">
                      {currentPostulation.status}
                    </span>{" "}
                  </h6>
                  <div className="d-flex flex-column flex-md-row flex-lg-rowflex-xl-row justify-content-center align-content-center mt-3">
                    <CurriculumModal />
                    <button
                      onClick={deletePostulationHandler}
                      className="btn btn-outline-primary btn-sm ml-0 ml-md-2 ml-lg-2 ml-xl-2 mt-2 mt-md-0 mt-lg-0 mt-xl-0"
                    >
                      Cancelar postulación <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                  <button
                    onClick={postulationRegisterHandler}
                    className="btn btn-outline-primary btn-lg mt-3"
                  >
                    Postularme <i className="fas fa-paper-plane"></i>
                  </button>
                  <p className="mt-4">
                    Nota: Debes subir un currículum en tu perfil en formato PDF.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-50 text-black">
              {!jobs.length > 0 && !isLoading ? (
                <h3 className="text-primary font-weight-bolder text-center">
                  ¡Ponte al tanto de futuras publicaciones!
                </h3>
              ) : (
                <h3 className="text-primary font-weight-bolder text-center">
                  ¡Selecciona un trabajo de la lista para saber mas y
                  postularte!
                </h3>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Showcase;
