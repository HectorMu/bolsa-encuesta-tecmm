const nodeMailer = require("nodemailer");
const connection = require("../database");
const jwt = require("jsonwebtoken");
const emailFormat = require("./emailFormat");
const emailFormatGraduated = require("./emailFormatGraduatedSurvey");
const emailFormatFixCV = require("./emailFormatFixCV");
const emailFormatCompany = require("./emailFormatCompanySurvey");

const Email = {};

Email.SendRecover = async (req, res) => {
  let transporter = nodeMailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  //creating the user token
  const { email } = req.body;

  const user = await connection.query(
    "select * from usuarios where correo = ?",
    [email]
  );

  const payload = {
    correo: user[0].correo,
    id: user[0].id,
  };
  const token = jwt.sign(payload, process.env.EMAIL_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const link = `${process.env.HOST}/reset/${token}/`;

  let emailOptions = {
    from: process.env.MAILER_EMAIL,
    to: req.body.email,
    subject: "Recuperación de cuenta",
    html: emailFormat(link),
  };
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.json({
        status: false,
        statusText: "Algo fue mal, contácta al area de sistemas",
      });
    } else {
      res.json({
        status: true,
        statusText: "Un email con instrucciones ha sido enviado",
      });
    }
  });
};

Email.NotifyGraduatedCheckCV = async (req, res) => {
  let transporter = nodeMailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const { email, description } = req.body;

  const link = `${process.env.HOST}/profile/`;

  let emailOptions = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: "Error encontrado en curriculum | Bolsa de trabajo TECMM",
    html: emailFormatFixCV(link, description),
  };
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.json({
        status: false,
        statusText: "Algo fue mal, contácta al area de sistemas",
      });
    } else {
      res.json({
        status: true,
        statusText: "Email enviado correctamente",
      });
    }
  });
};

Email.NotifyGraduatedAnswerSurvey = async (req, res) => {
  let transporter = nodeMailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  //getting the user email
  const { email } = req.body;

  const link = `${process.env.HOST}/graduated/survey/`;

  const { notification_type } = req.params;

  let message =
    "Parece que no has contestado la encuesta de seguimiento de egresados, requerimos de tus respuestas para mejorar la preparación de nuestros futuros profesionales.\nPuedes contestarla dando click en el siguiente botón.";

  if (notification_type === "update_answers") {
    message =
      "Necesitamos que actualices tus respuestas de la encuesta de seguimiento de egresados, requerimos de tus respuestas para mejorar la preparación de nuestros futuros profesionales.\nPuedes contestarla dando click en el siguiente botón.";
  }

  let emailOptions = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: `Encuesta de seguimiento de egresados | ${
      notification_type === "update_answers"
        ? "Actualiza tus respuestas"
        : "Realiza la encuesta"
    }`,
    html: emailFormatGraduated(message, link),
  };
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.json({
        status: false,
        statusText: "Algo fue mal, contácta al area de sistemas",
      });
    } else {
      res.json({
        status: true,
        statusText: "Email enviado correctamente",
      });
    }
  });
};

Email.NotifyCompanyAnswerSurvey = async (req, res) => {
  let transporter = nodeMailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  //getting the user email
  const { email } = req.body;

  const link = `${process.env.HOST}/company/survey/`;

  const { notification_type } = req.params;

  let message =
    "Parece que no has contestado la encuesta para empleadores, requerimos de tus respuestas para mejorar la preparación de nuestros futuros profesionales.\nPuedes contestarla dando click al siguiente botón.";

  if (notification_type === "update_answers") {
    message =
      "Necesitamos que actualices tus respuestas de la encuesta para empleadores, requerimos de tus respuestas para mejorar la preparación de nuestros futuros profesionales.\nPuedes contestarla dando click en el siguiente botón.";
  }

  let emailOptions = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: `Cuestionario para empleadores | ${
      notification_type === "update_answers"
        ? "Actualiza tus respuestas"
        : "Realiza la encuesta"
    }`,
    html: emailFormatCompany(message, link),
  };
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.json({
        status: false,
        statusText: "Algo fue mal, contácta al area de sistemas",
      });
    } else {
      res.json({
        status: true,
        statusText: "Email enviado correctamente",
      });
    }
  });
};

module.exports = Email;
