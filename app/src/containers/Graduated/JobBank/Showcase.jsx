import { useEffect, useState, useCallback } from "react";
import useRouterHooks from "@/hooks/useRouterHooks";
import jobsService from "@/services/Graduated/jobs.service";

const Showcase = ({ selection: { selectedJob, setSelectedJob } }) => {
  const [job, setJob] = useState({});
  const { params } = useRouterHooks();

  const handleGetJobFromFetch = useCallback(async () => {
    if (!params.id) {
      setJob(selectedJob);
      return;
    }

    const fetchedJob = await jobsService.getOneJob(params.id);
    console.log(fetchedJob);
    setJob(fetchedJob);
    setSelectedJob(fetchedJob);
  }, [params.id]);

  useEffect(() => {
    handleGetJobFromFetch();
  }, [handleGetJobFromFetch]);

  if (!job.folio) {
    return (
      <div className="d-flex justify-content-center align-items-center h-50 text-black">
        <h3>Selecciona un trabajo de la lista para saber mas y postularte!</h3>
      </div>
    );
  }
  return (
    <>
      <h3 className="text-primary btn-link text-center font-weight-bolder">
        {job.vacante}
      </h3>
      <div className="d-flex justify-content-between text-black">
        <h5>{job.nombre_comercial}</h5>
        <div className="d-flex">
          <p className="mr-2">{job.estado} </p>
          <p>{job.municipio}</p>
        </div>
      </div>
      <div className="text-black">
        <p>Empresa: {job.tamaño}</p>
        <p className="text-black"> {job.descripcion}</p>
      </div>

      <div className="d-flex justify-content-end mt-5">
        <button className="btn btn-primary btn-lg">Postularme</button>
      </div>
    </>
  );
};

export default Showcase;
