import React from "react";
import { useState } from "react";
import FloatingLabelInput from "../components/Global/FloatingLabelInput";
import DataTable from "../components/Global/DataTable";

const data = [
  {
    id: 1,
    name: "Hector",
  },
  {
    id: 2,
    name: "Pancho",
  },
];
const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Action
        </a>
      </div>
      <FloatingLabelInput
        type="email"
        inputId="email"
        placeholder={"Email"}
        value={email}
        setValue={(e) => setEmail(e.target.value)}
      />
      <FloatingLabelInput
        type="password"
        inputId="password"
        placeholder={"Your password"}
        value={password}
        setValue={(e) => setPassword(e.target.value)}
      />

      <div className="row">
        <div className="col-xl-2 col-md-4 col-xl-12">
          <DataTable data={data} title={"XD"} />
        </div>
      </div>
    </div>
  );
};

export default Index;
