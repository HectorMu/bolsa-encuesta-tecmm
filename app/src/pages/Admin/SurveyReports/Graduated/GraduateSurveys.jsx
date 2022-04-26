import { Link } from "react-router-dom";
import Report from "@/containers/Admin/SurveyReports/Graduated/Report";

const GraduateSurveys = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex flex-column flex-lg-row flex-md-row flex-xl-row align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-0 text-gray-800">
          Reporte de encuestas de egresados
        </h1>
      </div>
      <Report />
    </div>
  );
};

export default GraduateSurveys;
