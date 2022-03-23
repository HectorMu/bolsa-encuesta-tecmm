import React, { useState } from "react";
import Loading from "../../../../components/Global/Loading";
import surveyService from "../../../../services/Graduated/survey.service";
import toast from "react-hot-toast";

import useGraduatedSurvey from "../../../../hooks/useGraduatedSurvey";

import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";
import Question5 from "./Question5";
import Question6 from "./Question6";

const SectionAnswers = {
  respuesta1: "",
  respuesta2: "",
  respuesta3: "",
  respuesta4: "",
  respuesta5: "",
  respuesta6: "",
};

const index = () => {
  const [answers, setAnswers] = useState(SectionAnswers);
  const { section, questions, isLoading } = useGraduatedSurvey();

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });

  const saveAndSkipToNextSection = async () => {
    const results = await surveyService.saveSection1(answers);
    if (!results.status) {
      toast;
    }
    navigate("/graduated/survey/section/2");
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {" "}
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