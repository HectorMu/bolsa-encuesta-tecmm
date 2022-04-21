import React from "react";

//Importando los componentes
import OptionsContainer from "@/components/Survey/OptionsContainer";

const OPTIONS = [
  "Antes de egresar",
  "Menos de seis meses",
  "Entre seis meses y un año",
  "Mas de un año",
];
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
