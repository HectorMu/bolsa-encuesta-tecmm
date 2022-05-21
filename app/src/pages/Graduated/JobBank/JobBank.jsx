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
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";
import MobileShowcase from "@/components/Graduated/JobBank/MobileShowcase";

const JobBank = () => {
  const { verifySession } = useSession();
  const animatedRef = useCleanAosAnimations();
  const [toggleShowcase, setToggleShowcase] = useState(false);
  const { navigate } = useRouterHooks();
  const [error, setError] = useState({ error: false, statusText: "" });
  const {
    hookData: jobs,
    isLoading,
    refreshData,
  } = useServiceFetch(
    () => verifySession(jobsService.getJobs, refreshData),
    []
  );
  const [searchTerm, setSearchTerm] = useState("");

  const verifyUserProfileHandler = async () => {
    const fetchedProfile = await verifySession(
      () => profileService.getProfile(),
      verifyUserProfileHandler
    );

    if (fetchedProfile.error) {
      setError(fetchedProfile);
      return;
    }
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

  if (error.error) {
    return <ErrorDisplayer message={error.message} />;
  }
  return (
    <div className="mb-3">
      <div
        ref={animatedRef}
        data-aos="fade-up"
        data-aos-duration="200"
        className="container-fluid"
      >
        <div className="card shadow rounded">
          <div className="card-body">
            <div className="row">
              <div className="col-md-5 col-lg-5 col-xl-5">
                <div className="jobbank-card-responsive-heigth">
                  <div className="input-group w-100 mb-3 px-2 overflow-auto">
                    <input
                      type="text"
                      className="form-control bg-light"
                      placeholder="Buscar trabajos..."
                      aria-label="Search"
                      autoComplete="off"
                      aria-describedby="basic-addon2"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                  <div className="purple-scroll jobbank-section">
                    <List
                      isLoading={isLoading}
                      searchTerm={searchTerm}
                      jobs={jobs}
                      toggleShowcase={toggleShowcase}
                      setToggleShowcase={setToggleShowcase}
                    />
                  </div>
                </div>
              </div>
              <MobileShowcase
                toggleShowcase={toggleShowcase}
                setToggleShowcase={setToggleShowcase}
              >
                <Showcase setSearchTerm={setSearchTerm} jobs={jobs} />
              </MobileShowcase>
              <div className="col-md-7 col-lg-7 col-xl-7 d-none d-sm-none d-md-block d-lg-block">
                <div className="purple-scroll jobbank-section">
                  <Showcase setSearchTerm={setSearchTerm} jobs={jobs} />
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
