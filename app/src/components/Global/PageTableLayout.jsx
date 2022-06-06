import { Link } from "react-router-dom";

const PageTableLayout = ({
  children,
  to = "/page/",
  addButtonText = "New register",
  title = "Table list",
  button = true,
}) => {
  return (
    <div className="col-12 col-lg-12 col-xl-12 mx-auto">
      <div className="d-flex flex-column flex-lg-row flex-md-row flex-xl-row align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">{title}</h1>
        {button && (
          <Link
            to={to}
            className="btn btn-sm btn-primary shadow-sm mt-3 mt-md-0 mt-lg-0 mt-xl-0"
          >
            <i className="fas fa-plus fa-sm text-white"></i> {addButtonText}
          </Link>
        )}
      </div>
      {children}
    </div>
  );
};

export default PageTableLayout;
