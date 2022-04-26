import { useState } from "react";
import useCleanAosAnimations from "@/hooks/useCleanAosAnimations";
import List from "@/containers/Graduated/JobBank/Postulations/List";
import Showcase from "@/containers/Graduated/JobBank/Postulations/Showcase";
import useServiceFetchV2 from "@/hooks/useServiceFetchV2";
import jobsService from "@/services/Graduated/jobs.service";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

const Postulations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    hookData: postulations,
    isLoading,
    refreshData,
  } = useServiceFetchV2(jobsService.getGraduatedPostulations, []);

  const animatedRef = useCleanAosAnimations();

  if (postulations?.error) {
    return <ErrorDisplayer message={postulations.message} />;
  }
  return (
    <div className="mb-3">
      <div
        ref={animatedRef}
        data-aos="flip-right"
        className="col-md-12 col-lg-12 col-xl-11 mx-auto"
      >
        <div className="card shadow rounded">
          <div className="card-body">
            <div className="row">
              <div className="col-md-5 col-lg-5 col-xl-5">
                <div style={{ height: "63vh" }}>
                  <div className="input-group w-100 mb-3">
                    <input
                      type="text"
                      className="form-control bg-light"
                      placeholder="Buscar en mis postulaciones..."
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
                    className="purple-scroll"
                    style={{
                      overflowY: "scroll",
                      maxHeight: "55vh",
                    }}
                  >
                    <List
                      postulations={postulations}
                      isLoading={isLoading}
                      searchTerm={searchTerm}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-lg-7 col-xl-7">
                <div
                  className="purple-scroll"
                  style={{
                    overflowY: "scroll",
                    maxHeight: "55vh",
                  }}
                >
                  <Showcase refreshData={refreshData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postulations;
