import React from "react";
import OptionsContainer from "../../../../components/Survey/OptionsContainer";
import FloatingLabelInput from "../../../../components/Global/FloatingLabelInput";

const WorksCompanyData = ({ handleChange, answers }) => {
  return (
    <div className="pb-3">
      <h5>Datos de la empresa u organismo:</h5>
      <div className="pb-3">
        <h6>Organismo: </h6>
        <OptionsContainer
          SECTIONID={"WCMS2OPT1"}
          OPTIONS={["Publico", "Privado", "Social"]}
          ANSWER={"organismo_empresa"}
          answers={answers}
          handleChange={handleChange}
        />
      </div>
      <FloatingLabelInput
        inputId="txtGiroEmpresa"
        placeholder="Giro o actividad principal de la empresa u organismo"
        setValue={(e) =>
          handleChange("actividad_principal_empresa", e.target.value)
        }
        value={answers.actividad_principal_empresa}
      />
      <FloatingLabelInput
        inputId="txtRazonsocial"
        placeholder="Razon social"
        setValue={(e) => handleChange("razon_social", e.target.value)}
        value={answers.razon_social}
      />
      <h6>Domicilio</h6>
      <div className="row">
        <div className="col-12 col-xl-4">
          <FloatingLabelInput
            inputId="txtCalle"
            placeholder="Calle"
            setValue={(e) => handleChange("calle", e.target.value)}
            value={answers.calle}
          />
        </div>
        <div className="col-12 col-xl-2">
          <FloatingLabelInput
            inputId="txtNumero"
            placeholder="Numero"
            type="number"
            setValue={(e) =>
              handleChange("numero", Number(e.target.value) || 0)
            }
            value={answers.numero}
          />
        </div>
        <div className="col-12 col-xl-4">
          <FloatingLabelInput
            inputId="txtColonia"
            placeholder="Colonia"
            setValue={(e) => handleChange("colonia", e.target.value)}
            value={answers.colonia}
          />
        </div>
        <div className="col-12 col-xl-2">
          <FloatingLabelInput
            inputId="txtCP"
            placeholder="C.P"
            type="number"
            setValue={(e) => handleChange("cp", Number(e.target.value) || 0)}
            value={answers.cp}
          />
        </div>
        <div className="col-12 col-xl-4">
          <FloatingLabelInput
            inputId="txtCiudad"
            placeholder="Ciudad"
            setValue={(e) => handleChange("ciudad", e.target.value)}
            value={answers.ciudad}
          />
        </div>
        <div className="col-12 col-xl-4">
          <FloatingLabelInput
            inputId="txtMunicipio"
            placeholder="Municipio"
            setValue={(e) => handleChange("municipio", e.target.value)}
            value={answers.municipio}
          />
        </div>
        <div className="col-12 col-xl-4">
          <FloatingLabelInput
            inputId="txtEstado"
            placeholder="Estado"
            setValue={(e) => handleChange("estado", e.target.value)}
            value={answers.estado}
          />
        </div>
      </div>
      <h6>Contacto</h6>
      <div className="row">
        <div className="col-12 col-xl-4">
          <FloatingLabelInput
            inputId="txtTelefono"
            placeholder="Telefono"
            type="number"
            setValue={(e) =>
              handleChange("telefono_empresa", Number(e.target.value) || 0)
            }
            value={answers.telefono_empresa}
          />
        </div>
        <div className="col-12 col-xl-4">
          <FloatingLabelInput
            inputId="txtTelefonoExt"
            placeholder="Telefeno Ext."
            type="number"
            setValue={(e) =>
              handleChange("telefono_ext_empresa", Number(e.target.value) || 0)
            }
            value={answers.telefono_ext_empresa}
          />
        </div>
        <div className="col-12 col-xl-4">
          <FloatingLabelInput
            inputId="txtFax"
            placeholder="Fax"
            type="number"
            setValue={(e) =>
              handleChange("fax_empresa", Number(e.target.value)) || 0
            }
            value={answers.fax_empresa}
          />
        </div>
        <div className="col-12">
          <FloatingLabelInput
            inputId="txtEmail"
            placeholder="Email"
            type="email"
            setValue={(e) => handleChange("email_empresa", e.target.value)}
            value={answers.email_empresa}
          />
        </div>
        <div className="col-12">
          <FloatingLabelInput
            inputId="txtPaginaweb"
            placeholder="Pagina web"
            setValue={(e) => handleChange("pagina_web", e.target.value)}
            value={answers.pagina_web}
          />
        </div>
        <div className="col-12">
          <FloatingLabelInput
            inputId="txtJefe"
            placeholder="Nombre y puesto del jefe inmediato"
            setValue={(e) => handleChange("jefe_inmediato", e.target.value)}
            value={answers.jefe_inmediato}
          />
        </div>
      </div>
      <div className="pb-3">
        <h6>Sector economico de la empresa u organizacion</h6>
        <OptionsContainer
          SECTIONID={"WCMS2OPT2"}
          OPTIONS={[
            "Agroindustria",
            "Pesquero",
            "Minero",
            "Industrial",
            "Construccion",
            "Petrolero",
            "Educativo",
            "Turismo",
            "Comercio",
            "Servicios Financieros",
          ]}
          ANSWER={"sector_empresa"}
          answers={answers}
          handleChange={handleChange}
          other={true}
          otherText={"Otros"}
        />
      </div>
      <div className="pb-3">
        <h6>Tamaño de la empresa u organizacion</h6>
        <OptionsContainer
          SECTIONID={"WCMS2OPT3"}
          OPTIONS={[
            "Microempresa (1-30)",
            "Pequeña (31-100)",
            "Mediana (101-500)",
            "Grande (mas de 500)",
          ]}
          ANSWER={"tamaño_empresa"}
          answers={answers}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default WorksCompanyData;
