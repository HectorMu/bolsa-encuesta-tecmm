const helpers = {};

helpers.postConfig = (data) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

helpers.authPostConfig = (data) => {
  if (data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: helpers.getAndSetAccessToken(),
      },
      body: JSON.stringify(data),
    };
  }
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: helpers.getAndSetAccessToken(),
    },
  };
};

helpers.authPutConfig = (data) => {
  if (data) {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: helpers.getAndSetAccessToken(),
      },
      body: JSON.stringify(data),
    };
  }
  return {
    method: "PUT",
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

helpers.authDeleteConfig = () => {
  return {
    method: "DELETE",
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

helpers.alertConfig = {
  showCancelButton: true,
  confirmButtonColor: "#0d6efd",
  cancelButtonColor: "#bb2d3b",
  confirmButtonText: "Si",
  cancelButtonText: "No",
};

export default helpers;
