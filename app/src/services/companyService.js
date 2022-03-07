import API from "../config/API";
import helpers from "../helpers/helpers";

const companyService = {};

companyService.List = async () => {
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

companyService.GetOne = async (id) => {
  try {
    const response = await fetch(
      `${API}/users/company/getone/${id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

companyService.Save = async (company) => {
  try {
    const response = await fetch(
      `${API}/users/company/save`,
      helpers.authPostConfig(company)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

companyService.Update = async (company, id) => {
  try {
    const response = await fetch(
      `${API}/users/company/update/${id}`,
      helpers.authPutConfig(company)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

companyService.Delete = async (id) => {
  try {
    const response = await fetch(
      `${API}/users/company/delete/${id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default companyService;
