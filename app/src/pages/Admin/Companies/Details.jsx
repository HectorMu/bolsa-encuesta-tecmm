import { useEffect, useState, useCallback } from "react";

//custom hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";

//components
import Showcase from "@/containers/Admin/Companies/Showcase";
import CurrentVacants from "@/containers/Admin/Companies/CurrentVacants";
import SurveyStatus from "@/containers/Admin/Companies/SurveyStatus";

//Servicios
import companiesService from "@/services/Admin/companies.service";

const Details = () => {
  const [company, setCompany] = useState({});
  const { verifySession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { params, navigate, location } = useRouterHooks();

  const getCompanyDetails = useCallback(async () => {
    setIsLoading(true);
    const fetchedCompany = await verifySession(
      () => companiesService.GetOne(params.id),
      getCompanyDetails
    );

    if (fetchedCompany?.error) {
      setCompany(fetchedCompany);
      setIsLoading(false);
      return;
    }
    if (!fetchedCompany.id) {
      if (location.state.prevLocation === "/accounts/") {
        toast.error("Esta empresa aun no cuenta con un perfil");
        navigate("/accounts");
        setIsLoading(false);
        return;
      }
      toast.error("No existe ese registro");
      navigate("/companies");
      setIsLoading(false);
      return;
    }
    setCompany(fetchedCompany);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    getCompanyDetails();
  }, [getCompanyDetails]);
  return (
    <>
      <Showcase company={company} isLoading={isLoading} />
      <SurveyStatus company={company} />
      <CurrentVacants company={company} />
    </>
  );
};

export default Details;
