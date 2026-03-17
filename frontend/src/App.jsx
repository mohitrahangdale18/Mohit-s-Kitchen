import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat } from 'lucide-react';
import RecipeInput from './components/RecipeInput';
import RecipeCard from './components/RecipeCard';
import Footer from './components/Footer';

// Standardize the API URL: remove trailing slash if present
const RAW_API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = RAW_API_URL.endsWith('/') ? RAW_API_URL.slice(0, -1) : RAW_API_URL;

const SkeletonLoader = () => (
  <div className="skeleton animate-pulse" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div className="skeleton-box" style={{ height: '4rem', width: '75%', marginBottom: '2rem' }}></div>
    <div className="flex justify-center" style={{ gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
      <div className="skeleton-box" style={{ height: '3rem', width: '8rem', borderRadius: '1rem' }}></div>
      <div className="skeleton-box" style={{ height: '3rem', width: '8rem', borderRadius: '1rem' }}></div>
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
        gap: '2rem',
        width: '100%'
      }}
      className="md-grid-cols-12"
    >
      <div style={{ padding: '1rem' }}>
        <div className="skeleton-box" style={{ height: '1.5rem', width: '50%', marginBottom: '2rem' }}></div>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="skeleton-box" style={{ height: '1rem', width: '90%', marginBottom: '1rem', opacity: 0.5 }}></div>
        ))}
      </div>
      <div style={{ padding: '1rem' }}>
        <div className="skeleton-box" style={{ height: '1.5rem', width: '25%', marginBottom: '2rem' }}></div>
        {[1, 2].map(i => (
          <div key={i} className="skeleton-box" style={{ height: '5rem', width: '100%', marginBottom: '1.5rem', borderRadius: '1rem', opacity: 0.5 }}></div>
        ))}
      </div>
    </div>
  </div>
);

function App() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateRecipe = async (mode, inputValue) => {
    setLoading(true);
    setError('');
    setRecipe(null);

    try {
      const endpoint = mode === 'dish' ? '/dish' : '/ingredients';
      const payload = mode === 'dish' ? { dishName: inputValue } : { ingredients: inputValue };

      // Ensure the URL contains /api/recipe correctly
      const finalUrl = API_BASE_URL.includes('/api/recipe')
        ? `${API_BASE_URL}${endpoint}`
        : `${API_BASE_URL}/api/recipe${endpoint}`;

      const response = await axios.post(finalUrl, payload);
      setRecipe(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate recipe. Please try again.');
    } finally {
      // Small artificial delay for transition smoothness
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-28 pb-32 px-4 relative z-10" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        {/* Background decorative blob */}
        <div className="bg-blob" />

        <div className="mx-auto flex flex-col items-center" style={{ maxWidth: '48rem' }}>
          {/* Hero Section */}
          <div className="text-center" style={{ marginBottom: '5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="logo-container"
              style={{ justifyContent: 'center', marginBottom: '2rem' }}
            >
              <div className="logo-icon">
                <ChefHat size={24} strokeWidth={2.5} />
              </div>
              <span className="logo-text" style={{ fontSize: '1.5rem' }}>Mohit's Kitchen</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="hero-title"
            >
              Master Any Meal <br style={{ display: 'none' }} />
              <span className="text-green">By Just Entering Items</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-subtitle"
            >
              Zero effort, infinite recipes. Turn the simple items in your kitchen into gourmet dishes with our advanced AI chef.
            </motion.p>
          </div>

          {/* Form Section */}
          <div style={{ width: '100%' }}>
            <RecipeInput onGenerate={handleGenerateRecipe} loading={loading} />
          </div>

          {/* Results Section */}
          <div style={{ width: '100%' }}>
            <AnimatePresence mode="wait">
              {loading && <SkeletonLoader key="skeleton" />}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="error-card"
                >
                  <p style={{ fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.25rem' }}>Ouch! Something went wrong.</p>
                  <p style={{ opacity: 0.8 }}>{error}</p>
                </motion.div>
              )}

              {recipe && !loading && (
                <RecipeCard key="recipe" recipe={recipe} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
