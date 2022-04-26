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

helpers.ApiFetchError = (errorMessage, customText) => {
  if (!window.navigator.onLine) {
    return {
      status: false,
      error: true,
      message: `Revisa tu conexión a internet`,
    };
  }
  if (errorMessage === "Failed to fetch") {
    return {
      status: false,
      error: true,
      message: `Conexión con el servidor perdida`,
    };
  }

  return {
    status: false,
    error: true,
    message: `${
      customText !== undefined && customText.length > 0
        ? customText
        : `Algo pasó, contácta al área de sistemas`
    }`,
  };
};

helpers.alertConfig = {
  showCancelButton: true,
  confirmButtonColor: "#0d6efd",
  cancelButtonColor: "#bb2d3b",
  confirmButtonText: "Si",
  cancelButtonText: "No",
};

export default helpers;
