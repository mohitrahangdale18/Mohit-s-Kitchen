import React, { useState } from 'react';
import { ChefHat, Carrot, Loader2, Sparkles, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RecipeInput = ({ onGenerate, loading }) => {
  const [mode, setMode] = useState('dish'); // 'dish' or 'ingredients'
  const [dishValue, setDishValue] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (currentIngredient.trim() && !ingredientList.includes(currentIngredient.trim())) {
      setIngredientList([...ingredientList, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (ing) => {
    setIngredientList(ingredientList.filter(item => item !== ing));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddIngredient(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'dish') {
      onGenerate('dish', dishValue);
    } else {
      onGenerate('ingredients', ingredientList.join(', '));
    }
  };

  const isSubmitDisabled = loading || (mode === 'dish' ? !dishValue.trim() : ingredientList.length === 0);

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="input-card"
    >
      {/* Mode Toggle */}
      <div className="mode-toggle">
        <div className="toggle-container">
          {/* Animated Background Pill */}
          <div 
            className="active-bg"
            style={{ 
              width: 'calc(50% - 0.375rem)',
              transform: mode === 'dish' ? 'translateX(0)' : 'translateX(100%)'
            }}
          />
          <button
            onClick={() => setMode('dish')}
            className={`toggle-btn ${mode === 'dish' ? 'active' : ''}`}
          >
            <ChefHat size={18} strokeWidth={2.5} />
            Dish Name
          </button>
          <button
            onClick={() => setMode('ingredients')}
            className={`toggle-btn ${mode === 'ingredients' ? 'active' : ''}`}
          >
            <Carrot size={18} strokeWidth={2.5} />
            Ingredients
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <AnimatePresence mode="wait">
          {mode === 'dish' ? (
            <motion.div 
              key="dish-input"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className="input-container"
            >
              <div className="input-icon">
                <ChefHat size={22} strokeWidth={2} />
              </div>
              <input
                type="text"
                className="text-input"
                placeholder="What are you craving? (e.g., Pasta)"
                value={dishValue}
                onChange={(e) => setDishValue(e.target.value)}
                disabled={loading}
              />
            </motion.div>
          ) : (
            <motion.div
              key="ingredients-input"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div className="input-container">
                <div className="input-icon">
                  <Carrot size={22} strokeWidth={2} />
                </div>
                <input
                  type="text"
                  className="text-input"
                  style={{ paddingRight: '6rem' }}
                  placeholder="Enter an ingredient..."
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
                <button 
                  onClick={handleAddIngredient}
                  disabled={!currentIngredient.trim() || loading}
                  className="add-btn"
                >
                  <Plus size={22} strokeWidth={2.5} />
                </button>
              </div>
              
              {/* Ingredient Chips Area */}
              <div className="chip-container">
                {ingredientList.length === 0 ? (
                  <span style={{ color: 'var(--brand-gray)', fontWeight: '500', fontSize: '0.875rem', alignSelf: 'center', padding: '0 0.5rem' }}>
                    No ingredients added yet.
                  </span>
                ) : (
                  <AnimatePresence>
                    {ingredientList.map(ing => (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        key={ing}
                        className="chip"
                      >
                        {ing}
                        <button 
                          onClick={() => handleRemoveIngredient(ing)}
                          className="chip-remove"
                        >
                          <X size={16} strokeWidth={3} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: isSubmitDisabled ? 1 : 1.01 }}
          whileTap={{ scale: isSubmitDisabled ? 1 : 0.98 }}
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="generate-btn"
        >
          {loading ? (
            <>
              <Loader2 size={22} style={{ animation: 'pulse 1s linear infinite' }} />
              <span>Gathering Ingredients...</span>
            </>
          ) : (
            <>
              <Sparkles size={22} color="rgba(255,255,255,0.9)" />
              <span>Generate Recipe</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RecipeInput;
