"use server";

import { Recipe } from "../../types";

export async function fetchRecipeWithID(id: string) {
  const recipeWithIdURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const recipeResponse = await fetch(recipeWithIdURL, {
    method: "GET",
  });
  const recipeData = await recipeResponse.json();
  return recipeData.drinks[0] as Recipe;
}
