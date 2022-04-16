import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import useRouterHooks from "@/hooks/useRouterHooks";

//importando componentes personalizados
import DataTable from "@/components/Global/DataTable";
import Loading from "@/components/Global/Loading";

//importando hooks
import useServiceFetch from "@/hooks/useServiceFetch";

//importando servicios
import graduatesService from "@/services/Admin/graduates.service";

//importando helpers
import helpers from "@/helpers/helpers";

const List = () => {
  const [graduates, setGraduates] = useState([]);
  const { isLoading, refreshData } = useServiceFetch(
    graduatesService.List,
    setGraduates
  );
  const { navigate } = useRouterHooks();

  const handleDeletion = async (egresado) => {
    Swal.fire({
      text: `¿Desea eliminar al egresado '${egresado.nombre_completo}' del sistema?`,
      icon: "info",
      ...helpers.alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResults = await graduatesService.Delete(egresado.id);
        if (!deleteResults.status) {
          return toast.error(deleteResults.statusText);
        }
        toast.success("Egresado eliminado correctamente");
        await refreshData();
      }
    });
  };

  const redirectToEditPage = (graduated) => {
    navigate(`/graduated/edit/${graduated.id}`);
  };

  const redirectToDetailsPage = (graduated) => {
    navigate(`/graduated/details/${graduated.id}`);
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
        fwicon: "fas fa-times ",
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
          data={graduates}
          title={"Registros"}
          emptyDataText={"Sin registros"}
          searchText={"Buscando por"}
          filtersConfig={{
            id: "Folio",
            correo: "Correo",
            no_control: "No. Control",
            nombre_completo: "Nombre",
            estado_civil: "Estado Civil",
            titulado: "Titulado",
          }}
          hideColumns={[
            "paquetes_computacionales",
            "idioma_extranjero",
            "telefono",
            "tel_casa",
            "estado",
            "municipio",
            "calle",
            "numero_casa",
            "colonia",
            "cp",
            "fechaNacimiento",
            "estado_civil",
            "curp",
            "sexo",
            "curriculum",
          ]}
          renameHeaders={{
            id: "Folio",
            nombre_completo: "Nombre",
            estado_civil: "Estado Civil",
            no_control: "No. Control",
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
