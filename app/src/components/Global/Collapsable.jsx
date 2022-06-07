import React from "react";

const Collapsable = ({
  id = "One",
  text = "Collapsible Group Item #1",
  buttonClass = "btn btn-link btn-block text-left text-primary font-weight-bolder collapsed",
  children,
}) => {
  return (
    <div>
      <div className="card-header" id={`heading${id}`}>
        <div className="d-flex justify-content-start align-content-center align-items-center">
          <h2 className="mb-0">
            <button
              className={buttonClass}
              type="button"
              data-toggle="collapse"
              data-target={`#collapse${id}`}
              aria-expanded="true"
              aria-controls={`collapse${id}`}
            >
              {text}
            </button>
          </h2>
        </div>
      </div>
      <div
        id={`collapse${id}`}
        className="collapse show"
        aria-labelledby={`heading${id}`}
        data-parent="#accordionContainer"
      >
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

export default Collapsable;
