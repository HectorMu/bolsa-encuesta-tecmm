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
import graduatesService from "@/services/Admin/graduates.service";

const CurrentPostulations = ({ graduated }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { verifySession } = useSession();
  const { params } = useRouterHooks();
  const {
    hookData: postulations,
    isLoading,
    refreshData,
    error,
  } = useServiceFetch(
    () =>
      verifySession(
        () => graduatesService.getPostulations(params.id),
        refreshData
      ),
    [params.id]
  );

  if (error.error) return null;

  return isLoading ? null : (
    <ShowcaseContainer>
      <ShowcaseCard>
        <h3 className="text-center text-primary font-weight-bolder">
          Postulaciones
        </h3>

        <div className="row">
          {postulations.length > 0 &&
            !postulations.filter(
              (job) =>
                job.vacante.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.nombre_comercial
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            ).length > 0 &&
            searchTerm.length > 0 && (
              <h5 className="text-center text-primary w-100">
                No se encontraron resultados para: '{searchTerm}''
              </h5>
            )}
          {postulations.length > 0 ? (
            <>
              <div className="input-group w-100 mb-3 px-2 overflow-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar en las postulaciones..."
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
              {postulations
                .filter(
                  (postulation) =>
                    postulation.vacante
                      .toLowerCase()
                      .includes(searchTerm.toLocaleLowerCase()) ||
                    postulation.nombre_comercial
                      .toLowerCase()
                      .includes(searchTerm.toLocaleLowerCase())
                )
                .map((postulation) => (
                  <div
                    key={postulation.fk_vacante}
                    className="col-lg-12 col-xl-12 "
                  >
                    <div className="card border-0">
                      <div className="card-body px-0 border-bottom-purple">
                        <h5 className="font-weight-bold p-0">
                          {postulation.vacante}{" "}
                          <Link
                            to={`/jobbank/postulations/${postulation.fk_vacante}`}
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
                            {postulation.nombre_comercial}
                          </span>
                          <p>
                            {/* {e.fecha_creacion} */}
                            <span className="badge badge-primary ">
                              Publicado:{" "}
                              {moment(postulation.fecha_creacion)
                                .locale("es")
                                .fromNow()}
                            </span>
                          </p>
                        </div>
                        <span className="text-primary font-weight-bolder">
                          {postulation.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <div className="d-flex justify-content-center flex-column align-content-center w-100">
              <h5 className="text-center font-weight-bold">
                {graduated?.nombre_completo} aun no se ha postulado a ningún
                trabajo.
              </h5>
            </div>
          )}
        </div>
      </ShowcaseCard>
    </ShowcaseContainer>
  );
};

export default CurrentPostulations;
