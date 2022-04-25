import { useContext } from "react";
import { Curriculum } from "@/context/CurriculumProvider";

const useGraduatedCurriculum = () => {
  return useContext(Curriculum);
};

export default useGraduatedCurriculum;
