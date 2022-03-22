import OptionsContainer from "../../../../components/Survey/OptionsContainer";

const OPTIONS = {
  MUY_BUENA: "Muy buena",
  BUENA: "Buena",
  REGULAR: "Regular",
  MALA: "Mala",
};

const Question4 = ({ handleChange, answers, questions }) => {
  const ID = "Q4S1";
  return (
    <div className="pb-4">
      <h5>{questions[3]?.descripcion}:</h5>
      <OptionsContainer
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"respuesta4"}
        answers={answers}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Question4;
