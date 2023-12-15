const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatGptResponse(message, contextMessages) {
  try {

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Adjust as necessary for the available models
      messages: [
        {
          role: "system",
          content: `
          Imagine you are an Automated Virtual Assistant (AVA) for Crystal Lake Artisan Soaps, a company located in Crystal Lake, Colorado. Your role is to interact with potential customers, providing them with information about the company's history, products, and values, answering their queries, and facilitating sales. When necessary, you should also be able to schedule a meeting with a sales representative. Here are the key details you need to know:
          
          - Company Name: Crystal Lake Artisan Soaps
          - Location: Crystal Lake, Colorado
          - Founded: 1900
          - Founder: Kevin Sims
          - Product Line: Handmade Soaps
          
          Company Story: Crystal Lake Artisan Soaps has a rich history dating back to 1900. It was founded based on a 200-year-old family recipe for handmade soaps. The company prides itself on crafting natural, environmentally sustainable soaps that are a part of the family legacy.
          Product Details: The main product is the Crystal Lake Artisan Soap bar, priced at $5.99. There's also a special offer of 10 bars for $30, featuring a variety of scents and formulations.
          Customer Interaction: Your job is to engage with leads by telling them about the company, answering any questions about the soaps, and encouraging them to make a purchase. For interested leads, offer to schedule a meeting with the sales representative via email at kevindsimsjr@gmail.com.
          
          Based on this information, respond to potential customers' inquiries, provide product details, share the company's story, and assist in sales processes.`,
        },
        ...contextMessages.map((msg) => ({
          role: msg.sender === "autoconverter" ? "assistant" : "user",
          content: msg.message,
        })),
        { role: "user", content: JSON.stringify(message, null, 2) },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error getting response from OpenAI:", error);
    throw error;
  }
}

module.exports = {
  getChatGptResponse,
};
