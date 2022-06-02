import { lazy } from "react";

const IsAdmin = lazy(() => import("../components/Authentication/IsAdmin"));

//Rutas para el control de cuentas (Agregar las que falten/se necesiten)

const Accounts = lazy(() => import("../pages/Admin/Accounts/Accounts"));
const AddAccount = lazy(() => import("../pages/Admin/Accounts/Add"));
const EditAccount = lazy(() => import("../pages/Admin/Accounts/Edit"));

//Paginas para el control de empresas
const Companies = lazy(() => import("../pages/Admin/Companies/Companies"));
const AddCompany = lazy(() => import("../pages/Admin/Companies/Add"));
const EditCompany = lazy(() => import("../pages/Admin/Companies/Edit"));
const DetailsCompany = lazy(() => import("../pages/Admin/Companies/Details"));

//Paginas para el control de egresados
const Graduated = lazy(() => import("../pages/Admin/Graduates/Graduates"));
const AddGraduated = lazy(() => import("../pages/Admin/Graduates/Add"));
const EditGraduated = lazy(() => import("../pages/Admin/Graduates/Edit"));
const DetailsGraduated = lazy(() => import("../pages/Admin/Graduates/Details"));

const Jobs = lazy(() => import("../pages/Admin/JobBank/Jobs"));
const Postulations = lazy(() => import("../pages/Admin/JobBank/Postulations"));
const Reports = lazy(() => import("../pages/Admin/Survey/Reports"));

const VerifyQR = lazy(() => import("@/pages/Admin/Survey/VerifyQR"));

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
    path: "/graduates",
    element: <IsAdmin view={Graduated} />,
  },
  {
    path: "/graduates/add",
    element: <IsAdmin view={AddGraduated} />,
  },
  {
    path: "/graduates/edit/:id",
    element: <IsAdmin view={EditGraduated} />,
  },
  {
    path: "/graduates/details/:id",
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
    path: "/surveys/reports",
    element: <IsAdmin view={Reports} />,
  },
  {
    path: "/survey/verify/:token",
    element: <IsAdmin view={VerifyQR} />,
  },
];

export default Routes;
