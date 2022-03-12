import React, { useEffect, useState, useCallback } from "react";
//React router dom components
import { Link } from "react-router-dom";
//custom hooks
import useRouterHooks from "../../../hooks/useRouterHooks";
//Para las alertas
import Swal from "sweetalert2";
import toast from "react-hot-toast";
//componentes para el reutilizar el show case en multiples vistas de detalle
import ShowcaseHeader from "../../../components/Global/ShowcaseHeader";
import ShowcaseCard from "../../../components/Global/ShowcaseCard";
import ShowcaseContainer from "../../../components/Global/ShowcaseContainer";
import Loading from "../../../components/Global/Loading";
//Servicios
import companiesService from "../../../services/Admin/companies.service";
//helpers
import helpers from "../../../helpers/helpers";

const Showcase = () => {
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
        const deleteResults = await companiesService.Delete(company.id);
        if (!deleteResults.status) {
          return toast.error(deleteResults.statusText);
        }
        toast.success("Compañia eliminada correctamente");
        await refreshData();
      }
    });
  };

  const getCompanyDetails = useCallback(async () => {
    setIsLoading(true);
    const fetchedCompany = await companiesService.GetOne(params.id);
    if (!fetchedCompany.id) {
      toast.error("No existe ese registro");
      navigate("/companies");
      setIsLoading(false);
      return;
    }
    setCompany(fetchedCompany);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    getCompanyDetails();
  }, [getCompanyDetails]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ShowcaseContainer>
          <ShowcaseHeader title={company.nombre_comercial}>
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
          </ShowcaseHeader>
          <ShowcaseCard>
            <div className="row">
              <div className="col-12 col-lg-6 col-xl-6 mb-5 mb-lg-0 mb-xl-0">
                <h3 className="text-left font-weight-bold text-primary">
                  Datos generales
                </h3>
                <div className="d-flex flex-column align-items-start">
                  <h5
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCopyToClipboard(company.correo)}
                  >
                    <span className="font-weight-bolder">
                      Correo electrónico:
                    </span>{" "}
                    {company.correo}
                  </h5>

                  <h5>
                    <span className="font-weight-bolder">Tamaño:</span>{" "}
                    {company.tamaño}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">Tipo:</span>{" "}
                    {company.tipo_empresa}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">
                      Actividad economica:
                    </span>{" "}
                    {company.actividad_economica}
                  </h5>
                  <h5
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCopyToClipboard(company.telefono)}
                  >
                    <span className="font-weight-bolder"> Telefono:</span>{" "}
                    {company.telefono}{" "}
                  </h5>
                </div>
              </div>
              <div className="col-12 col-lg-6 col-xl-6">
                <h3 className="text-left font-weight-bold text-primary">
                  Dirección <i className="fas fa-map-marker-alt"></i>
                </h3>
                <div className="d-flex flex-column align-items-start">
                  <h5>
                    <span className="font-weight-bolder">Estado:</span>{" "}
                    {company.estado}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">Municipio:</span>{" "}
                    {company.municipio}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">Colonia:</span>{" "}
                    {company.colonia}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">Calle:</span>{" "}
                    {company.calle} #{company.numero_empresa}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">C.P:</span>{" "}
                    {company.cp}
                  </h5>
                </div>
              </div>
            </div>
          </ShowcaseCard>
        </ShowcaseContainer>
      )}
    </>
  );
};

export default Showcase;
