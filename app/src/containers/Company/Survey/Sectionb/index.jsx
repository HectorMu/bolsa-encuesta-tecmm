import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "@/components/Global/Loading";

import useCompanySurvey from "@/hooks/useCompanySurvey";
import useSession from "@/hooks/useSession";

import surveyService from "@/services/Company/survey.service";

import Question5 from "./Question5";
import Question6 from "./Question6";
import Question7 from "./Question7";
import Question8 from "./Question8";
import Question9 from "./Question9";

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
  const { section, questions, isLoading, userSectionAnswers } =
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
