//componentes para el reutilizar el show case en multiples vistas de detalle
import ShowcaseContainer from "@/components/Global/ShowcaseContainer";
import ShowcaseHeader from "@/components/Global/ShowcaseHeader";
import ShowcaseCard from "@/components/Global/ShowcaseCard";
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

const Showcase = ({ graduated, isLoading }) => {
  if (graduated?.error) {
    return isLoading ? (
      <Loading />
    ) : (
      <ErrorDisplayer message={graduated.message} />
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ShowcaseContainer>
          <ShowcaseHeader
            title={graduated.nombre_completo}
            toEdit={`/graduates/edit/${graduated.id}`}
            entity={graduated}
          >
            {" "}
          </ShowcaseHeader>

          <ShowcaseCard>
            <div className="row">
              <div className="col-12 col-lg-6 col-xl-4 mb-5 mb-lg-0 mb-xl-0">
                <h4 className="text-left font-weight-bold text-primary">
                  Datos generales
                </h4>
                <div className="d-flex flex-column align-items-start">
                  <p>
                    <span className="font-weight-bolder">Correo:</span>{" "}
                    {graduated.correo}
                  </p>

                  <p>
                    <span className="font-weight-bolder">Nombre:</span>{" "}
                    {graduated.nombre_completo}
                  </p>
                  <p>
                    <span className="font-weight-bolder">No. Control:</span>{" "}
                    {graduated.no_control}
                  </p>
                  <p>
                    <span className="font-weight-bolder">Curp:</span>{" "}
                    {graduated.curp}
                  </p>
                  <p>
                    <span className="font-weight-bolder">Sexo:</span>{" "}
                    {graduated.sexo}
                  </p>
                  <p>
                    <span className="font-weight-bolder">Estado civil:</span>{" "}
                    {graduated.estado_civil}
                  </p>
                  <p>
                    <span className="font-weight-bolder"> Nacimiento:</span>{" "}
                    {graduated.fechaNacimiento}
                  </p>
                  <p>
                    <span className="font-weight-bolder">Teléfono:</span>{" "}
                    {graduated.telefono}
                  </p>

                  <p>
                    <span className="font-weight-bolder">Teléfono Hogar:</span>{" "}
                    {graduated.tel_casa}
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-6 col-xl-4 mb-5 mb-lg-0 mb-xl-0">
                <h4 className="text-left font-weight-bold text-primary">
                  Dirección <i className="fas fa-map-marker-alt"></i>
                </h4>
                <div className="d-flex flex-column align-items-start">
                  <p>
                    <span className="font-weight-bolder">Estado:</span>{" "}
                    {graduated.estado}
                  </p>

                  <p>
                    <span className="font-weight-bolder">Municipio:</span>{" "}
                    {graduated.municipio}
                  </p>
                  <p>
                    <span className="font-weight-bolder">Colonia:</span>{" "}
                    {graduated.colonia}
                  </p>
                  <p>
                    <span className="font-weight-bolder">Calle:</span>{" "}
                    {graduated.calle} #{graduated.numero_casa}
                  </p>
                  <p>
                    <span className="font-weight-bolder">C.P:</span>{" "}
                    {graduated.cp}
                  </p>
                </div>
              </div>

              <div className="col-12 col-lg-6 col-xl-4 mb-5 mb-lg-0 mb-xl-0">
                <h4 className="text-left font-weight-bold text-primary">
                  Información académica
                </h4>
                <div className="d-flex flex-column align-items-start">
                  <p>
                    <span className="font-weight-bolder">Carrera:</span>{" "}
                    {graduated.carrera}
                  </p>
                  <p>
                    <span className="font-weight-bolder">Especialidad:</span>{" "}
                    {graduated.especialidad}
                  </p>

                  <p>
                    <span className="font-weight-bolder">Fecha de egreso:</span>{" "}
                    {graduated.fecha_egreso}
                  </p>
                  <p>
                    <span className="font-weight-bolder">
                      Dominio idioma inglés:
                    </span>{" "}
                    {graduated.idioma_extranjero?.Ingles}%
                  </p>
                  <p>
                    <span className="font-weight-bolder">
                      Dominio de otro idioma:
                    </span>{" "}
                    {graduated.idioma_extranjero?.Otro}%
                  </p>
                  <p>
                    <span className="font-weight-bolder">Titulado:</span>{" "}
                    {graduated.titulado}
                  </p>
                  <p>
                    <span className="font-weight-bolder">
                      Paquetes computacionales:
                    </span>{" "}
                    {graduated.paquetes_computacionales}
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
