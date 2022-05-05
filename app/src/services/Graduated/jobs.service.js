import { API } from "../API";
import helpers from "@/helpers/helpers";

const getJobs = async () => {
  try {
    const response = await fetch(`${API}/jobs`);
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const getOneJob = async (id) => {
  try {
    const response = await fetch(`${API}/jobs/getone/${id}`);
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const registerJobVisit = async (job_id) => {
  try {
    const response = await fetch(
      `${API}/graduated/visit/${job_id}`,
      helpers.authPostConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const getGraduatedPostulations = async () => {
  try {
    const response = await fetch(
      `${API}/graduated/postulations`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const registerPostulation = async (job_id) => {
  try {
    const response = await fetch(
      `${API}/graduated/postulations/save/${job_id}`,
      helpers.authPostConfig()
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const deletePostulation = async (job_id) => {
  try {
    const response = await fetch(
      `${API}/graduated/postulations/delete/${job_id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const getPostulation = async (job_id) => {
  try {
    const response = await fetch(
      `${API}/graduated/postulations/getone/${job_id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

export default {
  getJobs,
  getOneJob,
  registerJobVisit,
  registerPostulation,
  getPostulation,
  deletePostulation,
  getGraduatedPostulations,
};
