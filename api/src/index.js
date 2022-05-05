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

const publicRouter = express.Router();

//Initialazing database connection
require("./database");

//Using middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

User.InitialState();

//To protect the public folder from not authorized users
app.use(publicRouter.all("/graduated/cvs/*", verifyToken));
app.use(express.static(path.join(__dirname, "public")));

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
