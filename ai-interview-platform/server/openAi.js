const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const analyzeTextResponse = async (text) => {
  try {
    const prompt = `Analyze the following candidate response and provide insights on clarity, relevance, and technical accuracy:\n\n${text}`;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 100,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to analyze response');
  }
};

module.exports = { analyzeTextResponse };