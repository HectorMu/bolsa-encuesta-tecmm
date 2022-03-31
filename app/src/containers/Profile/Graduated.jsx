import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import FormCard from "@/components/Global/FormCard";
import RegisterForm from "@/components/Graduated/RegisterForm/RegisterForm";
import useSession from "@/hooks/useSession";

//Entradas del formulario, es un objeto con los datos a capturar el en formulario
import {
  Entries,
  NestedEntries,
} from "@/components/Graduated/RegisterForm/RegisterForm";
//importando json de las carreras

//importando servicios
import profileService from "@/services/Graduated/profile.service";

const Graduated = () => {
  const [graduated, setGraduated] = useState(Entries);
  const [idiomaExtranjero, setIdiomaExtranjero] = useState(
    NestedEntries.idioma_extranjero
  );
  const [onEditing] = useState(true);
  const [onChangePassword, toggleChangePassword] = useState(false);
  const { user } = useSession();

  const handleEntriesChange = (key, value) =>
    setGraduated({ ...graduated, [key]: value });

  const handleIdiomaExtranjeroChange = (key, value) => {
    setIdiomaExtranjero({ ...idiomaExtranjero, [key]: value });
  };

  const getProfileHandler = useCallback(async () => {
    const graduatedFetched = await profileService.getProfile();
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

    const results = await profileService.saveOrUpdateProfile(profile);
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
    setGraduated({ ...graduated, ["correo"]: user.correo });
  }, [user]);

  console.log(onChangePassword);
  return (
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
  );
};

export default Graduated;
