import { useEffect, useState } from "react";
import useServiceFetch from "@/hooks/useServiceFetchV2";
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import ShowcaseContainer from "@/components/Global/ShowcaseContainer";
import ShowcaseCard from "@/components/Global/ShowcaseCard";
import Modal from "@/components/Global/Modal";
import graduatesService from "@/services/Admin/graduates.service";
import Auth from "@/services/Auth";
import toast from "react-hot-toast";

const SurveyStatus = ({ graduated }) => {
  const [acuse, setAcuse] = useState("");
  const { params } = useRouterHooks();
  const { verifySession } = useSession();

  const {
    hookData: surveyStatus,
    refreshData,
    isLoading,
    error,
  } = useServiceFetch(
    () =>
      verifySession(
        () => graduatesService.checkIfAnsweredSurvey(params.id),
        refreshData
      ),
    [params.id]
  );

  const getAcuseHandler = async () => {
    if (!surveyStatus?.fk_egresado) return;
    const fetchedAcuse = await Auth.getResourcesFromPublicFolder(
      `/graduated/files/acuses/${surveyStatus?.acuse}`
    );
    setAcuse(fetchedAcuse);
  };

  const handleNotifyGraduated = async () => {
    const tLoading = toast.loading("Enviando correo...");
    const results = await verifySession(() =>
      graduatesService.notifyAnswerSurvey(graduated?.correo)
    );
    if (!results.status)
      return toast.error(results.statusText, { id: tLoading });

    toast.success(results.statusText, { id: tLoading });
  };

  useEffect(() => {
    getAcuseHandler();
  }, [surveyStatus?.fk_egresado]);

  if (error.error) return null;

  return isLoading ? null : (
    <ShowcaseContainer>
      <ShowcaseCard>
        <h3 className="text-center text-primary font-weight-bolder">
          Estado de encuesta
        </h3>
        {surveyStatus?.fk_egresado ? (
          <div className="d-flex justify-content-center flex-column ">
            <h5 className="text-center">
              {graduated?.nombre_completo} contestó la encuesta el dia:{" "}
              <span className="font-weight-bold text-primary">
                {surveyStatus.fecha.split(" ")[0]}{" "}
                <span className="text-black font-weight-normal">a las </span>
                {surveyStatus.fecha.split(" ")[1]}
              </span>
            </h5>
            <div className="d-flex justify-content-center mt-3">
              <Modal
                buttonClass="btn btn-outline-primary"
                buttonCloseText="Cerrar"
                faIcon={<i className="fas fa-eye"></i>}
                faIconPos="right"
                id="acuse"
                title={`Acuse de ${graduated?.nombre_completo}`}
                modalClass="modal-dialog modal-xl modal-dialog-scrollable"
                buttonText="Ver acuse"
              >
                <object
                  data={acuse}
                  type="application/pdf"
                  frameBorder="0"
                  width="100%"
                  style={{ height: "100vh", width: "100%" }}
                >
                  <div className="d-flex flex-column justify-content-center">
                    <p className="text-center">
                      El navegador no soporta la visualizacion de PDF.{" "}
                    </p>
                    <a className="btn btn-primary" href={acuse} download>
                      Descargar PDF
                    </a>
                  </div>
                </object>
              </Modal>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center flex-column align-content-center">
            <h5 className="text-center font-weight-bold">
              {graduated?.nombre_completo} aun no ha contestado la encuesta
            </h5>
            <p className="text-center mt-3">
              Si deseas notificar al egresado para conteste la encuesta puedes
              enviarle un correo electrónico.
            </p>
            <div className="align-self-center">
              <button
                onClick={handleNotifyGraduated}
                className="btn btn-outline-primary"
              >
                Enviar correo <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        )}
      </ShowcaseCard>
    </ShowcaseContainer>
  );
};

export default SurveyStatus;
