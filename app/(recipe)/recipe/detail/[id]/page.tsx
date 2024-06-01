"use client";

import { useEffect, useState } from "react";
import { fetchRecipeWithID } from "./actions";
import { Recipe } from "../../types";

export default function RecipeDetailWithID({
  params: { id },
}: {
  params: { id: string };
}) {
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecipeWithID(id);
      setRecipeData(data);
    };
    fetchData();
  }, [id]);
  console.log(recipeData);
  return (
    <>
      {recipeData ? (
        <div className="flex justify-center">
          <div className="flex p-4 w-2/3 bg-white rounded-lg shadow-md *:text-black">
            {/* 左ページ */}
            <div className="w-1/2 p-4">
              <span className="text-2xl font-semibold mb-2 block">
                {recipeData.strDrink}
              </span>
              <img
                src={recipeData.strDrinkThumb}
                alt={recipeData.strDrink}
                className="w-full h-auto my-4 rounded-md"
              />
            </div>
            {/* 右ページ */}
            <div className="w-1/2 p-4">
              <h2 className="text-xl font-semibold mb-2">作り方</h2>
              <p className="text-gray-700 mb-4">{recipeData.strInstructions}</p>
              <h3 className="text-lg font-semibold mb-2">材料</h3>
              <ul>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((index) => {
                  const ingredient = recipeData[`strIngredient${index}`];
                  const measure = recipeData[`strMeasure${index}`];
                  if (ingredient && measure) {
                    return (
                      <li key={index} className="mb-2">
                        {ingredient}: {measure}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
