//lib
import { useState } from "react";
//services
import jobsService from "@/services/Graduated/jobs.service";

//hooks
import useServiceFetch from "@/hooks/useServiceFetchV2";
//components
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";
import ListDetailLayout from "@/components/Global/ListDetailLayout";
import ListDetailSearch from "@/components/Global/ListDetailSearch";

//containers
import List from "@/containers/Graduated/JobBank/Postulations/List";
import Showcase from "@/containers/Graduated/JobBank/Postulations/Showcase";

const Postulations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleShowcase, setToggleShowcase] = useState(false);
  const {
    hookData: postulations,
    isLoading,
    refreshData,
    error,
  } = useServiceFetch(jobsService.getGraduatedPostulations, []);

  if (error?.error) {
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
            postulations={postulations}
            isLoading={isLoading}
            searchTerm={searchTerm}
            toggleShowcase={toggleShowcase}
            setToggleShowcase={setToggleShowcase}
          />
        }
        showcase={
          <Showcase
            refreshData={refreshData}
            isLoading={isLoading}
            postulations={postulations}
          />
        }
        MobileShowCaseControls={{ toggleShowcase, setToggleShowcase }}
      />
    </div>
  );
};

export default Postulations;
