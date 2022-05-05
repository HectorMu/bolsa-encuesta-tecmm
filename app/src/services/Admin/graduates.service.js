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

export default { List, GetOne, Save, Update, Delete };
