import { API } from "../API";
import helpers from "../../helpers/helpers";

const verifyQRToken = async (token) => {
  try {
    const response = await fetch(
      `${API}/graduated/survey/verify-qr-token/${token}`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const checkIfSurveyIsAnswered = async () => {
  try {
    const response = await fetch(
      `${API}/graduated/survey/check-answered`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const getSurveySections = async () => {
  try {
    const response = await fetch(
      `${API}/graduated/survey/sections`,
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
      `${API}/graduated/survey/sections/getone/${section_id}`,
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
      `${API}/graduated/survey/questions/section/${section_id}`,
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
      `${API}/graduated/survey/section/${section_id}/answers`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const saveSection1 = async (answers) => {
  try {
    const response = await fetch(
      `${API}/graduated/survey/section1`,
      helpers.authPostConfig(answers)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const saveSection2 = async (answers) => {
  try {
    const response = await fetch(
      `${API}/graduated/survey/section2`,
      helpers.authPostConfig(answers)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};
const saveSection3 = async (answers) => {
  try {
    const response = await fetch(
      `${API}/graduated/survey/section3`,
      helpers.authPostConfig(answers)
    );
    return await response.json();
  } catch (error) {
    return helpers.ApiFetchError(error.message);
  }
};

const getSection3Others = async () => {
  try {
    const response = await fetch(
      `${API}/graduated/survey/section3/others-aspects/getall`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};
const saveSection3Other = async (aspect) => {
  try {
    const response = await fetch(
      `${API}/graduated/survey/section3/others-aspects/save`,
      helpers.authPostConfig(aspect)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};
const deleteSection3Other = async (aspect_id) => {
  try {
    const response = await fetch(
      `${API}/graduated/survey/section3/others-aspects/delete/${aspect_id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};
const saveSection4 = async (answers) => {
  try {
    const response = await fetch(
      `${API}/graduated/survey/section4`,
      helpers.authPostConfig(answers)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const saveSection5 = async (answers) => {
  try {
    const response = await fetch(
      `${API}/graduated/survey/section5`,
      helpers.authPostConfig(answers)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};
const saveSection6 = async (answers) => {
  try {
    const response = await fetch(
      `${API}/graduated/survey/section6`,
      helpers.authPostConfig(answers)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};
export default {
  verifyQRToken,
  checkIfSurveyIsAnswered,
  getSectionQuestions,
  getSurveySections,
  getSurveySection,
  saveSection1,
  saveSection2,
  saveSection3,
  saveSection3Other,
  getSection3Others,
  deleteSection3Other,
  saveSection4,
  saveSection5,
  saveSection6,
  getAnswersBySection,
};
