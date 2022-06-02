import { lazy } from "react";

const IsCompany = lazy(() => import("@/components/Authentication/IsCompany"));
const JobBank = lazy(() => import("@/pages/Company/JobBank/JobBank"));
const AddJob = lazy(() => import("@/pages/Company/JobBank/Add"));
const EditJob = lazy(() => import("@/pages/Company/JobBank/Edit"));
const Survey = lazy(() => import("@/pages/Company/Survey/Survey"));
const Postulations = lazy(() => import("@/pages/Company/JobBank/Postulations"));
const Instructions = lazy(() => import("@/pages/Company/Survey/Instructions"));

const Routes = [
  {
    path: "/company/jobbank",
    element: <IsCompany view={JobBank} />,
  },
  {
    path: "/company/jobbank/add",
    element: <IsCompany view={AddJob} />,
  },
  {
    path: "/company/jobbank/edit/:id",
    element: <IsCompany view={EditJob} />,
  },
  {
    path: "/company/jobbank/postulations/:job_id",
    element: <IsCompany view={Postulations} />,
  },
  {
    path: "/company/jobbank/postulations/:job_id/:postulation_id",
    element: <IsCompany view={Postulations} />,
  },
  {
    path: "/company/survey",
    element: <IsCompany view={Instructions} />,
  },
  {
    path: "/company/survey/section/:section_id",
    element: <IsCompany view={Survey} />,
  },
];

export default Routes;
