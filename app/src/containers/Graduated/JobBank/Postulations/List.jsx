import { useState, useMemo, useEffect } from "react";
//Implementando hooks
import useWindowSize from "@/hooks/useWindowResize";
//Importando componentes
import Loading from "@/components/Global/Loading";
import JobItem from "@/components/Graduated/JobBank/JobItem";
import ReactPaginate from "react-paginate";
//Hooks
import useRouterHooks from "@/hooks/useRouterHooks";

const List = ({ searchTerm, postulations, isLoading, setToggleShowcase }) => {
  const size = useWindowSize();
  const { navigate } = useRouterHooks();
  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const handleJobSelection = (postulation) => {
    navigate(`/graduated/jobbank/postulations/${postulation.fk_vacante}`, {
      state: postulation,
    });
    if (size.width < 800) setToggleShowcase(true);
  };

  const currentPostulations = useMemo(() => {
    const endOffset = itemOffset + PageSize;
    if (searchTerm !== "") {
      if (searchTerm === "") return currentPostulations;

      const results = postulations.filter(
        (postulation) =>
          postulation.vacante
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          postulation.nombre_comercial
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      if (results.length > 0) return results;

      return [];
    }

    return postulations.length > 0 && postulations.slice(itemOffset, endOffset);
  }, [postulations, searchTerm, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * PageSize) % postulations.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    setPageCount(Math.ceil(postulations.length / PageSize));
  }, [postulations]);

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

      {searchTerm !== "" && currentPostulations.length === 0 && (
        <h5 className="text-center text-primary">
          No se encontraron resultados para: '{searchTerm}''
        </h5>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        currentPostulations.length > 0 &&
        currentPostulations.map((job, i) => (
          <JobItem
            key={i}
            job={job}
            handleSelection={handleJobSelection}
            isPostulation={true}
          />
        ))
      )}
      {!currentPostulations.length && searchTerm === "" && (
        <h5 className="text-center">
          {" "}
          Aquí aparecerán los trabajos en los que te has postulado
        </h5>
      )}
      {searchTerm === "" && (
        <div className="d-flex justify-content-center mt-3">
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
