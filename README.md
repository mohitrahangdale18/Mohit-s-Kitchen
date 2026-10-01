# Mohit's Kitchen - AI Recipe Generator

A modern, responsive full-stack web application that generates structured cooking recipes based on either a dish name or available ingredients using Python FastAPI and Groq API (`llama-3.1-8b-instant` model).

## Tech Stack

- **Frontend:** React, Vite, Framer Motion, Lucide React, Vanilla CSS / Tailwind
- **Backend:** Python 3, FastAPI, Pydantic, Uvicorn, Groq Python SDK, python-dotenv
- **AI Integration:** Groq API (`llama-3.1-8b-instant` model)

## Project Structure

```
Mohit-s-Kitchen/
├── backend/
│   ├── main.py            # FastAPI entry point & app configuration
│   ├── config.py          # Environment settings loader
│   ├── requirements.txt   # Python package dependencies
│   ├── .env               # Environment variables (GROQ_API_KEY)
│   ├── .env.example       # Example environment variables template
│   ├── routes/
│   │   └── recipe.py      # APIRouter for /dish and /ingredients endpoints
│   ├── services/
│   │   └── groq_service.py# Groq Cloud API interaction & prompt logic
│   └── schemas/
│       └── recipe.py      # Pydantic request & response models
└── frontend/
    ├── src/
    │   ├── components/    # React components (RecipeInput, RecipeCard, Footer)
    │   ├── App.jsx        # Main application layout and state
    │   ├── index.css      # Global styles
    │   └── main.jsx       # React entry point
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## How to Run Locally

### Prerequisites

- **Python 3.10+** installed on your machine
- **Node.js** installed for running the frontend
- A **Groq API Key** (get one from [console.groq.com](https://console.groq.com))

---

### 1. Backend Setup (FastAPI)

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   - Create or edit the `.env` file inside the `backend` directory:
     ```env
     PORT=5000
     GROQ_API_KEY=your_actual_groq_api_key_here
     ```

4. Start the FastAPI backend server:
   ```bash
   uvicorn main:app --reload
   ```
   *The FastAPI server will start on `http://localhost:5000`.*
   *Interactive API documentation (Swagger UI) is available at `http://localhost:5000/docs`.*

---

### 2. Frontend Setup (React + Vite)

1. Open a new terminal and navigate to the `frontend` folder:
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
   *The React app will start on `http://localhost:5173`.*

---

## API Endpoints

- **`GET /`** - Root status endpoint (`{"message": "ChefGenie Backend is live and cooking! 🍳"}`)
- **`GET /health`** - Health check endpoint (`{"status": "ok"}`)
- **`POST /api/recipe/dish`** - Generate recipe by dish name (`{"dishName": "Pasta Carbonara"}`)
- **`POST /api/recipe/ingredients`** - Generate recipe by available ingredients (`{"ingredients": "Eggs, Cheese, Pasta, Black Pepper"}`)
- **`GET /docs`** - Interactive Swagger UI documentation
