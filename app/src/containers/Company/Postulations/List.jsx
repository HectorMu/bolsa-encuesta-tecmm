import { useEffect, useState } from "react";

//Importando componentes
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";
import Loading from "@/components/Global/Loading";

//Importando hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";

const List = ({ postulations, isLoading, error, searchTerm, filter }) => {
  const { navigate, params } = useRouterHooks();
  const [localPostulations, setLocalPostulations] = useState([]);
  const { user } = useSession();

  const handleGoToPostulation = (postulation) => {
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

  if (error?.error) {
    return isLoading ? <Loading /> : <ErrorDisplayer message={error.message} />;
  }

  useEffect(() => {
    setLocalPostulations(postulations);
  }, [postulations]);
  useEffect(() => {
    if (postulations.length > 0) {
      if (filter === "Mas recientes") {
        setLocalPostulations(
          postulations.sort((fe, se) => se["id"] - fe["id"])
        );
        return;
      }
      setLocalPostulations(
        postulations.filter((postulation) => postulation.status === filter)
      );
    }
  }, [filter, postulations]);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : localPostulations?.length > 0 ? (
        localPostulations
          .filter(
            (postulation) =>
              postulation.nombre_completo
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              parseInt(postulation.id) === parseInt(searchTerm)
          )
          .map((postulation) => (
            <div
              onClick={() => handleGoToPostulation(postulation)}
              key={postulation.id}
              style={{ cursor: "pointer" }}
              className={`card rounded-0 pt-3 px-3 border-left-0 border-right-0   ${
                parseInt(params.postulation_id) === postulation.id
                  ? "bg-green-light shadow "
                  : ""
              }`}
            >
              <h5 className="text-primary font-weight-bolder">
                Postulacion No. {postulation.id}
              </h5>
              <h6 className=" font-weight-bolder">
                {postulation.nombre_completo}
              </h6>
              <div className="d-flex justify-content-end align-items-end h-100 mt-2">
                <p>
                  <span className="badge badge-primary px-1 py-1">
                    {postulation.status}
                  </span>
                </p>
              </div>
            </div>
          ))
      ) : filter === "Revisado" || filter === "Sin revisar" ? (
        <h5 className="text-center">
          No hay postulaciones en estado: {filter}
        </h5>
      ) : (
        <h5 className="text-center">
          Aqui apareceran las postulaciones recientes
        </h5>
      )}
    </div>
  );
};

export default List;
