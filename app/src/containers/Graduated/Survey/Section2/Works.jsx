import React from "react";
import WorksQuestion1 from "./WorksQuestion1";
import WorksQuestion2 from "./WorksQuestion2";
import WorksQuestion3 from "./WorksQuestion3";
import WorksQuestion4 from "./WorksQuestion4";
import WorksQuestion5 from "./WorksQuestion5";
import WorksQuestion6 from "./WorksQuestion6";
import WorksQuestion7 from "./WorksQuestion7";
import WorksQuestion8 from "./WorksQuestion8";
import WorksQuestion9 from "./WorksQuestion9";
import WorksQuestion10 from "./WorksQuestion10";
import WorksCompanyData from "./WorksCompanyData";

const Works = ({ answers, handleChange }) => {
  return (
    <>
      <WorksQuestion1 answers={answers} handleChange={handleChange} />
      <WorksQuestion2 answers={answers} handleChange={handleChange} />
      <WorksQuestion3 answers={answers} handleChange={handleChange} />
      <WorksQuestion4 answers={answers} handleChange={handleChange} />
      <WorksQuestion5 answers={answers} handleChange={handleChange} />
      <WorksQuestion6 answers={answers} handleChange={handleChange} />
      <WorksQuestion7 answers={answers} handleChange={handleChange} />
      <WorksQuestion8 answers={answers} handleChange={handleChange} />
      <WorksQuestion9 answers={answers} handleChange={handleChange} />
      <WorksQuestion10 answers={answers} handleChange={handleChange} />
      <WorksCompanyData answers={answers} handleChange={handleChange} />
    </>
  );
};

export default Works;
