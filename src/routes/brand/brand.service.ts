import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createBrandService(brandName: string, img: string) {
  return await prisma.brand.create({
    data: {
      brandName: brandName,
      Image: {
        create: {
          imageUrl: img,
        },
      },
    },
    select: {
      id: true,
      brandName: true,
      Image: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });
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
      category: {
        select: {
          id: true,
          categoryName: true,
          Image: {
            select: {
              id: true,
              imageUrl: true,
            },
          },
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
      category: {
        select: {
          id: true,
          categoryName: true,
          Image: {
            select: {
              id: true,
              imageUrl: true,
            },
          },
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
async function getBrandByName(name: string) {
  return await prisma.brand.findUnique({ where: { brandName: name } });
}
async function updateBrandService(id: string, name: string, imgUrl: string) {
  return await prisma.brand.update({
    where: { id },
    data: {
      brandName: name,
      Image: {
        update: {
          imageUrl: imgUrl,
        },
      },
    },
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
export default {
  createBrandService,
  getAllBrandServie,
  getBrandByIdService,
  deleteBrandService,
  updateBrandService,
  getBrandByName,
};
