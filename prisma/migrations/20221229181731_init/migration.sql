-- DropForeignKey
ALTER TABLE "Cpu" DROP CONSTRAINT "Cpu_customizeId_fkey";

-- AlterTable
ALTER TABLE "Cpu" ALTER COLUMN "customizeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Cpu" ADD CONSTRAINT "Cpu_customizeId_fkey" FOREIGN KEY ("customizeId") REFERENCES "Customize"("id") ON DELETE SET NULL ON UPDATE CASCADE;
