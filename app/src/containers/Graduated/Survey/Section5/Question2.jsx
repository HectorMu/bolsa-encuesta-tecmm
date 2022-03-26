import FloatingLabelInput from "../../../../components/Global/FloatingLabelInput";

const OPTIONS = ["Si", "No"];
const Question2 = ({ handleChange, answers, questions }) => {
  console.log(answers);
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
                name={`cbxOrgProfesionistas`}
                onChange={() => handleChange("respuesta2", option)}
                id={`cbxOrgProfesionistas${option}`}
              />
              <label
                className="form-check-label"
                htmlFor={`cbxOrgProfesionistas${option}`}
              >
                {option}
              </label>
            </div>
          </div>
        ))}
        {answers.respuesta2 === "Si" ? (
          <div className="col-12 mt-3">
            <FloatingLabelInput
              inputId="txtCualesOrganismos"
              placeholder="¿Cuales?"
              setValue={(e) =>
                handleChange("organismos_profesionistas", e.target.value)
              }
              value={answers.organismos_profesionistas}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Question2;
