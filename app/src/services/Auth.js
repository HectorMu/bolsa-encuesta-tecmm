import API from "./API";
import helpers from "../helpers/helpers";

const Auth = {};

Auth.Login = async (credentials) => {
  try {
    const response = await fetch(
      `${API}/login`,
      helpers.postConfig(credentials)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

Auth.Logout = () => {
  window.localStorage.removeItem("BETECMMSession");
};

Auth.getResourcesFromPublicFolder = async (source) => {
  try {
    const response = await fetch(
      `http://localhost:4000/${source}`,
      helpers.authGetConfig()
    );
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.log(error);
  }
};

export default Auth;
