import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

//Importando los componentes
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

//Importando los hooks
import useCompanySurvey from "@/hooks/useCompanySurvey";
import useSession from "@/hooks/useSession";

//Importando los servicios
import surveyService from "@/services/Company/survey.service";

//Importando las preguntas
import Question10 from "./Question10";
import Question11 from "./Question11";
import Question12 from "./Question12";
import Question13 from "./Question13";

//Entradas del formulario (objeto con los datos a capturar en el formulario)
const SectionAnswers = {
  habilidad_resolver_conflictos: "",
  ortografia_redaccion: "",
  mejora_procesos: "",
  trabajo_equipo: "",
  habilidad_administrar_tiempo: "",
  seguridad_personal: "",
  facilidad_palabra: "",
  gestion_proyectos: "",
  puntualidad_asistencia: "",
  cumplimiento_normas: "",
  integracion_trabajo: "",
  creatividad_innovacion: "",
  capacidad_negociacion: "",
  capacidad_analisis: "",
  liderazgo: "",
  adaptacion_cambio: "",
  otros: "",
  otros_detalle: "",
  excelente: "",
  muy_bueno: "",
  bueno: "",
  regular: "",
  malo: "",
  respuesta12: "",
  respuesta13: "",
};

const index = () => {
  const [answers, setAnswers] = useState(SectionAnswers);
  const { section, questions, isLoading, userSectionAnswers, error } =
    useCompanySurvey();
  const { verifySession } = useSession();
  const navigate = useNavigate();

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });

  const saveAndSkipToNextSection = async () => {
    const results = await verifySession(() =>
      surveyService.saveSectionc(answers)
    );
    if (!results.status) {
      return toast.error(results.statusText);
    }
    navigate("/company/survey");
    toast.success("Gracias por contestar la encuesta!");
  };

  useEffect(() => {
    if (userSectionAnswers?.respuesta12 && userSectionAnswers?.respuesta12) {
      setAnswers(userSectionAnswers);
    }
  }, [userSectionAnswers]);

  if (error.error) {
    return <ErrorDisplayer message={error.message} />;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h4 className="mb-4 border-bottom border-dark pb-3 text-center font-weight-border">
            {section?.descripcion}
          </h4>
          <Question10
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question11
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question12
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question13
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <div className="d-flex justify-content-center mt-5">
            <Link
              to={"/company/survey/section/1"}
              className="btn btn-outline-primary mr-2"
            >
              <i className="fas fa-arrow-left"></i> Anterior
            </Link>
            <button
              onClick={saveAndSkipToNextSection}
              className="btn btn-outline-primary"
            >
              Finalizar <i className="fas fa-check"></i>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default index;
