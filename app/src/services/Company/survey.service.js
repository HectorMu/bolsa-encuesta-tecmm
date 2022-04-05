import API from "../API";
import helpers from "@/helpers/helpers";

const getSurveySections = async () => {
  try {
    const response = await fetch(
      `${API}//company/survey/sections`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getSurveySection = async (section_id) => {
  try {
    const response = await fetch(
      `${API}/company/survey/sections/getone/${section_id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getSectionQuestions = async (section_id) => {
  try {
    const response = await fetch(
      `${API}/company/survey/questions/section/${section_id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getAnswersBySection = async (section_id) => {
  try {
    const response = await fetch(
      `${API}/company/survey/section/${section_id}/answers`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getP6Answers = async () => {
  try {
    const response = await fetch(
      `${API}/company/survey/seccionb/getp6answers`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const saveSectionb = async (answers) => {
  try {
    const response = await fetch(
      `${API}/company/survey/sectionb`,
      helpers.authPostConfig(answers)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const saveP6DetailsSectionb = async (answers) => {
  try {
    const response = await fetch(
      `${API}/company/survey/sectionb/p6details`,
      helpers.authPostConfig(answers)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const saveSectionc = async (answers) => {
  try {
    const response = await fetch(
      `${API}/company/survey/sectionc`,
      helpers.authPostConfig(answers)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default {
  getSurveySections,
  getSurveySection,
  getSectionQuestions,
  getAnswersBySection,
  getP6Answers,
  saveSectionb,
  saveP6DetailsSectionb,
  saveSectionc,
};