import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

//Importando componentes
import FormCard from "@/components/Global/FormCard";
import RegisterForm from "@/components/Company/RegisterForm";
import { Entries } from "@/components/Company/RegisterForm";
import Loading from "@/components/Global/Loading";

//Importando hooks
import useSession from "@/hooks/useSession";
import useForm from "@/hooks/useForm";

//Importando servicios
import profileService from "@/services/Company/profile.service";

const Company = () => {
  const { form: company, setForm: setCompany, handleChange } = useForm(Entries);
  const [onEditing] = useState(true);
  const [onChangePassword, toggleChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, verifySession, setUser } = useSession();

  const getProfileHandler = useCallback(async () => {
    setIsLoading(true);
    const companyFetched = await verifySession(
      profileService.getProfile,
      getProfileHandler
    );
    if (!companyFetched.id) {
      setIsLoading(false);
      return;
    }
    setCompany(companyFetched);
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!onChangePassword) {
      delete company.clave;
      delete company.confirmar;
    }

    const tLoading = toast.loading("Guardando...");

    const results = await verifySession(() =>
      profileService.saveOrUpdateProfile(company)
    );
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    setUser({ ...user, correo: company.correo });
    toast.success(results.statusText, { id: tLoading });
    getProfileHandler();
  };

  useEffect(() => {
    getProfileHandler();
  }, [getProfileHandler]);

  useEffect(() => {
    setCompany({ ...company, ["correo"]: user.correo });
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

export default Company;
