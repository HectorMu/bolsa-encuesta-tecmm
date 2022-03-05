import API from "../config/API";
import helpers from "../helpers/helpers";

const graduated = {};

graduated.List = async () => {
  try {
    const response = await fetch(
      `${API}/users/graduated/getall`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

graduated.Save = async (graduated) => {
  try {
    const response = await fetch(
      `${API}/users/graduated/save`,
      helpers.authPostConfig(graduated)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

graduated.Update = async (graduated, id) => {
  try {
    const response = await fetch(
      `${API}/users/graduated/update/${id}`,
      graduated,
      helpers.authPutConfig(graduated)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

graduated.Delete = async (id) => {
  try {
    const response = await fetch(
      `${API}/users/graduated/delete/${id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default graduated;
