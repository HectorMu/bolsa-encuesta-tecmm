import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

//Importing services
import surveyService from "../../../../services/Graduated/survey.service";
//Importing first section question
import Question1 from "./Question1";
//importing question sections
import Study from "./Study";
import Works from "./Works";

//Graduated survey hook to get the current section data based on url param section_id
import useGraduatedSurvey from "../../../../hooks/useGraduatedSurvey";

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
  tipo_sector_empresa: "",
  sector_empresa: "",
  tamaño_empresa: "",
};
const index = () => {
  const { section, questions } = useGraduatedSurvey();
  const [answers, setAnswers] = useState(sectionAnswers);

  const navigate = useNavigate();

  const saveAndSkipToNextSection = async () => {
    const results = await surveyService.saveSection2(answers);
    if (!results.status) {
      return toast.error(results.statusText);
    }
    navigate("/graduated/survey/section/3");
  };

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });

  return (
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
        {answers.respuesta1 === "Trabaja" ? <Works /> : null}
        {answers.respuesta1 === "Estudia y trabaja" ? (
          <>
            <Study answers={answers} handleChange={handleChange} /> <Works />
          </>
        ) : null}
      </div>
      <div className="d-flex justify-content-center mt-5">
        <button onClick={saveAndSkipToNextSection} className="btn btn-primary">
          Siguiente <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </>
  );
};

export default index;
