import { useEffect, useState, useCallback } from "react";
import SurveyStatus from "@/containers/Admin/Graduated/SurveyStatus";
import CurrentPostulations from "@/containers/Admin/Graduated/CurrentPostulations";
import Showcase from "@/containers/Admin/Graduated/Showcase";

//Alerts
import toast from "react-hot-toast";

//custom hooks
import useRouterHooks from "@/hooks/useRouterHooks";
import useSession from "@/hooks/useSession";

//Servicios
import graduatesService from "@/services/Admin/graduates.service";
import Curriculum from "@/containers/Admin/Graduated/Curriculum";

const Details = () => {
  const [graduated, setGraduated] = useState({});
  const { verifySession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { params, navigate, location } = useRouterHooks();

  const getGraduatedHandler = useCallback(async () => {
    setIsLoading(true);
    const graduatedFetched = await verifySession(
      () => graduatesService.GetOne(params.id),
      getGraduatedHandler
    );
    if (graduatedFetched?.error) {
      setGraduated(graduatedFetched);
      setIsLoading(false);
      return;
    }
    if (!graduatedFetched.id) {
      if (location.state.prevLocation === "/accounts/") {
        toast.error("Este egresado aun no cuenta con un perfil");
        navigate("/accounts");
        setIsLoading(false);
        return;
      }
      toast.error("Este registro no existe");
      navigate("/graduated");
      setIsLoading(false);
      return;
    }
    setGraduated(graduatedFetched);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    getGraduatedHandler();
  }, [getGraduatedHandler]);

  return (
    <>
      <Showcase graduated={graduated} isLoading={isLoading} />
      <SurveyStatus graduated={graduated} />
      <Curriculum graduated={graduated} isLoading={isLoading} />
      <CurrentPostulations graduated={graduated} />
    </>
  );
};

export default Details;
