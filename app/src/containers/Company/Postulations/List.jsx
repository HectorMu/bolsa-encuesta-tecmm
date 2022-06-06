import { useEffect, useState, useMemo } from "react";

//Importando componentes
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";
import Loading from "@/components/Global/Loading";
import Pagination from "@/components/Global/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);

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

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    if (filter !== "Todas") {
      return (
        postulations.length > 0 &&
        postulations
          .filter((postulation) => postulation.status === filter)
          .slice(firstPageIndex, lastPageIndex)
      );
    }
    return (
      postulations.length > 0 &&
      postulations.slice(firstPageIndex, lastPageIndex)
    );
  }, [currentPage, postulations, searchTerm, filter]);

  if (error?.error) {
    return isLoading ? <Loading /> : <ErrorDisplayer message={error.message} />;
  }

  return (
    <div>
      {searchTerm === "" && (
        <Pagination
          className="pagination-bar mb-2"
          currentPage={currentPage}
          totalCount={postulations.length > 0 && postulations.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
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
        <Pagination
          className="pagination-bar mt-4"
          currentPage={currentPage}
          totalCount={postulations.length > 0 && postulations.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default List;
