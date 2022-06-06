import useWindowSize from "@/hooks/useWindowResize";
import React from "react";

const MobileShowcase = ({ toggleShowcase, setToggleShowcase, children }) => {
  const size = useWindowSize();
  return (
    <div
      className={`jobbank-showcase-mobile purple-scroll ${
        toggleShowcase && size.width < 768 ? "active" : ""
      }`}
    >
      <>
        <div className="d-flex justify-content-end align-content-center">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setToggleShowcase(!toggleShowcase)}
          >
            <i className="fas fa-times"></i>{" "}
          </button>
        </div>
        {children}
      </>
    </div>
  );
};

export default MobileShowcase;
