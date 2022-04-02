import { useEffect, useState, useCallback, useRef } from "react";
import useRouterHooks from "@/hooks/useRouterHooks";
import jobsService from "@/services/Graduated/jobs.service";
import moment from "moment/min/moment-with-locales";
import toast from "react-hot-toast";

const Showcase = ({ selection: { selectedJob, setSelectedJob } }) => {
  const [job, setJob] = useState({});
  const [cv, setCv] = useState("");
  const { params } = useRouterHooks();
  const fileRef = useRef();

  const handleOpenFile = () => {
    if (cv === "") {
      fileRef.current.click();
      return;
    }

    toast.success("Curriculum enviado");
    setCv("");
  };

  const getPostulationHandler = useCallback(() => {
    //todo
    //check if the user has a current postulation and execute it when
    //component renders and when the user change the job selected
    //use a state to get the postulation and show in the screen
  });

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

  useEffect(() => {
    setCv("");
  }, [job.folio]);

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
      <div className="d-flex flex-column flex-lg-row flex-xl-row mt-3">
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

      <div className="d-flex flex-column align-items-center justify-content-center mt-5">
        {cv !== "" && (
          <div className="d-flex flex-column align-items-center justify-content-center ">
            <p>Archivo seleccionado: {cv}</p>
            <button
              onClick={() => setCv("")}
              className="btn btn-primary btn-sm"
            >
              Quitar <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        <div className="form-group">
          <input
            ref={fileRef}
            type={"file"}
            onChange={(e) => setCv(e.target.files[0].name)}
            hidden={true}
          />
        </div>
        <button
          onClick={handleOpenFile}
          className="btn btn-primary btn-lg mt-3"
        >
          {cv !== "" ? "Enviar CV" : "Postularme"}
        </button>
      </div>
    </div>
  );
};

export default Showcase;
