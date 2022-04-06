const List = ({ postulations, selection, setSelection }) => {
  return (
    <div>
      {postulations.length > 0 ? (
        postulations.map((e) => (
          <div
            onClick={() => setSelection(e)}
            key={e.id}
            style={{ cursor: "pointer" }}
            className={`card rounded-0 pt-3 px-3 border-left-0 border-right-0   ${
              selection?.id === e.id ? "bg-green-light shadow " : ""
            }`}
          >
            <h5 className="text-primary font-weight-bolder">
              Postulacion No. {e.id}
            </h5>
            <div className="d-flex justify-content-end align-items-end h-100 mt-2">
              <p>
                <span className="badge badge-primary px-1 py-1">
                  {e.status}
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
