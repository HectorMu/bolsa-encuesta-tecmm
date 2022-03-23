import React from "react";
import OptionsContainer from "../../../../components/Survey/OptionsContainer";

const OPTIONS = ["Ingles", "Frances", "Aleman", "Japones"];
const WorksQuestion4 = ({ handleChange, answers }) => {
  const ID = "WQ4S2";
  return (
    <div className="pb-3">
      <h5>Idioma que utiliza en su trabajo:</h5>
      <OptionsContainer
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"idioma_utilizado"}
        answers={answers}
        handleChange={handleChange}
        other={true}
        otherText="Otro"
      />
    </div>
  );
};

export default WorksQuestion4;
