const express = require("express");
const router = express.Router();

const { openAISearch } = require("../controllers/openAI");

router.route("/search").get(openAISearch);

module.exports = router;
