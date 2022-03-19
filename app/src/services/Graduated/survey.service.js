import API from "../API";
import helpers from "../../helpers/helpers";

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

export default { getSectionQuestions, getSurveySections, getSurveySection };
