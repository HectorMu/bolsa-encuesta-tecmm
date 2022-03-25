import { Fragment } from "react";
import OptionsContainer from "../../../../components/Survey/OptionsContainer";

const OPTIONS = [1, 2, 3, 4, 5];

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
  otros: "Otros",
};
const Question4 = ({ handleChange, answers, questions }) => {
  console.log(answers);
  return (
    <div className="pb-4">
      <h5>{questions[3]?.descripcion}:</h5>

      <div className="row mt-4">
        {Object.entries(subQuestions).map(([key, value], i) => (
          <Fragment key={key}>
            <div className="col-12 col-xl-4">
              <div className="d-flex align-items-center h-100">
                <h6>{value}</h6>
              </div>
            </div>
            <div className="col-12 col-xl-8 mb-4">
              <OptionsContainer
                cols="col-2 col-md-2 col-xl-1 mx-auto"
                SECTIONID={`Q4S3S${i}`}
                handleChange={handleChange}
                OPTIONS={OPTIONS}
                answers={answers}
                ANSWER={key}
              />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Question4;
