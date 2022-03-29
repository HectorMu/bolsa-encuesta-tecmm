import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import surveyService from "@/services/Graduated/survey.service";

const useGraduatedSurvey = () => {
  const [section, setSection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userSectionAnswers, setUserSectionAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const params = useParams();

  const getUserAnswersHandler = useCallback(async () => {
    const fetchedAnswers = await surveyService.getAnswersBySection(
      params.section_id
    );
    setUserSectionAnswers(fetchedAnswers);
  }, [params.section_id]);

  const getQuestionsHandler = useCallback(async () => {
    setIsLoading(true);
    const fetchedQuestions = await surveyService.getSectionQuestions(
      params.section_id
    );
    setQuestions(fetchedQuestions);
  }, [params.section_id]);

  const getSectionHandler = useCallback(async () => {
    const fetchedSection = await surveyService.getSurveySection(
      params.section_id
    );
    setSection(fetchedSection);
    setIsLoading(false);
  }, [params.section_id]);

  useEffect(() => {
    getSectionHandler();
    getQuestionsHandler();
    getUserAnswersHandler();
  }, [getQuestionsHandler, getUserAnswersHandler, getSectionHandler]);

  return {
    section,
    userSectionAnswers,
    questions,
    isLoading,
  };
};

export default useGraduatedSurvey;
