import { Fragment } from "react";
import useServiceFetch from "@/hooks/useServiceFetchV2";
import surveyService from "@/services/Graduated/survey.service";

//Importando los componentes
import OptionsContainer from "@/components/Survey/OptionsContainer";
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import Loading from "@/components/Global/Loading";

import useForm from "@/hooks/useForm";
import toast from "react-hot-toast";

const OPTIONS = [1, 2, 3, 4, 5];

const subQuestions = {
  area_estudio: "Área o campo de estudio",
  titulacion: "Titulación",
  experiencia_laboral: "Experiencia Laboral/Práctica (Antes de egresar)",
  competencia_laboral:
    "Competencia Laboral: Habilidad para resolver problemas, capacidad de analisis, habilidad para el aprendizaje, creatividad, administración del tiempo, capacidad de negociación, habilidades manuales, trabajo en equipo, iniciativa, honestidad, persistencia, etc.",
  posicionamiento_institucion_egreso:
    "Posicionamiento de la Institución de Egreso",
  conocimiento_idiomas_extranjeros: "Conocimiento de Idiomas Extranjeros",
  recomendaciones: "Recomendaciones/Referencias",
  personalidad: "Personalidad/Actitudes",
  capacidad_liderazgo: "Capacidad de liderazgo",
};
const Question4 = ({ handleChange, answers, questions }) => {
  const {
    form,
    handleChange: handleAspectChange,
    reset,
  } = useForm({ aspecto: "", valoracion: "" });
  const {
    hookData: others,
    refreshData,
    isLoading,
  } = useServiceFetch(surveyService.getSection3Others, [], []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await surveyService.saveSection3Other(form);
    if (!results.status) {
      return toast.error(results.statusText);
    }
    reset();
    refreshData();
    toast.success(results.statusText, { position: "bottom-right" });
  };

  const deleteAspectHandler = async (otherAspect) => {
    const results = await surveyService.deleteSection3Other(otherAspect.id);
    if (!results.status) {
      return toast.error(results.statusText);
    }
    toast.success(results.statusText, { position: "bottom-right" });
    refreshData();
  };

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
      <div className="row">
        <div className="col-12 col-lg-12 col-xl-12">
          <h5>Otros aspectos:</h5>
        </div>
        <div className="col-12 col-lg-12 col-xl-12">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-lg-7 col-xl-7">
                <FloatingLabelInput
                  setValue={handleAspectChange}
                  placeholder="Aspecto"
                  name="aspecto"
                  inputId="txtAspect"
                  value={form.aspecto}
                />
              </div>
              <div className="col-12 col-lg-4 col-xl-4">
                <FloatingLabelInput
                  setValue={handleAspectChange}
                  name="valoracion"
                  placeholder="Valoración"
                  inputId="txtValoration"
                  value={form.valoracion}
                  type="number"
                />
              </div>
              <div className="col-12 col-lg-1 col-xl-1">
                <button
                  type="submit"
                  className="btn btn-outline-primary  w-100 "
                >
                  <i className="fas fa-check"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-12 col-lg-12 col-xl-12 mt-3 ">
          {isLoading ? (
            <Loading small />
          ) : others.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-sm text-black">
                <thead>
                  <tr>
                    <th scope="col">Aspecto</th>
                    <th scope="col">Valoración</th>
                    <th scope="col">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {others.map((other) => (
                    <tr>
                      <td>{other.aspecto}</td>
                      <td>{other.valoracion}</td>
                      <td>
                        <button
                          onClick={() => deleteAspectHandler(other)}
                          className="btn btn-outline-danger  btn-sm"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h4 className="text-center font-weight-bolder text-primary">
              Agrega aspectos que consideres necesarios para la contratación
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question4;
