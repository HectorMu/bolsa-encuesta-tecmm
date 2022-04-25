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
    return helpers.ApiFetchError(error.message);
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
    return helpers.ApiFetchError(error.message);
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
    return helpers.ApiFetchError(error.message);
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
    return helpers.ApiFetchError(error.message);
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
    return helpers.ApiFetchError(error.message);
  }
};

const deleteP6Answer = async (id) => {
  try {
    const response = await fetch(
      `${API}/company/survey/sectionb/p6details/delete/${id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
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
    return helpers.ApiFetchError(error.message);
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
    return helpers.ApiFetchError(error.message);
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
    return helpers.ApiFetchError(error.message);
  }
};

export default {
  getSurveySections,
  getSurveySection,
  getSectionQuestions,
  getAnswersBySection,
  getP6Answers,
  deleteP6Answer,
  saveSectionb,
  saveP6DetailsSectionb,
  saveSectionc,
};
