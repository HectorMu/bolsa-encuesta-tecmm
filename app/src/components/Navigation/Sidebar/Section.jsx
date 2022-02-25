import React from "react";

export const SectionContext = React.createContext();

const Section = ({ SectionName = "New section", children }) => {
  return (
    <SectionContext.Provider value={{ SectionName }}>
      <div className="sidebar-heading text-muted">{SectionName}</div>
      {children}
      <hr className="sidebar-divider" />
    </SectionContext.Provider>
  );
};

export default Section;
