import API from "../API";
import helpers from "@/helpers/helpers";

const getProfile = async () => {
  try {
    const response = await fetch(
      `${API}/user/profile`,
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
      `${API}/user/profile/save`,
      helpers.authPostConfig(profileData)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { getProfile, saveOrUpdateProfile };
