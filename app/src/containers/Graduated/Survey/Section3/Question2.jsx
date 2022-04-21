//Importando los componentes
import OptionsContainer from "@/components/Survey/OptionsContainer";

const OPTIONS = ["Excelente", "Bueno", "Regular", "Malo", "Pésimo"];

const Question2 = ({ handleChange, answers, questions }) => {
  const ID = "Q2S3";
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
