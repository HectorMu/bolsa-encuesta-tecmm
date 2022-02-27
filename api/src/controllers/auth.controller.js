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
      process.env.ACCESS_TOKEN_SECRET
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
    "select * from users where email = ?",
    [email]
  );
  if (results.length > 0) {
    nodeMailer.Send(req, res);
  } else {
    res.status(200).json({
      status: false,
      statusText:
        "Provided email invalid, no existing account with this email.",
    });
  }
};
controller.VerifyRecoverEmailToken = (req, res) => {
  const { ResetToken } = req.params;
  try {
    const decodedResetToken = jwt.verify(
      ResetToken,
      process.env.EMAIL_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          err = {
            name: "TokenExpiredError",
            message: "jwt expired",
            status: false,
          };
          return;
        } else {
          return {
            status: true,
            decoded,
          };
        }
      }
    );

    if (!decodedResetToken.status)
      return res
        .status(200)
        .json({ status: false, statusText: "Invalid token, token expired" });

    res.status(200).json({ status: true, statusText: "Valid token" });
  } catch (error) {
    res.status(200).json({
      status: false,
      statusText: "Invalid token, token malformed or expired",
    });
  }
};

controller.ResetPassword = async (req, res) => {
  const { ResetToken } = req.params;
  const { password } = req.body;

  try {
    const decodedResetToken = jwt.verify(
      ResetToken,
      process.env.EMAIL_TOKEN_SECRET
    );

    const { id } = decodedResetToken;

    const hashedPassword = await helpers.encryptPassword(password);

    await connection.query("update users set password = ? where id = ?", [
      hashedPassword,
      id,
    ]);

    res.status(200).json({ status: true, statusText: "Password changed" });
  } catch (error) {
    res.status(200).json({
      status: false,
      statusText: "Something wen't wrong, try again later.",
    });
  }
};
module.exports = controller;
