//importando componentes personalizados
import Loading from "@/components/Global/Loading";

//importando hooks
import useServiceFetch from "@/hooks/useServiceFetchV2";
import useSession from "@/hooks/useSession";

//importando servicios
import surveyGraduatesService from "@/services/Admin/surveygraduates.service";

const Report = () => {
  const { verifySession } = useSession();

  const {
    isLoading,
    refreshData,
    hookData: surveys,
  } = useServiceFetch(
    () => verifySession(surveyGraduatesService.List, refreshData),
    []
  );

  const ENTRIES = {
    no_control: "No. Control",
    nombre_completo: "Nombre completo",
    fechaNacimiento: "Fecha de nacimiento",
    curp: "Curp",
    sexo: "Sexo",
    estado_civil: "Estado civil",
    calle: "Calle",
    numero_casa: "#",
    colonia: "Colonia",
    cp: "C.P.",
    municipio: "Municipio",
    estado: "Estado",
    telefono: "Tel. Celular",
    tel_casa: "Tel. Casa",
    correo: "Correo",
    carrera: "Carrera",
    fecha_egreso: "Fecha egreso",
    idioma_extranjero: "Dominio de idioma extranjero",
    titulado: "Titulado",
    paquetes_computacionales: "Paquetes computacionales",
    seccion_2:
      "PERTINENCIA Y DISPONIBILIDAD DE MEDIOS Y RECURSOS PARA EL APRENDIZAJE",
    seccion_3: "UBICACIÓN LABORAL DE LOS EGRESADOS",
    seccion_4: "DESEMPEÑO PROFESIONAL DE LOS EGRESADOS",
    seccion_5:
      "EXPECTATIVAS DE DESARROLLO, SUPERACIÓN PROFESIONAL Y DE ACTUALIZACIÓN",
    seccion_6: "PARTICIPACIÓN SOCIAL DE LOS EGRESADOS",
    seccion_7: "COMENTARIOS Y SUGERENCIAS",
    fecha: "FECHA REALIZACIÓN",
  };

  return (
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
              <td>{value.no_control}</td>
              <td>{value.nombre_completo}</td>
              <td>{value.fechaNacimiento}</td>
              <td>{value.curp}</td>
              <td>{value.sexo}</td>
              <td>{value.estado_civil}</td>
              <td>{value.calle}</td>
              <td>{value.numero_casa}</td>
              <td>{value.colonia}</td>
              <td>{value.cp}</td>
              <td>{value.municipio}</td>
              <td>{value.estado}</td>
              <td>{value.telefono}</td>
              <td>{value.tel_casa}</td>
              <td>{value.correo}</td>
              <td>{value.carrera}</td>
              <td>{value.fecha_egreso}</td>
              <td>
                <table className="table text-center">
                  <thead>
                    <tr>
                      {Object.entries(surveys[key].idioma_extranjero).map(
                        ([k, v]) => (
                          <th className="celdaAsignado" scope="col">
                            {k}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.entries(surveys[key].idioma_extranjero).map(
                        ([k, v]) => (
                          <td>{v}</td>
                        )
                      )}
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>{value.titulado}</td>
              <td>{value.paquetes_computacionales}</td>
              <td>
                <table className="table text-center">
                  <thead>
                    <tr>
                      {Object.entries(surveys[key].seccion_2).map(([k, v]) => (
                        <th className="celdaAsignado" scope="col">
                          {k}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.entries(surveys[key].seccion_2).map(([k, v]) => (
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
                      {Object.entries(surveys[key].seccion_3).map(
                        ([key, value]) => (
                          <th className="celdaAsignado" scope="col">
                            {key.replace("_", " ")}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.entries(surveys[key].seccion_3).map(([k, v]) =>
                        typeof v === "object" &&
                        Object.entries(v).length > 0 ? (
                          <td>
                            <table className="table text-center">
                              <thead>
                                <tr>
                                  {Object.entries(v).map(([ke, va]) => (
                                    <th className="celdaAsignado" scope="col">
                                      {ke.replace("_", " ")}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  {Object.entries(v).map(([ke, va]) =>
                                    typeof va === "object" &&
                                    Object.entries(va).length > 0 ? (
                                      <td>
                                        <table className="table text-center">
                                          <thead>
                                            <tr>
                                              {Object.entries(va).map(
                                                ([l, val]) => (
                                                  <th
                                                    className="celdaAsignado"
                                                    scope="col"
                                                  >
                                                    {l.replace("_", " ")}
                                                  </th>
                                                )
                                              )}
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              {Object.entries(va).map(
                                                ([l, val]) => (
                                                  <td>{val}</td>
                                                )
                                              )}
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    ) : (
                                      <td>{va}</td>
                                    )
                                  )}
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
              <td>
                <table className="table text-center">
                  <thead>
                    <tr>
                      {Object.entries(surveys[key].seccion_4).map(([k, v]) => (
                        <th className="celdaAsignado" scope="col">
                          {k}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.entries(surveys[key].seccion_4).map(([k, v]) =>
                        typeof v === "object" &&
                        Object.entries(v).length > 0 ? (
                          <td>
                            <table className="table text-center">
                              <thead>
                                <tr>
                                  {Object.entries(v).map(([o, e]) => (
                                    <th className="celdaAsignado" scope="col">
                                      {o}
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
              <td>
                <table className="table text-center">
                  <thead>
                    <tr>
                      {Object.entries(surveys[key].seccion_5).map(([k, v]) => (
                        <th className="celdaAsignado" scope="col">
                          {k}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.entries(surveys[key].seccion_5).map(([k, v]) =>
                        typeof v === "object" &&
                        Object.entries(v).length > 0 ? (
                          <td>
                            <table className="table text-center">
                              <thead>
                                <tr>
                                  {Object.entries(v).map(([o, e]) => (
                                    <th className="celdaAsignado" scope="col">
                                      {o.replace("_", " ")}
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
              <td>
                <table className="table text-center">
                  <thead>
                    <tr>
                      {Object.entries(surveys[key].seccion_6).map(([k, v]) => (
                        <th className="celdaAsignado" scope="col">
                          {k}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.entries(surveys[key].seccion_6).map(([k, v]) =>
                        typeof v === "object" &&
                        Object.entries(v).length > 0 ? (
                          <td>
                            <table className="table text-center">
                              <thead>
                                <tr>
                                  {Object.entries(v).map(([o, e]) => (
                                    <th className="celdaAsignado" scope="col">
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
              <td>{value.seccion_7.comentarios_sugerencias}</td>
              <td>{value.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
