import vacanciesService from "@/services/Company/vacancies.service";
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import helpers from "@/helpers/helpers";
const ListButtons = ({ object: vacancie, refreshCallback: refreshData }) => {
  const { navigate } = useRouterHooks();
  const { verifySession } = useSession();

  const handleOpenOrCloseVacancie = async () => {
    delete vacancie.solicitudes;
    delete vacancie.visitas;
    if (vacancie.status === "Cerrada") {
      vacancie.status = "Abierta";
      const results = await verifySession(() =>
        vacanciesService.Update(vacancie, vacancie.folio)
      );
      if (!results.status) {
        toast.error(results.statusText);
        return;
      }
      toast.success("Vacante abierta");
      await refreshData();
      return;
    }
    vacancie.status = "Cerrada";
    const results = await verifySession(() =>
      vacanciesService.Update(vacancie, vacancie.folio)
    );
    if (!results.status) {
      toast.error(results.statusText);
      return;
    }
    toast.success("Vacante cerrada");
    await refreshData();
  };

  const handleRedirectToEdit = () => {
    navigate(`/company/jobbank/edit/${vacancie.folio}`);
  };

  const handleDelete = () => {
    Swal.fire({
      text: `¿Desea eliminar la vacante No. '${vacancie.folio}'?.\n Esta accion eliminara todos los datos relacionados de la vacante.`,
      icon: "info",
      ...helpers.alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResults = await verifySession(() =>
          vacanciesService.Delete(vacancie.folio)
        );
        if (!deleteResults.status) {
          return toast.error(deleteResults.statusText);
        }
        toast.success("Vacante eliminada correctamente");
        await refreshData();
      }
    });
  };

  return (
    <div className="btn-group dropleft">
      <button
        type="button"
        className="btn btn-primary btn-sm dropdown-toggle"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="fas fa-cog"></i>
      </button>
      <div className="dropdown-menu px-2 rounded">
        <button
          onClick={handleOpenOrCloseVacancie}
          className="dropdown-item rounded"
        >
          <div className="d-flex justify-content-between align-items-center h-100">
            {vacancie.status === "Abierta" ? (
              <>
                Cerrar <i className="fas fa-lock text-primary"></i>
              </>
            ) : (
              <>
                Abrir <i className="fas fa-lock-open text-primary"></i>
              </>
            )}
          </div>
        </button>

        <button
          onClick={handleRedirectToEdit}
          className="dropdown-item rounded"
        >
          <div className="d-flex justify-content-between align-items-center h-100">
            Editar <i className="fas fa-pen text-info "></i>
          </div>
        </button>

        <button onClick={handleDelete} className="dropdown-item rounded">
          <div className="d-flex justify-content-between align-items-center h-100">
            Eliminar <i className="fas fa-times text-danger "></i>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ListButtons;
