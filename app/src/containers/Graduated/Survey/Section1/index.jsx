import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

//importing custom components
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

//Graduated survey hook to get the current section data based on url param section_id
import useGraduatedSurvey from "@/hooks/useGraduatedSurvey";
import useSession from "@/hooks/useSession";
import usePreventGraduatedSurveyJumps from "@/hooks/usePreventGraduatedSurveyJumps";

//importing services
import surveyService from "@/services/Graduated/survey.service";

//Importing section questions
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";
import Question5 from "./Question5";
import Question6 from "./Question6";

//Entradas del formulario (objeto con los datos a capturar en el formulario)
const SectionAnswers = {
  respuesta1: "",
  respuesta2: "",
  respuesta3: "",
  respuesta4: "",
  respuesta5: "",
  respuesta6: "",
};

const index = () => {
  const { answeredSections, setAnsweredSectionHandler } =
    usePreventGraduatedSurveyJumps();
  const [answers, setAnswers] = useState(SectionAnswers);
  const { section, questions, isLoading, userSectionAnswers, error } =
    useGraduatedSurvey();
  const navigate = useNavigate();
  const { verifySession } = useSession();

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });

  const saveAndSkipToNextSection = async () => {
    const tLoading = toast.loading("Guardando...");
    const results = await verifySession(() =>
      surveyService.saveSection1(answers)
    );
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    setAnsweredSectionHandler("s1", true);
    toast.dismiss(tLoading);
    navigate("/graduated/survey/section/2");
  };

  useEffect(() => {
    if (userSectionAnswers?.respuesta1) {
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
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question2
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question3
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question4
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question5
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question6
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <div className="d-flex justify-content-center mt-5">
            <Link
              to={"/graduated/survey"}
              className="btn btn-outline-primary mr-2"
            >
              <i className="fas fa-arrow-left"></i> Volver
            </Link>
            <button
              onClick={saveAndSkipToNextSection}
              className="btn btn-outline-primary"
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
