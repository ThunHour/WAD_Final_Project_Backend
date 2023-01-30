import { PrismaClient, Image } from "@prisma/client";
const prisma = new PrismaClient();

async function createStorageService(
  storage: Storage,
  img: Image[],
  list: string[]
) {
  const panel = prisma.panelStorage.create({
    data: {
      name: storage.name,
      categoryId: storage.categoryId,
      storage: {
        create: {
          model: storage.model,
          spec: storage.spec,
          price: storage.price,
          color: {
            create: {
              color: storage.color,
              image: {
                createMany: {
                  data: img.map((e) => {
                    return {
                      imageUrl: e.imageUrl,
                    };
                  }),
                },
              },
            },
          },
        },
      },
      panelmotherBoard: {
        connect: list.map((e) => {
          return {
            id: e,
          };
        }),
      },
    },
    include: {
      category: true,
      storage: {
        select: {
          id: true,
          model: true,
          price: true,
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
      },
      panelmotherBoard: {
        include: {
          category: {
            select: {
              id: true,
              categoryName: true,
            },
          },
          motherBoard: {
            select: {
              id: true,
              model: true,
              price: true,
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
          },
        },
      },
    },
  });
  return panel;
}

async function getAllStorageServie() {
  return await prisma.panelStorage.findMany({
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      storage: {
        select: {
          id: true,
          model: true,
          price: true,
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
      },
    },
  });
}
async function getPanelStorageByIdService(id: string) {
  return await prisma.panelStorage.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      storage: {
        select: {
          id: true,
          model: true,
          price: true,
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
      },
    },
  });
}

async function createStorageWithExistPanelService(
  pid: string,
  storage: Storage,
  img: Image[]
) {
  return await prisma.panelStorage.update({
    where: { id: pid },
    data: {
      storage: {
        create: {
          model: storage.model,
          price: Number(storage.price),
          spec: storage.spec,
          color: {
            create: {
              color: storage.color,
              image: {
                createMany: {
                  data: img.map((e, index) => {
                    return {
                      imageUrl: e.imageUrl,
                    };
                  }),
                },
              },
            },
          },
        },
      },
    },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      storage: {
        select: {
          id: true,
          model: true,
          price: true,
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
      },
    },
  });
}

async function getStorageByIdService(id: string, itemId: string) {
  return await prisma.panelStorage.findUnique({
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
      storage: {
        where: { id: itemId },
        select: {
          id: true,
          model: true,
          price: true,
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
      },
    },
  });
}

async function deleteStorageService(id: string, itemId: string) {
  const countStorage = await prisma.storage.count({
    where: { panelStorageId: id },
  });
  if (countStorage > 1) {
    const panel = await getStorageByIdService(id, itemId);
    await prisma.storage.delete({ where: { id: itemId } });
    return panel;
  } else {
    return await prisma.panelStorage.delete({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
        storage: {
          select: {
            id: true,
            model: true,
            price: true,
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
        },
      },
    });
  }
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
  getPanelStorageByIdService,
};
