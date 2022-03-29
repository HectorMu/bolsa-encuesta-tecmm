import React, { useEffect, useState } from "react";
//Custom components
import DataTable from "@/components/Global/DataTable";
import Loading from "@/components/Global/Loading";
//Custom hooks
import useServiceFetch from "@/hooks/useServiceFetch";
//Services
import vacanciesService from "@/services/Company/vacancies.service";

const List = () => {
  const [vacancies, setVacancies] = useState([]);
  const { isLoading } = useServiceFetch(vacanciesService.List, setVacancies);

  const tableConfig = {
    buttons: [
      {
        key: "btnEdit",
        text: "Default button",
        style: "btn btn-secondary mx-1 btn-sm",
        fwicon: "fas fa-question",
        click: (o) => {
          window.alert(`Default action ${o}`);
        },
      },
    ],
  };
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
          searchText={"Buscando por"}
        />
      )}
    </div>
  );
};

export default List;
