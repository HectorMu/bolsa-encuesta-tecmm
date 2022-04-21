const express = require("express");
const router = express.Router();
//middlewares
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

//contoller import
const jobsController = require("../controllers/admin.jobs.postulations.controller");

router.get("/admin/jobs/getall", verifyToken, isAdmin, jobsController.GetAll);
router.get(
  "/admin/jobs/getone/:id",
  verifyToken,
  isAdmin,
  jobsController.GetOne
);

module.exports = router;
