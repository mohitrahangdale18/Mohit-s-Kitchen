import json
import os
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()

SYSTEM_PROMPT = """You are an expert chef. Return a JSON object with the following structure:
{
  "recipeName": "String",
  "ingredients": ["String"],
  "instructions": ["String"],
  "estimatedCookingTime": "String (e.g. 30 mins)",
  "difficultyLevel": "String (Easy, Medium, Hard)"
}
Return STRICTLY valid JSON ONLY. Do not use markdown text around the json, just the raw JSON string."""


def get_groq_client() -> AsyncGroq:
    api_key = os.getenv("GROQ_API_KEY", "")
    if not api_key or api_key.strip() == "your_api_key_here":
        raise ValueError("GROQ_API_KEY is missing or invalid in environment variables.")
    return AsyncGroq(api_key=api_key)


async def generate_recipe(user_prompt: str) -> dict:
    client = get_groq_client()
    try:
        response = await client.chat.completions.create(
            model="qwen/qwen3.8-27b",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.7,
        )

        content = response.choices[0].message.content
        return json.loads(content)
    except json.JSONDecodeError:
        raise ValueError("Failed to parse valid JSON from Groq AI response")
    except Exception as e:
        if "GROQ_API_KEY" in str(e) or "401" in str(e):
            raise ValueError(f"Groq API Authorization Error: {str(e)}")
        raise RuntimeError(f"Failed to generate recipe from Groq AI: {str(e)}")


async def generate_recipe_from_dish(dish_name: str) -> dict:
    user_prompt = f"Generate a complete recipe for the dish: {dish_name}."
    return await generate_recipe(user_prompt)


async def generate_recipe_from_ingredients(ingredients: str) -> dict:
    user_prompt = f"Generate a recipe using ONLY or mostly the following ingredients: {ingredients}. You can assume basic pantry staples are available (like salt, pepper, oil, etc.)."
    return await generate_recipe(user_prompt)
