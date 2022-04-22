const helpers = require("../../helpers/helpers");

const validations = (req, res, next) => {
  const hasEmptyPropierty = helpers.hasEmptyPropierty(req.body);

  if (hasEmptyPropierty.result) {
    return res.status(400).json({
      status: false,
      statusText: hasEmptyPropierty.expected,
    });
  }
  if (!req.body.correo || !req.body.clave) {
    return res.status(400).json({
      status: false,
      statusText: "El cuerpo esta malformado, no cumple con los parametros.",
    });
  }

  if (!helpers.isEmail(req.body.correo)) {
    return res.status(400).json({
      status: false,
      statusText: "Ingrese un correo electronico valido.",
    });
  }

  next();
};

module.exports = validations;
