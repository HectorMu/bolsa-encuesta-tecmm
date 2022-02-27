import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container-fluid">
      <div className="text-center">
        <div className="error mx-auto" data-text={404}>
          404
        </div>
        <p className="lead text-gray-800 mb-5">Pagina no encontrada</p>
        <p className="text-gray-500 mb-0">
          Parece que el recurso que buscas no existe...
        </p>
        <Link className="text-purple" to="/">
          ← Regresar
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
