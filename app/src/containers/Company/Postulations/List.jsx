import { useEffect, useState, useMemo } from "react";

//Importando componentes
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";
import Loading from "@/components/Global/Loading";
import ReactPaginate from "react-paginate";

//Importando hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import useWindowSize from "@/hooks/useWindowResize";
import PostulationItem from "@/components/Company/Jobbank/PostulationItem";

const List = ({
  postulations,
  isLoading,
  error,
  searchTerm,
  filter,
  setToggleShowcase,
}) => {
  const size = useWindowSize();
  const { navigate, params } = useRouterHooks();
  const { user } = useSession();
  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const handleGoToPostulation = (postulation) => {
    if (size.width < 800) setToggleShowcase(true);

    if (user.fk_rol === 1) {
      navigate(`/jobbank/postulations/${params.job_id}/${postulation.id}`, {
        state: postulation,
      });
      return;
    }
    navigate(
      `/company/jobbank/postulations/${params.job_id}/${postulation.id}`,
      { state: postulation }
    );
  };

  const currentPostulations = useMemo(() => {
    const endOffset = itemOffset + PageSize;
    if (searchTerm !== "") {
      if (searchTerm === "") return currentPostulations;

      const results = postulations.filter(
        (postulation) =>
          postulation.nombre_completo
            .toLowerCase()
            .includes(searchTerm.toLowerCase().trim()) ||
          parseInt(postulation.id) === parseInt(searchTerm)
      );
      if (results.length > 0) return results;

      return [];
    }

    if (filter !== "Todas") {
      return (
        postulations.length > 0 &&
        postulations
          .filter((postulation) => postulation.status === filter)
          .slice(itemOffset, endOffset)
      );
    }
    return postulations.length > 0 && postulations.slice(itemOffset, endOffset);
  }, [postulations, searchTerm, filter, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * PageSize) % postulations.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    setPageCount(Math.ceil(postulations.length / PageSize));
  }, [postulations]);

  if (error?.error) {
    return isLoading ? <Loading /> : <ErrorDisplayer message={error.message} />;
  }

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

      {isLoading ? (
        <Loading />
      ) : currentPostulations.length > 0 ? (
        currentPostulations.map((postulation, i) => (
          <PostulationItem
            key={i}
            handleGoToPostulation={handleGoToPostulation}
            postulation={postulation}
          />
        ))
      ) : filter === "Revisado" || filter === "Sin revisar" ? (
        <h5 className="text-center text-primary py-2">
          No hay postulaciones en estado: {filter}, en la página {currentPage}
        </h5>
      ) : searchTerm !== "" && currentPostulations.length === 0 ? (
        <h5 className="text-center text-primary">
          No se encontraron resultados para: '{searchTerm}'
        </h5>
      ) : (
        <h5 className="text-center text-primary">
          Aqui apareceran las postulaciones de esta vacante
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
