import React from "react";
import WorksQuestion1 from "./WorksQuestion1";
import WorksQuestion2 from "./WorksQuestion2";
import WorksQuestion3 from "./WorksQuestion3";

const Works = ({ answers, handleChange }) => {
  return (
    <>
      <WorksQuestion1 answers={answers} handleChange={handleChange} />
      <WorksQuestion2 answers={answers} handleChange={handleChange} />
      <WorksQuestion3 answers={answers} handleChange={handleChange} />
    </>
  );
};

export default Works;
