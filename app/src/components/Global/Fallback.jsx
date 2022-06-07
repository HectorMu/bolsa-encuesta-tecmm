import React from "react";
import Loading from "./Loading";

const Fallback = () => {
  return (
    <div className="container-fluid">
      <div className="mx-auto col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 bg-light rounded py-2">
        <p className="text-primary mb-2 text-center font-weight-bolder">
          Cargando modulo...
        </p>
        <Loading small />
      </div>
    </div>
  );
};

export default Fallback;
