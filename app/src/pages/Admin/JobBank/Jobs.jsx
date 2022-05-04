import List from "@/containers/Admin/JobBank/Jobs/List";

const Jobs = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex flex-column flex-lg-row flex-md-row flex-xl-row align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Todos los trabajos</h1>
      </div>
      <List />
    </div>
  );
};

export default Jobs;
