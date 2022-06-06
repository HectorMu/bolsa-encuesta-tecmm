import { useState, useMemo } from "react";
//Implementando hooks
import useWindowSize from "@/hooks/useWindowResize";
//Importando componentes
import Loading from "@/components/Global/Loading";
import JobItem from "@/components/Graduated/JobBank/JobItem";
import Pagination from "@/components/Global/Pagination";

//Hooks
import useRouterHooks from "@/hooks/useRouterHooks";

const List = ({ searchTerm, postulations, isLoading, setToggleShowcase }) => {
  const size = useWindowSize();
  const { navigate } = useRouterHooks();
  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleJobSelection = (postulation) => {
    navigate(`/graduated/jobbank/postulations/${postulation.fk_vacante}`, {
      state: postulation,
    });
    if (size.width < 800) setToggleShowcase(true);
  };

  const currentPostulations = useMemo(() => {
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

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return (
      postulations.length > 0 &&
      postulations.slice(firstPageIndex, lastPageIndex)
    );
  }, [currentPage, postulations, searchTerm]);

  return (
    <div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={postulations.length > 0 && postulations.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
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
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={postulations.length > 0 && postulations.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default List;
