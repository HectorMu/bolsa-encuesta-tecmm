import React from "react";
import OptionsContainer from "@/components/Survey/OptionsContainer";

const OPTIONS = ["Menos de 5", "Entre 5 y 7", "Entre 8 y 10", "Mas de 10"];
const WorksQuestion7 = ({ handleChange, answers }) => {
  const ID = "WQ7S2";
  return (
    <div className="pb-3">
      <h5>Ingreso (Salario mínimo diario):</h5>
      <OptionsContainer
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"salario"}
        answers={answers}
        handleChange={handleChange}
      />
    </div>
  );
};

export default WorksQuestion7;
