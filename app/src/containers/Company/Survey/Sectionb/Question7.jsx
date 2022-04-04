import FloatingLabelInput from "@/components/Global/FloatingLabelInput";

const ENTRIES = {
  completamente: "Completamente",
  medianamente: "Medianamente",
  ligeramente: "Ligeramente",
  ninguna_relacion: "Ninguna relación",
};

const Question7 = ({ answers, handleChange, questions }) => {
  return (
    <div className="pb-4 pt-5">
      <h5>{questions[2]?.descripcion}:</h5>
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

export default Question7;
