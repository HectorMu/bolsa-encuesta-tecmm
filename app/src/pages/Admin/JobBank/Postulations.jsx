import useSession from "@/hooks/useSession";
import vacanciesService from "@/services/Company/vacancies.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import useServiceFetchV2 from "@/hooks/useServiceFetchV2";
import useCleanAosAnimations from "@/hooks/useCleanAosAnimations";

import List from "@/containers/Company/Postulations/List";
import Showcase from "@/containers/Company/Postulations/Showcase";
import VacantDetails from "@/containers/Company/Postulations/VacantDetails";

const Postulations = () => {
  const { params } = useRouterHooks();
  const { verifySession } = useSession();
  const {
    hookData: postulations,
    refreshData,
    isLoading,
  } = useServiceFetchV2(
    () =>
      verifySession(
        () => vacanciesService.GetPostulations(params.job_id),
        refreshData
      ),
    [params.job_id]
  );

  return (
    <div className="container-fluid mb-3">
      <VacantDetails />
      <div
        ref={useCleanAosAnimations()}
        data-aos="flip-down"
        className="col-xl-10 mx-auto"
      >
        <div className="card shadow rounded">
          <div className="card-body">
            <div className="row">
              <div className="col-md-5 col-lg-5 col-xl-5">
                <div style={{ height: "65vh" }}>
                  <div style={{ overflowY: "scroll", height: "100%" }}>
                    <List isLoading={isLoading} postulations={postulations} />
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-lg-7 col-xl-7">
                <Showcase
                  postulations={postulations}
                  refreshData={refreshData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postulations;
