"use client";

import { CustomRecipe } from "@prisma/client";
import { useEffect, useState } from "react";
import { fetchUserRecipes } from "./actions";
import CustomRecipeCard from "../CustomRecipeCard";
import { deleteMyRecipe } from "../my-recipe/actions";

export default function UserRecipePage() {
  const [userRecipes, setUserRecipes] = useState<CustomRecipe[]>([]);
  useEffect(() => {
    async function getUserRecipes() {
      const userRecipes = await fetchUserRecipes();
      setUserRecipes(userRecipes);
    }
    getUserRecipes();
  }, []);

  const handleDeleteMyRecipe = async (id: number) => {
    deleteMyRecipe(id);
    const newRecipes = userRecipes.filter((recipe) => recipe.id !== id);
    setUserRecipes(newRecipes);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col pt-8 items-center min-h-screen w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userRecipes.map((customRecipe) => {
            return (
              <CustomRecipeCard
                key={customRecipe.id}
                customRecipe={customRecipe}
                handleDeleteMyRecipe={handleDeleteMyRecipe}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
