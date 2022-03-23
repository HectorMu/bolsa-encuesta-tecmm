import React from "react";
import StudyQuestion1 from "./StudyQuestion1";

const Study = ({ answers, handleChange }) => {
  return <StudyQuestion1 answers={answers} handleChange={handleChange} />;
};

export default Study;
