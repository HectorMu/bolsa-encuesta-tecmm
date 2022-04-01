import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import Accordion from "@/components/Global/Accordion";
import Collapsable from "@/components/Global/Collapsable";
import { Link } from "react-router-dom";

const careers = [
  "Ing. en Gestión Empresarial",
  "Ing. Industrial",
  "Ing. en Sistemas Computacionales",
  "Ing. Electromecánica",
  "Ing. Civil",
  "Ing. en Sistemas Automotrices",
];

export const Entries = {
  correo: "",
  clave: "",
  confirmar: "",
  no_control: "",
  nombre_completo: "",
  fechaNacimiento: "",
  curp: "",
  sexo: "",
  estado_civil: "",
  calle: "",
  numero_casa: "",
  colonia: "",
  cp: "",
  municipio: "",
  estado: "",
  telefono: "",
  tel_casa: "",
  carrera: "",
  fecha_egreso: "",
  titulado: "",
  paquetes_computacionales: "",
};

export const NestedEntries = {
  idioma_extranjero: {
    Otro: "",
    Ingles: "",
  },
};

const RegisterForm = ({
  handleSubmit,
  graduated,
  onEditing,
  onChangePassword,
  handleEntriesChange,
  handleIdiomaExtranjeroChange,
  toggleChangePassword,
  idiomaExtranjero,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Accordion>
        <Collapsable
          id="DatosGenerales"
          text="Datos generales"
          buttonClass="btn btn-link btn-block text-left text-primary font-weight-bolder collapsed"
        >
          {/* Datos generales */}
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
            <div className={`${onChangePassword ? "col-lg-3 " : "col-lg-6"}`}>
              <FloatingLabelInput
                inputId="txtCorreo"
                placeholder="Correo"
                type="email"
                setValue={(e) => handleEntriesChange("correo", e.target.value)}
                value={graduated.correo}
              />
            </div>

            {onChangePassword ? (
              <>
                <div
                  className="col-lg-4"
                  data-aos={`${onEditing ? `fade-down` : ""}`}
                >
                  <FloatingLabelInput
                    inputId="txtClave"
                    placeholder="Clave"
                    type="password"
                    setValue={(e) =>
                      handleEntriesChange("clave", e.target.value)
                    }
                    value={graduated.clave}
                  />
                </div>
                <div
                  className="col-lg-4"
                  data-aos={`${onEditing ? `fade-down` : ""}`}
                >
                  <FloatingLabelInput
                    inputId="txtClaveCon"
                    placeholder="Confirmar"
                    type="password"
                    setValue={(e) =>
                      handleEntriesChange("confirmar", e.target.value)
                    }
                    value={graduated.confirmar}
                  />
                </div>
              </>
            ) : null}

            <div className={`${onChangePassword ? "col-lg-3 " : "col-lg-6"}`}>
              <FloatingLabelInput
                inputId="txtncontrol"
                placeholder="Numero de control"
                type="number"
                setValue={(e) =>
                  handleEntriesChange("no_control", parseInt(e.target.value))
                }
                value={graduated.no_control}
              />
            </div>
            <div className="col-lg-6">
              <FloatingLabelInput
                inputId="txtNombre"
                placeholder="Nombre completo"
                type="text"
                setValue={(e) =>
                  handleEntriesChange("nombre_completo", e.target.value)
                }
                value={graduated.nombre_completo}
              />
            </div>
            <div className="col-lg-3">
              <FloatingLabelInput
                inputId="txtNombre"
                placeholder="Fecha de nacimiento"
                type="date"
                setValue={(e) =>
                  handleEntriesChange("fechaNacimiento", e.target.value)
                }
                value={graduated.fechaNacimiento}
              />
            </div>
            <div className="col-lg-4">
              <FloatingLabelInput
                inputId="txtCurp"
                placeholder="CURP"
                type="text"
                setValue={(e) => handleEntriesChange("curp", e.target.value)}
                value={graduated.curp}
              />
            </div>
            <div className="col-lg-4">
              <select
                className="form-control form-select mb-3"
                style={{ height: "47px" }}
                onChange={(e) => handleEntriesChange("sexo", e.target.value)}
                value={graduated.sexo}
              >
                <option value="">Sexo (Seleccione una opcion)</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="col-lg-4">
              <select
                className="form-control form-select"
                style={{ height: "47px" }}
                onChange={(e) =>
                  handleEntriesChange("estado_civil", e.target.value)
                }
                value={graduated.estado_civil}
              >
                <option value={""}>Estado civil (Seleccione una opcion)</option>
                <option value="Casado(a)">Casado(a)</option>
                <option value="Soltero(a)">Soltero(a)</option>
              </select>
            </div>
          </div>
          {/* /Datos generales */}
        </Collapsable>
        <Collapsable
          id="Direccion"
          text="Dirección"
          buttonClass="btn btn-link btn-block text-left text-primary font-weight-bolder"
        >
          {/* Direccion */}
          <div className="row">
            <div className="col-lg-4">
              <FloatingLabelInput
                inputId="txtEstado"
                placeholder="Estado"
                type="text"
                setValue={(e) => handleEntriesChange("estado", e.target.value)}
                value={graduated.estado}
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
                value={graduated.municipio}
              />
            </div>
            <div className="col-lg-4">
              <FloatingLabelInput
                inputId="txtCalle"
                placeholder="Calle"
                type="text"
                setValue={(e) => handleEntriesChange("calle", e.target.value)}
                value={graduated.calle}
              />
            </div>
            <div className="col-lg-4">
              <FloatingLabelInput
                inputId="txtNumero"
                placeholder="Numero de casa"
                type="number"
                setValue={(e) =>
                  handleEntriesChange("numero_casa", parseInt(e.target.value))
                }
                value={graduated.numero_casa}
              />
            </div>
            <div className="col-lg-4">
              <FloatingLabelInput
                inputId="txtColonia"
                placeholder="Colonia"
                type="text"
                setValue={(e) => handleEntriesChange("colonia", e.target.value)}
                value={graduated.colonia}
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
                value={graduated.cp}
              />
            </div>
          </div>
          {/* /Direccion */}
        </Collapsable>

        <Collapsable
          id="Contacto"
          text="Contácto"
          buttonClass="btn btn-link btn-block text-left text-primary font-weight-bolder"
        >
          {/* Contacto */}

          <div className="row">
            <div className="col-lg-6">
              <FloatingLabelInput
                inputId="txtTelefono"
                placeholder="Telefono"
                type="number"
                setValue={(e) =>
                  handleEntriesChange("telefono", parseInt(e.target.value))
                }
                value={graduated.telefono}
              />
            </div>
            <div className="col-lg-6">
              <FloatingLabelInput
                inputId="txtTelefonoC"
                placeholder="Telefono casa"
                type="number"
                setValue={(e) =>
                  handleEntriesChange("tel_casa", parseInt(e.target.value))
                }
                value={graduated.tel_casa}
              />
            </div>
          </div>
          {/* /Contacto */}
        </Collapsable>

        <Collapsable
          id="infoAcademica"
          text="Información academica"
          buttonClass="btn btn-link btn-block text-left text-primary font-weight-bolder"
        >
          {/* Informacion academica */}
          <div className="row">
            <div className="col-lg-6">
              <select
                className="form-control form-select mb-3"
                style={{ height: "47px" }}
                onChange={(e) => handleEntriesChange("carrera", e.target.value)}
                value={graduated.carrera}
              >
                <option value={""}>Carrera (Seleccione una opcion)</option>
                {careers.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-6">
              <FloatingLabelInput
                inputId="txtEgreso"
                placeholder="Fecha de egreso"
                type="date"
                setValue={(e) =>
                  handleEntriesChange("fecha_egreso", e.target.value)
                }
                value={graduated.fecha_egreso}
              />
            </div>
            <div className="col-lg-12 mb-2">
              <h6 className="text-purple font-weight-bolder">
                Dominio de idioma(s) extranjero(s) (Porcentaje %)
              </h6>
            </div>
            <div className="col-lg-6">
              <FloatingLabelInput
                inputId="txtIdioma"
                placeholder="Ingles"
                type="number"
                setValue={(e) =>
                  handleIdiomaExtranjeroChange("Ingles", e.target.value)
                }
                value={idiomaExtranjero?.Ingles}
                ranges={{ min: 0, max: 100 }}
              />
            </div>
            <div className="col-lg-6">
              <FloatingLabelInput
                inputId="txtIdiomaOtro"
                placeholder="Otro idioma"
                type="number"
                setValue={(e) =>
                  handleIdiomaExtranjeroChange("Otro", e.target.value)
                }
                value={idiomaExtranjero?.Otro}
              />
            </div>
            <div className="col-lg-6">
              <FloatingLabelInput
                inputId="txtPaquetes"
                placeholder="Paquetes computacionales"
                type="text"
                setValue={(e) =>
                  handleEntriesChange(
                    "paquetes_computacionales",
                    e.target.value
                  )
                }
                value={graduated.paquetes_computacionales}
              />
            </div>
            <div className="col-lg-6">
              <select
                className="form-control form-select"
                style={{ height: "47px" }}
                onChange={(e) =>
                  handleEntriesChange("titulado", e.target.value)
                }
                value={graduated.titulado}
              >
                <option value={""}>¿Titulado? (Seleccione una opcion)</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* /Informacion academica */}
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
      {/* /ACTIONS */}
    </form>
  );
};

export default RegisterForm;
