import API from "../API";
import helpers from "@/helpers/helpers";

const getJobs = async () => {
  try {
    const response = await fetch(`${API}/jobs`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getOneJob = async (id) => {
  try {
    const response = await fetch(`${API}/jobs/getone/${id}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { getJobs, getOneJob };
