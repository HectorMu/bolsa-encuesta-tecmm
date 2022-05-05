import { useState } from "react";
import useSession from "@/hooks/useSession";
import vacanciesService from "@/services/Company/vacancies.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import useServiceFetchV2 from "@/hooks/useServiceFetchV2";
import useCleanAosAnimations from "@/hooks/useCleanAosAnimations";

import List from "@/containers/Company/Postulations/List";
import Showcase from "@/containers/Company/Postulations/Showcase";
import VacantDetails from "@/containers/Company/Postulations/VacantDetails";

const FILTER_OPTIONS = ["Todas", "Sin revisar", "Revisado", "Mas recientes"];

const Postulations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Todas");
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
      <div className="d-flex justify-content-center mb-3">
        <div className="btn-group" role="group" aria-label="Basic example">
          {FILTER_OPTIONS.map((option) => (
            <button
              type="button"
              onClick={() => setFilter(option)}
              className={`btn btn-outline-primary ${
                filter === option ? "active" : ""
              } `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

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
                  <div style={{ height: "63vh" }}>
                    <div className="input-group w-100 mb-3 px-2 overflow-auto">
                      <input
                        type="text"
                        className="form-control bg-light"
                        placeholder="Buscar postulaciones por nombre o numero de postulación..."
                        aria-label="Search"
                        autoComplete="off"
                        aria-describedby="basic-addon2"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div>
                    <div
                      className="purple-scroll "
                      style={{
                        overflowY: "scroll",
                        maxHeight: "55vh",
                      }}
                    >
                      <List
                        isLoading={isLoading}
                        searchTerm={searchTerm}
                        postulations={postulations}
                        filter={filter}
                      />
                    </div>
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
