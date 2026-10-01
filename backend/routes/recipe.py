from fastapi import APIRouter, HTTPException, status
from schemas.recipe import DishRequest, IngredientsRequest, RecipeResponse
from services.groq_service import generate_recipe_from_dish, generate_recipe_from_ingredients

router = APIRouter(prefix="/api/recipe", tags=["Recipe"])


@router.post("/dish", response_model=RecipeResponse)
async def get_recipe_by_dish(payload: DishRequest):
    if not payload.dishName or not payload.dishName.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Dish name is required"
        )
    try:
        recipe = await generate_recipe_from_dish(payload.dishName)
        return recipe
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating recipe: {str(e)}"
        )


@router.post("/ingredients", response_model=RecipeResponse)
async def get_recipe_by_ingredients(payload: IngredientsRequest):
    if not payload.ingredients or not payload.ingredients.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ingredients are required"
        )
    try:
        recipe = await generate_recipe_from_ingredients(payload.ingredients)
        return recipe
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating recipe: {str(e)}"
        )
