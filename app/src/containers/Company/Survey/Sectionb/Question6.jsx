import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import { useState, useEffect } from "react";
import useSession from "@/hooks/useSession";

import surveyService from "@/services/Company/survey.service";

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

const SectionP6Answers = {
  carrera: "",
  mando_superior: "",
  mando_intermedio: "",
  supervisor: "",
  tecnico_auxiliar: "",
  otros_p6: "",
};

const Question6 = ({ questions }) => {
  const [newAnswerP6, setnewAnswerP6] = useState(SectionP6Answers);
  const [detailsP6, setDetailsP6] = useState([]);
  const { verifySession } = useSession();

  const getP6DetailsHandler = async () => {
    const fetchedDetails = await verifySession(() =>
      surveyService.getP6Answers()
    );
    setDetailsP6(fetchedDetails);
  };

  const handleP6DetailsChange = (key, value) =>
    setnewAnswerP6({ ...newAnswerP6, [key]: value });

  const saveAnswerP6 = async () => {
    const results = await verifySession(() =>
      surveyService.saveP6DetailsSectionb(newAnswerP6)
    );
    getP6DetailsHandler();
  };

  const deleteAnswerP6 = async (detail) => {
    const results = await verifySession(() =>
      surveyService.deleteP6Answer(detail.id)
    );
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
            onChange={(e) => handleP6DetailsChange("carrera", e.target.value)}
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
          <div key={key} className="col-6 col-lg-3 col-md-3 col-xl-3">
            <FloatingLabelInput
              ranges={{ min: 0, max: 100 }}
              placeholder={value}
              inputId={`input${key}`}
              type="number"
              setValue={(e) => handleP6DetailsChange(key, e.target.value)}
              value={newAnswerP6[key]}
            />
          </div>
        ))}
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-5">
        <button onClick={saveAnswerP6} className="btn btn-primary">
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
                  <th scope="col">{value}</th>
                ))}
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {detailsP6.map((detail) => (
                <tr>
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
