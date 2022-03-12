import API from "../API";
import helpers from "../../helpers/helpers";

const List = async () => {
  try {
    const response = await fetch(
      `${API}/company/jobs/getall`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const GetOne = async (id) => {
  try {
    const response = await fetch(
      `${API}/company/jobs/getone/${id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Save = async (company) => {
  try {
    const response = await fetch(
      `${API}/company/jobs/save`,
      helpers.authPostConfig(company)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Update = async (company, id) => {
  try {
    const response = await fetch(
      `${API}/company/jobs/update/${id}`,
      helpers.authPutConfig(company)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Delete = async (id) => {
  try {
    const response = await fetch(
      `${API}/company/jobs/delete/${id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { List, GetOne, Save, Update, Delete };
