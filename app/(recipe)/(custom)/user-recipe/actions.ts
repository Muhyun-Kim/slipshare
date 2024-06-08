"use server";

import prisma from "@/lib/prisma";

export async function fetchUserRecipes() {
  const userRecipes = prisma.customRecipe.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return userRecipes;
}
