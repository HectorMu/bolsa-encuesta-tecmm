import { useState, useMemo, useEffect } from "react";
//Importando los componentes
import Loading from "@/components/Global/Loading";
import JobItem from "@/components/Graduated/JobBank/JobItem";
import ReactPaginate from "react-paginate";
//Importando los hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useWindowSize from "@/hooks/useWindowResize";
import useServiceFetch from "@/hooks/useServiceFetchV2";
//importando servicios
import jobsService from "@/services/Graduated/jobs.service";

const List = ({ searchTerm, jobs, isLoading, setToggleShowcase }) => {
  const size = useWindowSize();
  const { hookData: graduatedPostulations } = useServiceFetch(
    jobsService.getGraduatedPostulations,
    [],
    []
  );

  const { navigate } = useRouterHooks();
  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const currentJobs = useMemo(() => {
    const endOffset = itemOffset + PageSize;
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

    return jobs.length > 0 && jobs.slice(itemOffset, endOffset);
  }, [itemOffset, jobs, searchTerm]);

  const handleJobSelection = (job) => {
    navigate(`/graduated/jobbank/jobs/${job.folio}`, { state: job });

    if (size.width < 800) setToggleShowcase(true);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * PageSize) % jobs.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    setPageCount(Math.ceil(jobs.length / PageSize));
  }, [jobs]);

  if (isLoading) return <Loading />;

  return (
    <div>
      {searchTerm === "" && (
        <div className="d-flex justify-content-center">
          {pageCount > 1 && (
            <ReactPaginate
              key={"P1"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              forcePage={currentPage}
            />
          )}
        </div>
      )}

      {searchTerm !== "" && currentJobs.length === 0 && (
        <h5 className="text-center text-primary">
          No se encontraron resultados para: '{searchTerm}''
        </h5>
      )}

      {currentJobs.length > 0 &&
        currentJobs.map((job, i) => (
          <JobItem
            key={i}
            job={job}
            handleSelection={handleJobSelection}
            graduatedPostulations={graduatedPostulations}
          />
        ))}

      {!currentJobs.length && searchTerm === "" && (
        <h5 className="text-center">
          {" "}
          Aquí aparecerán las vacantes publicadas
        </h5>
      )}
      {searchTerm === "" && (
        <div className="d-flex justify-content-center">
          {pageCount > 1 && (
            <ReactPaginate
              key={"P1"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              forcePage={currentPage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default List;
