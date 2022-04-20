import API from "../API";
import helpers from "../../helpers/helpers";

const verifyQRToken = async (token) => {
  try {
    const response = await fetch(
      `${API}/graduated/survey/verify-qr-token/${token}`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
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
    return { status: false, error };
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
    console.log(error);
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
  saveSection4,
  saveSection5,
  saveSection6,
  getAnswersBySection,
};
