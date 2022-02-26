const { body } = require("express-validator");

const validations = () => {
  return (
    body("correo")
      .isEmail()
      .withMessage("Ingrese una dirección de correo valida."),
    body("clave")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener minimo 8 caracteres de largo")
  );
};

module.exports = validations;
