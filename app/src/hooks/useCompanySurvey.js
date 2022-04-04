import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import surveyService from "@/services/Company/survey.service";

const useCompanySurvey = () => {
  const [section, setSection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userSectionAnswers, setUserSectionAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [userP6Answers, setP6Answers] = useState([]);
  const params = useParams();

  const getUserAnswersHandler = useCallback(async () => {
    const fetchedAnswers = await surveyService.getAnswersBySection(
      params.section_id
    );
    setUserSectionAnswers(fetchedAnswers);
  }, [params.section_id]);

  const getP6AnswersHandler = useCallback(async () => {
    const fetchedP6Answers = await surveyService.getP6Answers();
    setP6Answers(fetchedP6Answers);
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
    getP6AnswersHandler();
  }, [
    getQuestionsHandler,
    getUserAnswersHandler,
    getSectionHandler,
    getP6AnswersHandler,
  ]);

  return {
    section,
    questions,
    isLoading,
    userSectionAnswers,
    userP6Answers,
  };
};

export default useCompanySurvey;
