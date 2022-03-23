import React from "react";
import FloatingLabelInput from "../Global/FloatingLabelInput";

const OptionsContainer = ({
  SECTIONID: ID,
  OPTIONS,
  handleChange,
  ANSWER,
  answers,
  other = false,
  otherText = "Other",
  cols = "col-12 col-lg-3 col-md-3 col-xl-3",
}) => {
  return (
    <div className="row">
      {OPTIONS.map((option) => (
        <div key={option + ID} className={cols}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              checked={answers[ANSWER] === option}
              name={ID}
              onChange={() => handleChange(ANSWER, option)}
              value={answers[ANSWER]}
              id={`${ID}${option}`}
            />
            <label className="form-check-label" htmlFor={`${ID}${option}`}>
              {option}
            </label>
          </div>
        </div>
      ))}
      {other ? (
        <div className="col-12 col-lg-4 col-md-3 col-xl-4 mt-1 mt-xl-2 mt-lg-2 mt-md-2">
          <div className="d-flex  justify-content-start align-items-center w-100">
            <div className="form-check w-100">
              <input
                className="form-check-input"
                type="radio"
                checked={
                  answers[ANSWER] !== "" &&
                  !Object.values(OPTIONS).includes(answers[ANSWER])
                }
                onChange={() => handleChange(ANSWER, "Otra")}
                value={answers.tipo_estudio}
                name={ID}
                id={`${ID}O`}
              />
              {Object.values(OPTIONS).includes(answers[ANSWER]) ? (
                <label className="form-check-label" htmlFor={`${ID}O`}>
                  {otherText}
                </label>
              ) : answers[ANSWER] === "" ? (
                <label className="form-check-label" htmlFor={`${ID}O`}>
                  {otherText}
                </label>
              ) : (
                <FloatingLabelInput
                  placeholder={otherText}
                  inputId={`txtOtra${ID}`}
                  type="text"
                  setValue={(e) => handleChange(ANSWER, e.target.value)}
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OptionsContainer;
