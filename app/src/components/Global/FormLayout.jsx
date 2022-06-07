import React from "react";

const FormLayout = ({ children }) => {
  return (
    <div className="w-100 form-layout">
      <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 mx-auto ">
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
