import { Link } from "react-router-dom";
import List from "../../../containers/Admin/Graduated/List";

const Graduated = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex flex-column flex-lg-row flex-md-row flex-xl-row align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-0 text-gray-800">Egresados</h1>
        <Link
          to={"/graduated/add"}
          className=" btn btn-sm btn-primary shadow-sm mt-3 mt-md-0 mt-lg-0 mt-xl-0"
        >
          <i className="fas fa-plus fa-sm text-white"></i> Nuevo egresado
        </Link>
      </div>
      <List />
    </div>
  );
};

export default Graduated;
