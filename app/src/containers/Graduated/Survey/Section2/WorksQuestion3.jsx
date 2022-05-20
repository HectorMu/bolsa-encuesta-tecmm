import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
//import FloatingLabelInput from "../../../../components/Global/FloatingLabelInput";

const OPTIONS = [
  "Competencias laborales",
  "Titulo profesional",
  "Examen de selección",
  "Idioma extranjero",
  "Actitudes y habilidades socio-comunicativas (principios y valores)",
];

const WorksQuestion3 = ({ handleChange, answers }) => {
  const [requirements, setRequirements] = useState([]);
  const [otherOption, setOtherOption] = useState("");
  const [options, setOptions] = useState(OPTIONS);

  const addOtherOption = (e) => {
    e.preventDefault();
    if (otherOption === "")
      return toast.error("Ingresa una competencia válida");

    if (!options.includes(otherOption)) {
      setOptions((old) => [...old, otherOption]);
      setOtherOption(" ");

      if (!requirements.includes(otherOption)) {
        setRequirements((old) => [...old, otherOption]);
      }
    }
  };

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
    if (!answers.requisitos_contratacion) return;
    const requirementsList = answers.requisitos_contratacion;
    for (let i = 0; i < requirementsList.split(", ").length; i++) {
      const currentElement = requirementsList.split(", ")[i];

      const index = requirementsList.indexOf(currentElement);
      if (index !== -1) {
        const endIndex = index + currentElement.length;
        const extractedElement = requirementsList.substring(index, endIndex);

        setRequirements((old) => [...old, extractedElement]);

        if (extractedElement === "Ninguno") return;
        if (!options.includes(extractedElement)) {
          setOptions((old) => [...old, extractedElement]);
        }
      }
    }
  };

  useEffect(() => {
    handleChange("requisitos_contratacion", requirements.join(", "));
  }, [requirements]);

  useEffect(() => {
    checkForRequirementsInList();
  }, []);

  return (
    <>
      <div className="pb-3">
        <h5>Requisitos de contratación:</h5>
        <div className="row">
          {options.map((option, i) => (
            <div key={option} className="col">
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`optionCheck${i}`}
                  checked={requirements.includes(option)}
                  value={option}
                  onChange={(e) => setRequirementsHandler(e.target.value)}
                />
                <label className="form-check-label" htmlFor={`optionCheck${i}`}>
                  {option}
                </label>
              </div>
            </div>
          ))}
          <div className="col">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="noneCheck"
                checked={
                  requirements.includes("Ninguno") && requirements.length === 1
                }
                value={"Ninguno"}
                onChange={(e) => setRequirementsHandler("Ninguno")}
              />
              <label className="form-check-label" htmlFor="noneCheck">
                Ninguno
              </label>
            </div>
          </div>
          <div className="col-12 col-lg-12">
            <form onSubmit={addOtherOption}>
              <FloatingLabelInput
                placeholder="Otro..."
                inputId="other"
                setValue={(e) => setOtherOption(e.target.value)}
                value={otherOption}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorksQuestion3;
