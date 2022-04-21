//Importando componentes
import Loading from "@/components/Global/Loading";

//Importando hooks
import useRouterHooks from "@/hooks/useRouterHooks";

const List = ({ postulations, isLoading }) => {
  const { navigate, params } = useRouterHooks();

  const handleGoToPostulation = (postulation) =>
    navigate(
      `/company/jobbank/postulations/${params.job_id}/${postulation.id}`,
      { state: postulation }
    );

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : postulations?.length > 0 ? (
        postulations.map((postulation) => (
          <div
            onClick={() => handleGoToPostulation(postulation)}
            key={postulation.id}
            style={{ cursor: "pointer" }}
            className={`card rounded-0 pt-3 px-3 border-left-0 border-right-0   ${
              parseInt(params.postulation_id) === postulation.id
                ? "bg-green-light shadow "
                : ""
            }`}
          >
            <h5 className="text-primary font-weight-bolder">
              Postulacion No. {postulation.id}
            </h5>
            <h6 className=" font-weight-bolder">
              {postulation.nombre_completo}
            </h6>
            <div className="d-flex justify-content-end align-items-end h-100 mt-2">
              <p>
                <span className="badge badge-primary px-1 py-1">
                  {postulation.status}
                </span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <h5 className="text-center">
          Aqui apareceran las postulaciones recientes
        </h5>
      )}
    </div>
  );
};

export default List;
