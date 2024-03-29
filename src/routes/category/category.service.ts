import { PrismaClient, Category } from "@prisma/client";
const prisma = new PrismaClient();

async function createCategoryService(category: Category, img: any) {
  return await prisma.category.create({
    data: {
      categoryName: category.categoryName,
      brandId: category.brandId,
      Image: {
        create: {
          imageUrl: img,
        },
      },
    },
  });
}
async function getAllCategoryServie() {
  return await prisma.category.findMany({
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
async function getCategoryByIdService(id: string) {
  return await prisma.category.findUnique({
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
async function deleteCategoryService(id: string) {
  return await prisma.category.delete({
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
async function getCategoryByName(name: string) {
  return await prisma.category.findUnique({
    where: { categoryName: name },
  });
}

async function updateCategoryService(id: string, name: string, imgUrl: string) {
  return await prisma.category.update({
    where: { id },
    data: {
      categoryName: name,
      Image: {
        update: {
          imageUrl: imgUrl,
        },
      },
    },
  });
}
export default {
  createCategoryService,
  getAllCategoryServie,
  getCategoryByIdService,
  deleteCategoryService,
  updateCategoryService,
  getCategoryByName,
};
