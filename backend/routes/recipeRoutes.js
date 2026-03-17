const express = require('express');
const router = express.Router();
const { getRecipeByDish, getRecipeByIngredients } = require('../controllers/recipeController');

router.post('/dish', getRecipeByDish);
router.post('/ingredients', getRecipeByIngredients);

module.exports = router;
