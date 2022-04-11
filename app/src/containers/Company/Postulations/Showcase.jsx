import { useState, useEffect, useCallback } from "react";
import Modal from "@/components/Global/Modal";
import useRouterHooks from "@/hooks/useRouterHooks";
import vacanciesService from "@/services/Company/vacancies.service";
import toast from "react-hot-toast";
import Loading from "@/components/Global/Loading";
import Swal from "sweetalert2";
import helpers from "@/helpers/helpers";

const ShowCase = ({ refreshData: refreshPostulations }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postulation, setPostulation] = useState({});
  const { params, navigate, location } = useRouterHooks();
  const handleFlagAsReviewed = async () => {
    Swal.fire({
      text: `Confirm la revision de la postulation No ${postulation.id} del usuario '${postulation.nombre_completo}'?`,
      icon: "info",
      ...helpers.alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const results = await vacanciesService.FlagPostulationAsReviewed(
          postulation.id
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
    const fetchedPostulation = await vacanciesService.GetOnePostulation(
      params.postulation_id
    );
    if (!fetchedPostulation.id) {
      toast.error("Esta postulacion ya no existe.");
      setIsLoading(false);
      navigate(`/company/jobbank/postulations/${params.job_id}`);
      return;
    }
    setPostulation(fetchedPostulation);
    setIsLoading(false);
  }, [params.postulation_id]);

  useEffect(() => {
    if (location.state !== null) {
      setPostulation(location.state);
      return;
    }
    getPostulationHandler();
  }, [getPostulationHandler]);

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
              <div className="d-flex flex-column flex-md-row justify-content-between p-2 border-light border shadow align-items-center h-100">
                <h6>
                  Estado:{" "}
                  <span className="text-primary">{postulation.status}</span>
                </h6>
                {postulation.status !== "Revisado" && (
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

              <div className="d-flex   justify-content-center mt-5">
                <Modal
                  title="Curriculum"
                  buttonText="Ver curriculum"
                  buttonClass="btn btn-primary btn-lg mt-3"
                  modalClass="modal-dialog modal-xl modal-dialog-scrollable"
                  buttonCloseText="Cerrar"
                >
                  <embed
                    src={`http://localhost:4000/graduated/cvs/${postulation.curriculum}`}
                    frameBorder="0"
                    width="100%"
                    style={{ height: "100vh", width: "100%" }}
                  />
                </Modal>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ShowCase;
