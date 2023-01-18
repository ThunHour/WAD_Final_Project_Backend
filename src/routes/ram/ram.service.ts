import { Image, PanelRam, PrismaClient } from "@prisma/client";
import { ramRequest } from "../../payload/request/ram.Resquest";
const prisma = new PrismaClient();

async function createRamService(ramDto: ramRequest, img: Image[]) {
  const panel = await prisma.panelRam.create({
    data: {
      name: ramDto.model,
      categoryId: ramDto.categoryId,
      Ram: {
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
    },
    include: {
      Category: true,
      Ram: {
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
async function getAllRamServie() {
  return await prisma.panelRam.findMany({
    include: {
      Category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      Ram: {
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
async function getRamByIdService(pid: string, itemId: string) {
  return await prisma.panelRam.findUnique({
    where: { id: pid },
    include: {
      Category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      Ram: {
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
async function getPanelRamByIdService(id: string) {
  return await prisma.panelRam.findUnique({
    where: { id },
    include: {
      Category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      Ram: {
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
        Category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
        Ram: {
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
async function getRamByName(name: string) {}
async function updateRamService(
  pid: string,
  ramDto: PanelRam,
  ram: any,
  color: any,
  img: Image[]
) {
  if (img.length == 0) {
    return await prisma.panelRam.update({
      where: { id: pid },
      data: {
        name: ramDto.name,
        Ram: {
          update: {
            where: { id: ram.id },
            data: {
              model: ram.model,
              price: Number(ram.price) as number,
              color: {
                update: {
                  color: color.color,
                },
              },
            },
          },
        },
      },
      include: {
        Category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
        Ram: {
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
  } else {
    await prisma.image.deleteMany({ where: { colorId: color.id } });
    return await prisma.panelRam.update({
      where: { id: pid },
      data: {
        name: ramDto.name,
        Ram: {
          update: {
            where: { id: ram.id },
            data: {
              model: ram.model,
              price: Number(ram.price),
              color: {
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
              },
            },
          },
        },
      },
      include: {
        Category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
        Ram: {
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
async function createRamWithExistPanelService(
  pid: string,
  caseDto: ramRequest,
  img: Image[]
) {
  return await prisma.panelCase.update({
    where: { id: pid },
    data: {
      case: {
        create: {
          model: caseDto.model,
          price: Number(caseDto.price),
          color: {
            create: {
              color: caseDto.color,
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
      Category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      case: {
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
export default {
  createRamService,
  getAllRamServie,
  getRamByIdService,
  deleteRamService,
  updateRamService,
  getRamByName,
  getPanelRamByIdService,
  createRamWithExistPanelService,
};
