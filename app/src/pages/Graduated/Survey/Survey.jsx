import useRouterHooks from "../../../hooks/useRouterHooks";
import Section1 from "../../../containers/Graduated/Survey/Section1";
import Section2 from "../../../containers/Graduated/Survey/Section2";

const Section = () => {
  const { params } = useRouterHooks();

  return (
    <div className="container-fluid text-black">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12  col-xl-9 mx-auto">
        <div className="card shadow rounded-0 border-0">
          <div className="card-body">
            {parseInt(params.section_id) === 1 ? <Section1 /> : null}
            {parseInt(params.section_id) === 2 ? <Section2 /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;