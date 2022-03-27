const express = require("express");
const verify = require("../middlewares/verifyToken");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/all", verify, userController.all);
router.put("/update", verify, userController.update);
router.delete("/remove", verify, userController.remove);
router.get("/activity", verify, userController.getActivity);

module.exports = router;
