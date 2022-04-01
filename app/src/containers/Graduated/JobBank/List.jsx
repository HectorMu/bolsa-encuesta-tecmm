import useServiceFetch from "@/hooks/useServiceFetch";
import jobsService from "@/services/Graduated/jobs.service";
import useRouterHooks from "@/hooks/useRouterHooks";

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
            key={e.folio}
            style={{ cursor: "pointer" }}
            className={`card text-black rounded-0  border-top-0 border-right-0 border-left-0 ${
              selectedJob?.folio === e.folio ? "bg-green-light shadow " : ""
            }`}
          >
            <div onClick={() => handleJobSelection(e)} className="card-body">
              <h5>{e.vacante}</h5>
              <p className="text-truncate ">{e.descripcion}</p>
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
