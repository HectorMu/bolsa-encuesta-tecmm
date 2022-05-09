import { useEffect, useState, useCallback } from "react";

//React router dom components
import { Link } from "react-router-dom";

//custom hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";

//Para las alertas
import Swal from "sweetalert2";
import toast from "react-hot-toast";

//componentes para el reutilizar el show case en multiples vistas de detalle
import ShowcaseHeader from "@/components/Global/ShowcaseHeader";
import ShowcaseCard from "@/components/Global/ShowcaseCard";
import ShowcaseContainer from "@/components/Global/ShowcaseContainer";
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

//Servicios
import companiesService from "@/services/Admin/companies.service";

//helpers
import helpers from "@/helpers/helpers";

const Showcase = () => {
  const [company, setCompany] = useState({});
  const { verifySession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { params, navigate, location } = useRouterHooks();

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
        const deleteResults = await verifySession(() =>
          companiesService.Delete(company.id)
        );
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
    const fetchedCompany = await verifySession(
      () => companiesService.GetOne(params.id),
      getCompanyDetails
    );

    if (fetchedCompany?.error) {
      setCompany(fetchedCompany);
      setIsLoading(false);
      return;
    }
    if (!fetchedCompany.id) {
      if (location.state.prevLocation === "/accounts/") {
        toast.error("Esta empresa aun no cuenta con un perfil");
        navigate("/accounts");
        setIsLoading(false);
        return;
      }
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

  if (company?.error) {
    return (
      <>
        {isLoading ? <Loading /> : <ErrorDisplayer message={company.message} />}
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ShowcaseContainer>
          <ShowcaseHeader title={company.nombre_comercial} />

          <ShowcaseCard>
            <div className="row">
              <div className="col-12 col-lg-6 col-xl-6 mb-5 mb-lg-0 mb-xl-0">
                <h4 className="text-left font-weight-bold text-primary">
                  Datos generales
                </h4>
                <div className="d-flex flex-column align-items-start">
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCopyToClipboard(company.correo)}
                  >
                    <span className="font-weight-bolder">
                      Correo electrónico:
                    </span>{" "}
                    {company.correo}
                  </p>

                  <p>
                    <span className="font-weight-bolder">Tamaño:</span>{" "}
                    {company.tamaño}
                  </p>
                  <p>
                    <span className="font-weight-bolder">Tipo:</span>{" "}
                    {company.tipo_empresa}
                  </p>
                  <p>
                    <span className="font-weight-bolder">
                      Actividad economica:
                    </span>{" "}
                    {company.actividad_economica}
                  </p>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCopyToClipboard(company.telefono)}
                  >
                    <span className="font-weight-bolder"> Telefono:</span>{" "}
                    {company.telefono}{" "}
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-6 col-xl-6">
                <h4 className="text-left font-weight-bold text-primary">
                  Dirección <i className="fas fa-map-marker-alt"></i>
                </h4>
                <div className="d-flex flex-column align-items-start">
                  <p>
                    <span className="font-weight-bolder">Estado:</span>{" "}
                    {company.estado}
                  </p>
                  <p>
                    <span className="font-weight-bolder">Municipio:</span>{" "}
                    {company.municipio}
                  </p>
                  <p>
                    <span className="font-weight-bolder">Colonia:</span>{" "}
                    {company.colonia}
                  </p>
                  <p>
                    <span className="font-weight-bolder">Calle:</span>{" "}
                    {company.calle} #{company.numero_empresa}
                  </p>
                  <p>
                    <span className="font-weight-bolder">C.P:</span>{" "}
                    {company.cp}
                  </p>
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
