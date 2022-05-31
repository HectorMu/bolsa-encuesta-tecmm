import { useContext } from "react";
import { PreventSurveyJumps } from "@/context/PreventGraduatedSurveyJumpsProvider";

const usePreventGraduatedSurveyJumps = () => useContext(PreventSurveyJumps);

export default usePreventGraduatedSurveyJumps;
