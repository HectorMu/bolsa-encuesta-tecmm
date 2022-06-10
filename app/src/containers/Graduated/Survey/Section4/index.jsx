import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

//Importing hooks
import useSession from "@/hooks/useSession";

//Importing components
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

//Graduated survey hook to get the current section data based on url param section_id
import useGraduatedSurvey from "@/hooks/useGraduatedSurvey";
import usePreventGraduatedSurveyJumps from "@/hooks/usePreventGraduatedSurveyJumps";

//Importing services
import surveyService from "@/services/Graduated/survey.service";

//importing questions
import Question1 from "./Question1";
import Question2 from "./Question2";

const sectionAnswers = {
  respuesta1: "",
  cursos: "",
  respuesta2: "",
  posgrado: "",
};

const index = () => {
  const [answers, setAnswers] = useState(sectionAnswers);
  const { section, questions, isLoading, userSectionAnswers, error } =
    useGraduatedSurvey();
  const navigate = useNavigate();
  const { verifySession } = useSession();
  const { answeredSections, setAnsweredSectionHandler } =
    usePreventGraduatedSurveyJumps();

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });

  const saveAndSkipToNextSection = async () => {
    const tLoading = toast.loading("Guardando...");
    const results = await verifySession(() =>
      surveyService.saveSection4(answers)
    );
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    toast.dismiss(tLoading);
    setAnsweredSectionHandler("s4", true);
    navigate("/graduated/survey/section/5");
  };

  useEffect(() => {
    if (!answeredSections.s3) {
      navigate(`/graduated/survey/section/3`);
    }
  }, [answeredSections.s3]);

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
            handleChange={handleChange}
            answers={answers}
            questions={questions}
          />
          <Question2
            handleChange={handleChange}
            answers={answers}
            questions={questions}
          />

          <div className="d-flex justify-content-center mt-5">
            <Link to={-1} className="btn btn-outline-primary mr-2">
              <i className="fas fa-arrow-left"></i> Anterior
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
