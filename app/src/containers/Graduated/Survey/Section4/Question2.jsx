//Importando componentes
import FloatingLabelInput from "../../../../components/Global/FloatingLabelInput";

const OPTIONS = ["Si", "No"];

const Question2 = ({ handleChange, answers, questions }) => {
  return (
    <div className="pb-4">
      <h5>¿{questions[1]?.descripcion}?</h5>
      <div className="row align-items-center">
        {OPTIONS.map((option) => (
          <div key={option} className="col-1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                checked={answers["respuesta2"] === option}
                name={`cbxPosgrado`}
                onChange={() => handleChange("respuesta2", option)}
                id={`cbxPosgrado${option}`}
              />
              <label
                className="form-check-label"
                htmlFor={`cbxPosgrado${option}`}
              >
                {option}
              </label>
            </div>
          </div>
        ))}
        {answers.respuesta2 === "Si" ? (
          <div className="col-12 mt-3">
            <FloatingLabelInput
              inputId="txtCualPosgrado"
              placeholder="¿Qué posgrado?"
              setValue={(e) => handleChange("posgrado", e.target.value)}
              value={answers.posgrado}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Question2;
