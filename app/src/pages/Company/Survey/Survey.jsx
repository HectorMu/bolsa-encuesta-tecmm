import useRouterHooks from "@/hooks/useRouterHooks";
import SectionB from "@/containers/Company/Survey/Sectionb";
import SectionC from "@/containers/Company/Survey/Sectionc";
import { Navigate } from "react-router-dom";

const Section = () => {
  const { params } = useRouterHooks();

  return (
    <div className="container-fluid text-black">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12  col-xl-9 mx-auto">
        <div className="card shadow rounded-0 border-0">
          <div className="card-body">
            {parseInt(params.section_id) === 1 ? <SectionB /> : null}
            {parseInt(params.section_id) === 2 ? <SectionC /> : null}
            {parseInt(params.section_id) < 1 ||
            parseInt(params.section_id) > 2 ? (
              <Navigate to={"/company/survey"} replace={true} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
