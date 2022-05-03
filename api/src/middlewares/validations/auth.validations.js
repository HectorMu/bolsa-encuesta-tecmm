const helpers = require("../../helpers/helpers");

const bodyRequiredProps = ["correo", "clave"];

const validations = (req, res, next) => {
  const login = req.body;

  if (typeof login !== "object")
    return res.status(400).json({
      status: false,
      statusText: "El login debe estar en formato JSON",
    });

  const bodyPropsName = Object.keys(login);
  const checkProps =
    bodyPropsName.length === bodyRequiredProps.length &&
    bodyPropsName.every((propname) => bodyRequiredProps.includes(propname));

  if (!checkProps)
    return res.status(400).json({
      status: false,
      statusText: "El JSON solo debe incluir correo y clave",
    });

  const hasEmptyPropierty = helpers.hasEmptyPropierty(login);

  if (hasEmptyPropierty.result) {
    return res.status(400).json({
      status: false,
      statusText: hasEmptyPropierty.expected,
    });
  }
  if (!login.correo || !login.clave) {
    return res.status(400).json({
      status: false,
      statusText: "El cuerpo esta malformado, no cumple con los parametros.",
    });
  }

  if (!helpers.isEmail(login.correo)) {
    return res.status(400).json({
      status: false,
      statusText: "Ingrese un correo electronico valido.",
    });
  }

  next();
};

module.exports = validations;
