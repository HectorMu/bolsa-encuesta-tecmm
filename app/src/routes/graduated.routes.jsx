import Instructions from "@/pages/Graduated/Survey/Instructions";
import Survey from "@/pages/Graduated/Survey/Survey";
import IsGraduated from "@/components/Authentication/IsGraduated";
import JobBank from "@/pages/Graduated/JobBank/JobBank";

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
    path: "/graduated/jobbank",
    element: <IsGraduated view={JobBank} />,
  },
  {
    path: "/graduated/jobbank/job/:id",
    element: <IsGraduated view={JobBank} />,
  },
];

export default Routes;
