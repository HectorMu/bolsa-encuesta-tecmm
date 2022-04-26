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
                  <th scope="col">{value}</th>
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
                  <td>xd</td>
                  <td>{value.titulado}</td>
                  <td>{value.paquetes_computacionales}</td>
                  <td>s2</td>
                  <td>s3</td>
                  <td>s4</td>
                  <td>s5</td>
                  <td>s6</td>
                  <td>s7</td>
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
