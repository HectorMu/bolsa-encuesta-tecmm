import { useState } from "react";
import { Link } from "react-router-dom";
//components
import ShowcaseContainer from "@/components/Global/ShowcaseContainer";
import ShowcaseCard from "@/components/Global/ShowcaseCard";
import moment from "moment/min/moment-with-locales";

//hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import useServiceFetch from "@/hooks/useServiceFetchV2";

//Services
import companiesService from "@/services/Admin/companies.service";

const CurrentVacants = ({ company }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { verifySession } = useSession();
  const { params } = useRouterHooks();
  const {
    hookData: jobs,
    isLoading,
    refreshData,
    error,
  } = useServiceFetch(
    () =>
      verifySession(
        () => companiesService.getCurrentPublicatedJobs(params.id),
        refreshData
      ),
    [params.id]
  );

  if (error.error) return null;

  return isLoading ? null : (
    <ShowcaseContainer>
      <ShowcaseCard>
        <h3 className="text-center text-primary font-weight-bolder">
          Publicaciones
        </h3>

        <div className="row">
          {jobs &&
            jobs.length > 0 &&
            !jobs.filter(
              (job) =>
                job.vacante.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
            ).length > 0 &&
            searchTerm.length > 0 && (
              <h5 className="text-center text-primary w-100">
                No se encontraron resultados para: '{searchTerm}''
              </h5>
            )}
          {jobs.length > 0 ? (
            <>
              <div className="input-group w-100 mb-3 px-2 overflow-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar en las publicaciones..."
                  aria-label="Search"
                  autoComplete="off"
                  aria-describedby="basic-addon2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
              {jobs
                .filter(
                  (job) =>
                    job.vacante
                      .toLowerCase()
                      .includes(searchTerm.toLocaleLowerCase()) ||
                    job.descripcion
                      .toLowerCase()
                      .includes(searchTerm.toLocaleLowerCase())
                )
                .map((job) => (
                  <div key={job.folio} className="col-lg-12 col-xl-12 ">
                    <div className="card border-0">
                      <div className="card-body px-0 border-bottom-purple">
                        <h5 className="font-weight-bold p-0">
                          {job.vacante}{" "}
                          <Link
                            to={`/jobbank/postulations/${job.folio}`}
                            className="text-purple"
                            target={"_blank"}
                            rel={"noopener noreferrer"}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fas fa-external-link-alt fa-xs "></i>
                          </Link>
                        </h5>
                        <div className="d-flex justify-content-between">
                          <span className="text-gray-800">
                            {job.nombre_comercial}
                          </span>
                          <div className="d-flex ">
                            <p className="px-1">
                              {/* {e.fecha_creacion} */}
                              <span className="badge badge-primary">
                                Publicado:{" "}
                                {moment(job.fecha_creacion)
                                  .locale("es")
                                  .fromNow()}
                              </span>
                            </p>
                            <p>
                              {/* {e.fecha_creacion} */}
                              <span className="badge badge-primary ">
                                Expira:{" "}
                                {moment(job.fecha_expira)
                                  .locale("es")
                                  .fromNow()}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="d-flex justify-content-start">
                          <span className="text-primary font-weight-bolder">
                            {job.status}
                          </span>
                          <span className="px-1">|</span>
                          <span className="text-primary font-weight-bolder">
                            {job.solicitudes} solicitudes
                          </span>
                          <span className="px-1">|</span>
                          <span className="text-primary font-weight-bolder">
                            {job.visitas} solicitudes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <div className="d-flex justify-content-center flex-column align-content-center w-100">
              <h5 className="text-center font-weight-bold">
                {company?.nombre_comercal} aun no ha publicado ninguna vacante.
              </h5>
            </div>
          )}
        </div>
      </ShowcaseCard>
    </ShowcaseContainer>
  );
};

export default CurrentVacants;
