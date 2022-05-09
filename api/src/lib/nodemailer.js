const nodeMailer = require("nodemailer");
const connection = require("../database");
const jwt = require("jsonwebtoken");
const emailFormat = require("./emailFormat");
const emailFormatGraduated = require("./emailFormatGradutedSurvey");
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
        statusText: "Algo fue mal, contácta al area de sistemas.",
      });
    } else {
      res.json({
        status: true,
        statusText: "Un email con instrucciones ha sido enviado.",
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
  let emailOptions = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: "Encuesta de seguimiento de egresados",
    html: emailFormatGraduated(link),
  };
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.json({
        status: false,
        statusText: "Algo fue mal, contácta al area de sistemas.",
      });
    } else {
      res.json({
        status: true,
        statusText: "Email enviado correctamente.",
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
  let emailOptions = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: "Cuestionario para empleadores",
    html: emailFormatCompany(link),
  };
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.json({
        status: false,
        statusText: "Algo fue mal, contácta al area de sistemas.",
      });
    } else {
      res.json({
        status: true,
        statusText: "Email enviado correctamente.",
      });
    }
  });
};

module.exports = Email;
