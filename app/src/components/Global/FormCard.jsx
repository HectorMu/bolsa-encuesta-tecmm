import React from "react";

const FormCard = ({ title, children }) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h5 className="m-0 font-weight-bold text-primary text-center">
          {title}
        </h5>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default FormCard;
