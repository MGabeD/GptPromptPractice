const openai = require('../utils/openai');
// Alternatively: const openai = require('../index').openai;

exports.gpt = async (req, res) => {
  try {
    const prompt = req.body.prompt;

    // Log the user prompt on the server screen
    console.log(`User prompt: ${prompt}`);

    const response = await openai.Completion.create({
      engine: "davinci-codex",
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    res.json(response.choices[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
};
