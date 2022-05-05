import { useState, createContext, useEffect, useCallback } from "react";
import useSession from "@/hooks/useSession";
import Auth from "@/services/Auth";
import profileService from "@/services/Graduated/profile.service";

export const Curriculum = createContext();

function CurriculumProvider({ children }) {
  const { user } = useSession();
  const [loadingCurriculum, setLoadingCurriculum] = useState(false);

  const [graduatedCurriculum, setGraduatedCurriculum] = useState("");

  const getCurriculumHandler = useCallback(async () => {
    if (user === null) return;
    if (user.fk_rol !== 2) return;

    setLoadingCurriculum(true);
    const fetchedCurriculum = await profileService.getCurriculum();
    if (fetchedCurriculum === "Pendiente") {
      setGraduatedCurriculum("Pendiente");
      return;
    }

    const CVpath = await Auth.getResourcesFromPublicFolder(
      `graduated/files/cvs/${fetchedCurriculum}`
    );

    setGraduatedCurriculum(CVpath);
    setLoadingCurriculum(false);
  }, [user, profileService.getCurriculum]);

  useEffect(() => {
    getCurriculumHandler();
  }, [getCurriculumHandler]);

  return (
    <Curriculum.Provider
      value={{ graduatedCurriculum, loadingCurriculum, getCurriculumHandler }}
    >
      {children}
    </Curriculum.Provider>
  );
}
export default CurriculumProvider;
