//Importando componentes
import FloatingLabelInput from "../../../../components/Global/FloatingLabelInput";

const OPTIONS = ["Si", "No"];

const Question1 = ({ handleChange, answers, questions }) => {
  return (
    <div className="pb-4">
      <h5>¿{questions[0]?.descripcion}?</h5>
      <div className="row align-items-center">
        {OPTIONS.map((option) => (
          <div key={option} className="col-6 col-md-1 col-lg-1 col-xl-1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                checked={answers["respuesta1"] === option}
                name={`cbxCursos`}
                onChange={() => handleChange("respuesta1", option)}
                id={`cbxCursos${option}`}
              />
              <label
                className="form-check-label"
                htmlFor={`cbxCursos${option}`}
              >
                {option}
              </label>
            </div>
          </div>
        ))}
        {answers.respuesta1 === "Si" ? (
          <div className="col-12 mt-3">
            <FloatingLabelInput
              inputId="txtCualesCursos"
              placeholder="¿Qué cursos?"
              setValue={(e) => handleChange("cursos", e.target.value)}
              value={answers.cursos}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Question1;
