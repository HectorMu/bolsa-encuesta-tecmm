import React from "react";

const ShowcaseCard = ({ children }) => (
  <div data-aos="flip-down" className="card mt-4 shadow-lg rounded-0 py-3 px-2">
    <div className="card-body text-black">{children}</div>
  </div>
);

export default ShowcaseCard;
