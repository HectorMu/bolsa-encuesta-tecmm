import { useState } from "react";

import FormCard from "../../../components/Global/FormCard";
import FloatingLabelInput from "../../../components/Global/FloatingLabelInput";
import Accordion from "../../../components/Global/Accordion";
import Collapsable from "../../../components/Global/Collapsable";
import FormEntries from "./FormEntries";
import economicActivities from "./economicActivities.json";

const Form = () => {
  const [company, setCompany] = useState(FormEntries);
  const [eActivitiesJson, setEActivitiesJson] = useState([]);

  const handleEntriesChange = (key, value) =>
    setCompany({ ...company, [key]: value });

  const setActivity = (activity) => {
    handleEntriesChange("actividad_economica", activity);
    setEActivitiesJson([]);
  };

  const handleSubmit = () => {};
  return (
    <div>
      <FormCard title={"Registrar empresa"}>
        <form onSubmit={handleSubmit}>
          <Accordion>
            <Collapsable
              id="companyData"
              buttonClass="btn btn-link btn-block text-left text-primary font-weight-bolder collapsed"
              text="Datos generales"
            >
              <div className="row">
                <div className="col-lg-6">
                  <FloatingLabelInput
                    inputId="txtNombreComercial"
                    placeholder="Nombre comercial"
                    type="text"
                    setValue={(e) =>
                      handleEntriesChange("nombre_comercial", e.target.value)
                    }
                    value={company.nombre_comercial}
                  />
                </div>
                <div className="col-lg-6">
                  <select
                    className="form-control form-select mb-3"
                    style={{ height: "47px" }}
                    onChange={(e) =>
                      handleEntriesChange("tipo_empresa", e.target.value)
                    }
                    value={company.tipo_empresa}
                  >
                    <option value={""}>
                      Tipo de empresa (Seleccione una opción)
                    </option>
                    <option value="Pública">Pública</option>
                    <option value="Privada">Privada</option>
                    <option value="Social">Social</option>
                  </select>
                </div>
                <div className="col-lg-6">
                  <select
                    className="form-control form-select mb-3"
                    style={{ height: "47px" }}
                    onChange={(e) =>
                      handleEntriesChange("tamaño", e.target.value)
                    }
                    value={company.tipo_empresa}
                  >
                    <option value={""}>Tamaño (Seleccione una opción)</option>
                    <option value="Microempresa (De 1 a 30)">
                      Microempresa (De 1 a 30)
                    </option>
                    <option value="Pequeña (De 31 a 100)">
                      Pequeña (De 31 a 100)
                    </option>
                    <option value="Mediana (De 101 a 500)">
                      Mediana (De 101 a 500)
                    </option>
                    <option value="Grande (Mas de 500)">
                      Grande (Mas de 500)
                    </option>
                  </select>
                </div>
                <div className="col-lg-6">
                  <div className="position-relative">
                    <FloatingLabelInput
                      inputId="txtActividadEconomica"
                      placeholder="Actividad economica"
                      type="text"
                      focusAction={() => setEActivitiesJson(economicActivities)}
                      onChange={(e) =>
                        handleEntriesChange(
                          "actividad_economica",
                          e.target.value
                        )
                      }
                      value={company.actividad_economica}
                    />
                    <div
                      className="position-absolute w-100"
                      style={{ top: "47px" }}
                    >
                      <ul
                        className="list-group animated--grow-in"
                        style={{ maxHeight: "200px", overflow: "scroll" }}
                      >
                        {eActivitiesJson.length &&
                        company.actividad_economica !== "Otra" > 0 ? (
                          <>
                            {eActivitiesJson.map((activity) => (
                              <li
                                key={activity}
                                style={{ cursor: "pointer" }}
                                onClick={() => setActivity(activity)}
                                className="list-group-item"
                              >
                                {activity}
                              </li>
                            ))}
                          </>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Collapsable>
          </Accordion>
        </form>
      </FormCard>
    </div>
  );
};

export default Form;
