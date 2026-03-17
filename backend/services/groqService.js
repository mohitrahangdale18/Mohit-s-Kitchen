const axios = require('axios');

const generateRecipe = async (prompt) => {
    const systemPrompt = `You are an expert chef. Return a JSON object with the following structure:
{
  "recipeName": "String",
  "ingredients": ["String"],
  "instructions": ["String"],
  "estimatedCookingTime": "String (e.g. 30 mins)",
  "difficultyLevel": "String (Easy, Medium, Hard)"
}
Return STRICTLY valid JSON ONLY. Do not use markdown text around the json, just the raw JSON string.`;

    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.1-8b-instant',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt }
                ],
                response_format: { type: "json_object" },
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        let content = response.data.choices[0].message.content;
        return JSON.parse(content);
    } catch (error) {
        console.error('Groq API Error:', error.response?.data || error.message);
        throw new Error('Failed to generate recipe from Groq AI');
    }
};

module.exports = {
    generateRecipeFromDish: async (dishName) => {
        const userPrompt = `Generate a complete recipe for the dish: ${dishName}.`;
        return await generateRecipe(userPrompt);
    },
    generateRecipeFromIngredients: async (ingredients) => {
        const userPrompt = `Generate a recipe using ONLY or mostly the following ingredients: ${ingredients}. You can assume basic pantry staples are available (like salt, pepper, oil, etc.).`;
        return await generateRecipe(userPrompt);
    }
};
