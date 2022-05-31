import useRouterHooks from "@/hooks/useRouterHooks";
import Section1 from "@/containers/Graduated/Survey/Section1";
import Section2 from "@/containers/Graduated/Survey/Section2";
import Section3 from "@/containers/Graduated/Survey/Section3";
import Section4 from "@/containers/Graduated/Survey/Section4";
import Section5 from "@/containers/Graduated/Survey/Section5";
import Section6 from "@/containers/Graduated/Survey/Section6";
import useWindowSize from "@/hooks/useWindowResize";
import PreventGraduatedSurveyJumpsProvider from "@/context/PreventGraduatedSurveyJumpsProvider";

import { Navigate } from "react-router-dom";

const Survey = () => {
  const { params } = useRouterHooks();
  const size = useWindowSize();

  const toggleClassOnResize =
    size.width <= 650
      ? "container-fluid"
      : "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-9 mx-auto";

  return (
    <div className={`text-black ${toggleClassOnResize}`}>
      <div className="card shadow rounded-0 border-0">
        <div className="card-body">
          <PreventGraduatedSurveyJumpsProvider>
            {parseInt(params.section_id) === 1 && <Section1 />}
            {parseInt(params.section_id) === 2 && <Section2 />}
            {parseInt(params.section_id) === 3 && <Section3 />}
            {parseInt(params.section_id) === 4 && <Section4 />}
            {parseInt(params.section_id) === 5 && <Section5 />}
            {parseInt(params.section_id) === 6 && <Section6 />}
            {parseInt(params.section_id) < 1 ||
              (parseInt(params.section_id) > 6 && (
                <Navigate to={"/graduated/survey"} replace={true} />
              ))}
          </PreventGraduatedSurveyJumpsProvider>
        </div>
      </div>
    </div>
  );
};

export default Survey;
