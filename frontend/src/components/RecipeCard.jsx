import React from 'react';
import { Clock, Flame, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="recipe-card"
    >
      {/* Header Section */}
      <div className="recipe-header">
        <h2 className="recipe-title">
          {recipe.recipeName || 'Culinary Creation'}
        </h2>
        
        <div className="meta-container">
          <div className="meta-pill">
            <Clock size={18} className="text-green" strokeWidth={2.5}/>
            <span style={{ color: 'var(--brand-black)' }}>{recipe.estimatedCookingTime || 'Unknown Time'}</span>
          </div>
          <div className="meta-pill">
            <Flame size={18} strokeWidth={2.5} style={{ color: 
              recipe.difficultyLevel?.toLowerCase() === 'easy' ? 'var(--brand-green)' :
              recipe.difficultyLevel?.toLowerCase() === 'medium' ? '#f59e0b' : '#f43f5e'
            }} />
            <span style={{ color: 'var(--brand-black)', textTransform: 'capitalize' }}>
              {recipe.difficultyLevel || 'Medium'}
            </span>
          </div>
        </div>
      </div>

      <div className="recipe-content">
        
        {/* Ingredients Section */}
        <div className="ingredients-section">
          <h3 className="section-title">Ingredients</h3>
          <ul className="ingredient-list">
            {recipe.ingredients?.map((ingredient, idx) => (
              <motion.li 
                key={idx} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (idx * 0.05) }}
                className="ingredient-item"
              >
                <div className="text-green" style={{ flexShrink: 0, display: 'flex' }}>
                  <CheckCircle2 size={20} strokeWidth={2.5} />
                </div>
                <span>{ingredient}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div className="instructions-section">
          <h3 className="section-title">Instructions</h3>
          <ol className="instruction-list">
            {recipe.instructions?.map((step, idx) => (
              <motion.li 
                key={idx} 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (idx * 0.05) }}
                className="instruction-item"
              >
                <div className="step-number">
                  {idx + 1}
                </div>
                <p className="instruction-text">
                  {step}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
        
      </div>
    </motion.div>
  );
};

export default RecipeCard;
