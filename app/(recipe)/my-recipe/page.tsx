"use client";

import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function MyRecipePage() {
  return (
    <div className="flex flex-col items-center">
      <Link href="/my-recipe/create-recipe">
        <button>
          <PlusCircleIcon className="h-12 w-12" />
        </button>
      </Link>
    </div>
  );
}
