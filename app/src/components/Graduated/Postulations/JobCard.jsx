import { useState } from "react";
import moment from "moment/min/moment-with-locales";
import useRouterHooks from "@/hooks/useRouterHooks";

const JobCard = ({ job }) => {
  const [toggleStatusSpan, setToggleStatusSpan] = useState(false);

  const toggleStatusSpanOnHover = () => setToggleStatusSpan(!toggleStatusSpan);
  const { navigate, params } = useRouterHooks();

  const handleSelection = (postulation) => {
    navigate(`/graduated/jobbank/postulations/${postulation.fk_vacante}`, {
      state: postulation,
    });
  };
  return (
    <div
      onClick={() => handleSelection(job)}
      key={job.fk_vacante}
      style={{ cursor: "pointer" }}
      className={`card jobbank-item rounded-0 pt-3 px-3 border-left-0 border-right-0   ${
        parseInt(params.id) === job.fk_vacante ? "active " : ""
      }`}
    >
      <h5 className="text-primary font-weight-bolder">{job.vacante}</h5>
      <div className="d-flex flex-column">
        <span className="text-truncate ">{job.nombre_comercial}</span>
        <span className="text-truncate ">{job.ubicacion}</span>
      </div>

      <div className="d-flex justify-content-between align-items-end h-100 mt-2">
        <p style={{ fontSize: "13px" }}>
          <span className="text-primary font-weight-bold">cv</span>{" "}
          <span className="text-primary font-weight-bold">
            | <span className="badge badge-primary ">{job.solicitudes}</span>{" "}
            {job.solicitudes === 1 ? "Solicitud" : "Solicitudes"}
          </span>
        </p>

        <p>
          <span className="badge badge-primary mr-2">
            {moment(job.fecha_creacion).locale("es").fromNow()}
          </span>

          <span className={`text-black ${toggleStatusSpan ? "" : "d-none"}`}>
            {job.publicacion_status}{" "}
          </span>
          <span
            onMouseEnter={toggleStatusSpanOnHover}
            onMouseLeave={toggleStatusSpanOnHover}
            className="badge badge-primary "
          >
            {job.publicacion_status === "Cerrada" ? (
              <i className="fas fa-lock"></i>
            ) : (
              <i className="fas fa-lock-open"></i>
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobCard;
