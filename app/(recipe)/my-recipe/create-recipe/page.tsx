"use client";

import { useFormState } from "react-dom";
import { createRecipe } from "./actions";

export default function CreateRecipePage() {
  const [state, dispatch] = useFormState(createRecipe, null);
  return (
    <div className="flex justify-center">
      <form
        action={dispatch}
        className="flex flex-col items-center gap-4 w-1/2"
      >
        <input
          type="text"
          name="strDrink"
          placeholder="カクテル名"
          className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        />
        <input type="text" />
      </form>
    </div>
  );
}
