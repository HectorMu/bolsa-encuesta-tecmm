import React from "react";
import OptionsContainer from "@/components/Survey/OptionsContainer";

const OPTIONS = ["Base", "Eventual", "Contrato"];
const WorksQuestion9 = ({ handleChange, answers }) => {
  const ID = "WQ9S2";
  return (
    <div className="pb-3">
      <h5>Condición de trabajo:</h5>
      <OptionsContainer
        cols="col-md-12 col-lg-4 col-xl-4"
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"condicion_trabajo"}
        answers={answers}
        handleChange={handleChange}
        other={true}
        otherText={"Otros"}
      />
    </div>
  );
};

export default WorksQuestion9;
