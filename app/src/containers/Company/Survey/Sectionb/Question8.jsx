import { Fragment } from "react";

//Importando componentes
import OptionsContainer from "@/components/Survey/OptionsContainer";

const OPTIONS = ["No requerido", "Requerido"];

const subQuestions = {
  area_estudio: "Area o campo de estudio",
  titulacion: "Titulacion",
  experiencia_laboral: "Experiencia Laboral/Practica (Antes de egresar)",
  competencia_laboral:
    "Competencia Laboral: Habilidad para resolver problemas, capacidad de analisis, habilidad para el aprendizaje, creatividad, administracion del tiempo, capacidad de negociacion, habilidades manuales, trabajo en equipo, iniciativa, honestidad, persistencia, etc.",
  posicionamiento_institucion_egreso:
    "Posicionamiento de la Institucion de Egreso",
  conocimiento_idiomas_extranjeros: "Conocimiento de Idiomas Extranjeros",
  recomendaciones: "Recomendaciones/Referencias",
  personalidad: "Personalidad/Actitudes",
  capacidad_liderazgo: "Capacidad de liderazgo",
};
const Question8 = ({ handleChange, answers, questions }) => {
  return (
    <div className="pb-4">
      <h5 className="mb-3 text-justify text-md-left">
        {questions[3]?.descripcion}:
      </h5>

      <div className="row mt-4">
        {Object.entries(subQuestions).map(([key, value], i) => (
          <Fragment key={key}>
            <div className="col-12 col-xl-5">
              <div className="d-flex align-items-center h-100">
                <h6>{value}</h6>
              </div>
            </div>
            <div className="col-12 col-xl-7 mb-4">
              <OptionsContainer
                cols="col-6"
                SECTIONID={`Q8SBS${i}`}
                handleChange={handleChange}
                OPTIONS={OPTIONS}
                answers={answers}
                ANSWER={key}
              />
            </div>
          </Fragment>
        ))}
        <div className="col-12 col-xl-5">
          <div className="d-flex align-items-center h-100">
            <h6>Otros</h6>
          </div>
        </div>
        <div className="col-12 col-xl-12 mb-4">
          <OptionsContainer
            cols="col-6"
            ANSWER={"otros_p8"}
            OPTIONS={["No requerido"]}
            SECTIONID={"Q8SBOther"}
            other={true}
            answers={answers}
            handleChange={handleChange}
            otherText="Requerido"
          />
        </div>
      </div>
    </div>
  );
};

export default Question8;
