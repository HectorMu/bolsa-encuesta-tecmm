const helpers = {};

helpers.postConfig = (data) => {
  return {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

helpers.authPostConfig = (data) => {
  if (data) {
    return {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: helpers.getAndSetAccessToken(),
      },
      body: JSON.stringify(data),
    };
  }
  return {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: helpers.getAndSetAccessToken(),
    },
  };
};

helpers.authGetConfig = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: helpers.getAndSetAccessToken(),
    },
  };
};

helpers.getAndSetAccessToken = () => {
  const user = JSON.parse(window.localStorage.getItem("BETECMMSession"));
  return `Bearer ${user.AccessToken}`;
};

export default helpers;
