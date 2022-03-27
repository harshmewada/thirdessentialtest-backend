const express = require("express");
const validate = require("../middlewares/validate");
const authValidation = require("../validations/auth.validation");
const verify = require("../middlewares/verifyToken");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post("/login", validate(authValidation.login), authController.login);
router.get("/details", verify, authController.details);
router.get("/logout", verify, authController.logout);

module.exports = router;
