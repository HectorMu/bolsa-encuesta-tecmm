import Instructions from "@/pages/Graduated/Survey/Instructions";
import Survey from "@/pages/Graduated/Survey/Survey";
import IsGraduated from "@/components/Authentication/IsGraduated";

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
