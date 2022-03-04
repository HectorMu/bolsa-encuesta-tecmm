import API from "../config/API";
import helpers from "../helpers/helpers";

const company = {};

company.List = async () => {
  try {
    const response = await fetch(
      `${API}/users/company/getall`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default company;
