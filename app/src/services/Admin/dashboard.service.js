import { API } from "../API";
import helpers from "../../helpers/helpers";

const GetAccountsCount = async () => {
  try {
    const response = await fetch(
      `${API}/accounts/count`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const GetCompaniesCount = async () => {
  try {
    const response = await fetch(
      `${API}/companies/count`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const GetGraduatesCount = async () => {
  try {
    const response = await fetch(
      `${API}/graduates/count`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const GetJobsCount = async () => {
  try {
    const response = await fetch(`${API}/jobs/count`, helpers.authGetConfig());
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const GetLatestUsers = async () => {
  try {
    const response = await fetch(
      `${API}/latest/users`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const GetLatestContestedGraduatesSurvey = async () => {
  try {
    const response = await fetch(
      `${API}/latest/graduates/survey`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const GetLatestContestedCompaniesSurvey = async () => {
  try {
    const response = await fetch(
      `${API}/latest/companies/survey`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const GetLatestJobs = async () => {
  try {
    const response = await fetch(`${API}/latest/jobs`, helpers.authGetConfig());
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

export default {
  GetAccountsCount,
  GetCompaniesCount,
  GetLatestContestedGraduatesSurvey,
  GetGraduatesCount,
  GetJobsCount,
  GetLatestUsers,
  GetLatestContestedCompaniesSurvey,
  GetLatestJobs,
};
