const axios = require("axios");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config({ path: "./src/config/config.env" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.openAISearch = async (req, res) => {
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

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      I'm investigating the claim that ${query} is false/misleading. Has this been proven false by reliable sources, or is there credible evidence supporting it? Please provide related articles or sources that either debunk or verify this information.
    `;

        const result = await model.generateContent(prompt);

        res.status(200).json({ response: result.response.text() });
      } catch (error) {
        console.error("Error with Geminis API:", error);
        res
          .status(500)
          .json({ message: "Error generating response", error: error });
      }
    }
  });
};
