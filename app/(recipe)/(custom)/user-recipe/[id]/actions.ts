"use server";

import prisma from "@/lib/prisma";

export async function fetchUserRecipeWithID(recipeId: number) {
  const userRecipeWithID = await prisma.customRecipe.findUnique({
    where: {
      id: recipeId,
    },
  });
  return userRecipeWithID;
}
