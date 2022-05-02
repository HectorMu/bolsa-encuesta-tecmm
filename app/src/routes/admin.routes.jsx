import IsAdmin from "../components/Authentication/IsAdmin";

//Rutas para el control de cuentas (Agregar las que falten/se necesiten)

import Accounts from "../pages/Admin/Accounts/Accounts";
import AddAccount from "../pages/Admin/Accounts/Add";
import EditAccount from "../pages/Admin/Accounts/Edit";

//Paginas para el control de empresas
import Companies from "../pages/Admin/Companies/Companies";
import AddCompany from "../pages/Admin/Companies/Add";
import EditCompany from "../pages/Admin/Companies/Edit";
import DetailsCompany from "../pages/Admin/Companies/Details";

//Paginas para el control de egresados
import Graduated from "../pages/Admin/Graduates/Graduates";
import AddGraduated from "../pages/Admin/Graduates/Add";
import EditGraduated from "../pages/Admin/Graduates/Edit";
import DetailsGraduated from "../pages/Admin/Graduates/Details";

import Jobs from "../pages/Admin/JobBank/Jobs";
import Postulations from "../pages/Admin/JobBank/Postulations";
import Reports from "../pages/Admin/Survey/Reports";

import VerifyQR from "@/pages/Admin/Survey/VerifyQR";

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
