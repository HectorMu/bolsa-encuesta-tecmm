import { useState } from "react";
import List from "@/containers/Graduated/JobBank/List";
import Showcase from "@/containers/Graduated/JobBank/Showcase";
import useServiceFetch from "@/hooks/useServiceFetch";
import jobsService from "@/services/Graduated/jobs.service";
import useCleanAosAnimations from "@/hooks/useCleanAosAnimations";
import Loading from "@/components/Global/Loading";

const JobBank = () => {
  const [selectedJob, setSelectedJob] = useState({});
  const { hookData, refreshData, isLoading } = useServiceFetch(
    jobsService.getJobs
  );
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container-fluid mb-3">
      <div
        ref={useCleanAosAnimations()}
        data-aos="flip-right"
        className="col-xl-10 mx-auto"
      >
        <div className="input-group w-100 mb-3">
          <input
            type="text"
            className="form-control bg-light border-0 "
            placeholder="Buscar trabajos..."
            aria-label="Search"
            aria-describedby="basic-addon2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>

        <div className="card shadow rounded">
          <div className="card-body">
            {isLoading ? (
              <Loading />
            ) : hookData.length > 0 ? (
              <div className="row">
                <div className="col-md-5 col-lg-5 col-xl-5">
                  <div style={{ height: "65vh" }}>
                    <div style={{ overflowY: "scroll", height: "100%" }}>
                      <List
                        searchTerm={searchTerm}
                        jobs={hookData}
                        selection={{ selectedJob, setSelectedJob }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-lg-7 col-xl-7">
                  <Showcase
                    refreshData={refreshData}
                    selection={{ selectedJob, setSelectedJob }}
                  />
                </div>
              </div>
            ) : (
              <h1 className="text-center font-weight-bolder text-primary ">
                ¡Parece que aun no hay trabajos disponibles... vuelve pronto!
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBank;
