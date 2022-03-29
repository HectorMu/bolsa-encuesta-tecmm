import React from "react";
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";

const ENTRIES = {
  idioma_hablar: "Hablar",
  idioma_escribir: "Escribir",
  idioma_leer: "Leer",
  idioma_escuchar: "Escuchar",
};
const WorksQuestion5 = ({ handleChange, answers }) => {
  return (
    <div className="pb-3">
      <h5>
        En que proporción utiliza cada habilidad del idioma extranjero en su
        desempeño laboral (%):
      </h5>

      <div className="row">
        {Object.entries(ENTRIES).map(([key, value]) => (
          <div key={key} className="col-md-3 col-xl-3">
            <FloatingLabelInput
              placeholder={value}
              setValue={(e) => handleChange(key, e.target.value)}
              value={answers[key]}
              inputId={`input${key}`}
              type={"number"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorksQuestion5;
