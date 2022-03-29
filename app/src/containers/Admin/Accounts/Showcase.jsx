import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import useRouterHooks from "@/hooks/useRouterHooks";
import ShowcaseContainer from "@/components/Global/ShowcaseContainer";
import ShowcaseHeader from "@/components/Global/ShowcaseHeader";
import ShowcaseCard from "@/components/Global/ShowcaseCard";
import Loading from "@/components/Global/Loading";

import usersService from "@/services/Admin/users.service";
import graduatesService from "@/services/Admin/graduates.service";
import companiesService from "@/services/Admin/companies.service";

const Showcase = () => {
  const [graduated, setGraduated] = useState({});
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [isGraduated, setIsGraduated] = useState(false);
  const { params, navigate } = useRouterHooks();

  const getUserHandler = useCallback(async () => {
    setIsLoading(true);
    const userFetched = await usersService.GetOne(params.id);
    const graduatedFetched = await graduatesService.GetOne(params.id);
    const companyFetched = await companiesService.GetOne(params.id);
    if (!userFetched.id) {
      toast.error("Este registro no existe");
      navigate("/accounts");
      setIsLoading(false);
      return;
    }
    if (userFetched.fk_rol === 1) {
      toast.error("Los administradores no cuentan con un perfil");
      navigate("/accounts");
      setIsLoading(false);
      return;
    }
    //Cuando es empresa
    if (userFetched.fk_rol === 3) {
      //Este if permite verificar que en realidad exista un perfil
      if (!companyFetched.id) {
        toast.error("Esta empresa no cuenta con un perfil");
        navigate("/accounts");
        setIsLoading(false);
        return;
      } else {
        setCompany(companyFetched);
        setIsCompany(true);
      }
    }
    //Cuando es egresado
    if (userFetched.fk_rol === 2) {
      //Este if permite verificar que en realidad exista un perfil
      if (!graduatedFetched.id) {
        toast.error("Este egresado no cuenta con un perfil");
        navigate("/accounts");
        setIsLoading(false);
        return;
      } else {
        setGraduated(graduatedFetched);
        setIsGraduated(true);
      }
    }
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    getUserHandler();
  }, [getUserHandler]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isGraduated ? (
        <ShowcaseContainer>
          <ShowcaseHeader title={graduated.nombre_completo} />

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
      ) : isCompany ? (
        <ShowcaseContainer>
          <ShowcaseHeader title={company.nombre_comercial} />
          <ShowcaseCard>
            <div className="row">
              <div className="col-12 col-lg-6 col-xl-6 mb-5 mb-lg-0 mb-xl-0">
                <h3 className="text-left font-weight-bold text-primary">
                  Datos generales
                </h3>
                <div className="d-flex flex-column align-items-start">
                  <h5>
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
                  <h5>
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
      ) : null}
    </>
  );
};

export default Showcase;
