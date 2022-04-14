const express = require("express");
const router = express.Router();
//middlewares
const verifyToken = require("../middlewares/verifyToken");
const validations = require("../middlewares/validations/users.validations");
const companiesValidations = require("../middlewares/validations/company.validations");
const isAdmin = require("../middlewares/isAdmin");

//contoller import
const controller = require("../controllers/company.controller");

router.post(
  "/users/company/save",
  verifyToken,
  isAdmin,
  validations,
  companiesValidations,
  controller.Save
);
router.get("/users/company/getall", verifyToken, isAdmin, controller.GetAll);
router.get(
  "/users/company/getone/:id",
  verifyToken,
  isAdmin,
  controller.GetOne
);
router.put(
  "/users/company/update/:id",
  verifyToken,
  isAdmin,
  validations,
  companiesValidations,
  controller.Update
);
router.delete(
  "/users/company/delete/:id",
  verifyToken,
  isAdmin,
  controller.Delete
);

module.exports = router;
