//lib
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

//services
import jobsService from "@/services/Graduated/jobs.service";
import profileService from "@/services/Graduated/profile.service";

//hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import useServiceFetch from "@/hooks/useServiceFetchV2";

//containers
import List from "@/containers/Graduated/JobBank/List";
import Showcase from "@/containers/Graduated/JobBank/Showcase";

//components
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";
import ListDetailLayout from "@/components/Global/ListDetailLayout";
import ListDetailSearch from "@/components/Global/ListDetailSearch";

const JobBank = () => {
  const { verifySession } = useSession();
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
        "Antes de empezar a ver trabajos completa la información de tu perfil."
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
      <ListDetailLayout
        listHeader={
          <ListDetailSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        }
        list={
          <List
            isLoading={isLoading}
            searchTerm={searchTerm}
            jobs={jobs}
            toggleShowcase={toggleShowcase}
            setToggleShowcase={setToggleShowcase}
          />
        }
        showcase={<Showcase setSearchTerm={setSearchTerm} jobs={jobs} />}
        MobileShowCaseControls={{ toggleShowcase, setToggleShowcase }}
      />
    </div>
  );
};

export default JobBank;
