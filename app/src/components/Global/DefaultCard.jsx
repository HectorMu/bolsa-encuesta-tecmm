import React from "react";
const DefaultCard = ({
  title = "Default title",
  content = "Default content",
}) => {
  return (
    <div className="card mb-4">
      <div className="card-header">{title}</div>
      <div className="card-body">{content}</div>
    </div>
  );
};

export default DefaultCard;
