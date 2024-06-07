"use client";

import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/20/solid";
import { CustomRecipe } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteMyRecipe, fetchMyRecipes } from "./actions";
import useUserStore from "@/store/useUserStore";
import Image from "next/image";

export default function MyRecipePage() {
  const [myRecipes, setMyRecipes] = useState<CustomRecipe[]>([]);
  const user = useUserStore((state) => state.user!);

  useEffect(() => {
    async function getMyRecipes() {
      const myRecipes = await fetchMyRecipes(user);
      setMyRecipes(myRecipes);
    }
    getMyRecipes();
  }, []);

  const handleDeleteMyRecipe = async (id: number) => {
    deleteMyRecipe(id);
    const newRecipes = myRecipes.filter((recipe) => recipe.id !== id);
    setMyRecipes(newRecipes);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col pt-8 items-center min-h-screen w-3/4">
        <Link href="/my-recipe/create-recipe" className="mb-8">
          <button>
            <PlusCircleIcon className="h-12 w-12" />
          </button>
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {myRecipes.map((customRecipe) => {
            return (
              <div className="flex flex-col justify-around p-4 bg-white rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-end">
                  <button onClick={() => handleDeleteMyRecipe(customRecipe.id)}>
                    <MinusCircleIcon className="h-8 w-8 text-red-500" />
                  </button>
                </div>
                {customRecipe.cocktailImg !== "" ? (
                  <>
                    <img
                      src={customRecipe.cocktailImg!}
                      alt={customRecipe.cocktailName}
                      className="w-full h-auto mb-4 rounded-md"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src="/image/sample-cocktail.png"
                      alt={customRecipe.cocktailName}
                      width={50}
                      height={50}
                      className="w-full h-auto mb-4 rounded-md"
                    />
                  </>
                )}
                <span className="text-xl text-black font-semibold mb-2">
                  {customRecipe.cocktailName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
