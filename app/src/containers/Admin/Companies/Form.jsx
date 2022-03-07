import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//importando hooks
import useRouterHooks from "../../../hooks/useRouterHooks";

import FormCard from "../../../components/Global/FormCard";
import FloatingLabelInput from "../../../components/Global/FloatingLabelInput";
import Accordion from "../../../components/Global/Accordion";
import Collapsable from "../../../components/Global/Collapsable";
import FormEntries from "./FormEntries";
import economicActivities from "./economicActivities.json";

//Importando servicios
import companyService from "../../../services/companyService";
import toast from "react-hot-toast";

const Form = () => {
  const [company, setCompany] = useState(FormEntries);
  const [eActivitiesJson, setEActivitiesJson] = useState([]);
  const [onEditing, toggleEditing] = useState(false);
  const [onChangePassword, toggleChangePassword] = useState(false);
  const { location, navigate, params } = useRouterHooks();

  const handleEntriesChange = (key, value) =>
    setCompany({ ...company, [key]: value });

  const getCompanyFromFetch = useCallback(async () => {
    const companyFetched = await companyService.GetOne(params.id);

    if (!companyFetched.id) {
      navigate("/companies");
      toast.error("Este registro no existe.");
      return;
    }
    setCompany(companyFetched);
  }, [params.id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onEditing) {
      const results = await companyService.Update(company, params.id);
      if (!results.status) {
        return toast.error(results.statusText);
      }
      toast.success("Empresa editada correctamente");
      navigate("/companies");
    } else {
      const results = await companyService.Save(company);
      if (!results.status) {
        return toast.error(results.statusText);
      }
      toast.success("Empresa registrada correctamente");
      navigate("/companies");
    }
  };

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      getCompanyFromFetch();
      toggleEditing(true);
      return;
    }
    toggleChangePassword(true);
    toggleEditing(false);
  }, [location.pathname, getCompanyFromFetch]);
  return (
    <div>
      <FormCard title={onEditing ? "Editar empresa" : "Registrar empresa"}>
        <form onSubmit={handleSubmit}>
          <Accordion>
            <Collapsable id="companyData" text="Datos generales">
              {onEditing ? (
                <>
                  <div className="form-check mb-4 d-flex justify-content-end ">
                    <input
                      style={{ cursor: "pointer" }}
                      className="form-check-input "
                      onChange={() => toggleChangePassword(!onChangePassword)}
                      type="checkbox"
                      id="changeClave"
                    />
                    <label
                      style={{ cursor: "pointer" }}
                      className="form-check-label mr-3"
                      htmlFor="changeClave"
                    >
                      ¿Cambiar clave?
                    </label>
                  </div>
                </>
              ) : null}
              <div className="row">
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtCorreo"
                    placeholder="Correo"
                    type="email"
                    setValue={(e) =>
                      handleEntriesChange("correo", e.target.value)
                    }
                    value={company.correo}
                  />
                </div>

                {onChangePassword ? (
                  <>
                    <div
                      data-aos={`${onEditing ? `fade-down` : ""}`}
                      className="col-lg-4"
                    >
                      <FloatingLabelInput
                        inputId="txtClave"
                        placeholder="Clave"
                        type="password"
                        setValue={(e) =>
                          handleEntriesChange("clave", e.target.value)
                        }
                        value={company.clave}
                      />
                    </div>
                    <div
                      data-aos={`${onEditing ? `fade-down` : ""}`}
                      className="col-lg-4"
                    >
                      <FloatingLabelInput
                        inputId="txtConfirmar"
                        placeholder="Confirmar"
                        type="password"
                        setValue={(e) =>
                          handleEntriesChange("confirmar", e.target.value)
                        }
                        value={company.confirmar}
                      />
                    </div>
                  </>
                ) : null}

                <div className="col-lg-4">
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
                <div className="col-lg-4">
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
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtTelefono"
                    placeholder="Telefono"
                    type="number"
                    setValue={(e) =>
                      handleEntriesChange("telefono", parseInt(e.target.value))
                    }
                    value={company.telefono}
                  />
                </div>
                <div className="col-lg-6">
                  <select
                    className="form-control form-select mb-3"
                    style={{ height: "47px" }}
                    onChange={(e) =>
                      handleEntriesChange("tamaño", e.target.value)
                    }
                    value={company.tamaño}
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
                  <FloatingLabelInput
                    inputId="txtActividadEconomica"
                    placeholder={`${
                      !eActivitiesJson.includes(company.actividad_economica) &&
                      company.actividad_economica !== ""
                        ? "Especifique la actividad"
                        : "Actividad economica"
                    } `}
                    type="text"
                    list={"activitiesList"}
                    focusAction={() => setEActivitiesJson(economicActivities)}
                    setValue={(e) =>
                      handleEntriesChange("actividad_economica", e.target.value)
                    }
                    value={company.actividad_economica}
                  />
                  <datalist id="activitiesList">
                    {eActivitiesJson.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>
            </Collapsable>

            <Collapsable text="Direccion">
              <div className="row">
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtEstado"
                    placeholder="Estado"
                    type="text"
                    setValue={(e) =>
                      handleEntriesChange("estado", e.target.value)
                    }
                    value={company.estado}
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtMunicipio"
                    placeholder="Municipio"
                    type="text"
                    setValue={(e) =>
                      handleEntriesChange("municipio", e.target.value)
                    }
                    value={company.municipio}
                  />
                </div>

                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtColonia"
                    placeholder="Colonia"
                    type="text"
                    setValue={(e) =>
                      handleEntriesChange("colonia", e.target.value)
                    }
                    value={company.colonia}
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtCalle"
                    placeholder="Calle"
                    type="text"
                    setValue={(e) =>
                      handleEntriesChange("calle", e.target.value)
                    }
                    value={company.calle}
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtNumero"
                    placeholder="Numero"
                    type="number"
                    setValue={(e) =>
                      handleEntriesChange("numero_empresa", e.target.value)
                    }
                    value={company.numero_empresa}
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtCP"
                    placeholder="Codigo Postal"
                    type="number"
                    setValue={(e) =>
                      handleEntriesChange("cp", parseInt(e.target.value))
                    }
                    value={company.cp}
                  />
                </div>
              </div>
            </Collapsable>
          </Accordion>

          <div className="d-flex mt-3 justify-content-center">
            <button type="submit" className="btn btn-primary mx-3">
              {onEditing ? "Guardar cambios" : "Guardar"}
            </button>
            <Link to={-1} className="btn btn-danger ">
              Cancelar
            </Link>
          </div>
        </form>
      </FormCard>
    </div>
  );
};

export default Form;
