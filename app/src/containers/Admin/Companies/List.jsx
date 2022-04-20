import { useState } from "react";
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import helpers from "@/helpers/helpers";

//importando librerias para alertas
import Swal from "sweetalert2";
import toast from "react-hot-toast";

//importando componentes personalizados
import DataTable from "@/components/Global/DataTable";
import Loading from "@/components/Global/Loading";

//importando hooks
import useServiceFetch from "@/hooks/useServiceFetchV2";

//importando servicios
import companyService from "@/services/Admin/companies.service";

const List = () => {
  //const [companies, setCompanies] = useState([]);
  const { verifySession } = useSession();
  const {
    isLoading,
    hookData: companies,
    refreshData,
  } = useServiceFetch(
    () => verifySession(companyService.List, refreshData),
    []
  );
  const { navigate } = useRouterHooks();

  const handleDeletion = async (company) => {
    Swal.fire({
      text: `¿Desea eliminar a la compañia '${company.nombre_comercial}' del sistema?`,
      icon: "info",
      ...helpers.alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResults = await verifySession(() =>
          companyService.Delete(company.id)
        );
        if (!deleteResults.status) {
          return toast.error(deleteResults.statusText);
        }
        toast.success("Compañia eliminada correctamente");
        await refreshData();
      }
    });
  };

  const redirectToEditPage = (company) =>
    navigate(`/companies/edit/${company.id}`, { state: company });

  const redirectToDetailsPage = (company) =>
    navigate(`/companies/details/${company.id}`);

  const tableConfig = {
    buttons: [
      {
        key: "btnEdit",
        text: "Editar",
        style: "btn btn-info m-1 btn-sm ",
        fwicon: "fas fa-pen fa-sm",
        click: (o) => redirectToEditPage(o),
      },
      {
        key: "btnDelete",
        text: "Eliminar",
        style: "btn btn-danger m-1 btn-sm",
        fwicon: "fas fa-times ",
        click: (o) => handleDeletion(o),
      },
    ],
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable
          title="Registros"
          data={companies}
          emptyDataText="Sin registros"
          searchText="Buscando por"
          actions={true}
          actionsText={"Opciones"}
          hideColumns={[
            "cp",
            "numero_empresa",
            "calle",
            "colonia",
            "municipio",
            "estado",
          ]}
          filtersConfig={{
            id: "Folio",
            correo: "Correo",
            nombre_comercial: "Nombre",
            tipo_empresa: "Tipo",
            actividad_economica: "Act. Económica",
            estado: "Estado",
            municipio: "Municipio",
          }}
          renameHeaders={{
            id: "Folio",
            nombre_comercial: "Nombre",
            numero_empresa: "#",
            cp: "C.P",
            telefono: "Teléfono",
            tipo_empresa: "Tipo",
            actividad_economica: "Act. Económica",
          }}
          buttons={tableConfig.buttons}
          actionElement={{
            element: "id",
            className: "btn btn-link text-purple font-weight-bolder",
            action: (o) => redirectToDetailsPage(o),
          }}
        />
      )}
    </div>
  );
};

export default List;
