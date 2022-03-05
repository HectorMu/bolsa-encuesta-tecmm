const { USER_ROLES } = require("../helpers/helpers");

const isCompany = (req, res, next) => {
  //Si no existe el usuario en el request
  if (!req.user) {
    return res.status(400).json({ authorized: false });
  }

  //Si el rol es diferente a compañia significa que no esta autorizado
  if (req.user.fk_rol !== USER_ROLES.Company) {
    return res.status(400).json({ authorized: false });
  }

  //Si no entro a ningun if, entonces significa que esta autenticado y tiene el rol correcto,
  //seguimos
  next();
};

module.exports = isCompany;
