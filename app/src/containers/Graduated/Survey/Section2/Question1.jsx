import React from "react";

const Question1 = ({ handleChange, answers, questions }) => {
  const ID = "Q1S2";

  return (
    <div className="pb-4">
      <h5>{questions[0]?.descripcion}:</h5>
      <div className="row">
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={ID}
              onChange={() => handleChange("respuesta1", "Trabaja")}
              value={answers.respuesta1}
              id={`${ID}MB`}
            />
            <label className="form-check-label" htmlFor={`${ID}MB`}>
              Trabaja
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("respuesta1", "Estudia")}
              value={answers.respuesta1}
              name={ID}
              id={`${ID}B`}
            />
            <label className="form-check-label" htmlFor={`${ID}B`}>
              Estudia
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("respuesta1", "Estudia y trabaja")}
              value={answers.respuesta1}
              name={ID}
              id={`${ID}R`}
            />
            <label className="form-check-label" htmlFor={`${ID}R`}>
              Estudia y trabaja
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() =>
                handleChange("respuesta1", "No estudia ni trabaja")
              }
              value={answers.respuesta1}
              name={ID}
              id={`${ID}M`}
            />
            <label className="form-check-label" htmlFor={`${ID}M`}>
              No estudia ni trabaja
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question1;
