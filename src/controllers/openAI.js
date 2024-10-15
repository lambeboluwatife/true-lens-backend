const axios = require("axios");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config({ path: "./src/config/config.env" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.openAISearch = async (req, res) => {
  const { query } = req.body;
  //   try {
  //     const completion = await openai.chat.completions.create({
  //       model: "gpt-4o-mini",
  //       messages: [
  //         { role: "system", content: "You are a helpful assistant." },
  //         {
  //           role: "user",
  //           content: "Eminem is dead.",
  //         },
  //       ],
  //     });

  //     res.status(200).json({
  //       success: true,
  //       result: completion.choices[0].message.content,
  //     });
  //   } catch (error) {
  //     console.error("Error generating haiku:", error);
  //     res.status(500).json({
  //       success: false,
  //       error: "Failed to generate search parameter",
  //     });
  //   }
  try {
    // const response = await axios.post(
    //   "https://api.openai.com/v1/chat/completions",
    //   {
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: "eminem is dead" }],
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //     },
    //   }
    // );

    // const chatResponse = response.data.choices[0].message.content;
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      I'm investigating the claim that ${query} is false/misleading. Has this been proven false by reliable sources, or is there credible evidence supporting it? Please provide related articles or sources that either debunk or verify this information.
    `;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    res.json({ google: result.response.text() });
  } catch (error) {
    console.error("Error with ChatGPT API:", error);
    res
      .status(500)
      .json({ message: "Error generating response", error: error });
  }
};
