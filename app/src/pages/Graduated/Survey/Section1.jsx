import React, { useEffect, useState, useCallback } from "react";
import useRouterHooks from "../../../hooks/useRouterHooks";
import surveyService from "../../../services/Graduated/survey.service";

import Question1 from "../../../containers/Graduated/Survey/Section1/Question1";
import Question2 from "../../../containers/Graduated/Survey/Section1/Question2";
import Question3 from "../../../containers/Graduated/Survey/Section1/Question3";
import Question4 from "../../../containers/Graduated/Survey/Section1/Question4";
import Question5 from "../../../containers/Graduated/Survey/Section1/Question5";
import Question6 from "../../../containers/Graduated/Survey/Section1/Question6";

const SectionAnswers = {
  respuesta1: "",
  respuesta2: "",
  respuesta3: "",
  respuesta4: "",
  respuesta5: "",
  respuesta6: "",
};

const Section1 = () => {
  const [section, setSection] = useState("");
  const [answers, setAnswers] = useState(SectionAnswers);
  const [questions, setQuestions] = useState([]);
  const { params, navigate } = useRouterHooks();

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });

  const saveAndSkipToNextSection = async () => {
    const results = await surveyService.saveSection1(answers);
    console.log(results);
    navigate("/graduated/survey/section/2");
  };

  const getSectionsHandler = useCallback(async () => {
    const fetchedSection = await surveyService.getSurveySection(
      params.section_id
    );

    setSection(fetchedSection);
  }, [params.section_id]);

  const getQuestionsHandler = useCallback(async () => {
    const fetchedQuestions = await surveyService.getSectionQuestions(
      params.section_id
    );
    setQuestions(fetchedQuestions);
  }, [params.section_id]);

  useEffect(() => {
    getSectionsHandler();
    getQuestionsHandler();
  }, [getSectionsHandler, getQuestionsHandler]);

  console.log(answers);
  return (
    <div className="container-fluid text-black">
      <div className="col-lg-8 col-xl-10 mx-auto">
        <div className="card shadow rounded-0 border-0">
          <div className="card-body">
            <h4 className="mb-4 border-bottom border-dark pb-3 text-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
