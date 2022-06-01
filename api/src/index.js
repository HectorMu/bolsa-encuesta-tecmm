const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const User = require("./models/User");
const verifyToken = require("./middlewares/verifyToken");

//Getting server tasks
require("./tasks/jobbank.closevacants");

const cvsRouter = express.Router();
const acusesRouter = express.Router();

//Initialazing database connection
const db = require("./database");
const helpers = require("./helpers/helpers");

//function to change all the date formats to a HTML5 Format
// const changeAllBirthDates = async () => {
//   console.log("Renaming birthdates");
//   const graduates = await db.query("Select * from perfil_egresado");

//   for (let i = 0; i < graduates.length; i++) {
//     const graduateBirth = graduates[i].fechaNacimiento;
//     const graduatedId = graduates[i].fk_usuario;
//     const splittedBirth = graduateBirth.split("-");

//     const wellFormattedBirth =
//       splittedBirth[2] + "-" + splittedBirth[1] + "-" + splittedBirth[0];
//     await db.query(
//       "update perfil_egresado set fechaNacimiento = ? where fk_usuario = ?",
//       [wellFormattedBirth, graduatedId]
//     );
//   }
//   console.log("finished");
// };
// changeAllBirthDates();

//function to encrypt all the graduates  passwords
// const changeAllPasswords = async () => {
//   console.log("Encrypting passwords");
//   const graduates = await db.query("Select * from usuarios where fk_rol = 2");

//   for (let i = 0; i < graduates.length; i++) {
//     const graduatedId = graduates[i].id;
//     const graduatedEmail = graduates[i].correo;

//     const newClave = await helpers.encryptPassword(graduatedEmail);

//     await db.query("update usuarios set clave = ? where id = ?", [
//       newClave,
//       graduatedId,
//     ]);
//   }
//   console.log("finished");
// };
// changeAllPasswords();

//Using middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

User.InitialState();

//To protect the public folder from not authorized users
app.use(cvsRouter.all("/graduated/files/*", verifyToken));
app.use(express.static(path.join(__dirname, "public")));

// app.use(acusesRouter.all("/graduated/acuses/*", verifyToken));
// app.use(express.static(path.join(__dirname, "public")));

//Using the routes
app.use("/api", require("./routes/template.routes"));
app.use("/api", require("./routes/auth.routes"));
app.use("/api", require("./routes/admin.users.routes"));
app.use("/api", require("./routes/admin.company.routes"));
app.use("/api", require("./routes/admin.graduated.routes"));
app.use("/api", require("./routes/admin.jobs.postulations.routes"));
app.use("/api", require("./routes/company.jobs.routes"));
app.use("/api", require("./routes/graduated.postulations.routes"));
app.use("/api", require("./routes/graduated.survey.routes"));
app.use("/api", require("./routes/company.survey.routes"));
app.use("/api", require("./routes/users.profile.routes"));
app.use("/api", require("./routes/admin.reports.surveys.routes"));

//To deploy a react router app build with an express server, this must be here forever
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"), (err) => {
    if (err) {
      res.status(500).send("error");
      console.log(err);
    }
  });
});

//Initialazing the server
let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server started on port", port);
});
