const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const { body } = require("express-validator");

const controller = require("../controllers/users.controller");

router.get("/users/getall", controller.GetAll);
router.get("/users/getone/:id", controller.GetOne);
router.post(
  "/users/save",
  body("correo").isEmail().withMessage("Correo no valido"),
  body("clave")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener minimo 8 caracteres de largo"),
  controller.Save
);
router.delete("/users/delete/:id", controller.Delete);
router.put("/users/update/:id", controller.Update);

module.exports = router;
