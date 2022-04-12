import Loading from "@/components/Global/Loading";
import useRouterHooks from "@/hooks/useRouterHooks";
import moment from "moment/min/moment-with-locales";

const List = ({ searchTerm, jobs, isLoading }) => {
  const { navigate, params } = useRouterHooks();
  const handleJobSelection = (job) => {
    navigate(`/graduated/jobbank/job/${job.folio}`, { state: job });
  };

  return (
    <div>
      {!jobs.filter((job) =>
        job.vacante.toLowerCase().includes(searchTerm.toLowerCase())
      ).length > 0 &&
        searchTerm.length > 0 && (
          <h5 className="text-center text-primary">
            No se encontraron resultados para: '{searchTerm}''
          </h5>
        )}

      {isLoading ? (
        <Loading />
      ) : jobs.length > 0 ? (
        jobs
          .filter((job) =>
            job.vacante.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((e) => (
            <div
              onClick={() => handleJobSelection(e)}
              key={e.folio}
              style={{ cursor: "pointer" }}
              className={`card rounded-0 pt-3 px-3 border-left-0 border-right-0   ${
                parseInt(params.id) === e.folio ? "bg-green-light shadow " : ""
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
