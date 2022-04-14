const nodeMailer = require("nodemailer");
const connection = require("../database");
const jwt = require("jsonwebtoken");
const emailFormat = require("./emailFormat");

const Email = {};

Email.SendRecover = async (req, res) => {
  let transporter = nodeMailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
  });

  //creating the user token
  const { email } = req.body;

  const user = await connection.query(
    "select * from usuarios where correo = ?",
    [email]
  );
  // console.log(user)
  const payload = {
    correo: user[0].correo,
    id: user[0].id,
  };
  const token = jwt.sign(payload, process.env.EMAIL_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  //production
  //const link = `https://reactnodenotesv2.herokuapp.com/reset/${token}`;
  //dev
  const link = `http://localhost:3000/reset/${token}/`;

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

module.exports = Email;
