//Importando los componentes
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";

const ENTRIES = {
  excelente: "Excelente",
  muy_bueno: "Muy bueno",
  bueno: "Bueno",
  regular: "Regular",
  malo: "Malo",
};

const Question11 = ({ answers, handleChange, questions }) => {
  return (
    <div className="pb-4">
      <h5>{questions[1]?.descripcion}:</h5>
      <div className="row">
        {Object.entries(ENTRIES).map(([key, value]) => (
          <div key={key} className="col-6 col-lg-3 col-md-3 col-xl-3">
            <FloatingLabelInput
              placeholder={value}
              inputId={`input${key}`}
              type="number"
              setValue={(e) => handleChange(key, e.target.value)}
              value={answers[key]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question11;
