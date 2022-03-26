import useRouterHooks from "../../../hooks/useRouterHooks";
import Section1 from "../../../containers/Graduated/Survey/Section1";
import Section2 from "../../../containers/Graduated/Survey/Section2";
import Section3 from "../../../containers/Graduated/Survey/Section3";
import Section4 from "../../../containers/Graduated/Survey/Section4";
import Section5 from "../../../containers/Graduated/Survey/Section5";
import Section6 from "../../../containers/Graduated/Survey/Section6";

const Section = () => {
  const { params } = useRouterHooks();

  return (
    <div className="container-fluid text-black">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12  col-xl-9 mx-auto">
        <div className="card shadow rounded-0 border-0">
          <div className="card-body">
            {parseInt(params.section_id) === 1 ? <Section1 /> : null}
            {parseInt(params.section_id) === 2 ? <Section2 /> : null}
            {parseInt(params.section_id) === 3 ? <Section3 /> : null}
            {parseInt(params.section_id) === 4 ? <Section4 /> : null}
            {parseInt(params.section_id) === 5 ? <Section5 /> : null}
            {parseInt(params.section_id) === 6 ? <Section6 /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
