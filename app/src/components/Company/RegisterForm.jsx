import { useState } from "react";
import { Link } from "react-router-dom";
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import Accordion from "@/components/Global/Accordion";
import Collapsable from "@/components/Global/Collapsable";

export const Entries = {
  correo: "",
  clave: "",
  confirmar: "",
  nombre_comercial: "",
  calle: "",
  numero_empresa: "",
  colonia: "",
  cp: "",
  municipio: "",
  estado: "",
  telefono: "",
  tipo_empresa: "",
  tamaño: "",
  actividad_economica: "",
};

const economicActivities = [
  "Agro-industrial",
  "Silvicultura",
  "Pesca y acuacultura",
  "Minería",
  "Alimentos, bebidas y tabaco",
  "Textiles, vestido y cuero",
  "Madera y sus productos",
  "Papel, imprenta y editoriales",
  "Química",
  "Caucho y Plástico",
  "Minerales no metálicos",
  "Industrias metálicas básicas",
  "Construcción",
  "Electricidad, gas y agua",
  "Comercio y turismo",
  "Transporte, almacenaje y comunicaciones",
  "Servicios financieros, seguros, actividades inmobiliarias y de alquiler",
  "Educación",
];

const RegisterForm = ({
  handleSubmit,
  company,
  onEditing,
  onChangePassword,
  handleChange,
  toggleChangePassword,
}) => {
  const [eActivitiesJson, setEActivitiesJson] = useState([]);
  return (
    <div>
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
                  setValue={handleChange}
                  name={"correo"}
                  value={company.correo}
                />
              </div>

              {onChangePassword ? (
                <>
                  <div className="col-lg-4">
                    <FloatingLabelInput
                      inputId="txtClave"
                      placeholder="Clave"
                      type="password"
                      setValue={handleChange}
                      name={"clave"}
                      value={company.clave}
                    />
                  </div>
                  <div className="col-lg-4">
                    <FloatingLabelInput
                      inputId="txtConfirmar"
                      placeholder="Confirmar"
                      type="password"
                      setValue={handleChange}
                      name={"confirmar"}
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
                  setValue={handleChange}
                  name={"nombre_comercial"}
                  value={company.nombre_comercial}
                />
              </div>
              <div className="col-lg-4">
                <select
                  className="form-control form-select mb-3"
                  style={{ height: "47px" }}
                  onChange={handleChange}
                  name={"tipo_empresa"}
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
                  setValue={handleChange}
                  type="tel"
                  name={"telefono"}
                  value={company.telefono}
                />
              </div>
              <div className="col-lg-6">
                <select
                  className="form-control form-select mb-3"
                  style={{ height: "47px" }}
                  onChange={handleChange}
                  name={"tamaño"}
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
                  setValue={handleChange}
                  name={"actividad_economica"}
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
                  setValue={handleChange}
                  name={"estado"}
                  value={company.estado}
                />
              </div>
              <div className="col-lg-4">
                <FloatingLabelInput
                  inputId="txtMunicipio"
                  placeholder="Municipio"
                  type="text"
                  setValue={handleChange}
                  name={"municipio"}
                  value={company.municipio}
                />
              </div>

              <div className="col-lg-4">
                <FloatingLabelInput
                  inputId="txtColonia"
                  placeholder="Colonia"
                  type="text"
                  setValue={handleChange}
                  name={"colonia"}
                  value={company.colonia}
                />
              </div>
              <div className="col-lg-4">
                <FloatingLabelInput
                  inputId="txtCalle"
                  placeholder="Calle"
                  type="text"
                  setValue={handleChange}
                  name={"calle"}
                  value={company.calle}
                />
              </div>
              <div className="col-lg-4">
                <FloatingLabelInput
                  inputId="txtNumero"
                  placeholder="Numero"
                  setValue={handleChange}
                  type="text"
                  name={"numero_empresa"}
                  value={company.numero_empresa}
                />
              </div>
              <div className="col-lg-4">
                <FloatingLabelInput
                  inputId="txtCP"
                  placeholder="Codigo Postal"
                  setValue={handleChange}
                  type="number"
                  name={"cp"}
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
    </div>
  );
};

export default RegisterForm;
