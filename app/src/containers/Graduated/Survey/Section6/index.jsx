import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../../../components/Global/Loading";

//Graduated survey hook to get the current section data based on url param section_id
import useGraduatedSurvey from "../../../../hooks/useGraduatedSurvey";

//Importing services
import surveyService from "../../../../services/Graduated/survey.service";

const sectionAnswers = {
  respuesta1: "",
};

const index = () => {
  const [answers, setAnswers] = useState(sectionAnswers);
  const { section, questions, isLoading, userSectionAnswers } =
    useGraduatedSurvey();
  const navigate = useNavigate();

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });

  const saveAndSkipToNextSection = async () => {
    const tLoading = toast.loading("Guardando resultados y generando acuse...");
    const results = await surveyService.saveSection6(answers);
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    navigate("/graduated/survey");
    toast.success("Gracias por contestar la encuesta!", { id: tLoading });
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
          <h4 className="mb-4 border-bottom border-dark pb-3 text-center font-weight-bolder">
            {section?.descripcion}
          </h4>

          <div className="pb-4 text-center">
            <h5>{questions[0]?.descripcion}:</h5>
          </div>

          <div className="form-group">
            <textarea
              rows="10"
              className="form-control"
              placeholder="Escribela aqui..."
              onChange={(e) => handleChange("respuesta1", e.target.value)}
              value={answers.respuesta1}
            ></textarea>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <Link
              to={"/graduated/survey/section/5"}
              className="btn btn-primary mr-2"
            >
              <i className="fas fa-arrow-left"></i> Anterior
            </Link>
            <button
              onClick={saveAndSkipToNextSection}
              className="btn btn-primary"
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
