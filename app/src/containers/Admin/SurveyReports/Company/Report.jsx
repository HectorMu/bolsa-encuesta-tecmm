//importando componentes personalizados
import Loading from "@/components/Global/Loading";

//importando hooks
import useServiceFetch from "@/hooks/useServiceFetchV2";
import useSession from "@/hooks/useSession";

//importando servicios
import surveyCompaniesService from "@/services/Admin/surveycompanies.service";

const Report = () => {
  const { verifySession } = useSession();

  const {
    isLoading,
    refreshData,
    hookData: surveys,
  } = useServiceFetch(
    () => verifySession(surveyCompaniesService.List, refreshData),
    []
  );

  const ENTRIES = {
    correo: "Correo",
    nombre_comercial: "Nombre comercial",
    calle: "Calle",
    numero_empresa: "#",
    colonia: "Colonia",
    cp: "C.P.",
    municipio: "Municipio",
    estado: "Estado",
    telefono: "Telefono",
    tipo_empresa: "Tipo de empresa",
    tamaño: "Tamaño de la empresa",
    actividad_economica: "Actividad economica",
    seccion_b: "UBICACIÓN LABORAL DE LOS EGRESADOS",
    seccion_c: "COMPETENCIAS LABORALES",
    fecha: "FECHA REALIZACIÓN",
  };

  const EntriesP2SB = {
    carrera: "Carrera",
    mando_superior: "Mando superior",
    mando_intermedio: "Mando intermedio",
    supervisor: "Supervisor",
    tecnico_auxiliar: "Tecnico o auxiliar",
    otros: "Otros",
  };

  return (
    <div className="mt-2">
      {isLoading ? (
        <Loading color="purple" />
      ) : surveys.length > 0 ? (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                {Object.entries(ENTRIES).map(([key, value]) => (
                  <th className="celdaAsignado text-center" scope="col">
                    {value}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(surveys).map(([key, value]) => (
                <tr>
                  <td>{value.correo}</td>
                  <td>{value.nombre_comercial}</td>
                  <td>{value.calle}</td>
                  <td>{value.numero_empresa}</td>
                  <td>{value.colonia}</td>
                  <td>{value.cp}</td>
                  <td>{value.municipio}</td>
                  <td>{value.estado}</td>
                  <td>{value.telefono}</td>
                  <td>{value.tipo_empresa}</td>
                  <td>{value.tamaño}</td>
                  <td>{value.actividad_economica}</td>
                  <td>
                    <table className="table text-center">
                      <thead>
                        <tr>
                          {Object.entries(surveys[key].seccion_b).map(
                            ([k, v]) => (
                              <th>{k}</th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="celdaAsignado">
                            {value.seccion_b.P1}
                          </td>
                          <td>
                            <table>
                              <thead>
                                <tr>
                                  {Object.entries(EntriesP2SB).map(([k, v]) => (
                                    <th>{v}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(surveys[key].seccion_b.P2).map(
                                  ([k, v]) => (
                                    <tr>
                                      {Object.entries(v).map(([o, e]) => (
                                        <td>{e}</td>
                                      ))}
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </td>
                          <td>
                            <table className="table text-center">
                              <thead>
                                <tr>
                                  {Object.entries(
                                    surveys[key].seccion_b.P3
                                  ).map(([k, v]) => (
                                    <th className="celdaAsignado" scope="col">
                                      {k.replace(/_/g, " ")}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  {Object.entries(
                                    surveys[key].seccion_b.P3
                                  ).map(([k, v]) => (
                                    <td>{v}</td>
                                  ))}
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td>
                            <table className="table text-center">
                              <thead>
                                <tr>
                                  {Object.entries(
                                    surveys[key].seccion_b.P4
                                  ).map(([k, v]) => (
                                    <th className="celdaAsignado" scope="col">
                                      {k.replace(/_/g, " ")}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  {Object.entries(
                                    surveys[key].seccion_b.P4
                                  ).map(([k, v]) => (
                                    <td>{v}</td>
                                  ))}
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td>{surveys[key].seccion_b.P5}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table className="table text-center">
                      <thead>
                        <tr>
                          {Object.entries(surveys[key].seccion_c).map(
                            ([k, v]) => (
                              <th className="celdaAsignado" scope="col">
                                {k.replace(/_/g, " ")}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {Object.entries(surveys[key].seccion_c).map(
                            ([k, v]) =>
                              typeof v === "object" &&
                              Object.entries(v).length > 0 ? (
                                <td>
                                  <table className="table text-center">
                                    <thead>
                                      <tr>
                                        {Object.entries(v).map(([o, e]) => (
                                          <th
                                            className="celdaAsignado"
                                            scope="col"
                                          >
                                            {o.replace(/_/g, " ")}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        {Object.entries(v).map(([o, e]) => (
                                          <td>{e}</td>
                                        ))}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              ) : (
                                <td>{v}</td>
                              )
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>{value.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default Report;
