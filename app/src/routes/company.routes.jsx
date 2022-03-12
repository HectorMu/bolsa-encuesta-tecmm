import IsCompany from "../components/Authentication/IsCompany";
import JobBank from "../pages/Company/JobBank/JobBank";
import AddJob from "../pages/company/JobBank/Add";
import EditJob from "../pages/company/JobBank/Edit";
import Survey from "../pages/Company/Survey/Survey";

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
    path: "/company/survey",
    element: <IsCompany view={Survey} />,
  },
];

export default Routes;
