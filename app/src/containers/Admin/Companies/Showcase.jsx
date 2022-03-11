import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import helpers from "../../../helpers/helpers";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useRouterHooks from "../../../hooks/useRouterHooks";
import companyService from "../../../services/companyService";

const Showcase = () => {
  const [company, setCompany] = useState({});
  const { params, navigate } = useRouterHooks();

  const handleCopyToClipboard = (text) => {
    window.navigator.clipboard.writeText(text);
    toast.success("Copiado al portapeles.");
  };

  const handleDeletion = async () => {
    Swal.fire({
      text: `¿Desea eliminar a la compañia '${company.nombre_comercial}' del sistema?`,
      icon: "info",
      ...helpers.alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResults = await companyService.Delete(company.id);
        if (!deleteResults.status) {
          return toast.error(deleteResults.statusText);
        }
        toast.success("Compañia eliminada correctamente");
        await refreshData();
      }
    });
  };

  const getCompanyDetails = useCallback(async () => {
    const fetchedCompany = await companyService.GetOne(params.id);
    if (!fetchedCompany.id) {
      toast.error("No existe ese registro");
      navigate("/companies");
    }
    setCompany(fetchedCompany);
  }, [params.id]);

  useEffect(() => {
    getCompanyDetails();
  }, [getCompanyDetails]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center">
        <div className="col-lg-12 col-xl-10">
          <div className="card py-3 px-2 shadow-lg rounded-0">
            <div className="d-flex justify-content-between">
              <Link to={-1} className="btn " style={{ zIndex: "20" }}>
                <i className="fas fa-arrow-left text-primary fa-2x"></i>
              </Link>

              <h2 className="position-absolute w-100  text-center text-purple font-weight-bolder ">
                {company.nombre_comercial}
              </h2>

              <div className="dropdown">
                <button
                  className="btn "
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-cog text-purple fa-2x"> </i>
                </button>
                <div
                  className="dropdown-menu animated--fade-in shadow-lg"
                  aria-labelledby="dropdownMenuButton"
                  style={{ fontSize: "17px" }}
                >
                  <Link
                    to={`/companies/edit/${company.id}`}
                    className="dropdown-item "
                    href="#"
                  >
                    Editar <i className="fas fa-edit text-info"></i>
                  </Link>
                  <button onClick={handleDeletion} className="dropdown-item">
                    Eliminar <i className="fas fa-trash text-danger"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-4 shadow-lg rounded-0 py-3 px-2">
            <div className="card-body text-primary">
              <div className="row">
                <div className="col-12 col-lg-6 col-xl-6 mb-5 mb-lg-0 mb-xl-0">
                  <h4 className="text-left font-weight-bold">
                    Datos generales <i className="fas fa-id-card"></i>
                  </h4>
                  <div className="d-flex flex-column align-items-start">
                    <span>
                      Correo electrónico: {company.correo}
                      <button
                        onClick={() => handleCopyToClipboard(company.correo)}
                        className="btn"
                      >
                        <i className="fas fa-copy text-muted"></i>
                      </button>
                    </span>
                    <span>Tamaño: {company.tamaño}</span>
                    <span>Tipo: {company.tipo_empresa}</span>
                    <span>
                      Actividad economica: {company.actividad_economica}
                    </span>
                    <span>
                      <i className="fas fa-phone"></i> Telefono:{" "}
                      {company.telefono}
                      <button
                        onClick={() => handleCopyToClipboard(company.telefono)}
                        className="btn"
                      >
                        <i className="fas fa-copy text-muted"></i>
                      </button>
                    </span>
                  </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                  <h4 className="text-left font-weight-bold ">
                    Dirección <i className="fas fa-map-marker-alt"></i>
                  </h4>
                  <div className="d-flex flex-column align-items-start">
                    <span>Estado: {company.estado}</span>
                    <span>Municipio: {company.municipio}</span>
                    <span>Colonia: {company.colonia}</span>
                    <span>
                      Calle: {company.calle} #{company.numero_empresa}
                    </span>
                    <span>C.P: {company.cp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
