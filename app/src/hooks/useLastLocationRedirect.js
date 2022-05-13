import { useEffect } from "react";
import useRouterHooks from "./useRouterHooks";
import useSession from "./useSession";

const USER_ROLES = {
  ADMIN: 1,
  GRADUATED: 2,
  COMPANY: 3,
};

const useLastLocationRedirect = () => {
  const { navigate } = useRouterHooks();
  const { user } = useSession();
  useEffect(() => {
    const lastLocationOnClose = window.localStorage.getItem(
      "TECBE_beforeCloseLocation"
    );
    if (lastLocationOnClose.length > 0) {
      if (user?.fk_rol === USER_ROLES.ADMIN) {
        if (lastLocationOnClose.includes("graduated")) return navigate("/");

        if (lastLocationOnClose.includes("company")) return navigate("/");

        if (lastLocationOnClose.includes("/survey/verify"))
          return navigate(lastLocationOnClose);

        navigate(lastLocationOnClose);
      }
      if (user?.fk_rol === USER_ROLES.GRADUATED) {
        if (!lastLocationOnClose.includes("graduated")) return navigate("/");

        navigate(lastLocationOnClose);
      }
      if (user?.fk_rol === USER_ROLES.COMPANY) {
        if (!lastLocationOnClose.includes("company")) return navigate("/");

        navigate(lastLocationOnClose);
      }
    }
  }, [user]);
};

export default useLastLocationRedirect;
