import React from "react";
const Loading = ({ text = "Loading...", color = "primary", small }) => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className={`spinner-border text-${color} ${
          small ? `spinner-border-sm` : ``
        }`}
      >
        <span className="visually-hidden">{text}</span>
      </div>
    </div>
  );
};

export default Loading;
