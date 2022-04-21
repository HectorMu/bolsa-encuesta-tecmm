import moment from "moment/min/moment-with-locales";

//Implementando hooks
import Loading from "@/components/Global/Loading";
import useRouterHooks from "@/hooks/useRouterHooks";

const List = ({ searchTerm, postulations, isLoading }) => {
  const { params, navigate } = useRouterHooks();

  const handleSelection = (postulation) => {
    navigate(`/graduated/jobbank/postulations/${postulation.fk_vacante}`, {
      state: postulation,
    });
  };

  return (
    <div>
      {!postulations.filter((job) =>
        job.vacante.toLowerCase().includes(searchTerm.toLowerCase())
      ).length > 0 &&
        searchTerm.length > 0 && (
          <h5 className="text-center text-primary">
            No se encontraron resultados para: '{searchTerm}''
          </h5>
        )}

      {isLoading ? (
        <Loading />
      ) : postulations.length > 0 ? (
        postulations
          .filter((postulation) =>
            postulation.vacante.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((e) => (
            <div
              onClick={() => handleSelection(e)}
              key={e.fk_vacante}
              style={{ cursor: "pointer" }}
              className={`card rounded-0 pt-3 px-3 border-left-0 border-right-0   ${
                parseInt(params.id) === e.fk_vacante
                  ? "bg-green-light shadow "
                  : ""
              }`}
            >
              <h5 className="text-primary font-weight-bolder">{e.vacante}</h5>
              <div className="d-flex flex-column">
                <span className="text-truncate ">{e.nombre_comercial}</span>
                <span className="text-truncate ">{e.ubicacion}</span>
              </div>

              <div className="d-flex justify-content-between align-items-end h-100 mt-2">
                <p style={{ fontSize: "13px" }}>
                  <span className="text-primary font-weight-bold">cv</span>{" "}
                  <span className="text-primary font-weight-bold">
                    |{" "}
                    <span className="badge badge-primary ">
                      {e.solicitudes}
                    </span>{" "}
                    {e.solicitudes === 1 ? "Solicitud" : "Solicitudes"}
                  </span>
                </p>

                <p>
                  {/* {e.fecha_creacion} */}
                  <span className="badge badge-primary ">
                    {moment(e.fecha_creacion).locale("es").fromNow()}
                  </span>
                </p>
              </div>
            </div>
          ))
      ) : (
        <h5 className="text-center">
          Aqui apareceran los trabajos publicados recientemente
        </h5>
      )}
    </div>
  );
};

export default List;
