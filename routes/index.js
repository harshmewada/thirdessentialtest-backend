const express = require("express");
const auth = require("./auth.route");
const user = require("./user.route");
const product = require("./product.route");
const util = require("./util.route");

const router = express.Router();

router.use("/auth", auth);
router.use("/user", user);
router.use("/product", product);
router.use("/util", util);

module.exports = router;
