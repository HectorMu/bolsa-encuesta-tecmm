import { useState, useRef, useEffect } from "react";
import vacanciesService from "@/services/Company/vacancies.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import useServiceFetchV2 from "@/hooks/useServiceFetchV2";
import useCleanAosAnimations from "@/hooks/useCleanAosAnimations";

import List from "@/containers/Company/Postulations/List";
import Showcase from "@/containers/Company/Postulations/Showcase";
import VacantDetails from "@/containers/Company/Postulations/VacantDetails";

const Postulations = () => {
  const [selection, setSelection] = useState({});
  const { params } = useRouterHooks();

  const { hookData: postulations, refreshData } = useServiceFetchV2(
    () => vacanciesService.GetPostulations(params.id),
    [params.id]
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
                    <List
                      postulations={postulations}
                      selection={selection}
                      setSelection={setSelection}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-lg-7 col-xl-7">
                <Showcase selection={selection} setSelection={setSelection} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postulations;
