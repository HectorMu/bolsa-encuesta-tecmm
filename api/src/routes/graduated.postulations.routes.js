const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/graduated.postulations.controller");

router.get("/graduated/postulations", verifyToken, controller.GetAll);
router.get(
  "/graduated/postulations/getone/:id",
  verifyToken,
  controller.GetOne
);
router.post("/graduated/postulations/save", verifyToken, controller.Save);
router.put(
  "/graduated/postulations/update/:id",
  verifyToken,
  controller.Update
);
router.delete(
  "/graduated/postulations/delete/:id",
  verifyToken,
  controller.Delete
);

module.exports = router;
