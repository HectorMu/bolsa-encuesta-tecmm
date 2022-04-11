const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const isCompany = require("../middlewares/isCompany");

const controller = require("../controllers/company.jobs.controller");

router.get("/company/jobs/getall", verifyToken, isCompany, controller.GetAll);
router.get(
  "/company/jobs/postulations/:job_id",
  verifyToken,
  isCompany,
  controller.GetPostulations
);
router.get(
  "/company/jobs/postulations/getone/:postulation_id",
  verifyToken,
  isCompany,
  controller.GetOnePostulation
);
router.get(
  "/company/jobs/getone/:id",
  verifyToken,
  isCompany,
  controller.GetOne
);
router.post("/company/jobs/save", verifyToken, isCompany, controller.Save);
router.put(
  "/company/jobs/update/:id",
  verifyToken,
  isCompany,
  controller.Update
);
router.put(
  "/company/jobs/postulations/reviewed/:postulation_id",
  verifyToken,
  isCompany,
  controller.FlagPostulationAsReviewed
);
router.delete(
  "/company/jobs/delete/:id",
  verifyToken,
  isCompany,
  controller.Delete
);

module.exports = router;
