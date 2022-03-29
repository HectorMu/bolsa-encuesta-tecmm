import { useCallback, useEffect, useState } from "react";
import useRouterHooks from "@/hooks/useRouterHooks";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import Accordion from "@/components/Global/Accordion";
import Collapsable from "@/components/Global/Collapsable";
import FormCard from "@/components/Global/FormCard";

import { Entries } from "./FormEntries";

import usersService from "@/services/Admin/users.service";

const Form = () => {
  const [user, setUser] = useState(Entries);

  const [onEditing, toggleEditing] = useState(false);
  const [onChangePassword, toggleChangePassword] = useState(false);
  const { navigate, location, params } = useRouterHooks();

  const handleEntriesChange = (key, value) =>
    setUser({ ...user, [key]: value });

  const getUserFromFetch = useCallback(async () => {
    const userFetched = await usersService.GetOne(params.id);
    if (!userFetched.id) {
      navigate("/accounts");
      toast.error("Este registro no existe.");
      return;
    }
    setUser(userFetched);
  }, [params.id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onEditing) {
      const results = await usersService.Update(user, params.id);
      if (!results.status) {
        return toast.error(results.statusText);
      }
      toast.success("Egresado editado correctamente.");
      navigate("/accounts");
    } else {
      const results = await usersService.Save(user);
      if (!results.status) {
        return toast.error(results.statusText);
      }
      toast.success("Egresado guardado correctamente.");
      navigate("/accounts");
    }
  };

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      getUserFromFetch();
      toggleEditing(true);
      return;
    }
    toggleChangePassword(true);
    toggleEditing(false);
  }, [location.pathname, getUserFromFetch]);

  return (
    <FormCard title={onEditing ? "Editar usuario" : "Datos del usuario"}>
      <form onSubmit={handleSubmit}>
        <Accordion>
          <Collapsable
            id="DatosUsuario"
            text="Datos del usuario"
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
                  setValue={(e) =>
                    handleEntriesChange("correo", e.target.value)
                  }
                  value={user.correo}
                />
              </div>

              {onChangePassword ? (
                <>
                  <div
                    className="col-lg-4"
                    data-aos={`${onEditing ? `fade-down` : ""}`}
                  >
                    <FloatingLabelInput
                      inputId="txtClave"
                      placeholder="Clave"
                      type="password"
                      setValue={(e) =>
                        handleEntriesChange("clave", e.target.value)
                      }
                      value={user.clave}
                    />
                  </div>
                  <div
                    className="col-lg-4"
                    data-aos={`${onEditing ? `fade-down` : ""}`}
                  >
                    <FloatingLabelInput
                      inputId="txtClaveCon"
                      placeholder="Confirmar"
                      type="password"
                      setValue={(e) =>
                        handleEntriesChange("confirmar", e.target.value)
                      }
                      value={user.confirmar}
                    />
                  </div>
                </>
              ) : null}

              <div className="col-lg-12">
                <select
                  className="form-control form-select mb-3"
                  style={{ height: "47px" }}
                  onChange={(e) =>
                    handleEntriesChange("fk_rol", e.target.value)
                  }
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
