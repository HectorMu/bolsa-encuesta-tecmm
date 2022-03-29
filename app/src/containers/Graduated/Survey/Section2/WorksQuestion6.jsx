import React from "react";
import OptionsContainer from "@/components/Survey/OptionsContainer";
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";

const OPTIONS = [
  "Menos de un año",
  "Un año",
  "Dos años",
  "Tres años",
  "Mas de tres años",
];
const WorksQuestion6 = ({ handleChange, answers }) => {
  const ID = "WQ6S2";
  return (
    <div className="pb-3">
      <h5>Antiguedad en el empleo:</h5>
      <OptionsContainer
        cols={"col-12 col-md-2 col-lg-2 col-xl-2 mx-auto"}
        SECTIONID={ID}
        OPTIONS={OPTIONS}
        ANSWER={"antiguedad_empleo"}
        answers={answers}
        handleChange={handleChange}
      />
      <div className="row mt-2">
        <div className="col-12 col-lg-4">
          <FloatingLabelInput
            inputId="txtIngreso"
            placeholder="Año de ingreso"
            type="number"
            setValue={(e) =>
              handleChange("año_ingreso", Number(e.target.value) || 0)
            }
            value={answers.año_ingreso}
          />
        </div>
      </div>
    </div>
  );
};

export default WorksQuestion6;
