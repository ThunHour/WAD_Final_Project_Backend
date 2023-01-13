-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gpu" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "customizeId" TEXT NOT NULL,

    CONSTRAINT "Gpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PowerSupply" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "customizeId" TEXT NOT NULL,
    "colorId" TEXT NOT NULL,

    CONSTRAINT "PowerSupply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cpu" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "customizeId" TEXT,
    "colorId" TEXT NOT NULL,

    CONSTRAINT "Cpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ram" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "customizeId" TEXT NOT NULL,
    "colorId" TEXT NOT NULL,

    CONSTRAINT "Ram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Storage" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "customizeId" TEXT NOT NULL,
    "colorId" TEXT NOT NULL,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "customizeId" TEXT NOT NULL,
    "colorId" TEXT NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotherBoard" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "customizeId" TEXT NOT NULL,

    CONSTRAINT "MotherBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "gpuId" TEXT,
    "powerSupplyId" TEXT,
    "cpuId" TEXT,
    "ramId" TEXT,
    "storageId" TEXT,
    "caseId" TEXT,
    "motherBoardId" TEXT,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "categooryId" TEXT,
    "colorId" TEXT,
    "brandId" TEXT,
    "partnerId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customize" (
    "id" TEXT NOT NULL,
    "motherBoardId" TEXT,
    "share" BOOLEAN NOT NULL,
    "gpuId" TEXT,
    "powerSupplyId" TEXT,
    "cpuId" TEXT,
    "ramId" TEXT,
    "storageId" TEXT,
    "caseId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Customize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "webUrl" TEXT NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CpuToMotherBoard" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CaseToMotherBoard" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MotherBoardToRam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MotherBoardToStorage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_brandName_key" ON "Brand"("brandName");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryName_key" ON "Category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "Gpu_customizeId_key" ON "Gpu"("customizeId");

-- CreateIndex
CREATE UNIQUE INDEX "PowerSupply_customizeId_key" ON "PowerSupply"("customizeId");

-- CreateIndex
CREATE UNIQUE INDEX "Cpu_customizeId_key" ON "Cpu"("customizeId");

-- CreateIndex
CREATE UNIQUE INDEX "Ram_customizeId_key" ON "Ram"("customizeId");

-- CreateIndex
CREATE UNIQUE INDEX "Storage_customizeId_key" ON "Storage"("customizeId");

-- CreateIndex
CREATE UNIQUE INDEX "Case_customizeId_key" ON "Case"("customizeId");

-- CreateIndex
CREATE UNIQUE INDEX "MotherBoard_customizeId_key" ON "MotherBoard"("customizeId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_categooryId_key" ON "Image"("categooryId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_brandId_key" ON "Image"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_partnerId_key" ON "Image"("partnerId");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_storeName_key" ON "Partner"("storeName");

-- CreateIndex
CREATE UNIQUE INDEX "_CpuToMotherBoard_AB_unique" ON "_CpuToMotherBoard"("A", "B");

-- CreateIndex
CREATE INDEX "_CpuToMotherBoard_B_index" ON "_CpuToMotherBoard"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToMotherBoard_AB_unique" ON "_CaseToMotherBoard"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToMotherBoard_B_index" ON "_CaseToMotherBoard"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MotherBoardToRam_AB_unique" ON "_MotherBoardToRam"("A", "B");

-- CreateIndex
CREATE INDEX "_MotherBoardToRam_B_index" ON "_MotherBoardToRam"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MotherBoardToStorage_AB_unique" ON "_MotherBoardToStorage"("A", "B");

-- CreateIndex
CREATE INDEX "_MotherBoardToStorage_B_index" ON "_MotherBoardToStorage"("B");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerSupply" ADD CONSTRAINT "PowerSupply_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cpu" ADD CONSTRAINT "Cpu_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ram" ADD CONSTRAINT "Ram_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotherBoard" ADD CONSTRAINT "MotherBoard_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_gpuId_fkey" FOREIGN KEY ("gpuId") REFERENCES "Gpu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_powerSupplyId_fkey" FOREIGN KEY ("powerSupplyId") REFERENCES "PowerSupply"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_cpuId_fkey" FOREIGN KEY ("cpuId") REFERENCES "Cpu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_ramId_fkey" FOREIGN KEY ("ramId") REFERENCES "Ram"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_motherBoardId_fkey" FOREIGN KEY ("motherBoardId") REFERENCES "MotherBoard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_categooryId_fkey" FOREIGN KEY ("categooryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customize" ADD CONSTRAINT "Customize_gpuId_fkey" FOREIGN KEY ("gpuId") REFERENCES "Gpu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customize" ADD CONSTRAINT "Customize_powerSupplyId_fkey" FOREIGN KEY ("powerSupplyId") REFERENCES "PowerSupply"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customize" ADD CONSTRAINT "Customize_cpuId_fkey" FOREIGN KEY ("cpuId") REFERENCES "Cpu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customize" ADD CONSTRAINT "Customize_ramId_fkey" FOREIGN KEY ("ramId") REFERENCES "Ram"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customize" ADD CONSTRAINT "Customize_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customize" ADD CONSTRAINT "Customize_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customize" ADD CONSTRAINT "Customize_motherBoardId_fkey" FOREIGN KEY ("motherBoardId") REFERENCES "MotherBoard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customize" ADD CONSTRAINT "Customize_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CpuToMotherBoard" ADD CONSTRAINT "_CpuToMotherBoard_A_fkey" FOREIGN KEY ("A") REFERENCES "Cpu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CpuToMotherBoard" ADD CONSTRAINT "_CpuToMotherBoard_B_fkey" FOREIGN KEY ("B") REFERENCES "MotherBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToMotherBoard" ADD CONSTRAINT "_CaseToMotherBoard_A_fkey" FOREIGN KEY ("A") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToMotherBoard" ADD CONSTRAINT "_CaseToMotherBoard_B_fkey" FOREIGN KEY ("B") REFERENCES "MotherBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MotherBoardToRam" ADD CONSTRAINT "_MotherBoardToRam_A_fkey" FOREIGN KEY ("A") REFERENCES "MotherBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MotherBoardToRam" ADD CONSTRAINT "_MotherBoardToRam_B_fkey" FOREIGN KEY ("B") REFERENCES "Ram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MotherBoardToStorage" ADD CONSTRAINT "_MotherBoardToStorage_A_fkey" FOREIGN KEY ("A") REFERENCES "MotherBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MotherBoardToStorage" ADD CONSTRAINT "_MotherBoardToStorage_B_fkey" FOREIGN KEY ("B") REFERENCES "Storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
