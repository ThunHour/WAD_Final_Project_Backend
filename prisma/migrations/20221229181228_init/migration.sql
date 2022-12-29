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
    "customizeId" TEXT NOT NULL,

    CONSTRAINT "Cpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotherBoardCpu" (
    "cpuId" TEXT NOT NULL,
    "motherBoardId" TEXT NOT NULL,

    CONSTRAINT "MotherBoardCpu_pkey" PRIMARY KEY ("cpuId","motherBoardId")
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

    CONSTRAINT "Ram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotherBoardRam" (
    "motherBoardId" TEXT NOT NULL,
    "ramId" TEXT NOT NULL,

    CONSTRAINT "MotherBoardRam_pkey" PRIMARY KEY ("motherBoardId","ramId")
);

-- CreateTable
CREATE TABLE "Storage" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "customizeId" TEXT NOT NULL,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotherBoardStorage" (
    "storageId" TEXT NOT NULL,
    "motherBoardId" TEXT NOT NULL,

    CONSTRAINT "MotherBoardStorage_pkey" PRIMARY KEY ("storageId","motherBoardId")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "customizeId" TEXT NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotherBoardCase" (
    "caseId" TEXT NOT NULL,
    "motherBoardId" TEXT NOT NULL,

    CONSTRAINT "MotherBoardCase_pkey" PRIMARY KEY ("caseId","motherBoardId")
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

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "categooryId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorImage" (
    "colorId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "ColorImage_pkey" PRIMARY KEY ("colorId","imageId")
);

-- CreateTable
CREATE TABLE "Customize" (
    "id" TEXT NOT NULL,
    "motherBoardId" TEXT,
    "share" BOOLEAN NOT NULL,

    CONSTRAINT "Customize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomizeUser" (
    "customizeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CustomizeUser_pkey" PRIMARY KEY ("customizeId","userId")
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
CREATE UNIQUE INDEX "Category_brandId_key" ON "Category"("brandId");

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
CREATE UNIQUE INDEX "Image_brandId_key" ON "Image"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_categooryId_key" ON "Image"("categooryId");

-- CreateIndex
CREATE UNIQUE INDEX "ColorImage_colorId_key" ON "ColorImage"("colorId");

-- CreateIndex
CREATE UNIQUE INDEX "ColorImage_imageId_key" ON "ColorImage"("imageId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_customizeId_fkey" FOREIGN KEY ("customizeId") REFERENCES "Customize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerSupply" ADD CONSTRAINT "PowerSupply_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerSupply" ADD CONSTRAINT "PowerSupply_customizeId_fkey" FOREIGN KEY ("customizeId") REFERENCES "Customize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cpu" ADD CONSTRAINT "Cpu_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cpu" ADD CONSTRAINT "Cpu_customizeId_fkey" FOREIGN KEY ("customizeId") REFERENCES "Customize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotherBoardCpu" ADD CONSTRAINT "MotherBoardCpu_cpuId_fkey" FOREIGN KEY ("cpuId") REFERENCES "Cpu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotherBoardCpu" ADD CONSTRAINT "MotherBoardCpu_motherBoardId_fkey" FOREIGN KEY ("motherBoardId") REFERENCES "MotherBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ram" ADD CONSTRAINT "Ram_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ram" ADD CONSTRAINT "Ram_customizeId_fkey" FOREIGN KEY ("customizeId") REFERENCES "Customize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotherBoardRam" ADD CONSTRAINT "MotherBoardRam_motherBoardId_fkey" FOREIGN KEY ("motherBoardId") REFERENCES "MotherBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotherBoardRam" ADD CONSTRAINT "MotherBoardRam_ramId_fkey" FOREIGN KEY ("ramId") REFERENCES "Ram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_customizeId_fkey" FOREIGN KEY ("customizeId") REFERENCES "Customize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotherBoardStorage" ADD CONSTRAINT "MotherBoardStorage_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotherBoardStorage" ADD CONSTRAINT "MotherBoardStorage_motherBoardId_fkey" FOREIGN KEY ("motherBoardId") REFERENCES "MotherBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_customizeId_fkey" FOREIGN KEY ("customizeId") REFERENCES "Customize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotherBoardCase" ADD CONSTRAINT "MotherBoardCase_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotherBoardCase" ADD CONSTRAINT "MotherBoardCase_motherBoardId_fkey" FOREIGN KEY ("motherBoardId") REFERENCES "MotherBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotherBoard" ADD CONSTRAINT "MotherBoard_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotherBoard" ADD CONSTRAINT "MotherBoard_customizeId_fkey" FOREIGN KEY ("customizeId") REFERENCES "Customize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_categooryId_fkey" FOREIGN KEY ("categooryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorImage" ADD CONSTRAINT "ColorImage_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorImage" ADD CONSTRAINT "ColorImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomizeUser" ADD CONSTRAINT "CustomizeUser_customizeId_fkey" FOREIGN KEY ("customizeId") REFERENCES "Customize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomizeUser" ADD CONSTRAINT "CustomizeUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
