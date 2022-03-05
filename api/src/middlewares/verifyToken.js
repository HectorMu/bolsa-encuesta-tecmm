const jwt = require("jsonwebtoken");

const verifiyToken = (req, res, next) => {
  //si el token de acceso no existe
  if (!req.headers.authorization)
    return res.status(401).json({ authorized: false });

  //Si el token de acceso existe
  const AccessToken = req.headers.authorization.split(" ")[1];

  //Intentamos la decodificacion
  try {
    const decodedAccessToken = jwt.verify(
      AccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    //Agregamos el token decodificado a la peticion, cuando pase este middleware
    //Ahora podremos acceder a la informacion deocodificada del usuario desde: req.user.nombre <== ejemplo
    req.user = decodedAccessToken;

    if (decodedAccessToken) next();
  } catch (error) {
    //si sale mal, el token ha expirado o esta mal formado, entonces no puede acceder a la api
    console.log(error);
    return res.status(401).json({ authorized: false });
  }
};

module.exports = verifiyToken;
