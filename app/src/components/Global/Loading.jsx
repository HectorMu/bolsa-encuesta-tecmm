import React from "react";
const Loading = ({ text = "Loading...", color = "primary", small }) => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className={`spinner-border text-${color} ${
          small ? `spinner-border-sm` : ``
        }`}
      ></div>
    </div>
  );
};

export default Loading;
