const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/config/config.env" });
const jwt = require("jsonwebtoken");

const keywordArray = [
  "fake news",
  "misinformation",
  "disinformation",
  "conspiracy theories",
  "false claims",
];

exports.newsApiHeadlines = async (req, res) => {
  try {
    const newsApiResponse = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
    );

    let newsApiHeadlines = newsApiResponse.data.articles;

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const randomArticles = shuffleArray(newsApiHeadlines).slice(0, 5);

    return res.status(200).json({ status: true, randomArticles });
  } catch (err) {
    console.error("Error fetching news results:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Error fetching news results",
    });
  }
};

exports.trackMisinformation = async (req, res) => {
  try {
    const keywordResults = {};

    for (const keyword of keywordArray) {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          keyword
        )}&language=en&apiKey=${process.env.NEWS_API_KEY}`
      );

      keywordResults[keyword] = response.data.articles;
    }

    return res.status(200).json({ status: true, results: keywordResults });
  } catch (err) {
    console.error("Error fetching misinformation articles:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Error fetching misinformation articles",
    });
  }
};

exports.searchNews = async (req, res) => {
  const token = req.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Missing token",
    });
  }

  jwt.verify(token, "secretkey", async (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: "Forbidden",
      });
    } else {
      try {
        const { query } = req.body;
        const newsApiSearch = await axios.get(
          `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`
        );

        let searchNews = newsApiSearch.data.articles;

        const shuffleArray = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        const randomArticles = shuffleArray(searchNews).slice(0, 5);

        return res.status(200).json({ status: true, randomArticles });
      } catch (err) {
        console.error("Error fetching news results:", err);
        return res.status(500).json({
          success: false,
          error: err.message || "Error fetching news results",
        });
      }
    }
  });
};
