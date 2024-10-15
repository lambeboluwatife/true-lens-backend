const axios = require("axios");
const dotenv = require("dotenv");
const OpenAI = require("openai");
dotenv.config({ path: "./src/config/config.env" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.openAISearch = async (req, res) => {
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
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "eminem is dead" }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const chatResponse = response.data.choices[0].message.content;

    res.json({ message: chatResponse });
  } catch (error) {
    console.error("Error with ChatGPT API:", error);
    res
      .status(500)
      .json({ message: "Error generating response", error: error });
  }
};
