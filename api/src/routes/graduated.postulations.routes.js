const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const uploadCV = require("../middlewares/uploadCV");
const isGraduated = require("../middlewares/isGraduated");

const controller = require("../controllers/graduated.postulations.controller");

router.post(
  "/graduated/visit/:job_id",
  verifyToken,
  isGraduated,
  controller.RegisterPostJobVisit
);
router.get("/graduated/postulations", verifyToken, controller.GetAll);
router.get(
  "/graduated/postulations/getone/:job_id",
  verifyToken,
  isGraduated,
  controller.GetOne
);
router.post(
  "/graduated/postulations/save/:job_id",
  verifyToken,
  uploadCV,
  isGraduated,
  controller.Save
);
router.put(
  "/graduated/postulations/update/:id",
  verifyToken,
  isGraduated,
  controller.Update
);
router.delete(
  "/graduated/postulations/delete/:job_id",
  verifyToken,
  isGraduated,
  controller.Delete
);

module.exports = router;
