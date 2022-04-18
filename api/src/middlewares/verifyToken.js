const jwt = require("jsonwebtoken");

const verifiyToken = (req, res, next) => {
  //si el token de acceso no existe
  if (!req.headers.authorization)
    return res.status(401).json({ authorized: false });

  //Si el token de acceso existe
  const AccessToken = req.headers.authorization.split(" ")[1];

  //Intentamos la decodificacion
  const decodedAccessToken = jwt.verify(
    AccessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(403).json({
            authorized: false,
            statusText: "Tu sesión ha expirado.",
          });
        }

        return res.status(404).json({
          authorized: false,
          statusText: "El token de acceso no es válido o esta mal formado.",
        });
      }
      return decoded;
    }
  );
  //Agregamos el token decodificado a la peticion, cuando pase este middleware
  //Ahora podremos acceder a la informacion deocodificada del usuario desde: req.user.nombre <== ejemplo
  req.user = decodedAccessToken;

  if (req.user.id) next();
};

module.exports = verifiyToken;
