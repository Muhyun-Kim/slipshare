"use server";

export async function fetchRecipeWithAlphabet(alphabet: string) {
  const recipeWithAlphabetURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${alphabet}`;
  const recipeResponse = await fetch(recipeWithAlphabetURL, {
    method: "GET",
  });
  const recipeData = await recipeResponse.json();
  return recipeData.drinks;
}
