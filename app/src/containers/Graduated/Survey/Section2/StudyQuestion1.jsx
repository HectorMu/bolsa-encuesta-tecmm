import React from "react";

//Importando los componentes
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import OptionsContainer from "@/components/Survey/OptionsContainer";

const OPTIONS = ["Especialidad", "Maestria", "Doctorado", "Idiomas"];
const StudyQuestion1 = ({ answers, handleChange }) => {
  const ID = "SQ1S2";
  return (
    <div className="pb-4">
      <h5>¿Que estudia?</h5>
      <OptionsContainer
        ANSWER={"tipo_estudio"}
        OPTIONS={OPTIONS}
        SECTIONID={ID}
        other={true}
        answers={answers}
        handleChange={handleChange}
        otherText="Otro"
      />
      <div className="row">
        <div className="col-12 col-lg-12 col-md-12 col-xl-12">
          <div className="mt-4"></div>
          <FloatingLabelInput
            placeholder="Especialidad e institucion"
            inputId="txtEspecialidadInstitucion"
            type="text"
            setValue={(e) =>
              handleChange("especialidad_institucion", e.target.value)
            }
            value={answers.especialidad_institucion}
          />
        </div>
      </div>
    </div>
  );
};

export default StudyQuestion1;
