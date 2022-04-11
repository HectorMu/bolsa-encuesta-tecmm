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

const Save = async (vacant) => {
  try {
    const response = await fetch(
      `${API}/company/jobs/save`,
      helpers.authPostConfig(vacant)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Update = async (vacant, id) => {
  try {
    const response = await fetch(
      `${API}/company/jobs/update/${id}`,
      helpers.authPutConfig(vacant)
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

const GetPostulations = async (job_id) => {
  try {
    const response = await fetch(
      `${API}/company/jobs/postulations/${job_id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
const GetOnePostulation = async (postulation_id) => {
  try {
    const response = await fetch(
      `${API}/company/jobs/postulations/getone/${postulation_id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const FlagPostulationAsReviewed = async (postulation_id) => {
  try {
    const response = await fetch(
      `${API}/company/jobs/postulations/reviewed/${postulation_id}`,
      helpers.authPutConfig()
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default {
  List,
  GetOne,
  Save,
  Update,
  Delete,
  GetPostulations,
  GetOnePostulation,
  FlagPostulationAsReviewed,
};
