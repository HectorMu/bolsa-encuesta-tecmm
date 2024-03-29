import { useEffect, useState } from "react";
import useServiceFetchV2 from "@/hooks/useServiceFetchV2";
import useSession from "@/hooks/useSession";
import surveyService from "@/services/Graduated/survey.service";
import Auth from "@/services/Auth";
import { Link } from "react-router-dom";
import Loading from "@/components/Global/Loading";
import Modal from "@/components/Global/Modal";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";
import Swal from "sweetalert2";

const Survey = () => {
  const [acuse, setAcuse] = useState("");
  const [loadingAcuse, setLoadingAcuse] = useState(false);
  const { verifySession } = useSession();

  const {
    hookData: answeredDetails,
    isLoading,
    refreshData,
    error,
  } = useServiceFetchV2(
    () => verifySession(surveyService.checkIfSurveyIsAnswered, refreshData),
    []
  );

  const moreInfo = () =>
    Swal.fire(
      "¿Por que no tengo acuse?",
      "Realizaste la encuesta en el sistema antiguo, el cual no generaba acuse ni guardaba la fecha en que realizaste la encuesta. Puedes actualizar tus respuestas para generar tu acuse.",
      "question"
    );

  const getAcuseWithAuth = async () => {
    if (!answeredDetails.acuse) return;
    setLoadingAcuse(true);
    const fetchedAcuse = await Auth.getResourcesFromPublicFolder(
      `graduated/files/acuses/${answeredDetails.acuse}`
    );
    if (fetchedAcuse.length > 0) {
      setAcuse(fetchedAcuse);
      setLoadingAcuse(false);
      return;
    }
    setLoadingAcuse(false);
  };

  useEffect(() => {
    getAcuseWithAuth();
  }, [answeredDetails.acuse]);

  if (error.error) return <ErrorDisplayer message={error.message} />;

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
                  {answeredDetails?.acuse === "Pendiente" ? (
                    <div className="d-flex flex-column align-content-center justify-content-center">
                      <h5 className="text-center mb-2">
                        Ya has contestado la encuesta, sin embargo, no cuentas
                        con un acuse.
                      </h5>
                      <button
                        onClick={moreInfo}
                        className={"btn btn-link text-primary "}
                      >
                        Mas información
                      </button>
                    </div>
                  ) : (
                    <>
                      <h5 className="text-center mb-4">
                        Ya has contestado la encuesta, puedes ver tu acuse aquí:
                      </h5>
                      <div className="d-flex justify-content-center">
                        {loadingAcuse ? (
                          <Loading />
                        ) : (
                          <Modal
                            buttonClass="btn btn-outline-primary btn-lg"
                            buttonCloseText="Cerrar"
                            id="acuse"
                            title="Mi acuse"
                            modalClass="modal-dialog modal-xl modal-dialog-scrollable"
                            buttonText="Ver acuse"
                            faIcon={<i className="fas fa-eye"></i>}
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
                                  El navegador no soporta la visualizacion de
                                  PDF.{" "}
                                </p>
                                <a
                                  className="btn btn-primary"
                                  href={acuse}
                                  download
                                >
                                  Descargar PDF
                                </a>
                              </div>
                            </object>
                          </Modal>
                        )}
                      </div>
                      <p className="text-muted text-center mt-2">
                        Nota: Si tu acuse no aparece, puedes probar refrescando
                        la página
                      </p>
                    </>
                  )}

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
            <div className="survey-instructions">
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
                  className={"btn btn-outline-primary btn-lg"}
                >
                  Comenzar <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Survey;
