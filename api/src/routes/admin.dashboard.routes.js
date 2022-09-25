const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/admin.dashboard.controller");

router.get("/accounts/count", verifyToken, controller.AccountsCount);
router.get("/companies/count", verifyToken, controller.CompaniesCount);
router.get("/graduates/count", verifyToken, controller.GraduatesCount);
router.get("/jobs/count", verifyToken, controller.JobsCount);
router.get("/latest/users", verifyToken, controller.LatestUsers);
router.get(
  "/latest/graduates/survey",
  verifyToken,
  controller.LatestAnsweredGraduates
);
router.get(
  "/latest/companies/survey",
  verifyToken,
  controller.LatestAnsweredCompanies
);
router.get("/latest/jobs", verifyToken, controller.LatestJobs);

module.exports = router;
