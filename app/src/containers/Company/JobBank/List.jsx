//Custom components
import DataTable from "@/components/Global/DataTable";
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";
//Custom hooks
import useServiceFetch from "@/hooks/useServiceFetchV2";
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
//Services
import vacanciesService from "@/services/Company/vacancies.service";

import ListButtons from "./ListButtons";

const List = () => {
  const { verifySession } = useSession();
  const {
    isLoading,
    refreshData,
    hookData: vacancies,
    error,
  } = useServiceFetch(
    () => verifySession(vacanciesService.List, refreshData),
    []
  );
  const { navigate } = useRouterHooks();

  const redirectToPostulationsPage = (vacancie) => {
    navigate(`/company/jobbank/postulations/${vacancie.folio}`, {
      state: vacancie,
    });
  };

  if (error.error) {
    return isLoading ? <Loading /> : <ErrorDisplayer message={error.message} />;
  }
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
          hideColumns={[
            "ubicacion",
            "fk_empresa",
            "descripcion",
            "nombre_comercial",
          ]}
          renameHeaders={{
            id: "Folio",
            fecha_creacion: "Creación",
            fecha_expira: "Expiración",
            status: "Estado",
          }}
          actionElement={{
            element: "vacante",
            className: "btn btn-link text-purple font-weight-bolder",
            action: (o) => redirectToPostulationsPage(o),
          }}
          actions={true}
          CustomButtons={ListButtons}
          searchText={"Buscando por"}
          actionsText={"Opciones"}
          emptyDataText={"Sin registros"}
        />
      )}
    </div>
  );
};

export default List;
