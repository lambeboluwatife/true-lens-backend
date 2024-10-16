const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/config/config.env" });
const jwt = require("jsonwebtoken");

exports.factCheck = async (req, res) => {
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
        const factCheckResponse = await axios.get(
          `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${query}&key=${process.env.GOOGLE_FACT_CHECKER_API_KEY}`
        );

        const factCheckResults = factCheckResponse.data.claims;

        return res.status(200).json({ status: true, factCheckResults });
      } catch (err) {
        console.err("Error fetching fact-check or news article.", err);
        return res.status(500).json({
          success: false,
          error: err.message || "Error fetching fact-check or news article.",
        });
      }
    }
  });
};
