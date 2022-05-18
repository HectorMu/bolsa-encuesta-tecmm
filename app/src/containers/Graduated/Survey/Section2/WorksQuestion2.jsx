import React from "react";

//Importando los componentes
import OptionsContainer from "@/components/Survey/OptionsContainer";

const OPTIONS = [
  "Bolsa de trabajo del plantel",
  "Contactos personales",
  "Residencia profesional",
  "Medios masivos de comunicación",
];
const WorksQuestion2 = ({ handleChange, answers }) => {
  const ID = "WQ1S2";
  return (
    <div className="pb-3">
      <h5>Medio para obtener el empleo:</h5>
      <OptionsContainer
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"medio_obtener_empleo"}
        answers={answers}
        handleChange={handleChange}
        other={true}
        otherText={"Otros"}
      />
    </div>
  );
};

export default WorksQuestion2;
