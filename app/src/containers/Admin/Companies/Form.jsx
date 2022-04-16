import { useCallback, useEffect, useState } from "react";
//importando hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useForm from "@/hooks/useForm";

import FormCard from "@/components/Global/FormCard";
import { Entries } from "@/components/Company/RegisterForm";
import RegisterForm from "@/components/Company/RegisterForm";

//Importando servicios
import companiesService from "@/services/Admin/companies.service";
import toast from "react-hot-toast";

const Form = () => {
  const { form: company, setForm: setCompany, handleChange } = useForm(Entries);
  const [onEditing, toggleEditing] = useState(false);
  const [onChangePassword, toggleChangePassword] = useState(false);
  const { location, navigate, params } = useRouterHooks();

  const getCompanyFromFetch = useCallback(async () => {
    const companyFetched = await companiesService.GetOne(params.id);

    if (!companyFetched.id) {
      navigate("/companies");
      toast.error("Este registro no existe.");
      return;
    }
    setCompany(companyFetched);
  }, [params.id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onEditing) {
      const results = await companiesService.Update(company, params.id);
      if (!results.status) {
        return toast.error(results.statusText);
      }
      toast.success("Empresa editada correctamente");
      navigate("/companies");
    } else {
      const results = await companiesService.Save(company);
      if (!results.status) {
        return toast.error(results.statusText);
      }
      toast.success("Empresa registrada correctamente");
      navigate("/companies");
    }
  };

  useEffect(() => {
    if (location.state !== null) {
      setCompany(location.state);
    }
    if (location.pathname.includes("edit")) {
      getCompanyFromFetch();
      toggleEditing(true);
      return;
    }
    toggleChangePassword(true);
    toggleEditing(false);
  }, [location.pathname, getCompanyFromFetch, location.state]);

  return (
    <FormCard title={onEditing ? "Editar empresa" : "Registrar empresa"}>
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

export default Form;
