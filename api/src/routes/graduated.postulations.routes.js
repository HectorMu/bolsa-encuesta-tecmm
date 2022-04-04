const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const uploadCV = require("../middlewares/uploadCV");

const controller = require("../controllers/graduated.postulations.controller");

router.post(
  "/graduated/visit/:job_id",
  verifyToken,
  controller.RegisterPostJobVisit
);
router.get("/graduated/postulations", verifyToken, controller.GetAll);
router.get(
  "/graduated/postulations/getone/:job_id",
  verifyToken,
  controller.GetOne
);
router.post(
  "/graduated/postulations/save/:job_id",
  verifyToken,
  uploadCV,
  controller.Save
);
router.put(
  "/graduated/postulations/update/:id",
  verifyToken,
  controller.Update
);
router.delete(
  "/graduated/postulations/delete/:job_id",
  verifyToken,
  controller.Delete
);

module.exports = router;
