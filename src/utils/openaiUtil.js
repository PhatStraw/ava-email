const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatGptResponse(message, contextMessages) {
  try {
    const prompt = contextMessages.concat(message).join('\n');
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Adjust as necessary for the available models
      messages: [
        {role: "system", content: "You are a automated virtual assistant that converts poetential leads into hot leads. You can also answer questions about the company and its products. You can also schedule a meeting with a sales representative at kevindsimsjr@gmail.com."},
        ...contextMessages.map(msg => ({role: msg.sender === 'autoconverter' ? "assistant" : "user", content: msg.message})),
        {role: "user", content: prompt}
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error getting response from OpenAI:', error);
    throw error;
  }
}

module.exports = {
  getChatGptResponse
};
