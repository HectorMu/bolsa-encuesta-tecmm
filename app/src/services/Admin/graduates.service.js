import { API } from "../API";
import helpers from "../../helpers/helpers";

const List = async () => {
  try {
    const response = await fetch(
      `${API}/users/graduated/getall`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const GetOne = async (id) => {
  try {
    const response = await fetch(
      `${API}/users/graduated/getone/${id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const Save = async (graduated) => {
  try {
    const response = await fetch(
      `${API}/users/graduated/save`,
      helpers.authPostConfig(graduated)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};
const Update = async (graduated, id) => {
  try {
    const response = await fetch(
      `${API}/users/graduated/update/${id}`,
      helpers.authPutConfig(graduated)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const Delete = async (id) => {
  try {
    const response = await fetch(
      `${API}/users/graduated/delete/${id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const checkIfAnsweredSurvey = async (id) => {
  try {
    const response = await fetch(
      `${API}/users/graduated/check-survey/${id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const notifyAnswerSurvey = async (email, notification_type) => {
  try {
    const response = await fetch(
      `${API}/users/graduated/notify-survey/${notification_type}`,
      helpers.authPostConfig({ email })
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const notifyCheckCV = async (payload) => {
  try {
    const response = await fetch(
      `${API}/users/graduated/notify-cv`,
      helpers.authPostConfig(payload)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const getPostulations = async (id) => {
  try {
    const response = await fetch(
      `${API}/users/graduated/get-postulations/${id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

export default {
  List,
  GetOne,
  Save,
  Update,
  Delete,
  checkIfAnsweredSurvey,
  notifyAnswerSurvey,
  notifyCheckCV,
  getPostulations,
};
