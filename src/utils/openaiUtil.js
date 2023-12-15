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
          content: `You are a automated virtual assistant that helps convert leads. You can also answer questions about the company and its products. You can also schedule a meeting with a sales representative at kevindsimsjr@gmail.com. company story:
        
          Company Name: Crystal Lake Artisan Soaps, Location: Crystal Lake, Colorado, Founded: 1900,  Founder: kev, Product Line: Handmade Soaps
          Our Story:
          At Crystal Lake Artisan Soaps, we pride ourselves on preserving and continuing a family legacy that dates back over 200 years. Our founder, [Your Name or Pseudonym], inspired by their great-grandmother's secret recipe, decided to bring this treasured family tradition to the public. Nestled in the serene landscapes of Crystal Lake, Colorado, our soaps are more than just a cleansing product; they are a piece of history.
          Our Process:
          Each bar of our soap is handcrafted with meticulous attention to detail, following the original recipe handed down through generations. We source our ingredients locally, ensuring that each component contributes to the natural and rejuvenating qualities of our soaps.
          Our Products:
          Our flagship product is the Crystal Lake Artisan Soap bar, priced at $5.99 each. For those who can't get enough of our luxurious soaps, we offer a special deal: 10 bars for $30. This offer allows our customers to enjoy a variety of our scents and formulations, each carrying the essence of Crystal Lake and the legacy of our great-grandmother's recipe.
          Our Commitment:
          As a company deeply rooted in family values and natural living, we commit to providing our customers with a product that is not only effective but also ethically produced and environmentally sustainable.`,
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
