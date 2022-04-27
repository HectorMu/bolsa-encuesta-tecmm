import React, { useEffect, useState, useCallback } from "react";

//Alerts
import toast from "react-hot-toast";

//custom hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";

//componentes para el reutilizar el show case en multiples vistas de detalle
import ShowcaseContainer from "@/components/Global/ShowcaseContainer";
import ShowcaseHeader from "@/components/Global/ShowcaseHeader";
import ShowcaseCard from "@/components/Global/ShowcaseCard";
import Loading from "@/components/Global/Loading";

//Servicios
import graduatesService from "@/services/Admin/graduates.service";

const Showcase = () => {
  const [graduated, setGraduated] = useState({});
  const { verifySession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { params, navigate, location } = useRouterHooks();

  const getGradutedHandler = useCallback(async () => {
    setIsLoading(true);
    const graduatedFetched = await verifySession(
      () => graduatesService.GetOne(params.id),
      getGradutedHandler
    );
    if (!graduatedFetched.id) {
      if (location.state.prevLocation === "/accounts/") {
        toast.error("Este egresado aun no cuenta con un perfil");
        navigate("/accounts");
        setIsLoading(false);
        return;
      }
      toast.error("Este registro no existe");
      navigate("/graduated");
      setIsLoading(false);
      return;
    }
    setGraduated(graduatedFetched);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    getGradutedHandler();
  }, [getGradutedHandler]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ShowcaseContainer>
          <ShowcaseHeader title={graduated.nombre_completo}> </ShowcaseHeader>

          <ShowcaseCard>
            <div className="row">
              <div className="col-12 col-lg-6 col-xl-4 mb-5 mb-lg-0 mb-xl-0">
                <h3 className="text-left font-weight-bold text-primary">
                  Datos generales
                </h3>
                <div className="d-flex flex-column align-items-start">
                  <h5>
                    <span className="font-weight-bolder">Correo:</span>{" "}
                    {graduated.correo}
                  </h5>

                  <h5>
                    <span className="font-weight-bolder">Nombre:</span>{" "}
                    {graduated.nombre_completo}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">No. Control:</span>{" "}
                    {graduated.no_control}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">Curp:</span>{" "}
                    {graduated.curp}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">Sexo:</span>{" "}
                    {graduated.sexo}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">Estado civil:</span>{" "}
                    {graduated.estado_civil}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder"> Nacimiento:</span>{" "}
                    {graduated.fechaNacimiento}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">Teléfono:</span>{" "}
                    {graduated.telefono}
                  </h5>

                  <h5>
                    <span className="font-weight-bolder">Teléfono Hogar:</span>{" "}
                    {graduated.tel_casa}
                  </h5>
                </div>
              </div>
              <div className="col-12 col-lg-6 col-xl-4 mb-5 mb-lg-0 mb-xl-0">
                <h3 className="text-left font-weight-bold text-primary">
                  Dirección <i className="fas fa-map-marker-alt"></i>
                </h3>
                <div className="d-flex flex-column align-items-start">
                  <h5>
                    <span className="font-weight-bolder">Estado:</span>{" "}
                    {graduated.estado}
                  </h5>

                  <h5>
                    <span className="font-weight-bolder">Municipio:</span>{" "}
                    {graduated.municipio}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">Colonia:</span>{" "}
                    {graduated.colonia}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">Calle:</span>{" "}
                    {graduated.calle} #{graduated.numero_casa}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">C.P:</span>{" "}
                    {graduated.cp}
                  </h5>
                </div>
              </div>

              <div className="col-12 col-lg-6 col-xl-4 mb-5 mb-lg-0 mb-xl-0">
                <h4 className="text-left font-weight-bold text-primary">
                  Información académica
                </h4>
                <div className="d-flex flex-column align-items-start">
                  <h5>
                    <span className="font-weight-bolder">Carrera:</span>{" "}
                    {graduated.carrera}
                  </h5>

                  <h5>
                    <span className="font-weight-bolder">Fecha de egreso:</span>{" "}
                    {graduated.fecha_egreso}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">
                      Dominio idioma inglés:
                    </span>{" "}
                    {graduated.idioma_extranjero?.Ingles}%
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">
                      Dominio de otro idioma:
                    </span>{" "}
                    {graduated.idioma_extranjero?.Otro}%
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">Titulado:</span>{" "}
                    {graduated.titulado}
                  </h5>
                  <h5>
                    <span className="font-weight-bolder">
                      Paquetes computacionales:
                    </span>{" "}
                    {graduated.paquetes_computacionales}
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
