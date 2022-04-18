import Swal from "sweetalert2";
import toast from "react-hot-toast";

import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";

//importando componentes personalizados
import DataTable from "@/components/Global/DataTable";
import Loading from "@/components/Global/Loading";

//importando hooks
import useServiceFetch from "@/hooks/useServiceFetchV2";

//Importando servicios
import usersService from "@/services/Admin/users.service";

//Importando helpers
import helpers from "@/helpers/helpers";

const List = () => {
  const { verifySession } = useSession();
  const {
    isLoading,
    hookData: users,
    refreshData,
  } = useServiceFetch(() => verifySession(usersService.List), []);
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
    navigate(`/accounts/edit/${user.id}`);
  };

  const redirectToDetailsPage = (user) => {
    console.log(user);
    if (user.rol === "Administrador") {
      return toast.error("Los administradores no cuentan con un perfil");
    }
    if (user.rol === "Egresado") {
      return navigate(`/graduated/details/${user.id}`);
    }
    if (user.rol === "Empresa") {
      return navigate(`/companies/details/${user.id}`);
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

  return (
    <div className="mt-2">
      {isLoading ? (
        <Loading color="purple" />
      ) : (
        <DataTable
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
