import { useEffect, useState, useCallback } from "react";
import moment from "moment/min/moment-with-locales";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

//Importando componentes
import Modal from "@/components/Global/Modal";
import Loading from "@/components/Global/Loading";

//Importando los hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import useGraduatedCurriculum from "@/hooks/useGraduatedCurriculum";

//Importando los servicios
import jobsService from "@/services/Graduated/jobs.service";
import Auth from "@/services/Auth";

//Importando helpers
import helpers from "@/helpers/helpers";

const Showcase = () => {
  const { graduatedCurriculum } = useGraduatedCurriculum();
  const [selectedJob, setSelectedJob] = useState({});
  const [curriculumPath, setCurriculumPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPostulation, setLoadingPostulation] = useState(false);
  const [currentPostulation, setCurrentPostulation] = useState({});
  const { params, location } = useRouterHooks();
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
    if (!postulationFetched.id) {
      setCurrentPostulation({});
      setLoadingPostulation(false);
      return;
    }

    setCurriculumPath(graduatedCurriculum);

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
    setSelectedJob(fetchedJob);
    setIsLoading(false);
  }, [params.id, location.state]);

  useEffect(() => {
    handleGetJobFromFetch();
    getPostulationHandler();
    registerPostVisit();
  }, [handleGetJobFromFetch, registerPostVisit, getPostulationHandler]);

  return (
    <div className="p-2">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {selectedJob.folio ? (
            <>
              <h3 className="text-primary btn-link text-left font-weight-bolder">
                {selectedJob.vacante}
              </h3>
              <div className="d-flex flex-column flex-lg-row flex-xl-row mt-3">
                <h5 className="font-weight-bold">
                  {selectedJob.nombre_comercial}
                </h5>
                <ul className="custom-list">
                  <li>
                    <h6>{selectedJob.ubicacion}</h6>
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
                    <embed
                      src={curriculumPath}
                      frameBorder="0"
                      width="100%"
                      style={{ height: "100vh", width: "100%" }}
                    />
                  </Modal>

                  <button
                    onClick={deletePostulationHandler}
                    className="btn btn-primary btn-sm mt-5 align-self-end"
                  >
                    Eliminar postulacion <i className="fas fa-times"></i>
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
                  <p className="mt-4">
                    Nota: Debes subir un curriculum en tu perfil en formato PDF.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-50 text-black">
              <h3 className="text-primary font-weight-bolder text-center">
                ¡Selecciona un trabajo de la lista para saber mas y postularte!
              </h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Showcase;
