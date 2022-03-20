const Question6 = ({ handleChange, answers, questions }) => {
  const ID = "Q6S1";
  return (
    <div className="pb-4">
      <h5>{questions[5]?.descripcion}:</h5>
      <div className="row">
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={ID}
              onChange={() => handleChange("respuesta6", "Muy buena")}
              value={answers.respuesta6}
              id={`${ID}MB`}
            />
            <label className="form-check-label" htmlFor={`${ID}MB`}>
              Muy buena
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("respuesta6", "Buena")}
              value={answers.respuesta6}
              name={ID}
              id={`${ID}B`}
            />
            <label className="form-check-label" htmlFor={`${ID}B`}>
              Buena
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("respuesta6", "Regular")}
              value={answers.respuesta6}
              name={ID}
              id={`${ID}R`}
            />
            <label className="form-check-label" htmlFor={`${ID}R`}>
              Regular
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("respuesta6", "Mala")}
              value={answers.respuesta6}
              name={ID}
              id={`${ID}M`}
            />
            <label className="form-check-label" htmlFor={`${ID}M`}>
              Mala
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question6;
