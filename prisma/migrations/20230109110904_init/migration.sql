/*
  Warnings:

  - The required column `id` was added to the `ColorImage` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "ColorImage_colorId_key";

-- DropIndex
DROP INDEX "ColorImage_imageId_key";

-- AlterTable
ALTER TABLE "ColorImage" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ColorImage_pkey" PRIMARY KEY ("id");
