const express = require("express");
const router = express.Router();

const {
  newsApiHeadlines,
  trackMisinformation,
  searchNews,
} = require("../controllers/newsApi");

const { verifyToken } = require("../middlewares/jwt");

router.route("/").get(newsApiHeadlines);
router.route("/keywords").get(trackMisinformation);
router.route("/search").get(verifyToken, searchNews);

module.exports = router;
