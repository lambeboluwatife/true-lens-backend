const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/config/config.env" });

exports.factCheck = async (req, res) => {
  const { query } = req.body;

  try {
    const factCheckResponse = await axios.get(
      `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${query}&key=${process.env.GOOGLE_FACT_CHECKER_API_KEY}`
    );

    const newsApiResponse = await axios.get(
      `https://newsapi.org/v2/everything?q=${keyword}&language=en&apiKey=${process.env.NEWS_API_KEY}`
    );

    const articles = newsApiResponse.data.articles;

    const factCheckResults = factCheckResponse.data.claims;

    return res.status(200).json({ status: true, factCheckResults, articles });
  } catch (err) {
    console.err("Error fetching fact-check or news article.", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Error fetching fact-check or news article.",
    });
  }
};
