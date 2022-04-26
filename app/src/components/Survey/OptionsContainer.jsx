import { useState, useEffect } from "react";
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
  const [otherOption, setOtherOption] = useState(false);

  const removeOtherSelection = (answer, option) => {
    setOtherOption(false);
    handleChange(ANSWER, option);
  };

  const toggleOtherOption = (answer) => {
    setOtherOption(true);
    handleChange(answer, "");
  };
  useEffect(() => {
    if (
      answers[ANSWER] !== "" &&
      answers[ANSWER] !== null &&
      !Object.values(OPTIONS).includes(answers[ANSWER])
    ) {
      setOtherOption(true);
    }
  }, []);
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
              onChange={() => removeOtherSelection(ANSWER, option)}
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
                  answers[ANSWER] !== null &&
                  !Object.values(OPTIONS).includes(answers[ANSWER])
                }
                onChange={() => toggleOtherOption(ANSWER)}
                value={answers[ANSWER]}
                name={ID}
                id={`${ID}O`}
              />
              <label className="form-check-label" htmlFor={`${ID}O`}>
                {otherText}
              </label>
              {otherOption && (
                <input
                  className="form form-control"
                  id={`txtOtra${ID}`}
                  type="text"
                  placeholder="Escriba aquí..."
                  onChange={(e) => handleChange(ANSWER, e.target.value)}
                  value={answers[ANSWER]}
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
