import { useState, useEffect } from "react";

//importando componentes personalizados
import DataTable from "../../../components/Global/DataTable";
import Loading from "../../../components/Global/Loading";

//importando hooks
import useServiceFetch from "../../../hooks/useServiceFetch";

//importando servicios
import graduated from "../../../services/graduated";

//importando helpers
import helpers from "../../../helpers/helpers";

const List = () => {
  const [graduates, setGraduates] = useState([]);
  const { isLoading } = useServiceFetch(graduated.List, setGraduates);

  useEffect(() => {
    const parsedData = helpers.convertFieldsToJson(graduates, [
      "idioma_extranjero",
    ]);
    setGraduates(parsedData);
  }, [graduates]);
  return (
    <div>
      {isLoading ? (
        <Loading color="purple" />
      ) : (
        <DataTable
          data={graduates}
          title={"Registros"}
          emptyDataText={"Sin registros"}
          searchText={"Buscando por"}
          filtersConfig={{
            id: "Folio",
            correo: "Correo",
            n_control: "No. Control",
            nombre_completo: "Nombre",
            estado_civil: "Estado Civil",

            titulado: "Titulado",
          }}
          renameHeaders={{
            id: "Folio",
            nombre_completo: "Nombre",
            estado_civil: "Estado Civil",
            n_control: "No. Control",
            fecha_nacimiento: "Nacimiento",
            n_casa: "#",
            cp: "C.P",
            telefono: "Teléfono",
            tel_casa: "T.Casa",
            fecha_egreso: "Egreso",
            idioma_extranjero: "Idiomas %",
            paquetes_computacionales: "Habilidades",
          }}
          hideColumns={["creadoEn", "actualizadoEn", "fk_usuario"]}
        />
      )}
    </div>
  );
};

export default List;
