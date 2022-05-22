import React from "react";

const Modal = ({
  id = "exampleModal",
  buttonText = "Demo modal",
  buttonClass = "btn btn-primary",
  modalClass = "modal-dialog",
  title = "Modal title",
  buttonCloseText = "Close",
  faIcon = null,
  faIconPos = "left",
  closeRef = null,
  disabled,
  disabledCause = null,
  children,
}) => {
  return (
    <>
      <div className="d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row align-content-center justify-content-center ">
        <button
          type="button"
          className={buttonClass}
          data-toggle="modal"
          data-target={`#${id}`}
          disabled={disabled}
        >
          {faIcon && faIconPos === "left" && faIcon} {buttonText}{" "}
          {faIcon && faIconPos === "right" && faIcon}
        </button>
        <span style={{ fontSize: "14px" }} className="text-center pt-1 pb-2">
          {disabled && disabledCause}
        </span>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id={`${id}`}
        tabIndex={-1}
        aria-labelledby={`${id}Label`}
        aria-hidden="true"
      >
        <div className={modalClass}>
          <div className="modal-content">
            <div className="modal-header" style={{ padding: "5px" }}>
              <h4
                className="modal-title text-primary font-weight-bold"
                id={`${id}Label`}
              >
                {title}
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer" style={{ padding: "1px" }}>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                data-dismiss="modal"
                ref={closeRef}
              >
                {buttonCloseText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
