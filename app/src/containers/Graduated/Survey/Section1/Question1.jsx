//Importando los componentes
import OptionsContainer from "@/components/Survey/OptionsContainer";

const OPTIONS = ["Muy buena", "Buena", "Regular", "Mala"];

const Question1 = ({ handleChange, answers, questions }) => {
  const ID = "Q1S1";
  return (
    <div className="pb-4">
      <h5>{questions[2]?.descripcion}:</h5>
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
