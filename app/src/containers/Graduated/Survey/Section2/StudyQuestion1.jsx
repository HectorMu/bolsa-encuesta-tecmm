import React, { useState } from "react";
import FloatingLabelInput from "../../../../components/Global/FloatingLabelInput";

const STUDY_TYPES = ["Especialidad", "Maestria", "Doctorado", "Idiomas"];
const StudyQuestion1 = ({ answers, handleChange }) => {
  const ID = "SQ1S2";
  return (
    <div className="pb-4">
      <h5>¿Que estudia?</h5>
      <div className="row">
        <div className="col-12 col-lg-3 col-md-3 col-xl-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={ID}
              onChange={() => handleChange("tipo_estudio", "Especialidad")}
              value={answers.tipo_estudio}
              id={`${ID}E`}
            />
            <label className="form-check-label" htmlFor={`${ID}E`}>
              Especialidad
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("tipo_estudio", "Maestria")}
              value={answers.tipo_estudio}
              name={ID}
              id={`${ID}M`}
            />
            <label className="form-check-label" htmlFor={`${ID}M`}>
              Maestria
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("tipo_estudio", "Doctorado")}
              value={answers.tipo_estudio}
              name={ID}
              id={`${ID}D`}
            />
            <label className="form-check-label" htmlFor={`${ID}D`}>
              Doctorado
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={() => handleChange("tipo_estudio", "Idiomas")}
              value={answers.tipo_estudio}
              name={ID}
              id={`${ID}I`}
            />
            <label className="form-check-label" htmlFor={`${ID}I`}>
              Idiomas
            </label>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-md-3 col-xl-2">
          <div className="d-flex  justify-content-start align-items-center w-100">
            <div className="form-check w-100">
              <input
                className="form-check-input"
                type="radio"
                onChange={() => handleChange("tipo_estudio", "Otra")}
                value={answers.tipo_estudio}
                name={ID}
                id={`${ID}O`}
              />
              {STUDY_TYPES.includes(answers.tipo_estudio) ? (
                <label className="form-check-label" htmlFor={`${ID}O`}>
                  Otra
                </label>
              ) : answers.tipo_estudio === "" ? (
                <label className="form-check-label" htmlFor={`${ID}O`}>
                  Otra
                </label>
              ) : (
                <FloatingLabelInput
                  placeholder="Otra"
                  inputId="txtTipoEstudio"
                  type="text"
                  setValue={(e) => handleChange("tipo_estudio", e.target.value)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-12 col-md-12 col-xl-12">
          <div className="mt-4"></div>
          <FloatingLabelInput
            placeholder="Especialidad e institucion"
            inputId="txtEspecialidadInstitucion"
            type="text"
            setValue={(e) =>
              handleChange("especialidad_institucion", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default StudyQuestion1;
