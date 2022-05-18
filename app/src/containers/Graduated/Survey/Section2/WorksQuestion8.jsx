import React from "react";

//Importando los componentes
import OptionsContainer from "@/components/Survey/OptionsContainer";

const OPTIONS = [
  "Técnico",
  "Supervisor",
  "Jéfe de area",
  "Funcionario",
  "Directivo",
  "Empresario",
];
const WorksQuestion8 = ({ handleChange, answers }) => {
  const ID = "WQ8S2";
  return (
    <div className="pb-3">
      <h5>Nivel jerárquico en el trabajo:</h5>
      <OptionsContainer
        cols="col-12 col-lg-3 col-md-12 col-xl-2"
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"nivel_jerarquico"}
        answers={answers}
        handleChange={handleChange}
      />
    </div>
  );
};

export default WorksQuestion8;
