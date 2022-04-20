import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import FormCard from "@/components/Global/FormCard";
import RegisterForm from "@/components/Graduated/RegisterForm";
import useForm from "@/hooks/useForm";
import useSession from "@/hooks/useSession";

//Entradas del formulario, es un objeto con los datos a capturar el en formulario
import { Entries, NestedEntries } from "@/components/Graduated/RegisterForm";
//importando json de las carreras

//importando servicios
import profileService from "@/services/Graduated/profile.service";
import GraduatedCurriculum from "./GraduatedCurriculum";

const Graduated = () => {
  const {
    form: graduated,
    setForm: setGraduated,
    handleChange: handleEntriesChange,
  } = useForm(Entries);
  const [currentSelection, setCurrentSelection] = useState("Profile");
  const {
    form: idiomaExtranjero,
    setForm: setIdiomaExtranjero,
    handleChange: handleIdiomaExtranjeroChange,
  } = useForm(NestedEntries.idioma_extranjero);
  const [onEditing] = useState(true);
  const [onChangePassword, toggleChangePassword] = useState(false);
  const { user, verifySession } = useSession();

  const getProfileHandler = useCallback(async () => {
    const graduatedFetched = await verifySession(() =>
      profileService.getProfile()
    );
    if (!graduatedFetched.id) return;

    const { idioma_extranjero, ...rest } = graduatedFetched;
    setGraduated(rest);
    setIdiomaExtranjero(idioma_extranjero);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profile = {
      ...graduated,
      idioma_extranjero: idiomaExtranjero,
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
    if (results.statusText === "Curriculum creado correctamente.") {
      setCurrentSelection("Curriculum");
      toast("Puedes subir tu curriculum ahora para poder postularte");
    }
  };

  useEffect(() => {
    getProfileHandler();
  }, [getProfileHandler]);

  useEffect(() => {
    setGraduated({ ...graduated, ["correo"]: user.correo });
  }, [user]);

  console.log(graduated);
  return (
    <div>
      <div className="d-flex justify-content-center mb-3">
        {graduated?.id && (
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              onClick={({ target }) => setCurrentSelection(target.value)}
              value={"Profile"}
              className={`btn btn-primary btn-outline-primary ${
                currentSelection === "Profile" && "active"
              }`}
            >
              Perfil
            </button>
            <button
              onClick={({ target }) => setCurrentSelection(target.value)}
              value={"Curriculum"}
              className={`btn btn-primary btn-outline-primary ${
                currentSelection === "Curriculum" && "active"
              }`}
            >
              Curriculum
            </button>
          </div>
        )}
      </div>

      {currentSelection === "Profile" ? (
        <FormCard title={"Mi perfil"}>
          <RegisterForm
            handleSubmit={handleSubmit}
            graduated={graduated}
            handleEntriesChange={handleEntriesChange}
            handleIdiomaExtranjeroChange={handleIdiomaExtranjeroChange}
            onEditing={onEditing}
            onChangePassword={onChangePassword}
            toggleChangePassword={toggleChangePassword}
            idiomaExtranjero={idiomaExtranjero}
          />
        </FormCard>
      ) : (
        <GraduatedCurriculum
          getProfileHandler={getProfileHandler}
          curriculum={graduated.curriculum}
        />
      )}
    </div>
  );
};

export default Graduated;
