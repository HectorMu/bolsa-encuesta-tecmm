import React, { useEffect, useState } from "react";
//Custom components
import DataTable from "@/components/Global/DataTable";
import Loading from "@/components/Global/Loading";
//Custom hooks
import useServiceFetch from "@/hooks/useServiceFetch";
//Services
import vacanciesService from "@/services/Company/vacancies.service";

const TableButtons = ({ object }) => {
  return <button>xd {object.folio}</button>;
};

const List = () => {
  const [vacancies, setVacancies] = useState([]);
  const { isLoading } = useServiceFetch(vacanciesService.List, setVacancies);

  const tableConfig = {
    buttons: [
      {
        key: "btnCerrar",
        text: "Cerrar",
        style: "btn btn-primary mx-1 btn-sm",
        fwicon: "fas fa-check",
        click: (o) => {
          window.alert(`Default action ${o}`);
        },
      },
      {
        key: "btnEdit",
        text: "Editar",
        style: "btn btn-info mx-1 btn-sm",
        fwicon: "fas fa-pen",
        click: (o) => {
          window.alert(`Default action ${o}`);
        },
      },
      {
        key: "btnDelete",
        text: "Eliminar",
        style: "btn btn-danger mx-1 btn-sm",
        fwicon: "fas fa-times",
        click: (o) => {
          window.alert(`Default action ${o}`);
        },
      },
    ],
  };
  console.log(vacancies);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable
          data={vacancies}
          title="Vacantes"
          hideColumns={["ubicacion", "fk_empresa"]}
          renameHeaders={{
            descripcion: "Descripción",
            fecha_creacion: "Creada",
            fecha_expira: "Expira",
            status: "Estado",
          }}
          actions={true}
          CustomButtons={TableButtons}
          searchText={"Buscando por"}
          actionsText={"Opciones"}
        />
      )}
    </div>
  );
};

export default List;
