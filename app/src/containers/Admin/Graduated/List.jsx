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

  const tableConfig = {
    buttons: [
      {
        key: "btnEdit",
        text: "Edtar",
        style: "btn btn-info mx-1 btn-sm",
        fwicon: "fas fa-pen",
        click: (o) => {
          window.alert(`Default action ${o.id}`);
        },
      },
      {
        key: "btnDelete",
        text: "Eliminar",
        style: "btn btn-danger mx-1 btn-sm",
        fwicon: "fas fa-times",
        click: (o) => {
          window.alert(`Default action ${o.id}`);
        },
      },
    ],
  };

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
            fechaNacimiento: "Nacimiento",
            n_casa: "#",
            cp: "C.P",
            telefono: "Teléfono",
            tel_casa: "T.Casa",
            fecha_egreso: "Egreso",
            idioma_extranjero: "Idiomas %",
            paquetes_computacionales: "Habilidades",
          }}
          actions={true}
          actionsText={"Opciones"}
          buttons={tableConfig.buttons}
        />
      )}
    </div>
  );
};

export default List;
