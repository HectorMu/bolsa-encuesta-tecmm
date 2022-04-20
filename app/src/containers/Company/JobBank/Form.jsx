import { useState, useEffect, useCallback } from "react";
import FormCard from "@/components/Global/FormCard";
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import { Link } from "react-router-dom";
import vacanciesService from "@/services/Company/vacancies.service";
import toast from "react-hot-toast";
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";

const Entries = {
  folio: "",
  vacante: "",
  descripcion: "",
  ubicacion: "",
  fecha_expira: "",
  status: "",
};

const Form = () => {
  const [vacant, setVacant] = useState(Entries);
  const { verifySession } = useSession();
  const [onEditing, setOnEditing] = useState(false);

  const handleChange = (key, value) => setVacant({ ...vacant, [key]: value });
  const { navigate, params, location } = useRouterHooks();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onEditing) {
      const results = await verifySession(() =>
        vacanciesService.Update(vacant, params.id)
      );
      if (!results.status) return toast.error(results.statusText);

      if (vacant.status === "Cerrada") {
        toast.success(
          "Vacante editada, puede abrirla cuando requiera su publicacion "
        );
        navigate("/company/jobbank/");
        return;
      }
      toast.success("Vacante editada y publicada");
      navigate("/company/jobbank/");
    } else {
      const results = await verifySession(() => vacanciesService.Save(vacant));
      if (!results.status) return toast.error(results.statusText);

      if (vacant.status === "Cerrada") {
        toast.success(
          "Vacante creada, puede abrirla cuando requiera su publicacion "
        );
        navigate("/company/jobbank/");
        return;
      }
      toast.success("Vacante creada y publicada");
      navigate("/company/jobbank/");
    }
  };

  const getVacantFromFetch = useCallback(async () => {
    const fetchedVacant = await verifySession(
      () => vacanciesService.GetOne(params.id),
      getVacantFromFetch
    );
    if (!fetchedVacant.folio) {
      toast.error("Este registro no existe");
      navigate("/company/jobbank/");
      return;
    }
    delete fetchedVacant.fk_empresa;
    setVacant(fetchedVacant);
  }, [params.id]);

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      getVacantFromFetch();
      setOnEditing(true);
    }
  }, [getVacantFromFetch]);
  return (
    <FormCard title={onEditing ? "Editar vacante" : "Nueva vacante"}>
      <form onSubmit={handleSubmit}>
        <div className="col-3 mx-auto">
          <FloatingLabelInput
            inputId="txtFolio"
            placeholder="Folio"
            disabled={onEditing}
            setValue={(e) =>
              handleChange(
                "folio",
                Number(e.target.value) ? parseInt(e.target.value) : 0
              )
            }
            value={vacant.folio}
          />
        </div>
        <div className="col-10 mx-auto">
          <FloatingLabelInput
            inputId="txtTitulo"
            placeholder="Vacante"
            setValue={(e) => handleChange("vacante", e.target.value)}
            value={vacant.vacante}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Requerimientos"
            className="form-control"
            rows="10"
            onChange={(e) => handleChange("descripcion", e.target.value)}
            value={vacant.descripcion}
          ></textarea>

          <div className="row mt-3">
            <div className="col-6">
              <FloatingLabelInput
                inputId="txtUbicacion"
                placeholder="Ubicacion"
                setValue={(e) => handleChange("ubicacion", e.target.value)}
                value={vacant.ubicacion}
              />
            </div>
            <div className="col-6">
              <FloatingLabelInput
                inputId="txtExpiracion"
                placeholder="Fecha de expiracion"
                type="date"
                setValue={(e) => handleChange("fecha_expira", e.target.value)}
                value={vacant.fecha_expira}
              />
            </div>
          </div>
        </div>
        <div className="col-6 mx-auto">
          <select
            className="form-control form-select mb-3"
            style={{ height: "47px" }}
            onChange={(e) => handleChange("status", e.target.value)}
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
  );
};

export default Form;
