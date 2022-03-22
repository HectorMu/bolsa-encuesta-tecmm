import React from "react";
import OptionsContainer from "../../../../components/Survey/OptionsContainer";

const OPTIONS = {
  ANTES_EGRESAR: "Antes de egresar",
  MENOS_SEIS_MESES: "Menos de seis meses",
  ENTRE_6M_1A: "Entre seis meses y un año",
  MAS_DE_1A: "Mas de un año",
};
const WorksQuestion1 = ({ handleChange, answers }) => {
  const ID = "WQ2S2";
  return (
    <div className="pb-3">
      <h5>Tiempo transcurrido para obtener el primer empleo:</h5>
      <OptionsContainer
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"tiempo_primer_empleo"}
        answers={answers}
        handleChange={handleChange}
      />
    </div>
  );
};

export default WorksQuestion1;
