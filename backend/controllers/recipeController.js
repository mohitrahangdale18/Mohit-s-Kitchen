const { generateRecipeFromDish, generateRecipeFromIngredients } = require('../services/groqService');

const getRecipeByDish = async (req, res) => {
    try {
        const { dishName } = req.body;
        if (!dishName) {
            return res.status(400).json({ error: 'Dish name is required' });
        }
        const recipe = await generateRecipeFromDish(dishName);
        res.json(recipe);
    } catch (error) {
        console.error('Error generating recipe by dish:', error.message);
        res.status(500).json({ error: 'Error generating recipe', details: error.message });
    }
};

const getRecipeByIngredients = async (req, res) => {
    try {
        const { ingredients } = req.body;
        if (!ingredients) {
            return res.status(400).json({ error: 'Ingredients are required' });
        }
        const recipe = await generateRecipeFromIngredients(ingredients);
        res.json(recipe);
    } catch (error) {
        console.error('Error generating recipe by ingredients:', error.message);
        res.status(500).json({ error: 'Error generating recipe', details: error.message });
    }
};

module.exports = { getRecipeByDish, getRecipeByIngredients };
