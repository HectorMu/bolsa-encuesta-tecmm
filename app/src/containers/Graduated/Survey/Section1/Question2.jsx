//Importando los componentes
import OptionsContainer from "@/components/Survey/OptionsContainer";

const OPTIONS = ["Muy buenos", "Buenos", "Regulares", "Malos"];

const Question2 = ({ handleChange, answers, questions }) => {
  const ID = "Q2S1";
  return (
    <div className="pb-4">
      <h5>{questions[1]?.descripcion}:</h5>
      <OptionsContainer
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"respuesta2"}
        answers={answers}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Question2;
