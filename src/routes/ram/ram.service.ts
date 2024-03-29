import { Image, PanelRam, PrismaClient } from "@prisma/client";
import { ramRequest } from "../../payload/request/ram.Resquest";
const prisma = new PrismaClient();

async function createRamService(
  ramDto: ramRequest,
  img: Image[],
  list: string[]
) {
  return await prisma.panelRam.create({
    data: {
      name: ramDto.model,
      categoryId: ramDto.categoryId,
      ram: {
        create: {
          type: ramDto.type,
          spec: ramDto.spec,
          model: ramDto.model,
          price: Number(ramDto.price),
          color: {
            create: {
              color: ramDto.color,
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
      ram: {
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
}

async function getAllRamServie() {
  return await prisma.panelRam.findMany({
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      ram: {
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
}
async function getRamByIdService(pid: string, itemId: string) {
  return await prisma.panelRam.findUnique({
    where: { id: pid },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      ram: {
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
async function getPanelRamByIdService(id: string) {
  return await prisma.panelRam.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      ram: {
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
}
async function deleteRamService(pid: string, itemId: string) {
  const countRam = await prisma.ram.count({ where: { panelRamId: pid } });
  if (countRam > 1) {
    const panel = await getRamByIdService(pid, itemId);
    await prisma.ram.delete({ where: { id: itemId } });
    return panel;
  } else {
    return await prisma.panelRam.delete({
      where: { id: pid },
      include: {
        category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
        ram: {
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

async function updateRamService(
  pid: string,
  ramDto: PanelRam,
  ram: any,
  color: any,
  img: Image[],
  listMotherBoardId: string[]
) {
  const listPanelRamId = await prisma.panelRam.findFirst({
    where: { id: pid },
    select: {
      panelmotherBoard: {
        select: {
          id: true,
        },
      },
    },
  });
  var dicon = listPanelRamId?.panelmotherBoard
    .map((e) => {
      return e.id;
    })
    .map((e) => {
      if (!listMotherBoardId.includes(e)) {
        return e;
      }
    });

  return await prisma.panelRam.update({
    where: { id: pid },
    data: {
      name: ramDto.name,
      ram: {
        update: {
          where: { id: ram.id },
          data: {
            model: ram.model,
            price: Number(ram.price) as number,
            color:
              img.length == 0
                ? {
                    update: {
                      color: color.color,
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
                      color: color.color,
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
      ram: {
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
}

async function createRamWithExistPanelService(
  pid: string,
  ramDto: ramRequest,
  img: Image[]
) {
  return await prisma.panelRam.update({
    where: { id: pid },
    data: {
      ram: {
        create: {
          spec: ramDto.spec,
          type: ramDto.type,
          model: ramDto.model,
          price: Number(ramDto.price) as number,
          color: {
            create: {
              color: ramDto.color,
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
    },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      ram: {
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
async function deletePanelRamService(id: string) {
  const listPanelRamId = await prisma.panelRam.findUnique({
    where: { id },
    select: {
      panelmotherBoard: {
        select: {
          id: true,
        },
      },
    },
  });
  await prisma.panelRam.update({
    where: { id },
    data: {
      panelmotherBoard: {
        disconnect: listPanelRamId?.panelmotherBoard.map((e) => {
          return e;
        }),
      },
    },
  });
  return await prisma.panelRam.delete({
    where: { id: id },
  });
}
export default {
  createRamService,
  getAllRamServie,
  getRamByIdService,
  deleteRamService,
  updateRamService,
  getPanelRamByIdService,
  createRamWithExistPanelService,
  deletePanelRamService,
};
