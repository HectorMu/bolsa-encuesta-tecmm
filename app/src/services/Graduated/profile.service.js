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
  }
};

export default {
  getProfile,
  saveOrUpdateProfile,
  uploadCurriculum,
  getCurriculum,
};
