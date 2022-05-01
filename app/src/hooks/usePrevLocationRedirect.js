import { useEffect } from "react";
import AdminRoutes from "@/routes/admin.routes";
import GraduatedRoutes from "@/routes/graduated.routes";
import CompanyRoutes from "@/routes/company.routes";
import useRouterHooks from "./useRouterHooks";

const usePrevLocationRedirect = (user) => {
  const { navigate, location } = useRouterHooks();

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
    return () => {
      const prevLocation = location.state?.prevLocation;

      if (prevLocation) {
        if (user?.fk_rol === 1) {
          const hasAccess = AdminRoutes.filter((route) =>
            route.path.includes(
              prevLocation.includes("edit") ||
                prevLocation.includes("postulations") ||
                prevLocation.includes("details")
                ? prevLocation.substring(
                    0,
                    prevLocation.length -
                      prevLocation.split("/")[
                        prevLocation.split("/").length - 1
                      ].length
                  )
                : prevLocation
            )
          );
          if (hasAccess.length > 0) {
            return navigate(prevLocation);
          }
        }
        if (user?.fk_rol === 2) {
          const hasAccess = GraduatedRoutes.filter((route) =>
            route.path.includes(
              prevLocation.includes("section") ||
                prevLocation.includes("jobs") ||
                prevLocation.includes("graduated/jobbank/postulations")
                ? prevLocation.substring(
                    0,
                    prevLocation.length -
                      prevLocation.split("/")[
                        prevLocation.split("/").length - 1
                      ].length
                  )
                : prevLocation
            )
          );
          if (hasAccess.length > 0) {
            return navigate(prevLocation);
          }
        }
        if (user?.fk_rol === 3) {
          const hasAccess = CompanyRoutes.filter((route) =>
            route.path.includes(
              prevLocation.includes("edit") ||
                prevLocation.includes("section") ||
                prevLocation.includes("company/jobbank/postulations")
                ? prevLocation.substring(
                    0,
                    prevLocation.length -
                      prevLocation.split("/")[
                        prevLocation.split("/").length - 1
                      ].length
                  )
                : prevLocation
            )
          );
          if (hasAccess.length > 0) {
            return navigate(prevLocation);
          }
        }
      }
    };
  }, [user, location.state]);
};

export default usePrevLocationRedirect;
