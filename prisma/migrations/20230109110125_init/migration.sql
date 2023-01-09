/*
  Warnings:

  - The primary key for the `ColorImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ColorImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ColorImage" DROP CONSTRAINT "ColorImage_pkey",
DROP COLUMN "id";
