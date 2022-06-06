import { useState } from "react";
import useSession from "@/hooks/useSession";
import vacanciesService from "@/services/Company/vacancies.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import useServiceFetchV2 from "@/hooks/useServiceFetchV2";
import useCleanAosAnimations from "@/hooks/useCleanAosAnimations";
import useWindowSize from "@/hooks/useWindowResize";

import List from "@/containers/Company/Postulations/List";
import Showcase from "@/containers/Company/Postulations/Showcase";
import VacantDetails from "@/containers/Company/Postulations/VacantDetails";

import ScrollToTop from "@/components/Navigation/ScrollToTopOnMount";
import ListDetailLayout from "@/components/Global/ListDetailLayout";
import ListDetailSearch from "@/components/Global/ListDetailSearch";

const FILTER_OPTIONS = ["Todas", "Sin revisar", "Revisado"];

const Postulations = () => {
  const { width } = useWindowSize();

  const removeOnRezise = width < 800 ? "" : "col-xl-10 mx-auto";

  const [toggleShowcase, setToggleShowcase] = useState(false);

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
      <ScrollToTop />
      <VacantDetails removeOnRezise={removeOnRezise} />
      {isLoading ? null : (
        <div className={`${removeOnRezise} mt-3`}>
          <div className="d-flex justify-content-start mb-3">
            <div className="btn-group" role="group" aria-label="Basic example">
              {FILTER_OPTIONS.map((option, i) => (
                <button
                  key={i}
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
        className={removeOnRezise}
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
            postulations={postulations}
            filter={filter}
            toggleShowcase={toggleShowcase}
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
