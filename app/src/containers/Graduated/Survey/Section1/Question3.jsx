import OptionsContainer from "@/components/Survey/OptionsContainer";

const OPTIONS = ["Muy buena", "Buena", "Regular", "Mala"];

const Question3 = ({ handleChange, answers, questions }) => {
  const ID = "Q3S1";
  return (
    <div className="pb-4">
      <h5>{questions[2]?.descripcion}:</h5>
      <OptionsContainer
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"respuesta3"}
        answers={answers}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Question3;
