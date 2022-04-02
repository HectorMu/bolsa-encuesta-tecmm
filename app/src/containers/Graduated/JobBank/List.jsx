import useServiceFetch from "@/hooks/useServiceFetch";
import jobsService from "@/services/Graduated/jobs.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import moment from "moment/min/moment-with-locales";

const List = ({ selection: { selectedJob, setSelectedJob } }) => {
  const { hookData } = useServiceFetch(jobsService.getJobs);
  const { navigate } = useRouterHooks();

  const handleJobSelection = (job) => {
    navigate(`/graduated/jobbank/job/${job.folio}`);
    setSelectedJob(job);
  };

  return (
    <div>
      {hookData.length > 0 ? (
        hookData.map((e) => (
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
                  - 2 solicitudes
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
