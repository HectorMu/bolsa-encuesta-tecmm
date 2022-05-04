const connection = require("../database");
const jwt = require("jsonwebtoken");
const helpers = require("../helpers/helpers");
const nodeMailer = require("../lib/nodemailer");
const controller = {};

controller.Login = async (req, res) => {
  const { correo, clave } = req.body;
  try {
    const results = await connection.query(
      `select * from usuarios where correo = ? `,
      [correo]
    );
    if (!results.length > 0)
      return res.status(400).json({
        status: false,
        statusText: "Revisa tus credenciales.",
      });

    const user = results[0];
    const passwordComparationResult = await helpers.matchPassword(
      clave,
      user.clave
    );

    if (!passwordComparationResult)
      return res.status(400).json({
        status: false,
        statusText: "Revisa tus credenciales.",
      });

    const serializedUser = {
      id: user.id,
      correo: user.correo,
      fk_rol: user.fk_rol,
    };

    const AccessToken = jwt.sign(
      serializedUser,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    const SessionData = {
      ...serializedUser,
      AccessToken,
    };

    res.status(200).json({
      status: true,
      statusText: "Usuario identificado.",
      SessionData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." });
  }
};

controller.sendRecoverEmail = async (req, res) => {
  const { email } = req.body;
  const results = await connection.query(
    "select * from usuarios where correo = ?",
    [email]
  );
  if (results.length > 0) {
    nodeMailer.SendRecover(req, res);
  } else {
    res.status(200).json({
      status: false,
      statusText:
        "No existe una cuenta con este correo electrónico registrado.",
    });
  }
};
controller.VerifyRecoverEmailToken = (req, res) => {
  const { ResetToken } = req.params;

  const decodedResetToken = jwt.verify(
    ResetToken,
    process.env.EMAIL_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.json({
            status: false,
            statusText: "El enlace ha expirado.",
          });
        }
        if (err) {
          return res.json({
            status: false,
            statusText: "Enlace malformado.",
          });
        }
      } else {
        return res
          .status(200)
          .json({ status: true, statusText: "Valid token" });
      }
      return decoded;
    }
  );
};

controller.ResetPassword = async (req, res) => {
  const { ResetToken } = req.params;
  const { password, confirm } = req.body;

  if (!password.length > 8) {
    return res.json({
      status: false,
      statusText: "La contraseña debe tener minimo 8 caracteres de largo.",
    });
  }
  if (password !== confirm) {
    return res.json({
      status: false,
      statusText: "Las contraseñas no coinciden.",
    });
  }

  try {
    const decodedResetToken = jwt.verify(
      ResetToken,
      process.env.EMAIL_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.json({
              status: false,
              statusText: "El enlace ha expirado.",
            });
          }
          if (err) {
            return res.json({
              status: false,
              statusText: "Enlace malformado.",
            });
          }
        }
        return decoded;
      }
    );

    const { id } = decodedResetToken;

    const hashedPassword = await helpers.encryptPassword(password);

    await connection.query("update usuarios set clave = ? where id = ?", [
      hashedPassword,
      id,
    ]);

    res
      .status(200)
      .json({ status: true, statusText: "Contraseña cambiada correctamente." });
  } catch (error) {
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};
module.exports = controller;
