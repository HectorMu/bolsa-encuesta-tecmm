const validations = (req, res, next) => {
  if (typeof req.body.cp !== "number") {
    if (isNaN(req.body.cp)) {
      return res.status(400).json({
        status: false,
        statusText: "El código postal no es válido.",
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
