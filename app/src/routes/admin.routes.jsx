import IsAdmin from "../components/Authentication/IsAdmin";

//Rutas para el control de cuentas (Agregar las que falten/se necesiten)
import Accounts from "../pages/Admin/Accounts/Accounts";
import AddAccount from "../pages/Admin/Accounts/Add";
import EditAccount from "../pages/Admin/Accounts/Edit";
import DetailsAccount from "../pages/Admin/Accounts/Details";
//Rutas para el control de empresas
import Companies from "../pages/Admin/Companies/Companies";
import AddCompany from "../pages/Admin/Companies/Add";
import EditCompany from "../pages/Admin/Companies/Edit";
import DetailsCompany from "../pages/Admin/Companies/Details";
//Rutas para el control de egresados
import Graduated from "../pages/Admin/Graduated/Graduated";
import AddGraduated from "../pages/Admin/Graduated/Add";
import EditGraduated from "../pages/Admin/Graduated/Edit";
import DetailsGraduated from "../pages/Admin/Graduated/Details";

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
    path: "/accounts/details/:id",
    element: <IsAdmin view={DetailsAccount} />,
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
];

export default Routes;
