import { Color, PrismaClient, Image, Case, PanelCase } from "@prisma/client";
const prisma = new PrismaClient();
import { caseRequest } from "../../payload/request/case.Request";
async function createCaseService(caseDto: caseRequest, img: Image[]) {
  const panel = await prisma.panelCase.create({
    data: {
      name: caseDto.model,
      categoryId: caseDto.categoryId,
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
      Category: true,
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
  return panel;
}
async function getAllCaseServie() {
  return await prisma.panelCase.findMany({
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

async function getPanelCaseByIdService(id: string) {
  return await prisma.panelCase.findUnique({
    where: { id },
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
async function createCaseWithExistPanelService(
  pid: string,
  caseDto: caseRequest,
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
async function getCaseByIdService(pid: string, itemId: string) {
  return await prisma.panelCase.findUnique({
    where: { id: pid },
    include: {
      Category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      case: {
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
async function deleteCaseService(pid: string, itemId: string) {
  const countCase = await prisma.case.count({ where: { panelCaseId: pid } });
  if (countCase > 1) {
    const panel = await getCaseByIdService(pid, itemId);
    await prisma.case.delete({ where: { id: itemId } });
    return panel;
  } else {
    return await prisma.panelCase.delete({
      where: { id: pid },
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
}
async function getCaseByName(name: string) {}
async function updateCaseService(
  pid: string,
  caseDto: PanelCase,
  cases: any,
  color: any,
  img: Image[]
) {
  if (img.length == 0) {
    return await prisma.panelCase.update({
      where: { id: pid },
      data: {
        name: caseDto.name,
        case: {
          update: {
            where: { id: cases.id },
            data: {
              model: cases.model,
              price: Number(cases.price) as number,
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
  } else {
    await prisma.image.deleteMany({ where: { colorId: color.id } });
    return await prisma.panelCase.update({
      where: { id: pid },
      data: {
        name: caseDto.name,
        case: {
          update: {
            where: { id: cases.id },
            data: {
              model: cases.model,
              price: Number(cases.price),
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
}
export default {
  getPanelCaseByIdService,
  createCaseService,
  getAllCaseServie,
  getCaseByIdService,
  deleteCaseService,
  updateCaseService,
  getCaseByName,
  createCaseWithExistPanelService,
};
