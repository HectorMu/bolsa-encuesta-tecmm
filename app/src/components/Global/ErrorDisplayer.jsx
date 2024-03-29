import React from "react";

const ErrorDisplayer = ({ message }) => {
  return (
    <div className="col-lg-8 mx-auto mb-3">
      <div className="card text-center p-3">
        <div className="card-body ">
          <i className="fas fa-exclamation-circle fa-4x text-danger"></i>
          <h3 className="text-danger font-weight-bolder mt-5">{message}</h3>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplayer;
