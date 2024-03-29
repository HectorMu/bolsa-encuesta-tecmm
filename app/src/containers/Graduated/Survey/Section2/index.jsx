import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

//Importing hooks
import useSession from "@/hooks/useSession";

//importing custom components
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

//Importing services
import surveyService from "@/services/Graduated/survey.service";

//Importing first section question
import Question1 from "./Question1";

//importing question sections
import Study from "./Study";
import Works from "./Works";

//Graduated survey hook to get the current section data based on url param section_id
import useGraduatedSurvey from "@/hooks/useGraduatedSurvey";
import usePreventGraduatedSurveyJumps from "@/hooks/usePreventGraduatedSurveyJumps";

const sectionAnswers = {
  respuesta1: "",
  tipo_estudio: "",
  especialidad_institucion: "",
  tiempo_primer_empleo: "",
  medio_obtener_empleo: "",
  requisitos_contratacion: "",
  idioma_utilizado: "",
  idioma_hablar: "",
  idioma_escribir: "",
  idioma_leer: "",
  idioma_escuchar: "",
  antiguedad_empleo: "",
  año_ingreso: "",
  salario: "",
  nivel_jerarquico: "",
  condicion_trabajo: "",
  relacion_trabajo_formacion: "",
  organismo_empresa: "",
  actividad_principal_empresa: "",
  razon_social: "",
  calle: "",
  numero: "",
  colonia: "",
  cp: "",
  ciudad: "",
  municipio: "",
  estado: "",
  telefono_empresa: "",
  telefono_ext_empresa: "",
  fax_empresa: "",
  email_empresa: "",
  pagina_web: "",
  jefe_inmediato: "",
  sector_empresa: "",
  tamaño_empresa: "",
};
const index = () => {
  const { section, questions, isLoading, userSectionAnswers, error } =
    useGraduatedSurvey();
  const [onceQuestionsAnswered, setOnceQuestionsAnswered] = useState(false);
  const [answers, setAnswers] = useState(sectionAnswers);
  const { verifySession } = useSession();
  const { answeredSections, setAnsweredSectionHandler } =
    usePreventGraduatedSurveyJumps();

  const navigate = useNavigate();

  const saveAndSkipToNextSection = async () => {
    const tLoading = toast.loading("Guardando...");

    if (answers.idioma_utilizado === "Ninguno") {
      answers.idioma_escribir = 0;
      answers.idioma_escuchar = 0;
      answers.idioma_hablar = 0;
      answers.idioma_leer = 0;
    }
    const results = await verifySession(() =>
      surveyService.saveSection2(answers)
    );
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    setAnsweredSectionHandler("s2", true);
    setAnsweredSectionHandler("isWorking", true);
    toast.dismiss(tLoading);
    if (
      answers.respuesta1 === "Estudia" ||
      answers.respuesta1 === "No estudia ni trabaja"
    ) {
      setAnsweredSectionHandler("s2", true);
      setAnsweredSectionHandler("s3", true);
      setAnsweredSectionHandler("isWorking", false);
      return navigate("/graduated/survey/section/4");
    }
    navigate("/graduated/survey/section/3");
  };

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });

  const setFetchedAnswers = useCallback(() => {
    if (!userSectionAnswers?.respuesta1) return;
    setAnswers(userSectionAnswers);
    if (
      userSectionAnswers.tiempo_primer_empleo?.length > 0 &&
      userSectionAnswers.medio_obtener_empleo?.length > 0
    ) {
      setOnceQuestionsAnswered(true);
    }
  }, [userSectionAnswers]);

  useEffect(() => {
    if (!answeredSections.s1) {
      navigate(`/graduated/survey/section/1`);
    }
  }, [answeredSections.s1]);

  useEffect(() => {
    setFetchedAnswers();
  }, [setFetchedAnswers]);

  if (error.error) {
    return <ErrorDisplayer message={error.message} />;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h4 className="mb-4 border-bottom border-dark pb-3 text-center font-weight-bolder">
            {section?.descripcion}
          </h4>
          <Question1
            handleChange={handleChange}
            answers={answers}
            questions={questions}
          />
          <div className="mt-2">
            {answers.respuesta1 === "Estudia" ? (
              <Study answers={answers} handleChange={handleChange} />
            ) : null}
            {answers.respuesta1 === "Trabaja" ? (
              <Works
                onceQuestionsAnswered={onceQuestionsAnswered}
                answers={answers}
                handleChange={handleChange}
              />
            ) : null}
            {answers.respuesta1 === "Estudia y trabaja" ? (
              <>
                <Study answers={answers} handleChange={handleChange} />
                <Works
                  onceQuestionsAnswered={onceQuestionsAnswered}
                  answers={answers}
                  handleChange={handleChange}
                />
              </>
            ) : null}
          </div>
          <div className="d-flex justify-content-center mt-5">
            <Link
              to={"/graduated/survey/section/1"}
              className="btn btn-outline-primary mr-2"
            >
              <i className="fas fa-arrow-left"></i> Anterior
            </Link>
            <button
              onClick={saveAndSkipToNextSection}
              className="btn btn-outline-primary"
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
