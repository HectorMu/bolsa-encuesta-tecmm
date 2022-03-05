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

const isJson = (string) => {
  try {
    JSON.parse(string);
  } catch (error) {
    return false;
  }
  return true;
};

//Este metodo convierte todos los campos que puedan ser parseados a json a json
//sin embargo, recibe un array de los campos que va a parsear, por ejemplo: ["idioma_extranjero","calificaciones", etc.]
//esto haciendolo siempre que sepamos que un campo es json, y automaticamente crea una tabla dentro con los
//sub campos
helpers.convertFieldsToJson = (array, keysArr = null) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < keysArr.length; j++) {
      if (keysArr[j] in array[i]) {
        if (isJson(array[i][keysArr[j]])) {
          array[i][keysArr[j]] = JSON.parse(array[i][keysArr[j]]);
        }
      }
    }
  }
  return array;
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
