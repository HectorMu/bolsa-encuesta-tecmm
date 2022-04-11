const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/company.jobs.controller");

router.get("/company/jobs/getall", verifyToken, controller.GetAll);
router.get(
  "/company/jobs/postulations/:job_id",
  verifyToken,
  controller.GetPostulations
);
router.get(
  "/company/jobs/postulations/getone/:postulation_id",
  verifyToken,
  controller.GetOnePostulation
);
router.get("/company/jobs/getone/:id", verifyToken, controller.GetOne);
router.post("/company/jobs/save", verifyToken, controller.Save);
router.put("/company/jobs/update/:id", verifyToken, controller.Update);
router.put(
  "/company/jobs/postulations/reviewed/:postulation_id",
  verifyToken,
  controller.FlagPostulationAsReviewed
);
router.delete("/company/jobs/delete/:id", verifyToken, controller.Delete);

module.exports = router;
