/*
  Warnings:

  - You are about to drop the column `image` on the `CustomRecipe` table. All the data in the column will be lost.
  - The `ingredients` column on the `CustomRecipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `measurements` column on the `CustomRecipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CustomRecipe" DROP COLUMN "image",
ADD COLUMN     "cocktailImg" TEXT,
DROP COLUMN "ingredients",
ADD COLUMN     "ingredients" TEXT[],
DROP COLUMN "measurements",
ADD COLUMN     "measurements" TEXT[];
