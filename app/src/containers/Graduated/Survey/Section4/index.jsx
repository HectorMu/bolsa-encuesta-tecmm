import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../../../components/Global/Loading";

//Graduated survey hook to get the current section data based on url param section_id
import useGraduatedSurvey from "../../../../hooks/useGraduatedSurvey";

//Importing services
import surveyService from "../../../../services/Graduated/survey.service";

//importing questions
import Question1 from "./Question1";
const sectionAnswers = {
  respuesta1: "",
  cursos: "",
  respuesta2: "",
  posgrado: "",
};

const index = () => {
  const [answers, setAnswers] = useState(sectionAnswers);
  const { section, questions, isLoading } = useGraduatedSurvey();
  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });
  const navigate = useNavigate();
  return (
    <>
      <h4 className="mb-4 border-bottom border-dark pb-3 text-center font-weight-bolder">
        {section?.descripcion}
      </h4>

      <Question1
        handleChange={handleChange}
        answers={answers}
        questions={questions}
      />
    </>
  );
};

export default index;
