-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "phoneNumber" TEXT NOT NULL,

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
    "category_id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "PanelGpu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "PanelGpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gpu" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "paneGpulId" TEXT,

    CONSTRAINT "Gpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PanelCpu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "PanelCpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cpu" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "panelCpuId" TEXT,

    CONSTRAINT "Cpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PanelPowerSupply" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "PanelPowerSupply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PowerSupply" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "PanelPowerSupplyId" TEXT,

    CONSTRAINT "PowerSupply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PanelStorage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "PanelStorage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Storage" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "panelStorageId" TEXT,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PanelRam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "PanelRam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ram" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "panelRamId" TEXT,

    CONSTRAINT "Ram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PanelCase" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "PanelCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "panelCaseId" TEXT,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PanelMotherBoard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "PanelMotherBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotherBoard" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "panelMotherBoardId" TEXT,

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

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customize" (
    "id" TEXT NOT NULL,
    "motherBoardId" TEXT,
    "share" BOOLEAN NOT NULL DEFAULT false,
    "gpuId" TEXT,
    "powerSupplyId" TEXT,
    "cpuId" TEXT,
    "ramId" TEXT,
    "storageId" TEXT,
    "caseId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Customize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PanelCpuToPanelMotherBoard" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PanelCaseToPanelMotherBoard" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PanelMotherBoardToPanelRam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PanelMotherBoardToPanelStorage" (
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
CREATE UNIQUE INDEX "PanelGpu_name_key" ON "PanelGpu"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PanelCpu_name_key" ON "PanelCpu"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PanelPowerSupply_name_key" ON "PanelPowerSupply"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PanelStorage_name_key" ON "PanelStorage"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PanelRam_name_key" ON "PanelRam"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PanelMotherBoard_id_key" ON "PanelMotherBoard"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PanelMotherBoard_id_name_key" ON "PanelMotherBoard"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "MotherBoard_id_key" ON "MotherBoard"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Color_gpuId_key" ON "Color"("gpuId");

-- CreateIndex
CREATE UNIQUE INDEX "Color_powerSupplyId_key" ON "Color"("powerSupplyId");

-- CreateIndex
CREATE UNIQUE INDEX "Color_cpuId_key" ON "Color"("cpuId");

-- CreateIndex
CREATE UNIQUE INDEX "Color_ramId_key" ON "Color"("ramId");

-- CreateIndex
CREATE UNIQUE INDEX "Color_storageId_key" ON "Color"("storageId");

-- CreateIndex
CREATE UNIQUE INDEX "Color_caseId_key" ON "Color"("caseId");

-- CreateIndex
CREATE UNIQUE INDEX "Color_motherBoardId_key" ON "Color"("motherBoardId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_categooryId_key" ON "Image"("categooryId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_brandId_key" ON "Image"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "_PanelCpuToPanelMotherBoard_AB_unique" ON "_PanelCpuToPanelMotherBoard"("A", "B");

-- CreateIndex
CREATE INDEX "_PanelCpuToPanelMotherBoard_B_index" ON "_PanelCpuToPanelMotherBoard"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PanelCaseToPanelMotherBoard_AB_unique" ON "_PanelCaseToPanelMotherBoard"("A", "B");

-- CreateIndex
CREATE INDEX "_PanelCaseToPanelMotherBoard_B_index" ON "_PanelCaseToPanelMotherBoard"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PanelMotherBoardToPanelRam_AB_unique" ON "_PanelMotherBoardToPanelRam"("A", "B");

-- CreateIndex
CREATE INDEX "_PanelMotherBoardToPanelRam_B_index" ON "_PanelMotherBoardToPanelRam"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PanelMotherBoardToPanelStorage_AB_unique" ON "_PanelMotherBoardToPanelStorage"("A", "B");

-- CreateIndex
CREATE INDEX "_PanelMotherBoardToPanelStorage_B_index" ON "_PanelMotherBoardToPanelStorage"("B");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanelGpu" ADD CONSTRAINT "PanelGpu_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_paneGpulId_fkey" FOREIGN KEY ("paneGpulId") REFERENCES "PanelGpu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanelCpu" ADD CONSTRAINT "PanelCpu_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cpu" ADD CONSTRAINT "Cpu_panelCpuId_fkey" FOREIGN KEY ("panelCpuId") REFERENCES "PanelCpu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanelPowerSupply" ADD CONSTRAINT "PanelPowerSupply_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerSupply" ADD CONSTRAINT "PowerSupply_PanelPowerSupplyId_fkey" FOREIGN KEY ("PanelPowerSupplyId") REFERENCES "PanelPowerSupply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanelStorage" ADD CONSTRAINT "PanelStorage_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_panelStorageId_fkey" FOREIGN KEY ("panelStorageId") REFERENCES "PanelStorage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanelRam" ADD CONSTRAINT "PanelRam_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ram" ADD CONSTRAINT "Ram_panelRamId_fkey" FOREIGN KEY ("panelRamId") REFERENCES "PanelRam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanelCase" ADD CONSTRAINT "PanelCase_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_panelCaseId_fkey" FOREIGN KEY ("panelCaseId") REFERENCES "PanelCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanelMotherBoard" ADD CONSTRAINT "PanelMotherBoard_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotherBoard" ADD CONSTRAINT "MotherBoard_panelMotherBoardId_model_fkey" FOREIGN KEY ("panelMotherBoardId", "model") REFERENCES "PanelMotherBoard"("id", "name") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "Color" ADD CONSTRAINT "Color_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_motherBoardId_fkey" FOREIGN KEY ("motherBoardId") REFERENCES "MotherBoard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_categooryId_fkey" FOREIGN KEY ("categooryId") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "Customize" ADD CONSTRAINT "Customize_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PanelCpuToPanelMotherBoard" ADD CONSTRAINT "_PanelCpuToPanelMotherBoard_A_fkey" FOREIGN KEY ("A") REFERENCES "PanelCpu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PanelCpuToPanelMotherBoard" ADD CONSTRAINT "_PanelCpuToPanelMotherBoard_B_fkey" FOREIGN KEY ("B") REFERENCES "PanelMotherBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PanelCaseToPanelMotherBoard" ADD CONSTRAINT "_PanelCaseToPanelMotherBoard_A_fkey" FOREIGN KEY ("A") REFERENCES "PanelCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PanelCaseToPanelMotherBoard" ADD CONSTRAINT "_PanelCaseToPanelMotherBoard_B_fkey" FOREIGN KEY ("B") REFERENCES "PanelMotherBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PanelMotherBoardToPanelRam" ADD CONSTRAINT "_PanelMotherBoardToPanelRam_A_fkey" FOREIGN KEY ("A") REFERENCES "PanelMotherBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PanelMotherBoardToPanelRam" ADD CONSTRAINT "_PanelMotherBoardToPanelRam_B_fkey" FOREIGN KEY ("B") REFERENCES "PanelRam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PanelMotherBoardToPanelStorage" ADD CONSTRAINT "_PanelMotherBoardToPanelStorage_A_fkey" FOREIGN KEY ("A") REFERENCES "PanelMotherBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PanelMotherBoardToPanelStorage" ADD CONSTRAINT "_PanelMotherBoardToPanelStorage_B_fkey" FOREIGN KEY ("B") REFERENCES "PanelStorage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
