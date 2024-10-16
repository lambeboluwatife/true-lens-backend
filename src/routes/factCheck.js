const express = require("express");
const router = express.Router();

const { factCheck } = require("../controllers/factCheck");
const { verifyToken } = require("../middlewares/jwt");

router.route("/").post(verifyToken, factCheck);

module.exports = router;
