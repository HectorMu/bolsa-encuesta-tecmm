import React, { useState } from "react";
//Custom components
import DataTable from "@/components/Global/DataTable";
import Loading from "@/components/Global/Loading";
//Custom hooks
import useServiceFetch from "@/hooks/useServiceFetchV2";
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
//Services
import jobsService from "@/services/Admin/jobs.service";

const List = () => {
  const { verifySession } = useSession();
  const {
    isLoading,
    refreshData,
    hookData: vacancies,
  } = useServiceFetch(() => verifySession(jobsService.List, refreshData), []);
  const { navigate } = useRouterHooks();

  const redirectToPostulationsPage = (vacancie) => {
    navigate(`/jobbank/postulations/${vacancie.folio}`);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable
          firstColumnKey="folio"
          data={vacancies}
          title="Vacantes"
          refreshCallback={refreshData}
          hideColumns={["ubicacion", "fk_empresa", "descripcion"]}
          renameHeaders={{
            id: "Folio",
            fecha_creacion: "Creación",
            fecha_expira: "Expiración",
            nombre_comercial: "Empresa",
            status: "Estado",
          }}
          actionElement={{
            element: "vacante",
            className: "btn btn-link text-purple font-weight-bolder",
            action: (o) => redirectToPostulationsPage(o),
          }}
          searchText={"Buscando por"}
          actionsText={"Opciones"}
        />
      )}
    </div>
  );
};

export default List;
