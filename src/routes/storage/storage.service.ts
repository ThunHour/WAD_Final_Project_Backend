import { PrismaClient, Image, PanelStorage } from "@prisma/client";
const prisma = new PrismaClient();
import { storageRequest } from "../../payload/request/storage.Request";

async function createStorageService(
  storage: storageRequest,
  img: Image[],
  list: string[]
) {
  const panel = prisma.panelStorage.create({
    data: {
      name: storage.model,
      categoryId: storage.categoryId,
      storage: {
        create: {
          spec: storage.spec,
          price: Number(storage.price),
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
          spec: true,
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
          spec: true,
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
  storage: storageRequest,
  img: Image[]
) {
  return await prisma.panelStorage.update({
    where: { id: pid },
    data: {
      storage: {
        create: {
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

async function updateStorageService(
  id: string,
  storage: any,
  img: Image[],
  listMotherBoardId: string[]
) {
  if (img.length > 0) {
    await prisma.color.delete({
      where: {
        storageId: storage.itemId,
      },
    });
  }
  const listPanelStorageId = await prisma.panelStorage.findFirst({
    where: { id: id },
    select: {
      panelmotherBoard: {
        select: {
          id: true,
        },
      },
    },
  });
  var oldId = listPanelStorageId?.panelmotherBoard.map((e) => {
    return e.id;
  });
  var dicon = oldId?.filter((e) => {
    return !listMotherBoardId.includes(e);
  });

  return await prisma.panelStorage.update({
    where: { id },
    data: {
      name: storage.name,
      storage: {
        update: {
          where: { id: storage.itemId },
          data: {
            price: Number(storage.price) as number,
            spec: storage.spec,
            color:
              img.length != 0
                ? {
                    create: {
                      color: storage.color,
                      image: {
                        createMany: {
                          data: img.map((c) => {
                            return { imageUrl: c.imageUrl };
                          }),
                        },
                      },
                    },
                  }
                : {
                    update: {
                      color: storage.color,
                    },
                  },
          },
        },
      },
      panelmotherBoard: {
        connect:
          listMotherBoardId.length == 0
            ? []
            : listMotherBoardId.map((e) => {
                return {
                  id: e,
                };
              }),
        disconnect: dicon?.map((d) => {
          return {
            id: d,
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
      storage: {
        select: {
          id: true,
          model: true,
          price: true,
          spec: true,
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
}

async function deletePanelStorageService(id: string) {
  const listPanelStorageId = await prisma.panelStorage.findUnique({
    where: { id },
    select: {
      panelmotherBoard: {
        select: {
          id: true,
        },
      },
    },
  });
  await prisma.panelStorage.update({
    where: { id },
    data: {
      panelmotherBoard: {
        disconnect: listPanelStorageId?.panelmotherBoard.map((e) => {
          return e;
        }),
      },
    },
  });
  return await prisma.panelStorage.delete({
    where: { id: id },
  });
}
export default {
  createStorageService,
  getAllStorageServie,
  getStorageByIdService,
  deleteStorageService,
  updateStorageService,
  deletePanelStorageService,
  createStorageWithExistPanelService,
  getPanelStorageByIdService,
};
