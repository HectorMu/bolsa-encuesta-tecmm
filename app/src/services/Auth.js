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

export default Auth;
