import OptionsContainer from "@/components/Survey/OptionsContainer";

const OPTIONS = ["Muy eficiente", "Eficiente", "Poco eficiente", "Deficiente"];

const Question1 = ({ handleChange, answers, questions }) => {
  const ID = "Q1S3";
  return (
    <div className="pb-4">
      <h5>{questions[0]?.descripcion}:</h5>
      <OptionsContainer
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"respuesta1"}
        answers={answers}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Question1;
