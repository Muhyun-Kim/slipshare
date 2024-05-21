"use client";

import { useRouter } from "next/navigation";

export default function Recipe() {
  const router = useRouter();
  const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");

  const handleAlphabetClick = (alphabet: string) => {
    router.push(`/recipe/${alphabet}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">最初のアルファベットを選択</h1>
      <div className="grid grid-cols-6 gap-4">
        {alphabets.map((alphabet) => (
          <button
            key={alphabet}
            onClick={() => handleAlphabetClick(alphabet)}
            className="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none"
          >
            {alphabet.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
