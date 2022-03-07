const helpers = require("../../helpers/helpers");
const validations = (req, res, next) => {
  //Obtenemos el usuario que viene desde el body request
  const user = req.body;

  //Verificamos que los campos no vengan vacios desde el servidor
  const hasEmpty = helpers.hasEmptyPropierty(user);
  //Si existen campos vacios
  if (hasEmpty.result) {
    //Retornamos un error con los valores que se esperaban
    return res.status(400).json({
      status: false,
      statusText: hasEmpty.expected,
    });
  }

  //Validamos que el correo electronico ingresado sea valido
  if (!helpers.isEmail(user.correo)) {
    //Si el correo no es valido retornamos el error:
    return res.status(400).json({
      status: false,
      statusText: "Ingrese un correo electrónico válido.",
    });
  }

  //Validamos que la clave tenga un minimo de 8 caracteres de largo

  //Pimero verificamos que recibamos la propiedad de la clave en el objeto
  //(Esto para validar si se desea cambiar la clave del usuario o no)

  if (user.clave) {
    //Si existe la propiedad, verificiamos su largo
    if (user.clave.length < 8) {
      return res.status(400).json({
        status: false,
        statusText: "La clave debe tener minimo 8 carácteres de largo.",
      });
    }
    //Aqui recibimos la clave y la confirmacion para ser validada desde el servidor, si es diferente
    //mandamos un error
    if (user.confirmar !== user.clave) {
      return res.status(400).json({
        status: false,
        statusText: "Las claves no coinciden.",
      });
    }
    //Como ya verificamos que coinicidan, la confirmacion no nos sirve ya que no la guardaremos en la base de datos
    //por lo que borramos esta propiedad del json
    delete user.confirmar;
  }

  //En caso de que pase todas las validaciones, seguimos con el siguiente codigo
  next();
};

module.exports = validations;
