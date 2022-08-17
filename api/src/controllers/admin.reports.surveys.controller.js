const GraduatedReport = require("../models/GraduatedSurveyReport");
const CompanyReport = require("../models/CompanySurveyReport");
const helpers = require("../helpers/helpers");

const controller = {};

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

const EntriesP10S4 = {
  aspecto: "Aspecto",
  valoracion: "Valoracion",
};

controller.GetAnswersGraduated = async (req, res) => {
  try {
    const graduates = await GraduatedReport.ListGraduates();

    for (let i = 0; i < graduates.length; i++) {
      graduates[i] = {
        ...graduates[i],
        seccion_2: await GraduatedReport.FindAnswersSection2(graduates[i].id),
        seccion_3: await GraduatedReport.FindAnswersSection3(graduates[i].id),
        seccion_4: await GraduatedReport.FindAnswersSection4(graduates[i].id),
        seccion_5: await GraduatedReport.FindAnswersSection5(graduates[i].id),
        seccion_6: await GraduatedReport.FindAnswersSection6(graduates[i].id),
        seccion_7: await GraduatedReport.FindAnswersSection7(graduates[i].id),
      };
    }
    const parsedFieldsToJSon = helpers.convertFieldsToJson(graduates, [
      "idioma_extranjero",
      "seccion_2",
      "seccion_3",
      "seccion_4",
      "seccion_5",
      "seccion_6",
      "seccion_7",
    ]);

    const stringTable = `<div className="table-responsive d-none">
    <table id="table-graduated-report" className="table d-none">
      <thead>
        <tr>
          ${Object.entries(ENTRIES).map(
            ([key, value]) =>
              `<th className="celdaAsignado text-center" scope="col">
              ${value}
            </th>`
          )}
        </tr>
      </thead>
      <tbody>
        ${Object.entries(parsedFieldsToJSon).map(
          ([key, value]) =>
            `<tr>
            <td>${value.no_control}</td>
            <td>${value.nombre_completo}</td>
            <td>${value.fechaNacimiento}</td>
            <td>${value.curp}</td>
            <td>${value.sexo}</td>
            <td>${value.estado_civil}</td>
            <td>${value.calle}</td>
            <td>${value.numero_casa}</td>
            <td>${value.colonia}</td>
            <td>${value.cp}</td>
            <td>${value.municipio}</td>
            <td>${value.estado}</td>
            <td>${value.telefono}</td>
            <td>${value.tel_casa}</td>
            <td>${value.correo}</td>
            <td>${value.carrera}</td>
            <td>${value.fecha_egreso}</td>
            <td>
              <table className="table text-center">
                <thead>
                  <tr>
                    ${Object.entries(
                      parsedFieldsToJSon[key].idioma_extranjero
                    ).map(
                      ([k, v]) =>
                        `<th className="celdaAsignado" scope="col">
                          ${k}
                        </th>`
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    ${Object.entries(
                      parsedFieldsToJSon[key].idioma_extranjero
                    ).map(([k, v]) => `<td>${v}</td>`)}
                  </tr>
                </tbody>
              </table>
            </td>
            <td>${value.titulado}</td>
            <td>${value.paquetes_computacionales}</td>
            <td>
              <table className="table text-center">
                <thead>
                  <tr>
                    ${Object.entries(parsedFieldsToJSon[key].seccion_2).map(
                      ([k, v]) =>
                        `<th className="celdaAsignado" scope="col">
                          ${k}
                        </th>`
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    ${Object.entries(parsedFieldsToJSon[key].seccion_2).map(
                      ([k, v]) => `<td>${v}</td>`
                    )}
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <table className="table text-center">
                <thead>
                  <tr>
                    ${Object.entries(parsedFieldsToJSon[key].seccion_3).map(
                      ([key, value]) =>
                        `<th className="celdaAsignado" scope="col">
                          ${key.replace("_", " ")}
                        </th>`
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    ${Object.entries(parsedFieldsToJSon[key].seccion_3).map(
                      ([k, v]) =>
                        typeof v === "object" && Object.entries(v).length > 0
                          ? `<td>
                            <table className="table text-center">
                              <thead>
                                <tr>
                                  ${Object.entries(v).map(
                                    ([ke, va]) =>
                                      `<th
                                      className="celdaAsignado"
                                      scope="col"
                                    >
                                      ${ke.replace("_", " ")}
                                    </th>`
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  ${Object.entries(v).map(([ke, va]) =>
                                    typeof va === "object" &&
                                    Object.entries(va).length > 0
                                      ? ` <td>
                                        <table className="table text-center">
                                          <thead>
                                            <tr>
                                              ${Object.entries(va).map(
                                                ([l, val]) =>
                                                  `<th
                                                    className="celdaAsignado"
                                                    scope="col"
                                                  >
                                                    ${l.replace("_", " ")}
                                                  </th>`
                                              )}
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              ${Object.entries(va).map(
                                                ([l, val]) => ` <td>${val}</td>`
                                              )}
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>`
                                      : `<td>${va}</td>`
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </td>`
                          : `<td>${v}</td>`
                    )}
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <table className="table text-center">
                <thead>
                  <tr>
                    ${Object.entries(parsedFieldsToJSon[key].seccion_4).map(
                      ([k, v]) =>
                        ` <th className="celdaAsignado" scope="col">
                          ${k}
                        </th>`
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    ${Object.entries(parsedFieldsToJSon[key].seccion_4).map(
                      ([k, v]) =>
                        typeof v === "object" && Object.entries(v).length > 0
                          ? `<td>
                            <table className="table text-center">
                              <thead>
                                <tr>
                                  ${Object.entries(v).map(
                                    ([o, e]) =>
                                      `<th
                                      className="celdaAsignado"
                                      scope="col"
                                    >
                                      ${o}
                                    </th>`
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  ${Object.entries(v).map(([x, p]) =>
                                    typeof p === "object" &&
                                    Object.entries(p).length > 0
                                      ? `<td>
                                        <table className="table text-center">
                                          <thead>
                                            <tr>
                                              ${Object.entries(p).map(
                                                ([k, v]) =>
                                                  `<th>
                                                    ${
                                                      parseInt(k) ||
                                                      parseInt(k) == 0
                                                        ? "R" +
                                                          (parseInt(k) + 10)
                                                        : ``
                                                    }
                                                  </th>`
                                              )}
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              ${Object.entries(p).map(
                                                ([k, v]) =>
                                                  v
                                                    ? `<td>
                                                      <table className="table text-center">
                                                        <thead>
                                                          <tr>
                                                            ${Object.entries(
                                                              EntriesP10S4
                                                            ).map(
                                                              ([r, w]) =>
                                                                `<th>
                                                                  ${w}
                                                                </th>`
                                                            )}
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr>
                                                            ${Object.entries(
                                                              p[k]
                                                            ).map(
                                                              ([o, e]) =>
                                                                ` <td>
                                                                  ${e}
                                                                </td>`
                                                            )}
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>`
                                                    : ``
                                              )}
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>`
                                      : `<td>${p}</td>`
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </td>`
                          : `<td>${v}</td>`
                    )}
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <table className="table text-center">
                <thead>
                  <tr>
                    ${Object.entries(parsedFieldsToJSon[key].seccion_5).map(
                      ([k, v]) =>
                        `<th className="celdaAsignado" scope="col">
                          ${k}
                        </th>`
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    ${Object.entries(parsedFieldsToJSon[key].seccion_5).map(
                      ([k, v]) =>
                        typeof v === "object" && Object.entries(v).length > 0
                          ? `<td>
                            <table className="table text-center">
                              <thead>
                                <tr>
                                  ${Object.entries(v).map(
                                    ([o, e]) =>
                                      `<th
                                      className="celdaAsignado"
                                      scope="col"
                                    >
                                      ${o.replace("_", " ")}
                                    </th>`
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  ${Object.entries(v).map(
                                    ([o, e]) => `<td>${e}</td>`
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </td>`
                          : `<td>${v}</td>`
                    )}
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <table className="table text-center">
                <thead>
                  <tr>
                    ${Object.entries(parsedFieldsToJSon[key].seccion_6).map(
                      ([k, v]) =>
                        `<th className="celdaAsignado" scope="col">
                          ${k}
                        </th>`
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    ${Object.entries(parsedFieldsToJSon[key].seccion_6).map(
                      ([k, v]) =>
                        typeof v === "object" && Object.entries(v).length > 0
                          ? `<td>
                            <table className="table text-center">
                              <thead>
                                <tr>
                                  ${Object.entries(v).map(
                                    ([o, e]) =>
                                      ` <th
                                      className="celdaAsignado"
                                      scope="col"
                                    >
                                      ${o.replace(/_/g, " ")}
                                    </th>`
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  ${Object.entries(v).map(
                                    ([o, e]) => `<td>${e}</td>`
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </td>`
                          : `<td>${v}</td>`
                    )}
                  </tr>
                </tbody>
              </table>
            </td>
            <td>${value.seccion_7.comentarios_sugerencias}</td>
            <td>${value.fecha}</td>
          </tr>`
        )}
      </tbody>
    </table>
  </div>`;

    const reportsTable = stringTable.replaceAll("<td>,</td>", "");
    res.json({ count: parsedFieldsToJSon.length, reportsTable });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas",
      error,
    });
  }
};

controller.GetAnswersCompany = async (req, res) => {
  try {
    const companies = await CompanyReport.ListCompanies();

    for (let i = 0; i < companies.length; i++) {
      companies[i] = {
        ...companies[i],
        seccion_b: await CompanyReport.FindAnswersSectionB(companies[i].id),
        seccion_c: await CompanyReport.FindAnswersSectionC(companies[i].id),
      };
    }
    const parsedFieldsToJSon = helpers.convertFieldsToJson(companies, [
      "seccion_b",
      "seccion_c",
    ]);
    res.json(parsedFieldsToJSon);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas",
      error,
    });
  }
};

module.exports = controller;
