import React from "react";

const Modal = ({
  id = "exampleModal",
  buttonText = "Demo modal",
  buttonClass = "btn btn-primary",
  modalClass = "modal-dialog",
  title = "Modal title",
  buttonCloseText = "Close",
  children,
}) => {
  return (
    <div>
      <button
        type="button"
        className={buttonClass}
        data-toggle="modal"
        data-target={`#${id}`}
      >
        {buttonText}
      </button>
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
            <div className="modal-header">
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                {buttonCloseText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
