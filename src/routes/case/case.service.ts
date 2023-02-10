import { PrismaClient, Image, PanelCase } from "@prisma/client";
const prisma = new PrismaClient();
import { caseRequest } from "../../payload/request/case.Request";
async function createCaseService(
  caseDto: caseRequest,
  img: Image[],
  list: string[]
) {
  const panel = await prisma.panelCase.create({
    data: {
      name: caseDto.model,
      categoryId: caseDto.categoryId,
      case: {
        create: {
          price: Number(caseDto.price),
          color: {
            create: {
              color: caseDto.color,
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
async function getAllCaseServie() {
  return await prisma.panelCase.findMany({
    include: {
      category: {
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

async function getPanelCaseByIdService(id: string) {
  return await prisma.panelCase.findUnique({
    where: { id },
    include: {
      category: {
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
      category: {
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
async function getCaseByIdService(pid: string, itemId: string) {
  return await prisma.panelCase.findUnique({
    where: { id: pid },
    include: {
      category: {
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
        category: {
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
}

async function updateCaseService(
  pid: string,
  cases: any,
  img: Image[],
  listMotherBoardId: string[]
) {
  if (img.length > 0) {
    await prisma.color.delete({
      where: {
        caseId: cases.itemId,
      },
    });
  }
  const listPanelCaseId = await prisma.panelCase.findFirst({
    where: { id: pid },
    select: {
      panelmotherBoard: {
        select: {
          id: true,
        },
      },
    },
  });
  var oldId = listPanelCaseId?.panelmotherBoard.map((e) => {
    return e.id;
  });
  var dicon = oldId?.filter((e) => {
    return !listMotherBoardId.includes(e);
  });

  return await prisma.panelCase.update({
    where: { id: pid },
    data: {
      name: cases.model,
      case: {
        update: {
          where: { id: cases.itemId },
          data: {
            price: Number(cases.price) as number,
            color:
              img.length != 0
                ? {
                    create: {
                      color: cases.color,
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
                      color: cases.color,
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
async function deletePanelCaseService(id: string) {
  const listPanelCaseId = await prisma.panelCase.findUnique({
    where: { id },
    select: {
      panelmotherBoard: {
        select: {
          id: true,
        },
      },
    },
  });
  await prisma.panelCase.update({
    where: { id },
    data: {
      panelmotherBoard: {
        disconnect: listPanelCaseId?.panelmotherBoard.map((e) => {
          return e;
        }),
      },
    },
  });
  return await prisma.panelCase.delete({
    where: { id: id },
  });
}
export default {
  deletePanelCaseService,
  getPanelCaseByIdService,
  createCaseService,
  getAllCaseServie,
  getCaseByIdService,
  deleteCaseService,
  updateCaseService,
  createCaseWithExistPanelService,
};
