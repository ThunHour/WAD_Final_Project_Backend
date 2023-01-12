import { Brand, PrismaClient } from "@prisma/client";
const ServiceAccount = require("../../config/firebase/storage.json");
const prisma = new PrismaClient();

async function createBrandService(brandName: string, file: any[]) {
  const brand = await prisma.brand.create({
    data: {
      brandName: brandName,
      Image: {
        create: {
          imageUrl: file[0],
        },
      },
    },
  });
  return brand;
}

async function getAllBrandServie() {
  return await prisma.brand.findMany({
    include: {
      Image: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });
}
async function getBrandByIdService(id: string) {
  return await prisma.brand.findUnique({
    where: { id },
    include: {
      Image: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });
}
async function deleteBrandService(id: string) {
  return await prisma.brand.delete({
    where: { id },
    include: {
      Image: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });
}
async function updateBrandService(id: string, brand: Brand) {}
export default {
  createBrandService,
  getAllBrandServie,
  getBrandByIdService,
  deleteBrandService,
  updateBrandService,
};
