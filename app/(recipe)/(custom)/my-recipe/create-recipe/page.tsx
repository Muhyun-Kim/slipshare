"use client";

import { createRecipe } from "./actions";
import useUserStore from "@/store/useUserStore";
import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

const methods = ["STIR", "SHAKE", "BUILD", "BLEND", "LAYER"];

export default function CreateRecipePage() {
  const user = useUserStore((state) => state.user);
  const [selectedMethod, setSelectedMethod] = useState<string>("Stir");
  const [ingredients, setIngredients] = useState([{ value: "" }]);
  const [measurements, setMeasurements] = useState([{ value: "" }]);
  const router = useRouter();

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
    }
  };

  const handleMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMethod(e.target.value);
  };

  const handleAddIngredientAndMeasurement = () => {
    setIngredients([...ingredients, { value: "" }]);
    setMeasurements([...measurements, { value: "" }]);
  };

  const handleIngredientChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newIngredients = ingredients.map((ingredient, i) =>
      i === index ? { value: e.target.value } : ingredient
    );
    setIngredients(newIngredients);
  };

  const handleMeasurementChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newMeasurements = measurements.map((measurement, i) =>
      i === index ? { value: e.target.value } : measurement
    );
    setMeasurements(newMeasurements);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const res = await createRecipe(formData, user!);
    if ("error" in res) {
      console.log(res.error);
    } else {
      router.push("/my-recipe");
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-1/2"
      >
        <input
          type="text"
          name="strDrink"
          placeholder="カクテル名"
          required
          className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        />
        <input
          type="file"
          name="cocktailImg"
          onChange={handleImg}
          accept="image/*"
        />
        <input
          type="text"
          name="glass"
          placeholder="Glass type"
          required
          className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        />
        <div className="flex flex-col gap-4 w-full">
          <input
            type="text"
            name="mainIngredient"
            placeholder="Main Ingredient"
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
          />
          <select
            name="method"
            value={selectedMethod}
            onChange={handleMethod}
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
          >
            <option value="" disabled></option>
            {methods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex flex-row w-full">
              <input
                type="text"
                name={`ingredients[${index}]`}
                value={ingredient.value}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Ingredients"
                className="bg-transparent rounded-md mr-4 w-1/2 h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
              />
              {measurements[index] && (
                <input
                  type="text"
                  name={`measurements[${index}]`}
                  value={measurements[index].value}
                  onChange={(e) => handleMeasurementChange(index, e)}
                  placeholder="Measurements"
                  className="bg-transparent rounded-md w-1/2 h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
                />
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddIngredientAndMeasurement}>
            <PlusCircleIcon className="h-12 w-12" />
          </button>
        </div>
        <button
          type="submit"
          className="border border-gray-300 rounded-lg hover:bg-gray-600 py-2 px-4"
        >
          作成
        </button>
      </form>
    </div>
  );
}
