import React from "react";
const FloatingLabelInput = ({
  type = "text",
  inputId = "default",
  placeholder = "default",
  value = "",
  setValue = null,
  setClass = "",
  focusAction = null,
  blurAction = null,
}) => {
  return (
    <div className="formgroup__animated mb-3">
      <input
        type={type}
        id={inputId}
        className={`input__animated ${setClass}`}
        placeholder=" "
        onChange={setValue}
        defaultValue={value}
        autoComplete="off"
        onFocus={focusAction}
        required
      />
      <label htmlFor={inputId} className="animated__label">
        {placeholder === "" ? "default" : placeholder}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
