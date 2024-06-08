"use server";

import prisma from "@/lib/prisma";
import { CustomRecipe, User } from "@prisma/client";

export async function fetchMyRecipes(user: User) {
  const recipes = await prisma.customRecipe.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      authorId: user.userId,
    },
  });
  return recipes;
}

export async function deleteMyRecipe(id: number) {
  const recipe = await prisma.customRecipe.delete({
    where: {
      id: id,
    },
  });
  return recipe;
}
