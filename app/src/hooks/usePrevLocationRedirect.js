import { useEffect } from "react";
import useRouterHooks from "./useRouterHooks";

const USER_ROLES = {
  ADMIN: 1,
  GRADUATED: 2,
  COMPANY: 3,
};

const usePrevLocationRedirect = (user) => {
  const { navigate, location } = useRouterHooks();

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
    return () => {
      const prevLocation = location.state?.prevLocation;

      if (prevLocation) {
        if (user?.fk_rol === USER_ROLES.ADMIN) {
          if (prevLocation.includes("graduated")) return navigate("/");

          if (prevLocation.includes("company")) return navigate("/");

          if (prevLocation.includes("/survey/verify"))
            return navigate(prevLocation);

          navigate(prevLocation);
        }
        if (user?.fk_rol === USER_ROLES.GRADUATED) {
          if (!prevLocation.includes("graduated")) return navigate("/");

          navigate(prevLocation);
        }
        if (user?.fk_rol === USER_ROLES.COMPANY) {
          if (!prevLocation.includes("company")) return navigate("/");

          navigate(prevLocation);
        }
      }
    };
  }, [user, location.state]);
};

export default usePrevLocationRedirect;
