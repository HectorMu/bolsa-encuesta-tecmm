import { lazy } from "react";
// import Instructions from "@/pages/Graduated/Survey/Instructions";
// import Survey from "@/pages/Graduated/Survey/Survey";
// import IsGraduated from "@/components/Authentication/IsGraduated";

const Instructions = lazy(() =>
  import("@/pages/Graduated/Survey/Instructions")
);
const Survey = lazy(() => import("@/pages/Graduated/Survey/Survey"));
const IsGraduated = lazy(() =>
  import("@/components/Authentication/IsGraduated")
);

const Routes = [
  {
    path: "/graduated/survey",
    element: <IsGraduated view={Instructions} />,
  },
  {
    path: "/graduated/survey/section/:section_id",
    element: <IsGraduated view={Survey} />,
  },
];

export default Routes;
