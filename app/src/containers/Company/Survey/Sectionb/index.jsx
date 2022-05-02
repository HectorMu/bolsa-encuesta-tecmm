import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

//Importando los hooks
import useCompanySurvey from "@/hooks/useCompanySurvey";
import useSession from "@/hooks/useSession";

//importando componentes
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

//Importando los servicios
import surveyService from "@/services/Company/survey.service";

//Importando las preguntas
import Question5 from "./Question5";
import Question6 from "./Question6";
import Question7 from "./Question7";
import Question8 from "./Question8";
import Question9 from "./Question9";

//Entradas del formulario (objeto con los datos a capturar en el formulario)
const SectionAnswers = {
  respuesta5: "",
  completamente: "",
  medianamente: "",
  ligeramente: "",
  ninguna_relacion: "",
  area_estudio: "",
  titulacion: "",
  experiencia_laboral: "",
  competencia_laboral: "",
  posicionamiento_institucion_egreso: "",
  conocimiento_idiomas_extranjeros: "",
  recomendaciones: "",
  personalidad: "",
  capacidad_liderazgo: "",
  otros_p8: "",
  respuesta9: "",
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
      surveyService.saveSectionb(answers)
    );
    if (!results.status) {
      return toast.error(results.statusText);
    }
    navigate("/company/survey/section/2");
  };

  useEffect(() => {
    if (userSectionAnswers) {
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
          <Question5
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question6 questions={questions} />
          <Question7
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question8
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question9
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <div className="d-flex justify-content-center mt-5">
            <button
              onClick={saveAndSkipToNextSection}
              className="btn btn-primary"
            >
              Siguiente <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default index;
