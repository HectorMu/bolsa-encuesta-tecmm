const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

const controller = require("../controllers/admin.reports.surveys.controller");

router.get(
  "/report/graduates",
  verifyToken,
  isAdmin,
  controller.GetAnswersGraduated
);
router.get(
  "/report/companies",
  verifyToken,
  isAdmin,
  controller.GetAnswersCompany
);

module.exports = router;
