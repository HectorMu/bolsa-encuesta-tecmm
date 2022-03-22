import OptionsContainer from "../../../../components/Survey/OptionsContainer";

const OPTIONS = {
  MUY_BUENA: "Muy buena",
  BUENA: "Buena",
  REGULAR: "Regular",
  MALA: "Mala",
};

const Question6 = ({ handleChange, answers, questions }) => {
  const ID = "Q6S1";
  return (
    <div className="pb-4">
      <h5>{questions[5]?.descripcion}:</h5>
      <OptionsContainer
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"respuesta6"}
        answers={answers}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Question6;
