const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const validations = require("../middlewares/validations/users.validations");

const controller = require("../controllers/company.controller");

router.post("/users/company/save", verifyToken, validations, controller.Save);
router.get("/users/company/getall", verifyToken, controller.GetAll);
router.get("/users/company/getone/:id", verifyToken, controller.GetOne);
router.put(
  "/users/company/update/:id",
  verifyToken,
  validations,
  controller.Update
);
router.delete("/users/company/delete/:id", verifyToken, controller.Delete);

module.exports = router;
