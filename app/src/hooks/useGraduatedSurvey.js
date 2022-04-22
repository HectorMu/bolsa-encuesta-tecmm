import { useEffect, useState, useCallback } from "react";
import useRouterHooks from "./useRouterHooks";
import useSession from "./useSession";
import surveyService from "@/services/Graduated/survey.service";
import profileService from "@/services/Graduated/profile.service";
import toast from "react-hot-toast";

const useGraduatedSurvey = () => {
  const [section, setSection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userSectionAnswers, setUserSectionAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { params, navigate } = useRouterHooks();
  const { verifySession } = useSession();

  const getSectionHandler = useCallback(
    async (isCanceled) => {
      if (!isCanceled) {
        setIsLoading(true);
        const fetchedSection = await verifySession(
          () => surveyService.getSurveySection(params.section_id),
          getSectionHandler
        );
        setSection(fetchedSection);
      }
    },
    [params.section_id, verifySession]
  );

  const getQuestionsHandler = useCallback(
    async (isCanceled) => {
      if (!isCanceled) {
        const fetchedQuestions = await verifySession(
          () => surveyService.getSectionQuestions(params.section_id),
          getQuestionsHandler
        );
        setQuestions(fetchedQuestions);
      }
    },
    [params.section_id, verifySession]
  );

  const getUserAnswersHandler = useCallback(
    async (isCanceled) => {
      if (!isCanceled) {
        const fetchedAnswers = await verifySession(
          () => surveyService.getAnswersBySection(params.section_id),
          getUserAnswersHandler
        );
        setUserSectionAnswers(fetchedAnswers);
        setIsLoading(false);
      }
    },
    [params.section_id, verifySession]
  );
  const checkIfHasProfileHandler = useCallback(async () => {
    const results = await verifySession(() => profileService.getProfile());
    if (!results.id) {
      navigate("/profile");
      toast(
        "Antes de contestar la encuesta completa la informacion de tu perfil."
      );
      return;
    }
  }, [params.section_id]);

  useEffect(() => {
    let isCanceled = false;
    getSectionHandler(isCanceled);
    getQuestionsHandler(isCanceled);
    getUserAnswersHandler(isCanceled);
    checkIfHasProfileHandler(isCanceled);
    return () => {
      isCanceled = true;
    };
  }, [
    getQuestionsHandler,
    getUserAnswersHandler,
    getSectionHandler,
    checkIfHasProfileHandler,
  ]);

  return {
    section,
    userSectionAnswers,
    questions,
    isLoading,
  };
};

export default useGraduatedSurvey;
