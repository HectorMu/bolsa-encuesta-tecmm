import { API } from "../API";
import helpers from "../../helpers/helpers";

const List = async () => {
  try {
    const response = await fetch(
      `${API}/users/getall`,
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
      `${API}/users/getone/${id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const Save = async (user) => {
  try {
    const response = await fetch(
      `${API}/users/save`,
      helpers.authPostConfig(user)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const Update = async (user, id) => {
  try {
    const response = await fetch(
      `${API}/users/update/${id}`,
      helpers.authPutConfig(user)
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
      `${API}/users/delete/${id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

export default { List, GetOne, Save, Update, Delete };
