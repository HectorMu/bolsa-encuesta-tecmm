import { useState, useMemo, useEffect } from "react";
//Importando los componentes
import Loading from "@/components/Global/Loading";
import Pagination from "@/components/Global/Pagination";
//Importando los hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useWindowSize from "@/hooks/useWindowResize";

import moment from "moment/min/moment-with-locales";

const List = ({ searchTerm, jobs, isLoading, setToggleShowcase }) => {
  const size = useWindowSize();

  const { navigate, params } = useRouterHooks();

  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const currentJobs = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return jobs.length > 0 && jobs.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, jobs]);

  const searchedJobs = useMemo(() => {
    return (
      jobs.length > 0 &&
      jobs.filter(
        (job) =>
          job.vacante.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.nombre_comercial.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleJobSelection = (job) => {
    navigate(`/graduated/jobbank/jobs/${job.folio}`, { state: job });

    if (size.width < 800) setToggleShowcase(true);
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={jobs.length > 0 && jobs.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {searchTerm.length > 0 && searchedJobs.length === 0 && (
        <h5 className="text-center text-primary">
          No se encontraron resultados para: '{searchTerm}''
        </h5>
      )}

      {currentJobs.length > 0 && searchTerm === ""
        ? currentJobs.map((e) => (
            <div
              onClick={() => handleJobSelection(e)}
              key={e.folio}
              style={{ cursor: "pointer" }}
              className={`card jobbank-item rounded-0 pt-3 px-3 border-left-0 border-right-0   ${
                parseInt(params.id) === e.folio ? "active" : ""
              }`}
            >
              <h5 className="text-primary  font-weight-bolder">{e.vacante}</h5>
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
                  <span className="badge badge-primary ">
                    {moment(e.fecha_creacion).locale("es").fromNow()}
                  </span>
                </p>
              </div>
            </div>
          ))
        : null}

      {searchedJobs.length > 0 && searchTerm !== ""
        ? searchedJobs.map((e) => (
            <div
              onClick={() => handleJobSelection(e)}
              key={e.folio}
              style={{ cursor: "pointer" }}
              className={`card jobbank-item rounded-0 pt-3 px-3 border-left-0 border-right-0   ${
                parseInt(params.id) === e.folio ? "active" : ""
              }`}
            >
              <h5 className="text-primary  font-weight-bolder">{e.vacante}</h5>
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
                  <span className="badge badge-primary ">
                    {moment(e.fecha_creacion).locale("es").fromNow()}
                  </span>
                </p>
              </div>
            </div>
          ))
        : null}

      {currentJobs.length === 0 && searchedJobs.length === 0 && (
        <h5 className="text-center">Aquí aparecerán las vacantes publicadas</h5>
      )}
      <Pagination
        className="pagination-bar mt-3"
        currentPage={currentPage}
        totalCount={jobs.length > 0 && jobs.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default List;
