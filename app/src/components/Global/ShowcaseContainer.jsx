import React from "react";

const ShowcaseContainer = ({ children }) => (
  <div>
    <div className="d-flex justify-content-center">
      <div className="col-12 col-lg-12 col-xl-10">{children} </div>
    </div>
  </div>
);

export default ShowcaseContainer;
