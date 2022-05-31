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
  especiaidad: "",
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
                name={"correo"}
                setValue={handleEntriesChange}
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
                    setValue={handleEntriesChange}
                    name={"clave"}
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
                    setValue={handleEntriesChange}
                    name={"confirmar"}
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
                setValue={handleEntriesChange}
                name={"no_control"}
                value={graduated.no_control}
              />
            </div>
            <div className="col-lg-6">
              <FloatingLabelInput
                inputId="txtNombre"
                placeholder="Nombre completo"
                type="text"
                setValue={handleEntriesChange}
                name={"nombre_completo"}
                value={graduated.nombre_completo}
              />
            </div>
            <div className="col-lg-3">
              <FloatingLabelInput
                inputId="txtNombre"
                placeholder="Fecha de nacimiento"
                type="date"
                setValue={handleEntriesChange}
                name={"fechaNacimiento"}
                value={graduated.fechaNacimiento}
              />
            </div>
            <div className="col-lg-4">
              <FloatingLabelInput
                inputId="txtCurp"
                placeholder="CURP"
                type="text"
                setValue={handleEntriesChange}
                name={"curp"}
                value={graduated.curp}
              />
            </div>
            <div className="col-lg-4">
              <select
                className="form-control form-select mb-3"
                style={{ height: "47px" }}
                onChange={handleEntriesChange}
                name="sexo"
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
                onChange={handleEntriesChange}
                name={"estado_civil"}
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
                setValue={handleEntriesChange}
                name={"estado"}
                value={graduated.estado}
              />
            </div>
            <div className="col-lg-4">
              <FloatingLabelInput
                inputId="txtMunicipio"
                placeholder="Municipio"
                type="text"
                setValue={handleEntriesChange}
                name={"municipio"}
                value={graduated.municipio}
              />
            </div>
            <div className="col-lg-4">
              <FloatingLabelInput
                inputId="txtCalle"
                placeholder="Calle"
                type="text"
                setValue={handleEntriesChange}
                name={"calle"}
                value={graduated.calle}
              />
            </div>
            <div className="col-lg-4">
              <FloatingLabelInput
                inputId="txtNumero"
                placeholder="Numero de casa"
                type="text"
                setValue={handleEntriesChange}
                name={"numero_casa"}
                value={graduated.numero_casa}
              />
            </div>
            <div className="col-lg-4">
              <FloatingLabelInput
                inputId="txtColonia"
                placeholder="Colonia"
                type="text"
                setValue={handleEntriesChange}
                name={"colonia"}
                value={graduated.colonia}
              />
            </div>
            <div className="col-lg-4">
              <FloatingLabelInput
                inputId="txtCP"
                placeholder="Codigo Postal"
                type="number"
                setValue={handleEntriesChange}
                name={"cp"}
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
                setValue={handleEntriesChange}
                name={"telefono"}
                value={graduated.telefono}
              />
            </div>
            <div className="col-lg-6">
              <FloatingLabelInput
                inputId="txtTelefonoC"
                placeholder="Telefono casa"
                type="number"
                setValue={handleEntriesChange}
                name={"tel_casa"}
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
                onChange={handleEntriesChange}
                name={"carrera"}
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
                inputId="txtEspecialidad"
                placeholder="Especialidad"
                type="text"
                setValue={handleEntriesChange}
                name={"especialidad"}
                value={graduated.especialidad}
              />
            </div>
            <div className="col-lg-12">
              <FloatingLabelInput
                inputId="txtEgreso"
                placeholder="Fecha de egreso (Mes y año)"
                type="month"
                setValue={handleEntriesChange}
                name={"fecha_egreso"}
                min="1900-01"
                value={graduated.fecha_egreso}
                required
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
                setValue={handleIdiomaExtranjeroChange}
                name="Ingles"
                value={idiomaExtranjero?.Ingles}
                ranges={{ min: 0, max: 100 }}
              />
            </div>
            <div className="col-lg-6">
              <FloatingLabelInput
                inputId="txtIdiomaOtro"
                placeholder="Otro idioma"
                type="number"
                setValue={handleIdiomaExtranjeroChange}
                name={"Otro"}
                value={idiomaExtranjero?.Otro}
              />
            </div>
            <div className="col-lg-6">
              <FloatingLabelInput
                inputId="txtPaquetes"
                placeholder="Paquetes computacionales"
                type="text"
                setValue={handleEntriesChange}
                name={"paquetes_computacionales"}
                value={graduated.paquetes_computacionales}
              />
            </div>
            <div className="col-lg-6">
              <select
                className="form-control form-select"
                style={{ height: "47px" }}
                onChange={handleEntriesChange}
                name={"titulado"}
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
