import { useState } from "react";
import { Link } from "react-router-dom";

//Componentes personalizados para agilizar la construccion al reutilizarlos
import FloatingLabelInput from "../../../components/Global/FloatingLabelInput";
import Accordion from "../../../components/Global/Accordion";
import Collapsable from "../../../components/Global/Collapsable";
import FormCard from "../../../components/Global/FormCard";
//Entradas del formulario, es un objeto con los datos a capturar el en formulario
import Entries from "./FormEntries";

const Form = () => {
  const [graduated, setGraduated] = useState(Entries);
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleEntriesChange = (key, value) =>
    setGraduated({ ...graduated, [key]: value });

  const handleIdiomaExtranjeroChange = (key, value) => {
    setGraduated({
      ...graduated,
      idioma_extranjero: { ...graduated.idioma_extranjero, [key]: value },
    });
    // setGraduated(
    //   (graduated) => ((graduated.idioma_extranjero.Ingles = value), graduated)
    // );
  };

  // const handleOtroChange = (value) => {
  //   setGraduated(
  //     (graduated) => ((graduated.idioma_extranjero.Otro = value), graduated)
  //   );
  // };

  console.log(graduated);
  return (
    <FormCard title={"Datos del egresado"}>
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
                  setValue={(e) =>
                    handleEntriesChange("correo", e.target.value)
                  }
                  value={graduated.correo}
                />
              </div>
              <div className="col-lg-4">
                <FloatingLabelInput
                  inputId="txtClave"
                  placeholder="Clave"
                  type="password"
                  setValue={(e) => handleEntriesChange("clave", e.target.value)}
                  value={graduated.clave}
                />
              </div>
              <div className="col-lg-4">
                <FloatingLabelInput
                  inputId="txtClaveCon"
                  placeholder="Confirmar"
                  type="password"
                  setValue={(e) => setPasswordConfirm(e.target.value)}
                  value={passwordConfirm}
                />
              </div>
              <div className="col-lg-3">
                <FloatingLabelInput
                  inputId="txtncontrol"
                  placeholder="Numero de control"
                  type="number"
                  setValue={(e) =>
                    handleEntriesChange("no_control", e.target.value)
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
                  <option value={""}>
                    Estado civil (Seleccione una opcion)
                  </option>
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
                  setValue={(e) =>
                    handleEntriesChange("estado", e.target.value)
                  }
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
                  type="text"
                  setValue={(e) =>
                    handleEntriesChange("numero_casa", e.target.value)
                  }
                  value={graduated.numero_casa}
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
                  value={graduated.colonia}
                />
              </div>
              <div className="col-lg-4">
                <FloatingLabelInput
                  inputId="txtCP"
                  placeholder="Codigo Postal"
                  type="text"
                  setValue={(e) => handleEntriesChange("cp", e.target.value)}
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
                    handleEntriesChange("telefono", e.target.value)
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
                    handleEntriesChange("tel_casa", e.target.value)
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
              <div className="col-lg-4">
                <FloatingLabelInput
                  inputId="txtCarrera"
                  placeholder="Carrera"
                  type="text"
                  setValue={(e) =>
                    handleEntriesChange("carrera", e.target.value)
                  }
                  value={graduated.carrera}
                />
              </div>
              <div className="col-lg-4">
                <FloatingLabelInput
                  inputId="txtEgreso"
                  placeholder="Fecha de egreso"
                  type="date"
                  setValue={(e) =>
                    handleEntriesChange("telefono", e.target.value)
                  }
                  value={graduated.telefono}
                />
              </div>
              <div className="col-lg-4">
                <FloatingLabelInput
                  inputId="txtIdioma"
                  placeholder="Idioma extranjero (ingles)"
                  type="number"
                  setValue={(e) =>
                    handleIdiomaExtranjeroChange("Ingles", e.target.value)
                  }
                  value={graduated.idioma_extranjero.Ingles}
                />
              </div>
              <div className="col-lg-4">
                <FloatingLabelInput
                  inputId="txtIdiomaOtro"
                  placeholder="Otro"
                  type="number"
                  setValue={(e) =>
                    handleIdiomaExtranjeroChange("Otro", e.target.value)
                  }
                  value={graduated.idioma_extranjero.Otro}
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
    </FormCard>
  );
};

export default Form;
