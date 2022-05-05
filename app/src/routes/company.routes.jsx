import IsCompany from "@/components/Authentication/IsCompany";
import JobBank from "@/pages/Company/JobBank/JobBank";
import AddJob from "@/pages/Company/JobBank/Add";
import EditJob from "@/pages/Company/JobBank/Edit";
import Survey from "@/pages/Company/Survey/Survey";
import Postulations from "@/pages/Company/JobBank/Postulations";
import Instructions from "@/pages/Company/Survey/Instructions";

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
