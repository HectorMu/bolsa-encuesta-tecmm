import { useState, createContext } from "react";

export const PreventSurveyJumps = createContext();

function PreventGraduatedSurveyJumps({ children }) {
  const [answeredSections, setAnsweredSections] = useState({
    s1: false,
    s2: false,
    s3: false,
    s4: false,
    s5: false,
    s6: false,
    isWorking: false,
  });

  const setAnsweredSectionHandler = (section, status) =>
    setAnsweredSections((prevState) => ({ ...prevState, [section]: status }));

  return (
    <PreventSurveyJumps.Provider
      value={{ answeredSections, setAnsweredSectionHandler }}
    >
      {children}
    </PreventSurveyJumps.Provider>
  );
}

export default PreventGraduatedSurveyJumps;
