"use client";

import { useEffect, useRef, useState } from "react";
import { fetchRecipeWithAlphabet } from "./actions";
import Link from "next/link";
import RecipeCard from "./recipe-card";

export default function Recipe() {
  const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  const [recipeData, setRecipeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchInitialRecipe = async () => {
      setLoading(true);
      const initialRecipe = await fetchRecipeWithAlphabet("a");
      setRecipeData(initialRecipe);
      setLoading(false);
      console.log(initialRecipe);
    };
    fetchInitialRecipe();
  }, []);

  const fetchMoreRecipe = async () => {
    if (currentIndex < alphabets.length - 1) {
      setLoading(true);
      const nextIndex = currentIndex + 1;
      const newRecipes = await fetchRecipeWithAlphabet(alphabets[nextIndex]);
      setRecipeData((prev: any[]) => [...prev, ...newRecipes]);
      setCurrentIndex(nextIndex);
      setLoading(false);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchMoreRecipe();
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef.current, loading]);
  return (
    <div className="flex">
      <div className="flex flex-col pt-8 ml-8 items-center min-h-screen w-5/6">
        {recipeData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipeData.map((drink: any) => (
              <Link href={`/recipe/detail/${drink.idDrink}`}>
                <RecipeCard {...drink} />
              </Link>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div
          ref={loaderRef}
          className="h-10 w-full flex justify-center items-center"
        >
          {loading && <p>Loading more...</p>}
        </div>
      </div>
      <div className="fixed top-1/5 right-4">
        <div className="grid grid-cols-2">
          {alphabets.map((alphabet) => (
            <button
              key={alphabet}
              className="text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none"
            >
              {alphabet.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
