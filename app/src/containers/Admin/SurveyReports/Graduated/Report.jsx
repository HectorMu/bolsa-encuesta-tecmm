//importando componentes personalizados
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

//importando hooks
import useServiceFetch from "@/hooks/useServiceFetchV2";
import useSession from "@/hooks/useSession";

//importando servicios
import surveyGraduatesService from "@/services/Admin/surveygraduates.service";

const Report = () => {
  const { verifySession } = useSession();
  const {
    isLoading,
    refreshData,
    hookData: surveys,
    error,
  } = useServiceFetch(
    () => verifySession(surveyGraduatesService.List, refreshData),
    []
  );

  if (error.error) {
    return isLoading ? <Loading /> : <ErrorDisplayer message={error.message} />;
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {surveys.count > 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="btn btn-outline-primary btn-lg text-primary"
                table={`table-graduated-report`}
                filename={"reporte-encuesta-egresados"}
                sheet="tablexls"
                buttonText={"Descargar reporte"}
              />
              <div className="mt-4  text-primary">
                <h4 className="font-weight-bolder">{surveys.count}</h4>
                <h5 className=""> Egresados contestaron la encuesta</h5>
              </div>
              <button
                onClick={refreshData}
                className="btn btn-outline-primary mt-3"
              >
                Actualizar <i className="fas fa-sync"></i>
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-center font-weight-bold text-primary">
                Ningun egresado ha contestado la encuesta
              </h3>
              <button
                onClick={refreshData}
                className="btn btn-outline-primary mt-3"
              >
                Actualizar <i className="fas fa-sync"></i>
              </button>
            </>
          )}

          <div
            dangerouslySetInnerHTML={{ __html: surveys.reportsTable }}
            className="d-none"
          ></div>
        </>
      )}
    </div>
  );
};

export default Report;
