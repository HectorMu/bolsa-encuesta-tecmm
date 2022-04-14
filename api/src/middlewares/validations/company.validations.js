const validations = (req, res, next) => {
  if (
    req.body.telefono.toString().length < 10 ||
    req.body.telefono.toString().length > 10
  ) {
    return res.status(400).json({
      status: false,
      statusText: "Los numeros de telefono deben tener maximo 10 digitos.",
    });
  }

  if (typeof req.body.cp !== "number") {
    if (isNaN(req.body.cp)) {
      return res.status(400).json({
        status: false,
        statusText: "El codigo postal no es valido.",
      });
    }
  }

  if (typeof req.body.numero_empresa !== "number") {
    if (isNaN(req.body.numero_empresa)) {
      return res.status(400).json({
        status: false,
        statusText: "El numero de casa no es valido.",
      });
    }
  }

  if (typeof req.body.telefono !== "number") {
    if (isNaN(req.body.telefono)) {
      return res.status(400).json({
        status: false,
        statusText: "El telefono de debe ser un numero valido.",
      });
    }
  }

  next();
};

module.exports = validations;
