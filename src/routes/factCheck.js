const express = require("express");
const router = express.Router();

const { factCheck } = require("../controllers/factCheck");

router.route("/").post(factCheck);

module.exports = router;
