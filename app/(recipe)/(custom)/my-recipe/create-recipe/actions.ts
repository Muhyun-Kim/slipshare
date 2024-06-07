"use server";

import prisma from "@/lib/prisma";
import supabase from "@/lib/supabase";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function createRecipe(formData: FormData, user: User) {
  const inputData: Record<string, any> = {
    strDrink: formData.get("strDrink"),
    cocktailImg: formData.get("cocktailImg"),
    glass: formData.get("glass"),
    mainIngredient: formData.get("mainIngredient"),
    method: formData.get("method"),
    ingredients: [],
    measurements: [],
  };

  formData.forEach((value, key) => {
    if (key.startsWith("ingredients[")) {
      inputData.ingredients.push(value);
    } else if (key.startsWith("measurements[")) {
      inputData.measurements.push(value);
    }
  });

  const cocktailImg = formData.get("cocktailImg") as File;

  let imageUrl = "";

  if (cocktailImg.size > 0) {
    const randomFileName = `${uuidv4()}-${cocktailImg.name}`;
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${user.userId}/cocktailImg/${randomFileName}`, cocktailImg);
    if (error) {
      console.error("Error uploading image:", error);
      return { error: "Image upload failed" };
    }
    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
  }

  inputData.cocktailImg = imageUrl;

  try {
    const newRecipe = await prisma.customRecipe.create({
      data: {
        authorId: user.userId,
        cocktailName: inputData.strDrink,
        cocktailImg: inputData.cocktailImg,
        glass: inputData.glass,
        mainIngredient: inputData.mainIngredient,
        method: inputData.method,
        ingredients: inputData.ingredients,
        measurements: inputData.measurements,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Failed to create recipe" };
  }
}
