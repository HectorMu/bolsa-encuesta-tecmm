//Para las alertas
import toast from "react-hot-toast";

//componentes para el reutilizar el show case en multiples vistas de detalle
import ShowcaseHeader from "@/components/Global/ShowcaseHeader";
import ShowcaseCard from "@/components/Global/ShowcaseCard";
import ShowcaseContainer from "@/components/Global/ShowcaseContainer";
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

const Showcase = ({ company, isLoading }) => {
  const handleCopyToClipboard = (text) => {
    window.navigator.clipboard.writeText(text);
    toast.success("Copiado al portapeles.");
  };

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
