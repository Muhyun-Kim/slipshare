import Image from "next/image";
import { CustomRecipe } from "@prisma/client";
import { MinusCircleIcon } from "@heroicons/react/20/solid";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CustomRecipeCardProps {
  customRecipe: CustomRecipe;
  handleDeleteMyRecipe: (id: number) => void;
}

export default function CustomRecipeCard({
  customRecipe,
  handleDeleteMyRecipe,
}: CustomRecipeCardProps) {
  const user = useUserStore((state) => state.user!);
  const router = useRouter();

  return (
    <Link href={`/user-recipe/${customRecipe.id}`}>
      <div className="flex flex-col justify-around p-4 bg-white rounded-lg shadow-md h-full w-full max-w-md">
        <div className="flex justify-end">
          {user.userId === customRecipe.authorId ? (
            <button onClick={() => handleDeleteMyRecipe(customRecipe.id)}>
              <MinusCircleIcon className="h-8 w-8 text-red-500" />
            </button>
          ) : (
            <></>
          )}
        </div>
        {customRecipe.cocktailImg !== "" ? (
          <>
            <img
              src={customRecipe.cocktailImg!}
              alt={customRecipe.cocktailName}
              className="w-full h-auto mb-4 rounded-md"
            />
          </>
        ) : (
          <>
            <Image
              src="/image/sample-cocktail.png"
              alt={customRecipe.cocktailName}
              width={50}
              height={50}
              className="w-auto h-auto mb-4 rounded-md"
            />
          </>
        )}
        <span className="text-xl text-black font-semibold mb-2">
          {customRecipe.cocktailName}
        </span>
      </div>
    </Link>
  );
}
