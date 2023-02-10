import { PrismaClient, Image, PanelPowerSupply } from "@prisma/client";
const prisma = new PrismaClient();
import { powerSupplyRequest } from "../../payload/request/powerSupply.Request";

async function createPowerSupplyService(
  powerSupply: powerSupplyRequest,
  img: Image[]
) {
  const panel = prisma.panelPowerSupply.create({
    data: {
      name: powerSupply.model,
      categoryId: powerSupply.categoryId,
      powerSupply: {
        create: {
          spec: powerSupply.spec,
          price: Number(powerSupply.price),
          color: {
            create: {
              color: powerSupply.color,
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
      category: true,
      powerSupply: {
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
  return panel;
}

async function getAllPowerSupplyServie() {
  return await prisma.panelPowerSupply.findMany({
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      powerSupply: {
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
async function getPanelPowerSupplyByIdService(id: string) {
  return await prisma.panelPowerSupply.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      powerSupply: {
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

async function createPowerSupplyWithExistPanelService(
  pid: string,
  powerSupply: powerSupplyRequest,
  img: Image[]
) {
  return await prisma.panelPowerSupply.update({
    where: { id: pid },
    data: {
      powerSupply: {
        create: {
          price: Number(powerSupply.price),
          spec: powerSupply.spec,
          color: {
            create: {
              color: powerSupply.color,
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
      powerSupply: {
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

async function getPowerSupplyByIdService(id: string, itemId: string) {
  return await prisma.panelPowerSupply.findUnique({
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
      powerSupply: {
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

async function deletePowerSupplyService(id: string, itemId: string) {
  const countSupplySupply = await prisma.powerSupply.count({
    where: { PanelPowerSupplyId: id },
  });
  if (countSupplySupply > 1) {
    const panel = await getPowerSupplyByIdService(id, itemId);
    await prisma.powerSupply.delete({ where: { id: itemId } });
    return panel;
  } else {
    return await prisma.panelPowerSupply.delete({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
        powerSupply: {
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

async function updatePowerSupplyService(
  id: string,
  powerSupply: any,
  img: Image[]
) {
  if (img.length > 0) {
    await prisma.color.delete({
      where: {
        powerSupplyId: powerSupply.itemId,
      },
    });
  }
  return await prisma.panelPowerSupply.update({
    where: { id },
    data: {
      name: powerSupply.model,
      powerSupply: {
        update: {
          where: { id: powerSupply.id },
          data: {
            price: Number(powerSupply.price) as number,
            spec: powerSupply.spec,
            color:
              img.length != 0
                ? {
                    create: {
                      color: powerSupply.color,
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
                      color: powerSupply.color,
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
      powerSupply: {
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
    },
  });
}

async function deletePanelPowerSupplyService(id: string) {
  const listPanelPowerSupplyId = await prisma.panelPowerSupply.findUnique({
    where: { id },
  });
  await prisma.panelGpu.update({
    where: { id },
    data: {},
  });
  return await prisma.panelPowerSupply.delete({
    where: { id: id },
  });
}
export default {
  deletePowerSupplyService,
  getPowerSupplyByIdService,
  createPowerSupplyWithExistPanelService,
  getPanelPowerSupplyByIdService,
  getAllPowerSupplyServie,
  createPowerSupplyService,
  deletePanelPowerSupplyService,
  updatePowerSupplyService,
};
