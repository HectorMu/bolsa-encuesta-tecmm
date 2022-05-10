import useServiceFetch from "@/hooks/useServiceFetchV2";
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import ShowcaseContainer from "@/components/Global/ShowcaseContainer";
import ShowcaseCard from "@/components/Global/ShowcaseCard";
import companiesService from "@/services/Admin/companies.service";
import toast from "react-hot-toast";

const SurveyStatus = ({ company }) => {
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
        () => companiesService.checkIfAnsweredSurvey(params.id),
        refreshData
      ),
    [params.id]
  );

  const handleNotifyCompany = async () => {
    const tLoading = toast.loading("Enviando correo...");
    const results = await verifySession(() =>
      companiesService.notifyAnswerSurvey(company?.correo)
    );
    if (!results.status)
      return toast.error(results.statusText, { id: tLoading });

    toast.success(results.statusText, { id: tLoading });
  };

  if (error.error) return null;

  return isLoading ? null : (
    <ShowcaseContainer>
      <ShowcaseCard>
        <h3 className="text-center text-primary font-weight-bolder">
          Estado de encuesta
        </h3>
        {surveyStatus?.fk_empresa ? (
          <div className="d-flex justify-content-center flex-column ">
            <h5 className="text-center">
              {company?.nombre_comercial} contestó la encuesta el dia:{" "}
              <span className="font-weight-bold text-primary">
                {surveyStatus.fecha.split(" ")[0]}{" "}
                <span className="text-black font-weight-normal">a las </span>
                {surveyStatus.fecha.split(" ")[1]}
              </span>
            </h5>
            <div className="d-flex justify-content-center mt-3"></div>
          </div>
        ) : (
          <div className="d-flex justify-content-center flex-column align-content-center">
            <h5 className="text-center font-weight-bold">
              {company?.nombre_comercial} aun no ha contestado la encuesta
            </h5>
            <p className="text-center mt-3">
              Si deseas notificar a la empresa para conteste la encuesta puedes
              enviarle un correo electrónico.
            </p>
            <div className="align-self-center">
              <button
                onClick={handleNotifyCompany}
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
