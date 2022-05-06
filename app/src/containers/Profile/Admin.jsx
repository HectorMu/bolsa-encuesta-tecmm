import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

//Importando componentes
import FormCard from "@/components/Global/FormCard";
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import Accordion from "@/components/Global/Accordion";
import Collapsable from "@/components/Global/Collapsable";
import Loading from "@/components/Global/Loading";

//Importando hooks
import useSession from "@/hooks/useSession";
import useForm from "@/hooks/useForm";

//Importando servicios
import profileService from "@/services/Admin/profile.service";

const Entries = {
  correo: "",
  clave: "",
  confirmar: "",
};

const Admin = () => {
  const { form: admin, setForm: setAdmin, handleChange } = useForm(Entries);
  const [onEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [onChangePassword, toggleChangePassword] = useState(false);
  const { user, verifySession } = useSession();

  const getProfileHandler = useCallback(async () => {
    setIsLoading(true);
    const adminFetched = await verifySession(
      () => profileService.getProfile,
      getProfileHandler
    );

    if (!adminFetched.id) {
      setIsLoading(false);
      return;
    }

    setAdmin(adminFetched);
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onChangePassword) {
      delete admin.clave;
      delete admin.confirmar;
    }

    const tLoading = toast.loading("Guardando...");

    const results = await verifySession(() =>
      profileService.saveOrUpdateProfile(admin)
    );
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    toast.success(results.statusText, { id: tLoading });
    getProfileHandler();
  };

  useEffect(() => {
    getProfileHandler();
  }, [getProfileHandler]);

  useEffect(() => {
    setAdmin({ ...admin, ["correo"]: user.correo });
  }, [user]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <FormCard title={"Mi perfil"}>
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
                  <div
                    className={`${onChangePassword ? "col-lg-3" : "col-lg-6"}`}
                  >
                    <FloatingLabelInput
                      inputId="txtCorreo"
                      placeholder="Correo"
                      type="email"
                      name={"correo"}
                      setValue={handleChange}
                      value={admin.correo}
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
                          setValue={handleChange}
                          name={"clave"}
                          value={admin.clave}
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
                          setValue={handleChange}
                          name={"confirmar"}
                          value={admin.confirmar}
                        />
                      </div>
                    </>
                  ) : null}
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
      )}
    </>
  );
};

export default Admin;
