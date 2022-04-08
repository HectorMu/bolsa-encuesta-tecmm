import useRouterHooks from "@/hooks/useRouterHooks";
import moment from "moment/min/moment-with-locales";

const List = ({ selection: { selectedJob }, jobs, searchTerm }) => {
  const { navigate } = useRouterHooks();
  const handleJobSelection = (job) => {
    navigate(`/graduated/jobbank/job/${job.folio}`);
  };

  console.log(searchTerm);
  return (
    <div>
      {!jobs.filter((job) =>
        job.vacante.toLowerCase().includes(searchTerm.toLowerCase())
      ).length > 0 && (
        <h5 className="text-center text-primary">
          No se encontraron resultados para: '{searchTerm}''
        </h5>
      )}

      {jobs.length > 0 ? (
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
                selectedJob?.folio === e.folio ? "bg-green-light shadow " : ""
              }`}
            >
              <h5 className="text-primary font-weight-bolder">{e.vacante}</h5>
              <div className="d-flex flex-column">
                <span className="text-truncate ">{e.nombre_comercial}</span>
                <span className="text-truncate ">{e.ubicacion}</span>
              </div>

              <div className="d-flex justify-content-between align-items-end h-100 mt-2">
                <p>
                  <span className="text-primary font-weight-bold">cv</span>{" "}
                  <span className="text-primary font-weight-bold">
                    - {e.solicitudes}{" "}
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
