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

const JobBank = lazy(() => import("@/pages/Graduated/JobBank/JobBank"));
const Postulations = lazy(() =>
  import("@/pages/Graduated/JobBank/Postulations")
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
  {
    path: "/graduated/jobbank/jobs",
    element: <IsGraduated view={JobBank} />,
  },
  {
    path: "/graduated/jobbank/jobs/:id",
    element: <IsGraduated view={JobBank} />,
  },
  {
    path: "/graduated/jobbank/postulations",
    element: <IsGraduated view={Postulations} />,
  },
  {
    path: "/graduated/jobbank/postulations/:id",
    element: <IsGraduated view={Postulations} />,
  },
];

export default Routes;
