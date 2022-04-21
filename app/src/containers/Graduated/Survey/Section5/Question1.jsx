//Importando componentes
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";

const OPTIONS = ["Si", "No"];

const Question1 = ({ handleChange, answers, questions }) => {
  console.log(answers);
  return (
    <div className="pb-4">
      <h5>¿{questions[0]?.descripcion}?</h5>
      <div className="row align-items-center">
        {OPTIONS.map((option) => (
          <div key={option} className="col-1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                checked={answers["respuesta1"] === option}
                name={`cbxOrgSociales`}
                onChange={() => handleChange("respuesta1", option)}
                id={`cbxOrgSociales${option}`}
              />
              <label
                className="form-check-label"
                htmlFor={`cbxOrgSociales${option}`}
              >
                {option}
              </label>
            </div>
          </div>
        ))}
        {answers.respuesta1 === "Si" ? (
          <div className="col-12 mt-3">
            <FloatingLabelInput
              inputId="txtCualesOrganizaciones"
              placeholder="¿Cuales?"
              setValue={(e) =>
                handleChange("organizaciones_sociales", e.target.value)
              }
              value={answers.organizaciones_sociales}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Question1;
