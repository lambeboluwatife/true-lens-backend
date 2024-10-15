const express = require("express");
const router = express.Router();

const {
  newsApiHeadlines,
  trackMisinformation,
} = require("../controllers/newsApi");

router.route("/").get(newsApiHeadlines);
router.route("/keywords").get(trackMisinformation);

module.exports = router;
