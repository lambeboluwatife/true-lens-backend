const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/config/config.env" });

exports.factCheck = async (req, res) => {
  const { query } = req.body;
  console.log(query);

  try {
    const response = await axios.get(
      `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${query}&key=${process.env.GOOGLE_FACT_CHECKER_API_KEY}`
    );
    const factCheckResults = response.data.claims;
    // const factCheckResults = response;

    res.json({ results: factCheckResults });
  } catch (error) {
    console.error("Error fetching fact-check results:", error);
    res.status(500).send("Error fetching fact-check results");
  }
};
