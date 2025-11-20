const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ==== Contoh untuk OpenAI ====
app.post("/api/chat", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const result = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
  model: "gpt-3.5-turbo",
  temperature: 0.9,   // 🔥 buat variasi jawabannya
  messages: [
    { role: "system", content: "Jawablah dengan gaya kasual, bervariasi, dan tidak selalu menggunakan format yang sama." }
,
    { role: "user", content: prompt }
  ]
},
      {
        headers: {
          Authorization: `Bearer YOUR_API_KEY`
        }
      }
    );

    res.json({ reply: result.data.choices[0].message.content });
  } catch (err) {
    res.json({ reply: "Error: " + err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
