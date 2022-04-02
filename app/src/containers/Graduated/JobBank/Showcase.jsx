import { useEffect, useState, useCallback } from "react";
import useRouterHooks from "@/hooks/useRouterHooks";
import jobsService from "@/services/Graduated/jobs.service";
import moment from "moment/min/moment-with-locales";

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
    <div className="p-2">
      <h3 className="text-primary btn-link text-left font-weight-bolder">
        {job.vacante}
      </h3>
      <div className="d-flex  mt-3">
        <h5 className="font-weight-bold">{job.nombre_comercial}</h5>
        <ul className="custom-list">
          <li>
            <h6>{job.ubicacion}</h6>
          </li>
          <li>
            <span className="badge p-2 badge-primary">
              <i className="fas fa-clock"></i>{" "}
              {moment(job.fecha_creacion).locale("es").fromNow()}
            </span>
          </li>
        </ul>
      </div>
      <div>
        <p>
          <i className="fas fa-building text-primary"></i>: {job.tamaño}
        </p>
        <p className="text-black"> {job.descripcion}</p>
      </div>

      <div className="d-flex justify-content-end mt-5">
        <button className="btn btn-primary btn-lg">Postularme</button>
      </div>
    </div>
  );
};

export default Showcase;
