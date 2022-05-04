import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

//Importing hooks
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

//Graduated survey hook to get the current section data based on url param section_id
import useGraduatedSurvey from "@/hooks/useGraduatedSurvey";
import useSession from "@/hooks/useSession";

//Importing services
import surveyService from "@/services/Graduated/survey.service";

//importing questions
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";

const sectionAnswers = {
  respuesta1: "",
  respuesta2: "",
  respuesta3: "",
  area_estudio: "",
  titulacion: "",
  experiencia_laboral: "",
  competencia_laboral: "",
  posicionamiento_institucion_egreso: "",
  conocimiento_idiomas_extranjeros: "",
  recomendaciones: "",
  personalidad: "",
  capacidad_liderazgo: "",
  otros: "",
};
const index = () => {
  const [answers, setAnswers] = useState(sectionAnswers);
  const [question3Answered, setQuestion3Answered] = useState(false);
  const { section, questions, isLoading, userSectionAnswers, error } =
    useGraduatedSurvey();
  const navigate = useNavigate();
  const { verifySession } = useSession();

  const saveAndSkipToNextSection = async () => {
    const tLoading = toast.loading("Guardando...");
    const results = await verifySession(() =>
      surveyService.saveSection3(answers)
    );
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    toast.dismiss(tLoading);
    navigate("/graduated/survey/section/4");
  };

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });

  useEffect(() => {
    if (userSectionAnswers) {
      if (userSectionAnswers?.respuesta3?.length > 0) {
        setQuestion3Answered(true);
      }
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
          <h4 className="mb-4 border-bottom border-dark pb-3 text-center font-weight-bolder">
            {section?.descripcion}
          </h4>
          <Question1
            handleChange={handleChange}
            answers={answers}
            questions={questions}
          />
          <Question2
            handleChange={handleChange}
            answers={answers}
            questions={questions}
          />
          {!question3Answered && (
            <Question3
              handleChange={handleChange}
              answers={answers}
              questions={questions}
            />
          )}

          <Question4
            handleChange={handleChange}
            answers={answers}
            questions={questions}
          />
          <div className="d-flex justify-content-center mt-5">
            <Link
              to={"/graduated/survey/section/2"}
              className="btn btn-primary mr-2"
            >
              <i className="fas fa-arrow-left"></i> Anterior
            </Link>
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
