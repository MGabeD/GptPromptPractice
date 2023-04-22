// const openai = require('openai');
const { TOKEN } = require('../utils/token');

// openai.apiKey = TOKEN;
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: TOKEN,
});
const openai = new OpenAIApi(configuration);

exports.gpt = async (req, res) => {
  console.log(TOKEN);
  try {
    const prompt = req.body.prompt;
    const context = req.body.context;

    // Log the user prompt and context on the server screen
    console.log(`User prompt: ${prompt}`);
    console.log(`Context: ${context}`);

    const promptWithCtx = context ? `${context}\n${prompt}` : prompt;

    // const response = await openai.Completion.create({
    //   engine: "davinci-codex",
    //   prompt: promptWithCtx,
    //   maxTokens: 50,
    //   n: 1,
    //   stop: null,
    //   temperature: 0.5,
    // }, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${TOKEN}`,
    //     "OpenAI-Organization": "YOUR_ORG_ID"
    //   }
    // });
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

    res.json(response.choices[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
};
