from typing import List, Optional
from pydantic import BaseModel, Field


class DishRequest(BaseModel):
    dishName: str = Field(..., description="Name of the dish to generate a recipe for")


class IngredientsRequest(BaseModel):
    ingredients: str = Field(..., description="Available ingredients string")


class RecipeResponse(BaseModel):
    recipeName: str
    ingredients: List[str]
    instructions: List[str]
    estimatedCookingTime: str
    difficultyLevel: str


class ErrorResponse(BaseModel):
    error: str
    details: Optional[str] = None
