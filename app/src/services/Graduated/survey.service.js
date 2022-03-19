import API from "../API";
import helpers from "../../helpers/helpers";

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

export default { getSectionQuestions };
