import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createRamService(RamName: string, img: any) {}
async function getAllRamServie() {
  return await prisma.ram.findMany({
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      color: {
        select: {
          id: true,
          color: true,
          image: {
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
async function getRamByIdService(id: string) {
  return await prisma.ram.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      color: {
        select: {
          id: true,
          color: true,
          image: {
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
async function deleteRamService(id: string) {
  return await prisma.ram.delete({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      color: {
        select: {
          id: true,
          color: true,
          image: {
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
async function getRamByName(name: string) {}
async function updateRamService(id: string, name: string, imgUrl: string) {}
export default {
  createRamService,
  getAllRamServie,
  getRamByIdService,
  deleteRamService,
  updateRamService,
  getRamByName,
};
