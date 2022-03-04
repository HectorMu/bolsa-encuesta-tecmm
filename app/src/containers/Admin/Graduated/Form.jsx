import React from "react";
import { Link } from "react-router-dom";

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
          {/* ACTIONS */}
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
