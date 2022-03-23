import OptionsContainer from "../../../../components/Survey/OptionsContainer";

const OPTIONS = ["Muy buena", "Buena", "Regular", "Mala"];

const Question5 = ({ handleChange, answers, questions }) => {
  const ID = "Q5S1";
  return (
    <div className="pb-4">
      <h5>{questions[4]?.descripcion}:</h5>
      <OptionsContainer
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"respuesta5"}
        answers={answers}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Question5;
