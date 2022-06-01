import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

//Importando hooks
import useForm from "@/hooks/useForm";
import useSession from "@/hooks/useSession";
import useGraduatedCurriculum from "@/hooks/useGraduatedCurriculum";

//Entradas del formulario, es un objeto con los datos a capturar el en formulario
import { Entries, NestedEntries } from "@/components/Graduated/RegisterForm";
import FormCard from "@/components/Global/FormCard";
import RegisterForm from "@/components/Graduated/RegisterForm";

//importando servicios
import profileService from "@/services/Graduated/profile.service";

import GraduatedCurriculum from "./GraduatedCurriculum";
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

const Graduated = () => {
  const { getCurriculumHandler } = useGraduatedCurriculum();

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
  const [isLoading, setIsLoading] = useState(false);
  const [onChangePassword, toggleChangePassword] = useState(false);
  const { user, verifySession } = useSession();

  const getProfileHandler = useCallback(async () => {
    setIsLoading(true);

    const graduatedFetched = await verifySession(
      profileService.getProfile,
      getProfileHandler
    );
    if (graduatedFetched.error) {
      setGraduated(graduatedFetched);
      setIsLoading(false);
      return;
    }

    if (!graduatedFetched.id) {
      setIsLoading(false);
      return;
    }

    const { idioma_extranjero, ...rest } = graduatedFetched;

    const { fecha_egreso } = graduatedFetched;

    const splitFecha_egreso = fecha_egreso.split(" ");

    const graduationDateLikeText = {
      egreso_año: splitFecha_egreso[2],
      egreso_mes: splitFecha_egreso[0],
    };

    setGraduated({ ...graduationDateLikeText, ...rest });
    setIdiomaExtranjero(idioma_extranjero);
    setIsLoading(false);
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

    profile.fecha_egreso = profile.egreso_mes + " de " + profile.egreso_año;

    delete profile.egreso_año;
    delete profile.egreso_mes;

    const tLoading = toast.loading("Guardando...");
    const results = await verifySession(() =>
      profileService.saveOrUpdateProfile(profile)
    );

    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    toast.success(results.statusText, { id: tLoading });

    getProfileHandler();
    if (results.statusText === "Perfil creado correctamente.") {
      getCurriculumHandler();
      setCurrentSelection("Curriculum");
      toast("Puedes subir tu currículum ahora para poder postularte.");
    }
  };

  useEffect(() => {
    getProfileHandler();
  }, [getProfileHandler]);

  useEffect(() => {
    setGraduated({ ...graduated, ["correo"]: user.correo });
  }, [user]);

  if (graduated.error) {
    return <ErrorDisplayer message={graduated.message} />;
  }
  return (
    <div>
      <div className="d-flex justify-content-center mb-3">
        {graduated?.id && (
          <div className="btn-group" role="group">
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
              Currículum
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <Loading />
      ) : currentSelection === "Profile" ? (
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
