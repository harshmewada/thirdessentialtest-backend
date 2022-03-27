const express = require("express");
const upload = require("../multer");
const productController = require("../controllers/product.controller");
const verify = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/all", verify, productController.all);
router.post("/create", verify, upload.any(), productController.create);
router.put("/update", verify, upload.any(), productController.update);

router.delete("/delete", verify, productController.remove);

module.exports = router;
