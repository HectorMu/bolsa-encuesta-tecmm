import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import FormCard from "@/components/Global/FormCard";
import RegisterForm from "@/components/Company/RegisterForm";
import useSession from "@/hooks/useSession";

import { Entries } from "@/components/Company/RegisterForm";

import profileService from "@/services/Company/profile.service";

const Company = () => {
  const [company, setCompany] = useState(Entries);
  const [onEditing] = useState(true);
  const [onChangePassword, toggleChangePassword] = useState(false);
  const { user } = useSession();

  const handleEntriesChange = (key, value) =>
    setCompany({ ...company, [key]: value });

  const getProfileHandler = useCallback(async () => {
    const companyFetched = await profileService.getProfile();
    console.log(companyFetched);
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
    setCompany({ ...company, ["correo"]: user.correo });
  }, [user]);

  return (
    <FormCard title={"Mi perfil"}>
      <RegisterForm
        handleSubmit={handleSubmit}
        company={company}
        onEditing={onEditing}
        onChangePassword={onChangePassword}
        handleEntriesChange={handleEntriesChange}
        toggleChangePassword={toggleChangePassword}
      />
    </FormCard>
  );
};

export default Company;
