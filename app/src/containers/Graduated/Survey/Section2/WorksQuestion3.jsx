import { useState, useEffect } from "react";
//import FloatingLabelInput from "../../../../components/Global/FloatingLabelInput";

const OPTIONS = [
  "Competencias laborales",
  "Titulo profesional",
  "Examen de seleccion",
  "Idioma extranjero",
  "Actitudes y habilidades socio-comunicativas (principios y valores)",
];

const WorksQuestion3 = ({ handleChange, answers }) => {
  //const ID = "WQ3S2";
  const [requirements, setRequirements] = useState([]);

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
      setRequirements((old) => [...old, requirement]);
    } else {
      if (requirements.includes("Ninguno") && requirements.length > 0) {
        setRequirements(requirements.filter((r) => r !== requirement));
        setRequirements(requirements.filter((r) => r !== "Ninguno"));
        return;
      }
      setRequirements(requirements.filter((r) => r !== requirement));
    }
  };

  const checkForRequirementsInList = () => {
    const requirementsList = answers.requisitos_contratacion;
    for (let i = 0; i < OPTIONS.length; i++) {
      const currentElement = OPTIONS[i];

      const index = requirementsList.indexOf(currentElement);
      if (index !== -1) {
        const endIndex = index + currentElement.length;
        const extractedElement = requirementsList.substring(index, endIndex);

        setRequirements((old) => [...old, extractedElement]);
        console.log(requirements);
      }
    }
  };

  useEffect(() => {
    handleChange("requisitos_contratacion", listFormatter.format(requirements));
  }, [requirements]);

  useEffect(() => {
    checkForRequirementsInList();
  }, []);

  return (
    <>
      <div className="pb-3">
        <h5>Requisitos de contratación:</h5>
        <div className="row">
          {OPTIONS.map((option, i) => (
            <div key={option} className="col">
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`exampleCheck${i}`}
                  checked={requirements.includes(option)}
                  value={option}
                  onChange={(e) => setRequirementsHandler(e.target.value)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`exampleCheck${i}`}
                >
                  {option}
                </label>
              </div>
            </div>
          ))}
          {/* //? TODO: The OTHER option */}
          {/* <div className="col-12 col-lg-4 col-md-3 col-xl-6 mt-1 mt-xl-2 mt-lg-2 mt-md-2">
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
          </div> */}
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
