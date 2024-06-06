/*
  Warnings:

  - Added the required column `cocktailName` to the `CustomRecipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomRecipe" ADD COLUMN     "cocktailName" TEXT NOT NULL,
ADD COLUMN     "image" TEXT;
