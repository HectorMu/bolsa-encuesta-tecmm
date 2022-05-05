import { API, Host } from "./API";
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
    return helpers.ApiFetchError(error.message);
  }
};

Auth.Logout = () => {
  window.localStorage.removeItem("BETECMMSession");
};

Auth.sendRecoverEmail = async (email) => {
  try {
    const response = await fetch(
      `${API}/recover-password/`,
      helpers.postConfig({ email })
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

Auth.validateRecoverPasswordToken = async (token) => {
  try {
    const results = await fetch(`${API}/verify-reset-token/${token}`);
    return await results.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

Auth.resetPasswordAccount = async (passwords, token) => {
  try {
    const results = await fetch(
      `${API}/reset-password/${token}`,
      helpers.postConfig(passwords)
    );
    return await results.json();
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

Auth.getResourcesFromPublicFolder = async (source) => {
  try {
    const response = await fetch(`${Host}/${source}`, helpers.authGetConfig());
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.log(error);
    return helpers.ApiFetchError(error.message);
  }
};

export default Auth;
