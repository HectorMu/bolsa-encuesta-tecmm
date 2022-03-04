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

export default graduated;
