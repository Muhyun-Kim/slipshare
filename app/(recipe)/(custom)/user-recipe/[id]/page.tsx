"use client";

import { CustomRecipe } from "@prisma/client";
import { useEffect, useState } from "react";
import { fetchUserRecipeWithID } from "./actions";
import { fetchRecipeWithID } from "@/app/(recipe)/recipe/detail/[id]/actions";
import useUserStore from "@/store/useUserStore";
import { deleteMyRecipe } from "../../my-recipe/actions";
import { useRouter } from "next/navigation";

export default function UserRecipeWithID({
  params: { id },
}: {
  params: { id: string };
}) {
  const [recipeData, setRecipeData] = useState<CustomRecipe | null>(null);
  const [isMyRecipe, setIsMyRecipe] = useState<boolean>(false);
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await fetchUserRecipeWithID(Number(id));
      setRecipeData(data);
      if (data) {
        setIsMyRecipe(user!.userId == data.authorId);
      }
    };
    fetchRecipe();
  }, []);
  const handleDeleteRecipe = async () => {
    await deleteMyRecipe(Number(id));
    router.push("/user-recipe");
  };
  return (
    <>
      {recipeData ? (
        <div className="flex justify-center">
          <div className="flex p-4 w-2/3 bg-white rounded-lg shadow-md *:text-black">
            {/* 左ページ */}
            <div className="w-1/2 p-4">
              <span className="text-2xl font-semibold mb-2 block">
                {recipeData.cocktailName}
              </span>
              <img
                src={
                  recipeData.cocktailImg
                    ? recipeData.cocktailImg
                    : "/image/sample-cocktail.png"
                }
                alt={recipeData.cocktailName}
              />
            </div>
            {/* 右ページ */}
            <div className="w-1/2 p-4">
              <div className="h-5/6">
                <h2 className="text-xl font-semibold mb-2">作り方</h2>
                <p className="text-gray-700 mb-4">{recipeData.method}</p>
                <h3 className="text-lg font-semibold mb-2">材料</h3>
                <ul>
                  {Array.from(
                    { length: recipeData.ingredients.length },
                    (_, i) => i + 1
                  ).map((index) => {
                    const ingredient = recipeData.ingredients[index];
                    const measure = recipeData.measurements[index];
                    if (ingredient && measure) {
                      return (
                        <li key={index} className="mb-2">
                          {ingredient}: {measure}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              {isMyRecipe ? (
                <div className="flex justify-end items-end h-1/6">
                  <button className="px-2 py-1 mr-2 bg-blue-600 text-white border-1 rounded-md hover:bg-blue-300">
                    編集
                  </button>
                  <button
                    className="px-2 py-1 bg-red-600 text-white border-1 rounded-md hover:bg-red-300"
                    type="button"
                    onClick={handleDeleteRecipe}
                  >
                    削除
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
