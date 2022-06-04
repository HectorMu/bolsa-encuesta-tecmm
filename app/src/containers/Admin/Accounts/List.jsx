import Swal from "sweetalert2";
import toast from "react-hot-toast";

//importando componentes personalizados
import DataTable from "@/components/Global/DataTable";
import Loading from "@/components/Global/Loading";

//importando hooks
import useServiceFetch from "@/hooks/useServiceFetchV2";
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";

//Importando servicios
import usersService from "@/services/Admin/users.service";

//Importando helpers
import helpers from "@/helpers/helpers";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

const List = () => {
  const { verifySession } = useSession();
  const {
    isLoading,
    hookData: users,
    refreshData,
    error,
  } = useServiceFetch(() => verifySession(usersService.List, refreshData), []);
  const { navigate } = useRouterHooks();

  const handleDeletion = async (usuario) => {
    Swal.fire({
      text: `¿Desea eliminar al usuario con el correo '${usuario.correo}'?`,
      icon: "info",
      ...helpers.alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResults = await verifySession(() =>
          usersService.Delete(usuario.id)
        );
        if (!deleteResults.status) {
          return toast.error(deleteResults.statusText);
        }
        toast.success("Usuario eliminado correctamente");
        await refreshData();
      }
    });
  };

  const redirectToEditPage = (user) => {
    navigate(`/accounts/edit/${user.id}`, { state: user });
  };

  const redirectToDetailsPage = (user) => {
    if (user.rol === "Administrador") {
      return toast.error("Los administradores no cuentan con un perfil");
    }
    if (user.rol === "Egresado") {
      return navigate(`/graduates/details/${user.id}`, {
        state: { prevLocation: "/accounts/" },
      });
    }
    if (user.rol === "Empresa") {
      return navigate(`/companies/details/${user.id}`, {
        state: { prevLocation: "/accounts/" },
      });
    }
  };

  const tableConfig = {
    buttons: [
      {
        key: "btnEdit",
        text: "Editar",
        style: "btn btn-info m-1 btn-sm",
        fwicon: "fas fa-pen fa-sm",
        click: (o) => redirectToEditPage(o),
      },
      {
        key: "btnDelete",
        text: "Eliminar",
        style: "btn btn-danger m-1 btn-sm",
        fwicon: "fas fa-times",
        click: (o) => handleDeletion(o),
      },
    ],
  };

  if (error.error) {
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <ErrorDisplayer message={error.message} tryAgain={refreshData} />
        )}
      </>
    );
  }

  return (
    <div className="mt-2">
      {isLoading ? (
        <Loading color="purple" />
      ) : (
        <DataTable
          refreshCallback={refreshData}
          data={users}
          title={"Registros"}
          emptyDataText={"Sin registros"}
          searchText={"Buscando por"}
          filtersConfig={{
            id: "Folio",
            correo: "Correo",
            rol: "Rol",
          }}
          renameHeaders={{
            id: "Folio",
            correo: "Correo",
            fk_rol: "Rol",
          }}
          actions={true}
          actionsText={"Opciones"}
          actionElement={{
            element: "id",
            className: "btn btn-link text-purple font-weight-bolder",
            action: (o) => redirectToDetailsPage(o),
          }}
          buttons={tableConfig.buttons}
        />
      )}
    </div>
  );
};

export default List;
