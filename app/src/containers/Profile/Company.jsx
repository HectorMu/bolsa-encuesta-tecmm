import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

//Importando componentes
import FormCard from "@/components/Global/FormCard";
import RegisterForm from "@/components/Company/RegisterForm";
import { Entries } from "@/components/Company/RegisterForm";

//Importando hooks
import useSession from "@/hooks/useSession";
import useForm from "@/hooks/useForm";

//Importando servicios
import profileService from "@/services/Company/profile.service";

const Company = () => {
  const { form: company, setForm: setCompany, handleChange } = useForm(Entries);
  const [onEditing] = useState(true);
  const [onChangePassword, toggleChangePassword] = useState(false);
  const { user, verifySession } = useSession();

  const getProfileHandler = useCallback(async () => {
    const companyFetched = await verifySession(() =>
      profileService.getProfile()
    );
    if (!companyFetched.id) return;

    setCompany(companyFetched);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profile = {
      ...company,
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
    setCompany({ ...company, ["correo"]: user.correo });
  }, [user]);

  return (
    <FormCard title={"Mi perfil"}>
      <RegisterForm
        handleSubmit={handleSubmit}
        company={company}
        onEditing={onEditing}
        onChangePassword={onChangePassword}
        handleChange={handleChange}
        toggleChangePassword={toggleChangePassword}
      />
    </FormCard>
  );
};

export default Company;
