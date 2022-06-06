import { useState } from "react";
import useSession from "@/hooks/useSession";
import vacanciesService from "@/services/Company/vacancies.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import useServiceFetchV2 from "@/hooks/useServiceFetchV2";

import List from "@/containers/Company/Postulations/List";
import Showcase from "@/containers/Company/Postulations/Showcase";
import VacantDetails from "@/containers/Company/Postulations/VacantDetails";
import useWindowSize from "@/hooks/useWindowResize";

import ScrollToTop from "@/components/Navigation/ScrollToTopOnMount";

import ListDetailLayout from "@/components/Global/ListDetailLayout";
import ListDetailSearch from "@/components/Global/ListDetailSearch";

const FILTER_OPTIONS = ["Todas", "Sin revisar", "Revisado"];
const Postulations = () => {
  const { width } = useWindowSize();
  const [toggleShowcase, setToggleShowcase] = useState(false);

  const removeOnRezise = width < 800 ? "" : "col-xl-10 mx-auto";

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Todas");
  const { params } = useRouterHooks();
  const { verifySession } = useSession();
  const {
    hookData: postulations,
    refreshData,
    isLoading,
    error,
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
      <ScrollToTop />
      <VacantDetails removeOnRezise={removeOnRezise} />
      {isLoading ? null : (
        <div className={`${removeOnRezise} mt-3`}>
          <div className="d-flex justify-content-start mb-3">
            <div className="btn-group" role="group">
              {FILTER_OPTIONS.map((option) => (
                <button
                  type="button"
                  onClick={() => setFilter(option)}
                  className={`btn btn-outline-primary btn-sm ${
                    filter === option ? "active" : ""
                  } `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <ListDetailLayout
        listHeader={
          <ListDetailSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        }
        className={removeOnRezise}
        list={
          <List
            isLoading={isLoading}
            postulations={postulations}
            error={error}
            searchTerm={searchTerm}
            filter={filter}
            setToggleShowcase={setToggleShowcase}
          />
        }
        showcase={
          <Showcase postulations={postulations} refreshData={refreshData} />
        }
        MobileShowCaseControls={{ setToggleShowcase, toggleShowcase }}
      />
    </div>
  );
};

export default Postulations;
