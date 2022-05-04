import useServiceFetchV2 from "@/hooks/useServiceFetchV2";
import useSession from "@/hooks/useSession";
import surveyService from "@/services/Graduated/survey.service";
import { Link } from "react-router-dom";
import Loading from "@/components/Global/Loading";
import Modal from "@/components/Global/Modal";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

const Survey = () => {
  const { verifySession } = useSession();
  const {
    hookData: answeredDetails,
    isLoading,
    refreshData,
  } = useServiceFetchV2(
    () => verifySession(surveyService.checkIfSurveyIsAnswered, refreshData),
    []
  );

  if (answeredDetails?.error)
    return <ErrorDisplayer message={answeredDetails?.statusText} />;

  return (
    <div className="container-fluid text-black">
      <div className="d-sm-flex align-items-center justify-content-center mb-4">
        <h1 className="h3 mb-0 text-center font-weight-bold border-bottom border-dark border-1 pb-2">
          Cuestionario de seguimiento de egresados
        </h1>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {answeredDetails?.fk_egresado ? (
            <div className="col-lg-6 mx-auto">
              <div className="card shadow-lg border-0 animated--grow-in">
                <div className="card-body">
                  <h5 className="text-center mb-4">
                    Ya has contestado la encuesta, puedes ver tu acuse aquí
                  </h5>

                  <div className="d-flex justify-content-center">
                    <Modal
                      buttonClass="btn btn-primary btn-lg"
                      buttonCloseText="Cerrar"
                      id="acuse"
                      title="Mi acuse"
                      modalClass="modal-dialog modal-xl modal-dialog-scrollable"
                      buttonText="Ver acuse"
                    >
                      <object
                        data={`http://localhost:4000/graduated/acuses/${answeredDetails.acuse}`}
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
                            href={`http://localhost:4000/graduated/acuses/${answeredDetails.acuse}`}
                            download
                          >
                            Descargar PDF
                          </a>
                        </div>
                      </object>
                    </Modal>
                  </div>
                  <h5 className="mt-5 text-center">
                    Si te pidieron actualizar tus respuestas puedes{" "}
                    <Link
                      className="btn-link btn-link-primary"
                      to={"/graduated/survey/section/1"}
                    >
                      contestar la encuesta de nuevo{" "}
                      <i className="fas fa-arrow-right fa-xs"></i>
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-left ">Instrucciones:</h3>
              <p>
                Por favor lea cuidadosamente y conteste este cuestionario de la
                siguiente manera, según sea el caso:
              </p>
              <ol
                start={1}
                className="font-weight-bold text-justify instructions-list"
              >
                <li>
                  En el caso de preguntas cerradas, seleccione la opción que
                  considere apropiada.
                </li>
                <li>
                  En las preguntas de valoración la escala utilizada es del 1 al
                  5, en la que 1 es igual a "muy malo" y 5 es "muy bueno".
                </li>
                <li>
                  En los casos de preguntas abiertas dejamos un campo de texto
                  para que escriba con mayúscula una respuesta.
                </li>
                <li>
                  Al final anexamos un inciso para comentarios y sugerencias, le
                  agradeceremos que escriba lo que considere prudente para
                  mejorar nuestro sistema educativo o bien los temas que, a su
                  juicio, hayamos omitido en el cuestionario.
                </li>
              </ol>
              <p>
                Gracias por su gentil colaboración, una vez este listo, presione
                el botón para comenzar.
              </p>
              <div className="d-flex justify-content-center h-100 mt-4">
                <Link
                  to={"/graduated/survey/section/1"}
                  className={"btn btn-primary btn-lg"}
                >
                  Comenzar <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Survey;
