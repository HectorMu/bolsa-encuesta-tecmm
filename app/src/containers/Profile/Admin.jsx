import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import FormCard from "@/components/Global/FormCard";
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import Accordion from "@/components/Global/Accordion";
import Collapsable from "@/components/Global/Collapsable";
import useSession from "@/hooks/useSession";

import profileService from "@/services/Admin/profile.service";

const Entries = {
  correo: "",
  clave: "",
  confirmar: "",
};

const Admin = () => {
  const [admin, setAdmin] = useState(Entries);
  const [onEditing] = useState(true);
  const [onChangePassword, toggleChangePassword] = useState(false);
  const { user, verifySession } = useSession();

  const handleEntriesChange = (key, value) =>
    setAdmin({ ...admin, [key]: value });

  const getProfileHandler = useCallback(async () => {
    const adminFetched = await verifySession(() => profileService.getProfile());
    if (!adminFetched.id) return;

    setAdmin(adminFetched);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profile = {
      ...admin,
    };

    if (!onChangePassword) {
      delete profile.clave;
      delete profile.confirmar;
    }

    const results = await verifySession(() =>
      profileService.saveOrUpdateProfile(profile)
    );
    if (!results.status) {
      return toast.error(results.statusText);
    }
    toast.success(results.statusText);
    getProfileHandler();
  };

  useEffect(() => {
    getProfileHandler();
  }, [getProfileHandler]);

  useEffect(() => {
    setAdmin({ ...admin, ["correo"]: user.correo });
  }, [user]);
  return (
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
              <div className={`${onChangePassword ? "col-lg-3" : "col-lg-6"}`}>
                <FloatingLabelInput
                  inputId="txtCorreo"
                  placeholder="Correo"
                  type="email"
                  setValue={(e) =>
                    handleEntriesChange("correo", e.target.value)
                  }
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
                      setValue={(e) =>
                        handleEntriesChange("clave", e.target.value)
                      }
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
  );
};

export default Admin;
