import React from "react";
import { Link } from "react-router-dom";

const ShowcaseHeader = ({ title, toEdit }) => (
  <>
    <div className="d-flex justify-content-between ">
      <Link
        to={-1}
        className="btn btn-outline-primary font-weight-bold btn-sm mb-1"
      >
        <i className="fas fa-arrow-left text-left "></i> <span>Volver</span>
      </Link>
      <Link to={toEdit} className="btn btn-info font-weight-bold btn-sm mb-1">
        <i className="fas fa-pen text-left "></i> <span>Editar</span>
      </Link>
    </div>

    <div className="card py-3 shadow-lg rounded-0 showcase-header">
      <h5 className="text-primary  font-weight-bolder responsive-text-header">
        <div className="col-12 text-center">
          <span className="mx-auto">{title}</span>
        </div>
      </h5>
    </div>
  </>
);

export default ShowcaseHeader;
