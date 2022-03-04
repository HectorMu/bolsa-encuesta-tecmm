import React from "react";
import { Link } from "react-router-dom";
import FloatingLabelInput from "../../../components/Global/FloatingLabelInput";
import Accordion from "../../../components/Global/Accordion";
import Collapsable from "../../../components/Global/Collapsable";

const Form = () => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h5 className="m-0 font-weight-bold text-primary text-center">
          {"Datos del egresado"}
        </h5>
      </div>
      <div className="card-body">
        <form>
          <Accordion>
            <Collapsable
              id="DatosGenerales"
              text="Datos generales"
              buttonClass="btn btn-link btn-block text-left text-primary font-weight-bolder collapsed"
            >
              {/* Datos generales */}
              <div className="row">
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtCorreo"
                    placeholder="Correo"
                    type="email"
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtClave"
                    placeholder="Clave"
                    type="password"
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtClaveCon"
                    placeholder="Confirmar"
                    type="password"
                  />
                </div>
                <div className="col-lg-3">
                  <FloatingLabelInput
                    inputId="txtncontrol"
                    placeholder="Numero de control"
                    type="number"
                  />
                </div>
                <div className="col-lg-6">
                  <FloatingLabelInput
                    inputId="txtNombre"
                    placeholder="Nombre completo"
                    type="text"
                  />
                </div>
                <div className="col-lg-3">
                  <FloatingLabelInput
                    inputId="txtNombre"
                    placeholder="Fecha de nacimiento"
                    type="date"
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtCurp"
                    placeholder="CURP"
                    type="text"
                  />
                </div>
                <div className="col-lg-4">
                  <select
                    className="form-control form-select"
                    style={{ height: "47px" }}
                  >
                    <option selected>Sexo (Seleccione una opcion)</option>
                    <option value="1">Hombre</option>
                    <option value="2">Mujer</option>
                    <option value="3">Otro</option>
                  </select>
                </div>
                <div className="col-lg-4">
                  <select
                    className="form-control form-select"
                    style={{ height: "47px" }}
                  >
                    <option selected>
                      Estado civil (Seleccione una opcion)
                    </option>
                    <option value="1">Casado</option>
                    <option value="2">Soltero</option>
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
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtMunicipio"
                    placeholder="Municipio"
                    type="text"
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtCalle"
                    placeholder="Calle"
                    type="text"
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtNumero"
                    placeholder="Numero"
                    type="text"
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtColonia"
                    placeholder="Colonia"
                    type="text"
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtCP"
                    placeholder="Codigo Postal"
                    type="text"
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
                  />
                </div>
                <div className="col-lg-6">
                  <FloatingLabelInput
                    inputId="txtTelefonoC"
                    placeholder="Telefono casa"
                    type="number"
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
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtCarrera"
                    placeholder="Carrera"
                    type="text"
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtEgreso"
                    placeholder="Fecha de egreso"
                    type="date"
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtIdioma"
                    placeholder="Idioma extranjero (ingles)"
                    type="number"
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtIdiomaOtro"
                    placeholder="Otro"
                    type="number"
                  />
                </div>
                <div className="col-lg-4">
                  <FloatingLabelInput
                    inputId="txtPaquetes"
                    placeholder="Paquetes computacionales"
                    type="text"
                  />
                </div>
              </div>
              {/* /Informacion academica */}
            </Collapsable>
          </Accordion>

          <div className="d-flex mt-3 justify-content-center">
            <button type="submit" className="btn btn-primary mx-3">
              Guardar
            </button>
            <Link to={-1} className="btn btn-danger ">
              Cancelar
            </Link>
          </div>
          {/* /ACTIONS */}
        </form>
      </div>
    </div>
  );
};

export default Form;
