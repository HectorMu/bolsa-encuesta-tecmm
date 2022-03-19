import Instructions from "../pages/Graduated/Survey/Instructions";
import Section1 from "../pages/Graduated/Survey/Section1";
import IsGraduated from "../components/Authentication/IsGraduated";

const Routes = [
  {
    path: "/graduated/survey",
    element: <IsGraduated view={Instructions} />,
  },
  {
    path: "/graduated/survey/section/:section_id",
    element: <IsGraduated view={Section1} />,
  },
];

export default Routes;
