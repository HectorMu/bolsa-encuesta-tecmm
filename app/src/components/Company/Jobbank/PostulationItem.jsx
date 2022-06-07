import useRouterHooks from "@/hooks/useRouterHooks";

const PostulationItem = ({ postulation, handleGoToPostulation }) => {
  const { params } = useRouterHooks();
  return (
    <div
      key={postulation.id}
      onClick={() => handleGoToPostulation(postulation)}
      style={{ cursor: "pointer" }}
      className={`card jobbank-item rounded-0 pt-3 px-3 border-left-0 border-right-0   ${
        parseInt(params.postulation_id) === postulation.id ? "active" : ""
      }`}
    >
      <h5 className="text-primary font-weight-bolder">
        Postulacion No. {postulation.id}
      </h5>
      <h6 className=" font-weight-bolder">{postulation.nombre_completo}</h6>
      <div className="d-flex justify-content-end align-items-end h-100 mt-2">
        <p>
          <span className="badge badge-primary px-1 py-1">
            {postulation.status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PostulationItem;
