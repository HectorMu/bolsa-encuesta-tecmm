import React from "react";
const FloatingLabelInput = ({
  type = "text",
  inputId = "default",
  placeholder = "default",
  value = "",
  setValue = null,
  setClass = "",
  focusAction = null,
  list = null,
  disabled = false,
  name,
}) => {
  return (
    <div className="formgroup__animated mb-3">
      <input
        type={type}
        name={name}
        id={inputId}
        className={`input__animated ${setClass}`}
        placeholder=" "
        onChange={setValue}
        list={list}
        value={value}
        autoComplete="off"
        onFocus={focusAction}
        disabled={disabled}
        required
      />
      <label htmlFor={inputId} className="animated__label">
        {placeholder === "" ? "default" : placeholder}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
