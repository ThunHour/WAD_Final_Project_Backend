import {
  PrismaClient,
  Storage,
  Color,
  Image,
  MotherBoard,
} from "@prisma/client";
const prisma = new PrismaClient();

async function createStorageService(
  storage: Storage,
  color: Color[],
  motherBoard: MotherBoard[],
  img: any
) {
  return prisma.storage.create({
    data: {
      model: storage.model,
      spec: storage.spec,
      price: storage.price,
      categoryId: storage.categoryId,
      color: {
        create: color.map((c, index) => {
          return {
            color: c.color,
            image: {
              create: {
                imageUrl: img[index],
              },
            },
          };
        }),
      },
      //   motherBoard: {
      //     create: motherBoard.map((c, index) => {
      //         return {
      //           motherboard: c.id,
      //           image: {
      //             create: {
      //               imageUrl: img[index],
      //             },
      //           },
      //         };
      //       }),
      //   },
      //   customize: {
      //     create: color.map((c, index) => {
      //         return {
      //           color: c.color,
      //           image: {
      //             create: {
      //               imageUrl: img[index],
      //             },
      //           },
      //         };
      //       }),
      //   }
    },
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

async function getAllStorageServie() {
  return await prisma.storage.findMany({
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

async function getStorageByIdService(id: string) {
  return await prisma.storage.findUnique({
    where: {
      id,
    },
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

async function deleteStorageService(id: string) {
  return await prisma.storage.delete({
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

async function getStorageByName(name: string) {}

async function updateStorageService(
  id: string,
  storage: Storage,
  color: Color[],
  img: Image[]
) {
  return await prisma.storage.update({
    where: { id },
    data: {
      model: storage.model,
      spec: storage.spec,
      price: storage.price,
      categoryId: storage.categoryId,
      color: {
        update: color.map((c, index) => {
          return {
            where: { id: c.id },
            data: {
              color: c.color,
              image: {
                update: {
                  where: { id: img[index].id },
                  data: {
                    imageUrl: img[index].imageUrl,
                  },
                },
              },
            },
          };
        }),
      },
    },
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
export default {
  createStorageService,
  getAllStorageServie,
  getStorageByIdService,
  deleteStorageService,
  updateStorageService,
  getStorageByName,
};
