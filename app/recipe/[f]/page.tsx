"use client";

import { useEffect, useState } from "react";
import { fetchRecipeWithAlphabet } from "./actions";
import Recipe from "./recipe";
import Link from "next/link";

export default function RecipeDetailWithAlphabet({
  params: { f },
}: {
  params: { f: string };
}) {
  const [recipeData, setRecipeData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecipeWithAlphabet(f);
      setRecipeData(data);
    };
    fetchData();
  }, [f]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col pt-8 items-center min-h-screen w-3/4">
        <h1 className="text-3xl font-bold mb-6">
          {f?.toString().toUpperCase()}
        </h1>
        {recipeData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipeData.drinks.map((drink: any) => (
              <Link href={`/recipe/detail/${drink.idDrink}`}>
                <Recipe {...drink} />
              </Link>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
