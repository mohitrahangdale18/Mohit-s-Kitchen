# AI Recipe Generator

A modern, responsive web application that generates cooking recipes based on either a dish name or available ingredients using the Groq API (LLaMA 3).

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express, Axios
- **AI Integration:** Groq API (`llama3-8b-8192` model)

## Project Structure
```
project/
├── backend/
│   ├── controllers/      # Route handlers (recipeController.js)
│   ├── routes/           # Express routes (recipeRoutes.js)
│   ├── services/         # External API integrations (groqService.js)
│   ├── index.js          # Express server entry point
│   ├── package.json      
│   ├── .env              # Environment variables (API Key)
│   └── .env.example      # Example environment variables
└── frontend/
    ├── src/
    │   ├── components/   # React components (RecipeInput, RecipeCard)
    │   ├── App.jsx       # Main application layout and state
    │   ├── index.css     # Global styles and Tailwind imports
    │   └── main.jsx      # React entry point
    ├── index.html
    ├── package.json
    ├── tailwind.config.js # Tailwind CSS configuration
    └── vite.config.js
```

## How to Run Locally

### Prerequisites
- Node.js installed on your machine
- A Groq API Key (get one from [console.groq.com](https://console.groq.com))

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Ensure you have a `.env` file in the `backend` directory.
   - It should contain your Groq API key and Port:
     ```env
     GROQ_API_KEY=your_actual_api_key_here
     PORT=5000
     ```
4. Start the backend server:
   ```bash
   node index.js
   ```
   *The server should now be running on `http://localhost:5000`.*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend should now be running, typically on `http://localhost:5173`. Open this URL in your browser.*

## Suggestions for Future Improvements
1. **User Authentication:** Allow users to sign up and save their favorite generated recipes.
2. **Export functionality:** Add "Download as PDF" or "Print Recipe" buttons.
3. **Dietary Preferences & Allergies:** Allow users to toggle filters like "Vegan", "Gluten-Free", or specify allergies which get appended to the AI prompt.
4. **Image Generation:** Integrate an AI Image Generator (like DALL-E or Midjourney via API) to generate a picture of the finished dish.
5. **Loading Skeletons:** Implement shimmer effects/skeleton loaders while waiting for the Groq API response.
6. **Mobile App:** Package the frontend using React Native or Capacitor for a mobile-native experience.
