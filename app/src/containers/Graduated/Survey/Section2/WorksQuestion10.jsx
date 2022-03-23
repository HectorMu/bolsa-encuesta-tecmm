import React from "react";
import OptionsContainer from "../../../../components/Survey/OptionsContainer";

const OPTIONS = ["0%", "20%", "40%", "60%", "80%", "100%"];
const WorksQuestion10 = ({ handleChange, answers }) => {
  const ID = "WQ10S2";
  return (
    <div className="pb-3">
      <h5>Relacion del trabaho con su area de formacion:</h5>
      <OptionsContainer
        cols="col-12 col-md-2 col-lg-2 col-xl-2"
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"relacion_trabajo_formacion"}
        answers={answers}
        handleChange={handleChange}
      />
    </div>
  );
};

export default WorksQuestion10;
