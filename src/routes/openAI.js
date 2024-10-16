const express = require("express");
const router = express.Router();

const { openAISearch } = require("../controllers/openAI");
const { verifyToken } = require("../middlewares/jwt");

router.route("/search").get(verifyToken, openAISearch);

module.exports = router;
