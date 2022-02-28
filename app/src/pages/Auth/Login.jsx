import React, { useEffect } from "react";
import Form from "../../containers/Login/Form";

const Login = () => {
  useEffect(() => {
    document.title = "Control de Egresados | Login";
  }, []);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Login;
