import { Image, PanelCpu, PrismaClient } from "@prisma/client";
import { cpuRequest } from "../../payload/request/cpu.Request";
const prisma = new PrismaClient();

async function createCpuService(
  cpuDto: cpuRequest,
  img: Image[],
  list: string[]
) {
  return await prisma.panelCpu.create({
    data: {
      name: cpuDto.model,
      categoryId: cpuDto.categoryId,
      cpu: {
        create: {
          type: cpuDto.type,
          spec: cpuDto.spec,
          price: Number(cpuDto.price),

          color: {
            create: {
              color: cpuDto.color,
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
      cpu: {
        select: {
          id: true,
          model: true,
          price: true,
          type: true,
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

async function getAllCpuService() {
  return await prisma.panelCpu.findMany({
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      cpu: {
        select: {
          id: true,
          model: true,
          price: true,
          type: true,
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
async function getCpuByIdService(pid: string, itemId: string) {
  return await prisma.panelCpu.findUnique({
    where: { id: pid },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      cpu: {
        where: { id: itemId },
        select: {
          id: true,
          model: true,
          type: true,
          spec: true,
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
async function getPanelCpuByIdService(id: string) {
  return await prisma.panelCpu.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      cpu: {
        select: {
          id: true,
          model: true,
          type: true,
          spec: true,
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
async function deleteCpuService(pid: string, itemId: string) {
  const countRam = await prisma.cpu.count({ where: { panelCpuId: pid } });
  if (countRam > 1) {
    const panel = await getCpuByIdService(pid, itemId);
    await prisma.cpu.delete({ where: { id: itemId } });
    return panel;
  } else {
    return await prisma.panelCpu.delete({
      where: { id: pid },
      include: {
        category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
        cpu: {
          select: {
            id: true,
            type: true,
            spec: true,
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

async function updateCpuService(
  pid: string,
  cpu: any,
  img: Image[],
  listMotherBoardId: string[]
) {
  const listPanelCpuId = await prisma.panelCpu.findFirst({
    where: { id: pid },
    select: {
      panelmotherBoard: {
        select: {
          id: true,
        },
      },
    },
  });
  if (img.length > 0) {
    await prisma.color.delete({
      where: {
        cpuId: cpu.itemId,
      },
    });
  }
  var dicon = listPanelCpuId?.panelmotherBoard
    .map((e) => {
      return e.id;
    })
    .map((e) => {
      if (!listMotherBoardId.includes(e)) {
        return e;
      }
    });

  return await prisma.panelCpu.update({
    where: { id: pid },
    data: {
      name: cpu.model,
      cpu: {
        update: {
          where: { id: cpu.id },
          data: {
            price: Number(cpu.price) as number,
            color:
              img.length != 0
                ? {
                    create: {
                      color: cpu.color,
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
                      color: cpu.color,
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
      cpu: {
        select: {
          id: true,
          model: true,
          type: true,
          spec: true,
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

async function createCpuWithExistPanelService(
  pid: string,
  cpuDto: cpuRequest,
  img: Image[]
) {
  return await prisma.panelCpu.update({
    where: { id: pid },
    data: {
      cpu: {
        create: {
          spec: cpuDto.spec,
          type: cpuDto.type,

          price: Number(cpuDto.price) as number,
          color: {
            create: {
              color: cpuDto.color,
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
      cpu: {
        select: {
          id: true,
          type: true,
          spec: true,
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
async function deletePanelCpuService(id: string) {
  const listPanelCpuId = await prisma.panelCpu.findUnique({
    where: { id },
    select: {
      panelmotherBoard: {
        select: {
          id: true,
        },
      },
    },
  });
  await prisma.panelCpu.update({
    where: { id },
    data: {
      panelmotherBoard: {
        disconnect: listPanelCpuId?.panelmotherBoard.map((e) => {
          return e;
        }),
      },
    },
  });
  return await prisma.panelCpu.delete({
    where: { id: id },
  });
}
export default {
  createCpuService,
  getAllCpuService,
  getCpuByIdService,
  deleteCpuService,
  updateCpuService,
  getPanelCpuByIdService,
  createCpuWithExistPanelService,
  deletePanelCpuService,
};
