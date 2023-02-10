import { PrismaClient, Image, PanelGpu } from "@prisma/client";
const prisma = new PrismaClient();
import { gpuRequest } from "../../payload/request/gpu.Request";

async function createGpuService(gpu: gpuRequest, img: Image[]) {
  const panel = prisma.panelGpu.create({
    data: {
      name: gpu.model,
      categoryId: gpu.categoryId,
      gpu: {
        create: {
          spec: gpu.spec,
          price: Number(gpu.price),
          color: {
            create: {
              color: gpu.color,
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
      gpu: {
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
  return panel;
}

async function getAllGpuServie() {
  return await prisma.panelGpu.findMany({
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      gpu: {
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
async function getPanelGpuByIdService(id: string) {
  return await prisma.panelGpu.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      gpu: {
        select: {
          id: true,
          model: true,
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
    },
  });
}

async function createGpuWithExistPanelService(
  pid: string,
  gpu: gpuRequest,
  img: Image[]
) {
  return await prisma.panelGpu.update({
    where: { id: pid },
    data: {
      gpu: {
        create: {
          price: Number(gpu.price),
          spec: gpu.spec,
          color: {
            create: {
              color: gpu.color,
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
      gpu: {
        select: {
          id: true,
          model: true,
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
    },
  });
}

async function getGpuByIdService(id: string, itemId: string) {
  return await prisma.panelGpu.findUnique({
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
      gpu: {
        where: { id: itemId },
        select: {
          id: true,
          model: true,
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
    },
  });
}

async function deleteGpuService(id: string, itemId: string) {
  const countGpu = await prisma.gpu.count({
    where: { paneGpulId: id },
  });
  if (countGpu > 1) {
    const panel = await getGpuByIdService(id, itemId);
    await prisma.gpu.delete({ where: { id: itemId } });
    return panel;
  } else {
    return await prisma.panelGpu.delete({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
        gpu: {
          select: {
            id: true,
            model: true,
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
      },
    });
  }
}

async function updateGpuService(id: string, gpus: any, img: Image[]) {
  if (img.length > 0) {
    await prisma.color.delete({
      where: {
        gpuId: gpus.itemId,
      },
    });
  }
  return await prisma.panelGpu.update({
    where: { id },
    data: {
      name: gpus.model,
      gpu: {
        update: {
          where: { id: gpus.itemId },
          data: {
            price: Number(gpus.price) as number,
            spec: gpus.spec,
            color:
              img.length != 0
                ? {
                    create: {
                      color: gpus.color,
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
                      color: gpus.color,
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
      gpu: {
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

async function deletePanelGpuService(id: string) {
  return await prisma.panelGpu.delete({
    where: { id },
  });
}
export default {
  deleteGpuService,
  getGpuByIdService,
  createGpuWithExistPanelService,
  getPanelGpuByIdService,
  getAllGpuServie,
  createGpuService,
  deletePanelGpuService,
  updateGpuService,
};
