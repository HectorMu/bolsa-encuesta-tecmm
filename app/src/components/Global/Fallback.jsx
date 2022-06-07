import React from "react";
import Loading from "./Loading";

const Fallback = () => {
  return (
    <div className="mx-auto d-flex flex-column fallback container rounded">
      <p className="text-primary mb-2 text-center font-weight-bolder">
        Cargando modulo...
      </p>
      <Loading small />
    </div>
  );
};

export default Fallback;
