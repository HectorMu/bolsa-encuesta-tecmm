import { useState, useEffect } from "react";
import FloatingLabelInput from "../../../../components/Global/FloatingLabelInput";

const WorksQuestion3 = ({ handleChange, answers }) => {
  const ID = "WQ3S2";
  const [requirements, setRequirements] = useState([]);
  const [other, setOther] = useState("");
  const listFormatter = new Intl.ListFormat("es");

  const setRequirementsHandler = (requirement) => {
    if (requirement === "Ninguno") {
      setRequirements(["Ninguno"]);
      return;
    }
    if (!requirements.includes(requirement)) {
      if (requirements.includes("Ninguno") && requirements.length > 0) {
        setRequirements([...requirements, requirement]);
        setRequirements(requirements.filter((r) => r !== "Ninguno"));
        return;
      }
      setRequirements([...requirements, requirement]);
    } else {
      if (requirements.includes("Ninguno") && requirements.length > 0) {
        setRequirements(requirements.filter((r) => r !== requirement));
        setRequirements(requirements.filter((r) => r !== "Ninguno"));
        return;
      }
      setRequirements(requirements.filter((r) => r !== requirement));
    }
  };

  useEffect(() => {
    handleChange("requisitos_contratacion", listFormatter.format(requirements));
  }, [requirements]);

  return (
    <>
      <div className="pb-3">
        <h5>Requisitos de contratacion:</h5>
        <div className="row">
          <div className="col">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={requirements.includes("Competencias laborales")}
                value={"Competencias laborales"}
                onChange={(e) => setRequirementsHandler(e.target.value)}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Competencias laborales
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck2"
                checked={requirements.includes("Titulo profesional")}
                value={"Titulo profesional"}
                onChange={(e) => setRequirementsHandler(e.target.value)}
              />
              <label className="form-check-label" htmlFor="exampleCheck2">
                Titulo profesional
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck3"
                checked={requirements.includes("Examen de seleccion")}
                value={"Examen de seleccion"}
                onChange={(e) => setRequirementsHandler(e.target.value)}
              />
              <label className="form-check-label" htmlFor="exampleCheck3">
                Examen de seleccion
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={requirements.includes("Idioma Extranjero")}
                id="exampleCheck4"
                value={"Idioma Extranjero"}
                onChange={(e) => setRequirementsHandler(e.target.value)}
              />
              <label className="form-check-label" htmlFor="exampleCheck4">
                Idioma Extranjero
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck5"
                checked={requirements.includes(
                  "Actitudes y habilidades socio-comunicativas (principios y valores)"
                )}
                value={
                  "Actitudes y habilidades socio-comunicativas (principios y valores)"
                }
                onChange={(e) => setRequirementsHandler(e.target.value)}
              />
              <label className="form-check-label" htmlFor="exampleCheck5">
                Actitudes y habilidades socio-comunicativas (principios y
                valores)
              </label>
            </div>
          </div>
          <div className="col-12 col-lg-4 col-md-3 col-xl-6 mt-1 mt-xl-2 mt-lg-2 mt-md-2">
            <div className="d-flex  justify-content-start align-items-center ">
              <div className="form-group form-check w-100">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck6"
                  checked={requirements.includes("Otro")}
                  value={"Otro"}
                  onChange={(e) => setRequirementsHandler(e.target.value)}
                />
                {!requirements.includes("Otro") ? (
                  <label className="form-check-label" htmlFor={"exampleCheck6"}>
                    Otro
                  </label>
                ) : (
                  <FloatingLabelInput
                    placeholder={"Otro"}
                    inputId={`txtOtra${ID}`}
                    type="text"
                    setValue={(e) => setOther(e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck7"
                checked={
                  requirements.includes("Ninguno") && requirements.length === 1
                }
                value={"Ninguno"}
                onChange={(e) => setRequirementsHandler(e.target.value)}
              />
              <label className="form-check-label" htmlFor="exampleCheck7">
                Ninguno
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorksQuestion3;
