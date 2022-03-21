import { useState } from "react";
import useGraduatedSurvey from "../../../../hooks/useGraduatedSurvey";
import Question1 from "./Question1";
import Study from "./Study";
import Works from "./Works";

const sectionAnswers = {
  respuesta1: "",
};
const index = () => {
  const { section, questions } = useGraduatedSurvey();
  const [answers, setAnswers] = useState(sectionAnswers);

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });

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
      <div className="mt-5">
        {answers.respuesta1 === "Estudia" ? <Study /> : null}
        {answers.respuesta1 === "Trabaja" ? <Works /> : null}
        {answers.respuesta1 === "Estudia y trabaja" ? (
          <>
            <Study /> <Works />
          </>
        ) : null}
      </div>
    </>
  );
};

export default index;
