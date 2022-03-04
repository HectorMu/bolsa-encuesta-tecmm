import React from "react";

const Accordion = ({ id = "accordionContainer", children }) => {
  return (
    <div className="accordion" id={id}>
      {children}
    </div>
  );
};

export default Accordion;
