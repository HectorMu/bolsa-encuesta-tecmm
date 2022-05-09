const express = require("express");
const router = express.Router();

//middlewares
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const validations = require("../middlewares/validations/admin.users.validations");
const graduatesValidations = require("../middlewares/validations/admin.graduates.validations");

//controller import
const controller = require("../controllers/admin.graduated.controller");

router.get("/jobs", controller.GetAllActiveJobs);

router.get("/jobs/getone/:job_id", controller.GetOneJob);

router.post(
  "/users/graduated/save",
  verifyToken,
  isAdmin,
  validations,
  graduatesValidations,
  controller.Save
);
router.get("/users/graduated/getall", verifyToken, isAdmin, controller.GetAll);
router.get(
  "/users/graduated/getone/:id",
  verifyToken,
  isAdmin,
  controller.GetOne
);
router.put(
  "/users/graduated/update/:id",
  verifyToken,
  validations,
  graduatesValidations,
  isAdmin,
  controller.Update
);
router.delete(
  "/users/graduated/delete/:id",
  verifyToken,
  isAdmin,
  controller.Delete
);

router.get(
  "/users/graduated/check-survey/:id",
  verifyToken,
  isAdmin,
  controller.CheckSurveyAnswered
);

router.get(
  "/users/graduated/get-postulations/:id",
  verifyToken,
  isAdmin,
  controller.GetGraduatedPostulations
);

router.post(
  "/users/graduated/notify-survey/",
  verifyToken,
  isAdmin,
  controller.NotifyGraduatedAnswerSurvey
);
router.post(
  "/users/graduated/notify-cv/",
  verifyToken,
  isAdmin,
  controller.NotifyGraduatedCheckCV
);

module.exports = router;
