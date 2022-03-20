const Question2 = ({ handleChange, answers, questions }) => {
  const ID = "Q2S1";
  return (
    <div className="pb-4">
      <h5>{questions[1]?.descripcion}:</h5>
      <div className="row">
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={ID}
              onChange={() => handleChange("respuesta2", "Muy buenos")}
              value={answers.respuesta2}
              id={`${ID}MB`}
            />
            <label className="form-check-label" htmlFor={`${ID}MB`}>
              Muy buenos
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("respuesta2", "Buenos")}
              value={answers.respuesta2}
              name={ID}
              id={`${ID}B`}
            />
            <label className="form-check-label" htmlFor={`${ID}B`}>
              Buenos
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("respuesta2", "Regulares")}
              value={answers.respuesta2}
              name={ID}
              id={`${ID}R`}
            />
            <label className="form-check-label" htmlFor={`${ID}R`}>
              Regulares
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("respuesta2", "Malos")}
              value={answers.respuesta2}
              name={ID}
              id={`${ID}M`}
            />
            <label className="form-check-label" htmlFor={`${ID}M`}>
              Malos
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question2;
