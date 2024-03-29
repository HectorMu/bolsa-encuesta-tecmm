import { useCallback, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

//Importando hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useForm from "@/hooks/useForm";
import useSession from "@/hooks/useSession";
import useServiceFetchV2 from "@/hooks/useServiceFetchV2";

//Importando componentes
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import Accordion from "@/components/Global/Accordion";
import Collapsable from "@/components/Global/Collapsable";
import FormCard from "@/components/Global/FormCard";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";
import Loading from "@/components/Global/Loading";

//Entradas del formulario (objeto con los datos a capturar en el formulario)
import { Entries } from "./FormEntries";

//Importando servicios
import usersService from "@/services/Admin/users.service";

const ROLES = {
  Administrador: 1,
  Egresado: 2,
  Empresa: 3,
};

const Form = () => {
  const { form: user, setForm: setUser, handleChange } = useForm(Entries);
  const { verifySession } = useSession();
  const [onEditing, toggleEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [onChangePassword, toggleChangePassword] = useState(false);
  const { navigate, location, params } = useRouterHooks();

  const getUserFromFetch = useCallback(async () => {
    setIsLoading(true);
    const userFetched = await verifySession(
      () => usersService.GetOne(params.id),
      getUserFromFetch
    );
    if (userFetched?.error) {
      setUser(userFetched);
      setIsLoading(false);
      return;
    }
    if (!userFetched.id) {
      navigate("/accounts");
      toast.error("Este registro no existe.");
      setIsLoading(false);
      return;
    }
    setUser(userFetched);
    setIsLoading(false);
  }, [params.id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tLoading = toast.loading("Guardando...");
    if (onEditing) {
      const results = await verifySession(() =>
        usersService.Update(user, params.id)
      );
      if (!results.status) {
        return toast.error(results.statusText, { id: tLoading });
      }
      toast.success("Cuenta editada correctamente.", { id: tLoading });
      navigate("/accounts");
    } else {
      const results = await verifySession(() => usersService.Save(user));
      if (!results.status) {
        return toast.error(results.statusText, { id: tLoading });
      }
      toast.success("Cuenta guardada correctamente.", { id: tLoading });
      navigate("/accounts");
    }
  };

  useEffect(() => {
    if (location.state !== null) {
      const filteredRol = Object.entries(ROLES).filter(
        ([key]) => key === location.state.rol
      )[0];

      location.state.fk_rol = filteredRol[1];
      delete location.state.rol;

      setUser(location.state);
      toggleEditing(true);
      return;
    }
    if (location.pathname.includes("edit")) {
      getUserFromFetch();
      toggleEditing(true);
      return;
    }
    toggleChangePassword(true);
    toggleEditing(false);
  }, [location.pathname, getUserFromFetch, location.state]);

  if (user?.error) {
    return (
      <>{isLoading ? <Loading /> : <ErrorDisplayer message={user.message} />}</>
    );
  }

  return isLoading ? (
    <Loading />
  ) : (
    <FormCard title={onEditing ? "Editar cuenta" : "Datos de la cuenta"}>
      <form onSubmit={handleSubmit}>
        <Accordion>
          <Collapsable
            id="DatosUsuario"
            text="Credenciales y rol"
            buttonClass="btn btn-link btn-block text-left text-primary font-weight-bolder collapsed"
          >
            {onEditing ? (
              <>
                <div className="form-check mb-4 d-flex justify-content-end">
                  <input
                    style={{ cursor: "pointer" }}
                    className="form-check-input"
                    onChange={() => toggleChangePassword(!onChangePassword)}
                    type="checkbox"
                    id="changeClave"
                  />
                  <label
                    style={{ cursor: "pointer" }}
                    className="form-check-label mr-3"
                    htmlFor="changeClave"
                  >
                    ¿Cambiar clave?
                  </label>
                </div>
              </>
            ) : null}
            <div className="row">
              <div className={`${onChangePassword ? "col-lg-3" : "col-lg-6"}`}>
                <FloatingLabelInput
                  inputId="txtCorreo"
                  placeholder="Correo"
                  type="email"
                  name={"correo"}
                  setValue={handleChange}
                  value={user.correo}
                />
              </div>

              {onChangePassword ? (
                <>
                  <div className="col-lg-4">
                    <FloatingLabelInput
                      inputId="txtClave"
                      placeholder="Clave"
                      type="password"
                      name={"clave"}
                      setValue={handleChange}
                      value={user.clave}
                    />
                  </div>
                  <div className="col-lg-4">
                    <FloatingLabelInput
                      inputId="txtClaveCon"
                      placeholder="Confirmar"
                      type="password"
                      setValue={handleChange}
                      name={"confirmar"}
                      value={user.confirmar}
                    />
                  </div>
                </>
              ) : null}

              <div className="col-lg-12">
                <select
                  className="form-control form-select mb-3"
                  style={{ height: "47px" }}
                  onChange={handleChange}
                  name={"fk_rol"}
                  value={user.fk_rol}
                >
                  <option value={""}>Rol (Seleccione una opción)</option>
                  <option value="1">Administrador</option>
                  <option value="2">Egresado</option>
                  <option value="3">Empresa</option>
                </select>
              </div>
            </div>
          </Collapsable>
        </Accordion>

        <div className="d-flex mt-3 justify-content-center">
          <button type="submit" className="btn btn-primary mx-3">
            {onEditing ? "Guardar cambios" : "Guardar"}
          </button>
          <Link to={-1} className="btn btn-danger">
            Cancelar
          </Link>
        </div>
      </form>
    </FormCard>
  );
};

export default Form;
