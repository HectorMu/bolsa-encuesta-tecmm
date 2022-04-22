const validations = (req, res, next) => {
  if (
    req.body.telefono.toString().length < 10 ||
    req.body.telefono.toString().length > 10
  ) {
    return res.status(400).json({
      status: false,
      statusText: "Los numeros de teléfono deben tener máximo 10 dígitos.",
    });
  }

  if (typeof req.body.cp !== "number") {
    if (isNaN(req.body.cp)) {
      return res.status(400).json({
        status: false,
        statusText: "El código postal no es válido.",
      });
    }
  }

  if (typeof req.body.numero_empresa !== "number") {
    if (isNaN(req.body.numero_empresa)) {
      return res.status(400).json({
        status: false,
        statusText: "El número de casa no es válido.",
      });
    }
  }

  if (typeof req.body.telefono !== "number") {
    if (isNaN(req.body.telefono)) {
      return res.status(400).json({
        status: false,
        statusText: "El teléfono de debe ser un número válido.",
      });
    }
  }

  next();
};

module.exports = validations;
