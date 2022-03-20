const Question1 = ({ handleChange, answers, questions }) => {
  return (
    <div className="pb-4">
      <h5>{questions[0]?.descripcion}:</h5>
      <div className="row">
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="rp1"
              onChange={() => handleChange("respuesta1", "Muy buena")}
              value={answers.respuesta1}
              id="docentesMB"
            />
            <label className="form-check-label" htmlFor="docentesMB">
              Muy buena
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("respuesta1", "Buena")}
              value={answers.respuesta1}
              name="rp1"
              id="docentesB"
            />
            <label className="form-check-label" htmlFor="docentesB">
              Buena
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("respuesta1", "Regular")}
              value={answers.respuesta1}
              name="rp1"
              id="docentesR"
            />
            <label className="form-check-label" htmlFor="docentesR">
              Regular
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("respuesta1", "Mala")}
              value={answers.respuesta1}
              name="rp1"
              id="docentesM"
            />
            <label className="form-check-label" htmlFor="docentesM">
              Mala
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question1;
