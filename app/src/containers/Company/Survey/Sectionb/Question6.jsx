import { useState, useEffect } from "react";
import useForm from "@/hooks/useForm";
import toast from "react-hot-toast";

//Importando los componentes
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import useSession from "@/hooks/useSession";

//Importando los servicios
import surveyService from "@/services/Company/survey.service";

//Carreras para llenar options del select
const careers = [
  "Ing. en Gestión Empresarial",
  "Ing. Industrial",
  "Ing. en Sistemas Computacionales",
  "Ing. Electromecánica",
  "Ing. Civil",
  "Ing. en Sistemas Automotrices",
];

const ENTRIES = {
  mando_superior: "Mando superior",
  mando_intermedio: "Mando intermedio",
  supervisor: "Supervisor o equivalente",
  tecnico_auxiliar: "Tecnico o Auxiliar",
  otros_p6: "Otros",
};

//Entradas del formulario (objeto con los datos a capturar en el formulario)
const SectionP6Answers = {
  carrera: "",
  mando_superior: "",
  mando_intermedio: "",
  supervisor: "",
  tecnico_auxiliar: "",
  otros_p6: "",
};

const Question6 = ({ questions }) => {
  const { form: newAnswerP6, handleChange, reset } = useForm(SectionP6Answers);

  const [detailsP6, setDetailsP6] = useState([]);
  const { verifySession } = useSession();

  const getP6DetailsHandler = async () => {
    const fetchedDetails = await verifySession(() =>
      surveyService.getP6Answers()
    );
    setDetailsP6(fetchedDetails);
  };

  const saveAnswerP6 = async () => {
    const results = await verifySession(() =>
      surveyService.saveP6DetailsSectionb(newAnswerP6)
    );
    if (!results.status) {
      return toast.error(results.statusText);
    }
    toast.success("Agregado", { position: "bottom-center" });
    getP6DetailsHandler();
    reset();
  };

  const deleteAnswerP6 = async (detail) => {
    const results = await verifySession(() =>
      surveyService.deleteP6Answer(detail.id)
    );
    if (!results.status) {
      return toast.error(results.statusText);
    }
    getP6DetailsHandler();
  };

  useEffect(() => {
    getP6DetailsHandler();
  }, []);

  return (
    <div>
      <h5>{questions[1]?.descripcion}:</h5>
      <div className="row">
        <div className="col-12 col-lg-12 col-md-12 col-xl-12">
          <select
            className="form-control form-select mb-3"
            style={{ height: "47px" }}
            value={newAnswerP6.carrera}
            name={"carrera"}
            onChange={handleChange}
          >
            <option>Carrera (Seleccione una opcion)</option>
            {careers.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {Object.entries(ENTRIES).map(([key, value]) => (
          <div
            key={key + value}
            className="col-12 col-sm-12 col-lg-4 col-md-6 col-xl-4"
          >
            <FloatingLabelInput
              ranges={{ min: 0, max: 100 }}
              placeholder={value}
              inputId={`input${key}`}
              type="number"
              name={key}
              setValue={handleChange}
              value={newAnswerP6[key]}
            />
          </div>
        ))}
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-5">
        <button
          disabled={
            Object.values(newAnswerP6).filter((value) => value === "").length >
            0
          }
          onClick={saveAnswerP6}
          className="btn btn-primary"
        >
          <i className="fas fa-plus"></i> Agregar dato
        </button>
      </div>
      {detailsP6.length > 0 ? (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Carrera</th>
                {Object.entries(ENTRIES).map(([key, value]) => (
                  <th key={key} scope="col">
                    {value}
                  </th>
                ))}
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {detailsP6.map((detail, i) => (
                <tr key={i}>
                  <td>{detail.carrera}</td>
                  <td>{detail.mando_superior}</td>
                  <td>{detail.mando_intermedio}</td>
                  <td>{detail.supervisor}</td>
                  <td>{detail.tecnico_auxiliar}</td>
                  <td>{detail.otros_p6}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteAnswerP6(detail)}
                    >
                      <i className="fas fa-times"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default Question6;
