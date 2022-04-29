import { lazy } from "react";
import IsAdmin from "../components/Authentication/IsAdmin";

//Rutas para el control de cuentas (Agregar las que falten/se necesiten)

//import Accounts from "../pages/Admin/Accounts/Accounts";
// import AddAccount from "../pages/Admin/Accounts/Add";
// import EditAccount from "../pages/Admin/Accounts/Edit";

const Accounts = lazy(() => import("../pages/Admin/Accounts/Accounts"));
const AddAccount = lazy(() => import("../pages/Admin/Accounts/Add"));
const EditAccount = lazy(() => import("../pages/Admin/Accounts/Edit"));

//Paginas para el control de empresas
// import Companies from "../pages/Admin/Companies/Companies";
// import AddCompany from "../pages/Admin/Companies/Add";
// import EditCompany from "../pages/Admin/Companies/Edit";
// import DetailsCompany from "../pages/Admin/Companies/Details";

const Companies = lazy(() => import("../pages/Admin/Companies/Companies"));
const AddCompany = lazy(() => import("../pages/Admin/Companies/Add"));
const EditCompany = lazy(() => import("../pages/Admin/Companies/Edit"));
const DetailsCompany = lazy(() => import("../pages/Admin/Companies/Details"));

//Paginas para el control de egresados
// import Graduated from "../pages/Admin/Graduated/Graduated";
// import AddGraduated from "../pages/Admin/Graduated/Add";
// import EditGraduated from "../pages/Admin/Graduated/Edit";
// import DetailsGraduated from "../pages/Admin/Graduated/Details";

const Graduated = lazy(() => import("../pages/Admin/Graduated/Graduated"));
const AddGraduated = lazy(() => import("../pages/Admin/Graduated/Add"));
const EditGraduated = lazy(() => import("../pages/Admin/Graduated/Edit"));
const DetailsGraduated = lazy(() => import("../pages/Admin/Graduated/Details"));

const Jobs = lazy(() => import("../pages/Admin/JobBank/Jobs"));
const Postulations = lazy(() => import("../pages/Admin/JobBank/Postulations"));

const GraduateSurveys = lazy(() =>
  import("../pages/Admin/SurveyReports/Graduated/GraduateSurveys")
);
const CompanySurveys = lazy(() =>
  import("../pages/Admin/SurveyReports/Companies/CompaniesSurveys")
);

const Routes = [
  {
    path: "/accounts",
    element: <IsAdmin view={Accounts} />,
  },
  {
    path: "/accounts/add",
    element: <IsAdmin view={AddAccount} />,
  },
  {
    path: "/accounts/edit/:id",
    element: <IsAdmin view={EditAccount} />,
  },

  {
    path: "/companies",
    element: <IsAdmin view={Companies} />,
  },
  {
    path: "/companies/add",
    element: <IsAdmin view={AddCompany} />,
  },
  {
    path: "/companies/edit/:id",
    element: <IsAdmin view={EditCompany} />,
  },
  {
    path: "/companies/details/:id",
    element: <IsAdmin view={DetailsCompany} />,
  },
  {
    path: "/graduated",
    element: <IsAdmin view={Graduated} />,
  },
  {
    path: "/graduated/add",
    element: <IsAdmin view={AddGraduated} />,
  },
  {
    path: "/graduated/edit/:id",
    element: <IsAdmin view={EditGraduated} />,
  },
  {
    path: "/graduated/details/:id",
    element: <IsAdmin view={DetailsGraduated} />,
  },
  {
    path: "/jobbank",
    element: <IsAdmin view={Jobs} />,
  },
  {
    path: "/jobbank/postulations/:job_id/",
    element: <IsAdmin view={Postulations} />,
  },
  {
    path: "/jobbank/postulations/:job_id/:postulation_id",
    element: <IsAdmin view={Postulations} />,
  },
  {
    path: "/survey/graduates/report",
    element: <IsAdmin view={GraduateSurveys} />,
  },
  {
    path: "/survey/companies/report",
    element: <IsAdmin view={CompanySurveys} />,
  },
];

export default Routes;
