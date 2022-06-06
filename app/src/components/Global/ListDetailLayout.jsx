import useCleanAosAnimations from "@/hooks/useCleanAosAnimations";
import MobileShowcase from "../Graduated/JobBank/MobileShowcase";

const ListDetailLayout = ({
  listHeader: ListHeader,
  list: List,
  showcase: Showcase,
  MobileShowCaseControls,
  className = "container-fluid",
}) => {
  const animatedRef = useCleanAosAnimations();
  return (
    <>
      <div
        ref={animatedRef}
        data-aos="fade-up"
        data-aos-duration="200"
        className={className}
      >
        <div className="card shadow rounded">
          <div className="card-body">
            <div className="row">
              <div className="col-md-5 col-lg-5 col-xl-5">
                {ListHeader}
                <div className="jobbank-card-responsive-heigth">
                  <div className="purple-scroll jobbank-section">{List}</div>
                </div>
              </div>

              <div className="col-md-7 col-lg-7 col-xl-7 d-none d-sm-none d-md-block d-lg-block">
                <div className="purple-scroll jobbank-section">{Showcase}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileShowcase
        toggleShowcase={MobileShowCaseControls.toggleShowcase}
        setToggleShowcase={MobileShowCaseControls.setToggleShowcase}
      >
        {Showcase}
      </MobileShowcase>
    </>
  );
};

export default ListDetailLayout;
