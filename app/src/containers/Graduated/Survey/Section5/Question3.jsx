const OPTIONS = ["Si", "No"];

const Question3 = ({ handleChange, answers, questions }) => {
  return (
    <div className="pb-4">
      <h5>¿{questions[2]?.descripcion}?</h5>
      <div className="row align-items-center">
        {OPTIONS.map((option) => (
          <div key={option} className="col-1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                checked={answers["respuesta3"] === option}
                name={`cbxAsosacioEgre`}
                onChange={() => handleChange("respuesta3", option)}
                id={`cbxAsosiacionEgre${option}`}
              />
              <label
                className="form-check-label"
                htmlFor={`cbxAsosiacionEgre${option}`}
              >
                {option}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question3;
