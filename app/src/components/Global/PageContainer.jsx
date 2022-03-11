import React from "react";

const PageContainer = ({ children }) => (
  <div className="container-fluid" style={{ paddingTop: "100px" }}>
    {children}
  </div>
);

export default PageContainer;
