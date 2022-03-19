import React, { useEffect, useState, useCallback } from "react";
import useRouterHooks from "../../../hooks/useRouterHooks";
import surveyService from "../../../services/Graduated/survey.service";

const SectionAnswers = {
  respuesta1: "",
};
const Section1 = () => {
  const { params } = useRouterHooks();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(SectionAnswers);

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });

  const getQuestionsHandler = useCallback(async () => {
    const fetchedQuestions = await surveyService.getSectionQuestions(
      params.section_id
    );
    setQuestions(fetchedQuestions);
  }, [params.section_id]);

  useEffect(() => {
    getQuestionsHandler();
  }, [getQuestionsHandler]);

  console.log(questions);
  return (
    <div className="container-fluid text-black">
      <div className="col-lg-8 mx-auto">
        <div className="card">
          <div className="card-body">
            <h3>Section {params.section_id}</h3>
            <h5>{questions[0]?.descripcion}:</h5>
            <div className="row">
              <div className="col-12 col-lg-3 col-md-3 col-xl-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="xd"
                    onChange={(e) => handleChange("respuesta1", e.target.value)}
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
                    onChange={(e) => handleChange("respuesta1", e.target.value)}
                    value={answers.respuesta1}
                    name="xd"
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
                    onChange={(e) => handleChange("respuesta1", e.target.value)}
                    value={answers.respuesta1}
                    name="xd"
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
                    onChange={(e) => handleChange("respuesta1", e.target.value)}
                    value={answers.respuesta1}
                    name="xd"
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
  );
};

export default Section1;
