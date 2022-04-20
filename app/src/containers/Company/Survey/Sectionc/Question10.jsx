import { Fragment } from "react";
import OptionsContainer from "@/components/Survey/OptionsContainer";
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";

const OPTIONS = [1, 2, 3, 4, 5];

const subQuestions = {
  habilidad_resolver_conflictos: "Habilidad para resolver conflictos",
  ortografia_redaccion: "Ortografía y redacción de documentos",
  mejora_procesos: "Mejora de procesos",
  trabajo_equipo: "Trabajo en equipo",
  habilidad_administrar_tiempo: "Habilidad para administrar tiempo",
  seguridad_personal: "Seguridad personal",
  facilidad_palabra: "Facilidad de palabra",
  gestion_proyectos: "Gestión de proyectos",
  puntualidad_asistencia: "Puntualidad y asistencia",
  cumplimiento_normas: "Cumplimiento de las normas",
  integracion_trabajo: "Integración al trabajo",
  creatividad_innovacion: "Creatividad e innovación",
  capacidad_negociacion: "Capacidad de negociación",
  capacidad_analisis: "Capacidad de abstracción, análisis y síntesis",
  liderazgo: "Liderazgo y toma de decisiones",
  adaptacion_cambio: "Adaptación al cambio",
};
const Question10 = ({ handleChange, answers, questions }) => {
  return (
    <div className="pb-4">
      <h5>{questions[0]?.descripcion}:</h5>

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
                SECTIONID={`Q10SCS${i}`}
                handleChange={handleChange}
                OPTIONS={OPTIONS}
                answers={answers}
                ANSWER={key}
              />
            </div>
          </Fragment>
        ))}
        <div className="col-12 col-xl-4">
          <div className="d-flex align-items-center h-100">
            <FloatingLabelInput
              placeholder="Otras competencias (Especifique)"
              inputId="txtOtrosDetalle"
              type="text"
              setValue={(e) => handleChange("otros_detalle", e.target.value)}
              value={answers.otros_detalle}
            />
          </div>
        </div>
        <div className="col-12 col-xl-8 mb-4">
          <OptionsContainer
            cols="col-2 col-md-2 col-xl-1 mx-auto"
            SECTIONID={"Q10SCOther"}
            handleChange={handleChange}
            OPTIONS={OPTIONS}
            answers={answers}
            ANSWER={"otros"}
          />
        </div>
      </div>
    </div>
  );
};

export default Question10;
