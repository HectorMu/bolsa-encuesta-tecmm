import { useState, useEffect } from "react";
import List from "@/containers/Graduated/JobBank/List";
import Showcase from "@/containers/Graduated/JobBank/Showcase";
import useServiceFetch from "@/hooks/useServiceFetchV2";
import jobsService from "@/services/Graduated/jobs.service";
import useCleanAosAnimations from "@/hooks/useCleanAosAnimations";
import profileService from "@/services/Graduated/profile.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import toast from "react-hot-toast";

const JobBank = () => {
  const { verifySession } = useSession();
  const animatedRef = useCleanAosAnimations();
  const { navigate } = useRouterHooks();
  const { hookData, isLoading, refreshData } = useServiceFetch(
    () => verifySession(jobsService.getJobs, refreshData),
    []
  );
  const [searchTerm, setSearchTerm] = useState("");

  const verifyUserProfileHandler = async () => {
    const fetchedProfile = await verifySession(
      () => profileService.getProfile(),
      verifyUserProfileHandler
    );
    if (!fetchedProfile.id) {
      navigate("/profile");
      return toast(
        "Antes de empezar a ver trabajos completa la informacion de tu perfil."
      );
    }
  };

  useEffect(() => {
    verifyUserProfileHandler();
  }, []);

  return (
    <div className="mb-3">
      <div
        ref={animatedRef}
        data-aos="flip-right"
        className="col-md-12 col-lg-12 col-xl-11 mx-auto"
      >
        {/* <div className="input-group w-100 mb-3">
          <input
            type="text"
            className="form-control bg-light"
            placeholder="Buscar trabajos..."
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
        </div> */}

        <div className="card shadow rounded">
          <div className="card-body">
            <div className="row">
              <div className="col-md-5 col-lg-5 col-xl-5">
                <div style={{ height: "63vh" }}>
                  <div className="input-group w-100 mb-3 px-2 overflow-auto">
                    <input
                      type="text"
                      className="form-control bg-light"
                      placeholder="Buscar trabajos..."
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
                      isLoading={isLoading}
                      searchTerm={searchTerm}
                      jobs={hookData}
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
                  <Showcase />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBank;
