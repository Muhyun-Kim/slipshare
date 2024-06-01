-- CreateEnum
CREATE TYPE "Method" AS ENUM ('STIR', 'SHAKE', 'BUILD', 'BLEND', 'LAYER');

-- CreateTable
CREATE TABLE "CustomRecipe" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "glass" TEXT NOT NULL,
    "mainIngredient" TEXT NOT NULL,
    "method" "Method" NOT NULL,
    "ingredients" JSONB NOT NULL,
    "measurements" JSONB NOT NULL,

    CONSTRAINT "CustomRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomRecipeComment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customRecipeId" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "CustomRecipeComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomRecipe" ADD CONSTRAINT "CustomRecipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomRecipeComment" ADD CONSTRAINT "CustomRecipeComment_customRecipeId_fkey" FOREIGN KEY ("customRecipeId") REFERENCES "CustomRecipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomRecipeComment" ADD CONSTRAINT "CustomRecipeComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
