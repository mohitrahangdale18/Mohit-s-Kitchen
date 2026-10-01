import sys
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException, RequestValidationError

# Ensure backend directory is in python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from routes.recipe import router as recipe_router
from config import PORT

app = FastAPI(
    title="ChefGenie API - Mohit's Kitchen",
    description="FastAPI Backend for AI Recipe Generation powered by Groq & Llama 3.1",
    version="1.0.0"
)

# Configure CORS for React frontend communication
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Exception handler to return {"error": "..."} format expected by React frontend
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail}
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400,
        content={"error": "Invalid request body", "details": str(exc)}
    )


@app.get("/")
async def root():
    return {"message": "ChefGenie Backend is live and cooking! 🍳"}


@app.get("/health")
async def health():
    return {"status": "ok"}


app.include_router(recipe_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)
