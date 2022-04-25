import API from "../API";
import helpers from "@/helpers/helpers";

const getProfile = async () => {
  try {
    const response = await fetch(
      `${API}/graduated/profile`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const saveOrUpdateProfile = async (profileData) => {
  try {
    const response = await fetch(
      `${API}/graduated/profile/save`,
      helpers.authPostConfig(profileData)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const uploadCurriculum = async (formData) => {
  try {
    const response = await fetch(`${API}/graduated/upload/curriculum`, {
      method: "PUT",
      headers: {
        Authorization: helpers.getAndSetAccessToken(),
      },
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

const getCurriculum = async () => {
  try {
    const response = await fetch(
      `${API}/graduated/curriculum`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

export default {
  getProfile,
  saveOrUpdateProfile,
  uploadCurriculum,
  getCurriculum,
};
