import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

//Importando los componentes personalizados
import FormCard from "@/components/Global/FormCard";
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import Loading from "@/components/Global/Loading";

//Importando servicios
import vacanciesService from "@/services/Company/vacancies.service";

//Importando hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";
import useForm from "@/hooks/useForm";

//Entradas del formulario (objeto con los datos a capturar en el formulario)
const Entries = {
  folio: "",
  vacante: "",
  descripcion: "",
  ubicacion: "",
  fecha_expira: "",
  status: "",
};

const Form = () => {
  const { form: vacant, setForm: setVacant, handleChange } = useForm(Entries);
  const { verifySession } = useSession();
  const [onEditing, setOnEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { navigate, params, location } = useRouterHooks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    delete vacant.nombre_comercial;

    const tLoading = toast.loading("Guardando...");
    if (onEditing) {
      const results = await verifySession(() =>
        vacanciesService.Update(vacant, params.id)
      );
      if (!results.status)
        return toast.error(results.statusText, { id: tLoading });

      if (vacant.status === "Cerrada") {
        toast.success(
          "Vacante editada, puede abrirla cuando requiera su publicación",
          { id: tLoading }
        );
        navigate("/company/jobbank/");
        return;
      }
      toast.success("Vacante editada y publicada", { id: tLoading });
      navigate("/company/jobbank/");
    } else {
      const results = await verifySession(() => vacanciesService.Save(vacant));
      if (!results.status)
        return toast.error(results.statusText, { id: tLoading });

      if (vacant.status === "Cerrada") {
        toast.success(
          "Vacante creada, puede abrirla cuando requiera su publicación",
          { id: tLoading }
        );
        navigate("/company/jobbank/");
        return;
      }
      toast.success("Vacante creada y publicada", { id: tLoading });
      navigate("/company/jobbank/");
    }
  };

  const getVacantFromFetch = useCallback(async () => {
    setIsLoading(true);
    const fetchedVacant = await verifySession(
      () => vacanciesService.GetOne(params.id),
      getVacantFromFetch
    );
    if (!fetchedVacant.folio) {
      toast.error("Este registro no existe");
      setIsLoading(false);
      navigate("/company/jobbank/");
      return;
    }
    delete fetchedVacant.fk_empresa;
    setVacant(fetchedVacant);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    if (location.state !== null) {
      setVacant(location.state);
      setOnEditing(true);
      return;
    }
    if (location.pathname.includes("edit")) {
      getVacantFromFetch();
      setOnEditing(true);
    }
  }, [getVacantFromFetch, location.state]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <FormCard title={onEditing ? "Editar vacante" : "Nueva vacante"}>
          <form onSubmit={handleSubmit}>
            <div className="col-3 mx-auto">
              <FloatingLabelInput
                inputId="txtFolio"
                placeholder="Folio"
                type={"number"}
                disabled={onEditing}
                setValue={handleChange}
                name={"folio"}
                value={vacant.folio}
              />
            </div>
            <div className="col-10 mx-auto">
              <FloatingLabelInput
                inputId="txtTitulo"
                placeholder="Vacante"
                setValue={handleChange}
                name={"vacante"}
                value={vacant.vacante}
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Requerimientos"
                className="form-control"
                rows="10"
                onChange={handleChange}
                name={"descripcion"}
                value={vacant.descripcion}
              ></textarea>

              <div className="row mt-3">
                <div className="col-6">
                  <FloatingLabelInput
                    inputId="txtUbicacion"
                    placeholder="Ubicacion"
                    setValue={handleChange}
                    name={"ubicacion"}
                    value={vacant.ubicacion}
                  />
                </div>
                <div className="col-6">
                  <FloatingLabelInput
                    inputId="txtExpiracion"
                    placeholder="Fecha de expiracion"
                    type="date"
                    setValue={handleChange}
                    name={"fecha_expira"}
                    value={vacant.fecha_expira}
                  />
                </div>
              </div>
            </div>
            <div className="col-6 mx-auto">
              <select
                className="form-control form-select mb-3"
                style={{ height: "47px" }}
                onChange={handleChange}
                name={"status"}
                value={vacant.status}
              >
                <option value={""}>Estatus (Seleccione una opción)</option>
                <option value="Abierta">Abierta</option>
                <option value="Cerrada">Cerrada</option>
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary mr-2">
                {onEditing ? "Guardar cambios" : "Guardar"}
              </button>
              <Link to={"/company/jobbank/"} className="btn btn-danger">
                Cancelar
              </Link>
            </div>
          </form>
        </FormCard>
      )}
    </>
  );
};

export default Form;
