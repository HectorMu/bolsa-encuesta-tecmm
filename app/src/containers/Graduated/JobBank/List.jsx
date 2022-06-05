import { useState, useMemo } from "react";
//Importando los componentes
import Loading from "@/components/Global/Loading";
import Pagination from "@/components/Global/Pagination";
//Importando los hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useWindowSize from "@/hooks/useWindowResize";
import JobItem from "@/components/Graduated/JobBank/JobItem";

const List = ({ searchTerm, jobs, isLoading, setToggleShowcase }) => {
  const size = useWindowSize();

  const { navigate } = useRouterHooks();

  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const currentJobs = useMemo(() => {
    if (searchTerm !== "") {
      if (searchTerm === "") return currentTableData;

      const results = jobs.filter(
        (job) =>
          job.vacante.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.nombre_comercial.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (results.length > 0) return results;

      return [];
    }

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return jobs.length > 0 && jobs.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, jobs, searchTerm]);

  const handleJobSelection = (job) => {
    navigate(`/graduated/jobbank/jobs/${job.folio}`, { state: job });

    if (size.width < 800) setToggleShowcase(true);
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={jobs.length > 0 && jobs.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {searchTerm !== "" && currentJobs.length === 0 && (
        <h5 className="text-center text-primary">
          No se encontraron resultados para: '{searchTerm}''
        </h5>
      )}

      {currentJobs.length > 0 &&
        currentJobs.map((job, i) => (
          <JobItem key={i} job={job} handleSelection={handleJobSelection} />
        ))}

      {!currentJobs.length && searchTerm === "" && (
        <h5 className="text-center">
          {" "}
          Aquí aparecerán las vacantes publicadas
        </h5>
      )}

      <Pagination
        className="pagination-bar mt-3"
        currentPage={currentPage}
        totalCount={jobs.length > 0 && jobs.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default List;
