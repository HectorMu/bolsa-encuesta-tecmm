import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DataTable from "@/components/Global/DataTable";
import Loading from "@/components/Global/Loading";

import useCompanySurvey from "@/hooks/useCompanySurvey";

import surveyService from "@/services/Company/survey.service";

import Question5 from "./Question5";
import Question6 from "./Question6";
import Question7 from "./Question7";
import Question8 from "./Question8";
import Question9 from "./Question9";

const SectionAnswers = {
  respuesta5: "",
  completamente: "",
  medianamente: "",
  ligeramente: "",
  ninguna_relacion: "",
  area_estudio: "",
  titulacion: "",
  experiencia_laboral: "",
  competencia_laboral: "",
  posicionamiento_institucion_egreso: "",
  conocimiento_idiomas_extranjeros: "",
  recomendaciones: "",
  personalidad: "",
  capacidad_liderazgo: "",
  otros_p8: "",
  respuesta9: "",
};

const SectionP6Answers = {
  carrera: "",
  mando_superior: "",
  mando_intermedio: "",
  supervisor: "",
  tecnico_auxiliar: "",
  otros_p6: "",
};

const index = () => {
  const [answers, setAnswers] = useState(SectionAnswers);
  const [p6answers, setP6Answers] = useState(SectionP6Answers);
  const { section, questions, isLoading, userSectionAnswers, userP6Answers } =
    useCompanySurvey();
  const navigate = useNavigate();

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });

  const handleP6DetailsChange = (key, value) =>
    setP6Answers({ ...p6answers, [key]: value });

  const saveAndSkipToNextSection = async () => {
    const results = await surveyService.saveSectionb(answers);
    if (!results.status) {
      return toast.error(results.statusText);
    }
    navigate("/company/survey/section/2");
  };

  const saveP6Details = async () => {
    const results = await surveyService.saveP6DetailsSectionb(p6answers);
    if (!results.status) {
      return toast.error(results.statusText);
    }
  };

  useEffect(() => {
    if (userSectionAnswers) {
      setAnswers(userSectionAnswers);
    }
    if (userP6Answers) {
      setP6Answers(userP6Answers);
    }
  }, [userSectionAnswers, userP6Answers]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h4 className="mb-4 border-bottom border-dark pb-3 text-center font-weight-border">
            {section?.descripcion}
          </h4>
          <Question5
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question6
            handleP6DetailsChange={handleP6DetailsChange}
            questions={questions}
          />
          <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-5">
            <button onClick={saveP6Details} className="btn btn-primary">
              <i class="fas fa-plus"></i> Agregar dato
            </button>
          </div>
          <DataTable
            data={userP6Answers}
            title="Número de egresados del Instituto Tecnológico y nivel jerárquico que ocupan en la organización"
            emptyDataText="Sin registros"
            searchText="Buscando por"
            actions={false}
            filtersConfig={{
              carrera: "Carrera",
              mando_superior: "Mando superior",
              mando_intermedio: "Mando intermedio",
              supervisor: "Supervisor o equivalente",
              tecnico_auxiliar: "Técnico o auxiliar",
              otros_p6: "Otros",
            }}
            renameHeaders={{
              carrera: "Carrera",
              mando_superior: "Mando superior",
              mando_intermedio: "Mando intermedio",
              supervisor: "Supervisor o equivalente",
              tecnico_auxiliar: "Técnico o auxiliar",
              otros_p6: "Otros",
            }}
          />
          <hr />
          <Question7
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question8
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <Question9
            answers={answers}
            handleChange={handleChange}
            questions={questions}
          />
          <div className="d-flex justify-content-center mt-5">
            <button
              onClick={saveAndSkipToNextSection}
              className="btn btn-primary"
            >
              Siguiente <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default index;
