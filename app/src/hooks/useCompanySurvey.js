import { useEffect, useState, useCallback } from "react";
import useRouterHooks from "./useRouterHooks";
import surveyService from "@/services/Company/survey.service";
import profileService from "@/services/Company/profile.service";
import toast from "react-hot-toast";

const useCompanySurvey = () => {
  const [section, setSection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userSectionAnswers, setUserSectionAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { params, navigate } = useRouterHooks();

  const checkIfHasProfileHandler = useCallback(async () => {
    const results = await profileService.getProfile();
    if (!results.id) {
      navigate("/profile");
      toast(
        "Antes de contestar la encuesta completa la informacion de tu perfil."
      );
      return;
    }
  }, [params.section_id]);

  const getUserAnswersHandler = useCallback(
    async (isCanceled) => {
      if (!isCanceled) {
        const fetchedAnswers = await surveyService.getAnswersBySection(
          params.section_id
        );
        setUserSectionAnswers(fetchedAnswers);
      }
    },
    [params.section_id]
  );

  const getQuestionsHandler = useCallback(
    async (isCanceled) => {
      if (!isCanceled) {
        setIsLoading(true);
        const fetchedQuestions = await surveyService.getSectionQuestions(
          params.section_id
        );
        setQuestions(fetchedQuestions);
      }
    },
    [params.section_id]
  );

  const getSectionHandler = useCallback(
    async (isCanceled) => {
      if (!isCanceled) {
        const fetchedSection = await surveyService.getSurveySection(
          params.section_id
        );
        setSection(fetchedSection);
        setIsLoading(false);
      }
    },
    [params.section_id]
  );

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
    questions,
    isLoading,
    userSectionAnswers,
  };
};

export default useCompanySurvey;
