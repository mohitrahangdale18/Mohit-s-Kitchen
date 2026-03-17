require('dotenv').config();
const express = require('express');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'ChefGenie Backend is live and cooking! 🍳' });
});

app.use('/api/recipe', recipeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
