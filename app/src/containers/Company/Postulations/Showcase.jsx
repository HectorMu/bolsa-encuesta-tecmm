import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

//Importando helpers
import helpers from "@/helpers/helpers";

//Importando componentes
import Modal from "@/components/Global/Modal";
import Loading from "@/components/Global/Loading";

//Importando hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import useWindowSize from "@/hooks/useWindowResize";

//Importando servicios
import vacanciesService from "@/services/Company/vacancies.service";
import Auth from "@/services/Auth";

const ShowCase = ({ refreshData: refreshPostulations }) => {
  const size = useWindowSize();
  const { verifySession, user } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [postulation, setPostulation] = useState({});
  const { params, navigate, location } = useRouterHooks();
  const [curriculum, setCurriculum] = useState("");

  const handleFlagAsReviewed = async () => {
    Swal.fire({
      text: `¿Confirma la revisión de la postulación No. ${postulation.id} del usuario '${postulation.nombre_completo}'?`,
      icon: "info",
      ...helpers.alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const results = await verifySession(() =>
          vacanciesService.FlagPostulationAsReviewed(postulation.id)
        );
        if (!results.status) {
          return toast.error(results.statusText);
        }
        toast.success(results.statusText);
        await getPostulationHandler();
        await refreshPostulations();
      }
    });
  };

  const getPostulationHandler = useCallback(async () => {
    if (!params.postulation_id) return;

    setIsLoading(true);
    const fetchedPostulation = await verifySession(
      () => vacanciesService.GetOnePostulation(params.postulation_id),
      getPostulationHandler
    );
    if (!fetchedPostulation.id) {
      toast.error("Esta postulacion ya no existe.");
      setIsLoading(false);
      navigate(`/company/jobbank/postulations/${params.job_id}`);
      return;
    }
    setPostulation(fetchedPostulation);
    setIsLoading(false);
  }, [params.postulation_id, size.width]);

  const handleGetCVPostulation = async () => {
    if (!postulation.id) return;

    const CV = await Auth.getResourcesFromPublicFolder(
      `graduated/files/cvs/${postulation.curriculum}`
    );

    if (CV === "") return;
    setCurriculum(CV);
  };

  useEffect(() => {
    if (location.state !== null) {
      setPostulation(location.state);
      return;
    }
    getPostulationHandler();
  }, [getPostulationHandler, size.width]);

  useEffect(() => {
    handleGetCVPostulation();
  }, [postulation.curriculum]);

  return (
    <div>
      {!params.postulation_id ? (
        <h2 className="text-center font-weight-bolder text-primary">
          Selecciona un elemento de la lista
        </h2>
      ) : (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="d-flex flex-column flex-md-row justify-content-between p-2 border-light mt-3 mt-sm-3 mt-md-0 mt-lg-0 mt-xl-0 shadow align-items-center h-100">
                <h6>
                  Estado:{" "}
                  <span className="text-primary">{postulation.status}</span>
                </h6>
                {postulation.status !== "Revisado" && user.fk_rol !== 1 && (
                  <button
                    onClick={handleFlagAsReviewed}
                    className="btn btn-primary btn-sm rounded-pill"
                  >
                    <i className="fas fa-check "></i> Marcar revisado
                  </button>
                )}
              </div>
              <div className="mt-3">
                <h4 className="text-primary font-weight-bold">
                  {postulation.nombre_completo}
                </h4>
                <h5>{postulation.correo}</h5>
                <h5>
                  <span className=" font-weight-bold text-primary">
                    Telefono 1:{" "}
                  </span>
                  {postulation.telefono}
                </h5>
                <h5>
                  {" "}
                  <span className=" font-weight-bold text-primary">
                    Telefono 2:{" "}
                  </span>{" "}
                  {postulation.tel_casa}
                </h5>
              </div>

              <Modal
                title="Currículum"
                buttonText="Ver currículum"
                buttonClass="btn btn-outline-primary btn-lg mt-3"
                modalClass="modal-dialog modal-xl modal-dialog-scrollable"
                buttonCloseText="Cerrar"
                faIcon={<i className="fas fa-eye"></i>}
                disabled={size.width < 768}
                disabledCause={
                  "El navegador no soporta la visualización de PDF."
                }
              >
                <object
                  data={curriculum}
                  type="application/pdf"
                  frameBorder="0"
                  width="100%"
                  style={{ height: "100vh", width: "100%" }}
                >
                  <div className="d-flex flex-column justify-content-center">
                    <p className="text-center">
                      El navegador no soporta la visualizacion de PDF.{" "}
                    </p>
                    <a className="btn btn-primary" href={curriculum} download>
                      Descargar PDF
                    </a>
                  </div>
                </object>
              </Modal>
              {size.width < 768 && (
                <div className="d-flex justify-content-center">
                  <a className="btn btn-primary" href={curriculum} download>
                    <i className="fas fa-download"></i> Descargar PDF
                  </a>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ShowCase;
