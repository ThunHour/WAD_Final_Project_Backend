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
          model: powerSupply.model,
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
          model: powerSupply.model,
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
  powerSupply: PanelPowerSupply,
  powerSupplies: any,
  color: any,
  img: Image[]
) {
  return await prisma.panelPowerSupply.update({
    where: { id },
    data: {
      name: powerSupply.name,
      powerSupply: {
        update: {
          where: { id: powerSupplies.id },
          data: {
            model: powerSupplies.model,
            price: Number(powerSupplies.price) as number,
            spec: powerSupplies.spec,
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
