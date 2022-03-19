import React, { useEffect, useState, useCallback } from "react";
import useRouterHooks from "../../../hooks/useRouterHooks";
import surveyService from "../../../services/Graduated/survey.service";

const SectionAnswers = {
  respuesta1: "",
};
const Section1 = () => {
  const { params } = useRouterHooks();
  const [questions, setQuestions] = useState([]);
  const [section, setSection] = useState({});
  const [answers, setAnswers] = useState(SectionAnswers);

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });

  const getQuestionsHandler = useCallback(async () => {
    const fetchedQuestions = await surveyService.getSectionQuestions(
      params.section_id
    );
    setQuestions(fetchedQuestions);
  }, [params.section_id]);

  const getSectionsHandler = useCallback(async () => {
    const fetchedSection = await surveyService.getSurveySection(
      params.section_id
    );

    setSection(fetchedSection);
  }, [params.section_id]);

  useEffect(() => {
    getQuestionsHandler();
    getSectionsHandler();
  }, [getQuestionsHandler, getSectionsHandler]);

  console.log(answers);
  return (
    <div className="container-fluid text-black">
      <div className="col-lg-8 col-xl-10 mx-auto">
        <div className="card shadow rounded-0 border-0">
          <div className="card-body">
            <h4 className="mb-4 border-bottom border-dark pb-3 text-center">
              {section?.descripcion}
            </h4>
            <div>
              <h5>{questions[0]?.descripcion}:</h5>
              <div className="row">
                <div className="col-12 col-lg-3 col-md-3 col-xl-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rp1"
                      onChange={() => handleChange("respuesta1", "Muy buena")}
                      value={answers.respuesta1}
                      id="docentesMB"
                    />
                    <label className="form-check-label" htmlFor="docentesMB">
                      Muy buena
                    </label>
                  </div>
                </div>
                <div className="col-12 col-lg-3 col-md-3 col-xl-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      onChange={() => handleChange("respuesta1", "Buena")}
                      value={answers.respuesta1}
                      name="rp1"
                      id="docentesB"
                    />
                    <label className="form-check-label" htmlFor="docentesB">
                      Buena
                    </label>
                  </div>
                </div>
                <div className="col-12 col-lg-3 col-md-3 col-xl-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      onChange={() => handleChange("respuesta1", "Regular")}
                      value={answers.respuesta1}
                      name="rp1"
                      id="docentesR"
                    />
                    <label className="form-check-label" htmlFor="docentesR">
                      Regular
                    </label>
                  </div>
                </div>
                <div className="col-12 col-lg-3 col-md-3 col-xl-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      onChange={() => handleChange("respuesta1", "Mala")}
                      value={answers.respuesta1}
                      name="rp1"
                      id="docentesM"
                    />
                    <label className="form-check-label" htmlFor="docentesM">
                      Mala
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
