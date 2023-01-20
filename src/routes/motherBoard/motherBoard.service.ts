import { Image, PanelMotherBoard, PrismaClient } from "@prisma/client";
import { motherBoardRequest } from "../../payload/request/motherBoard.Request";
const prisma = new PrismaClient();

async function createMotherBoardService(
  motherBoard: motherBoardRequest,
  img: Image[]
) {
  return await prisma.panelMotherBoard.create({
    data: {
      name: motherBoard.model,
      categoryId: motherBoard.categoryId,
      motherBoard: {
        create: {
          model: motherBoard.model,
          price: Number(motherBoard.price),
          color: {
            create: {
              color: motherBoard.color,
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
  });
}
async function getAllMotherBoardServie() {
  return await prisma.panelMotherBoard.findMany({
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      motherBoard: {
        include: {
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
      panelcase: {
        include: {
          Category: {
            select: {
              id: true,
              categoryName: true,
            },
          },
          case: {
            include: {
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
      panelcpu: {
        include: {
          Category: {
            select: {
              id: true,
              categoryName: true,
            },
          },
          cpu: {
            include: {
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
      panelRam: {
        include: {
          Category: {
            select: {
              id: true,
              categoryName: true,
            },
          },
          ram: {
            include: {
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
      panelstorage: {
        include: {
          Category: {
            select: {
              id: true,
              categoryName: true,
            },
          },
          storage: {
            include: {
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
async function getMotherBoardByIdService(id: string, itemId: string) {
  return await prisma.panelMotherBoard.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
      motherBoard: {
        where: { id: itemId },
        include: {
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
      panelcase: {
        include: {
          Category: {
            select: {
              id: true,
              categoryName: true,
            },
          },
          case: {
            include: {
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
      panelcpu: {
        include: {
          Category: {
            select: {
              id: true,
              categoryName: true,
            },
          },
          cpu: {
            include: {
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
      panelRam: {
        include: {
          Category: {
            select: {
              id: true,
              categoryName: true,
            },
          },
          ram: {
            include: {
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
      panelstorage: {
        include: {
          Category: {
            select: {
              id: true,
              categoryName: true,
            },
          },
          storage: {
            include: {
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
async function getPanelMotherBoardByIdService(id: string) {
  return await prisma.panelMotherBoard.findUnique({
    where: { id },
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
  });
}
async function deleteMotherBoardService(pid: string, itemId: string) {
  const countRam = await prisma.motherBoard.count({
    where: { panelMotherBoardId: pid },
  });
  if (countRam > 1) {
    const panel = await getMotherBoardByIdService(pid, itemId);
    await prisma.motherBoard.delete({ where: { id: itemId } });
    return panel;
  } else {
    return await prisma.panelMotherBoard.delete({
      where: { id: pid },
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
    });
  }
}
async function getMotherBoardByName(name: string) {}
async function updateMotherBoardService(
  pid: string,
  motherBoardDto: PanelMotherBoard,
  motherBoard: any,
  color: any,
  img: Image[]
) {
  if (img.length == 0) {
    return await prisma.panelRam.update({
      where: { id: pid },
      data: {
        name: motherBoardDto.name,
        ram: {
          update: {
            where: { id: motherBoard.id },
            data: {
              model: motherBoard.model,
              price: Number(motherBoard.price) as number,
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
  } else {
    await prisma.image.deleteMany({ where: { colorId: color.id } });
    return await prisma.panelRam.update({
      where: { id: pid },
      data: {
        name: motherBoardDto.name,
        ram: {
          update: {
            where: { id: motherBoard.id },
            data: {
              model: motherBoard.model,
              price: Number(motherBoard.price),
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
    });
  }
}

async function createMotherBoardWithExistPanelService(
  pid: string,
  motherBoardDto: motherBoardRequest,
  img: Image[]
) {
  return await prisma.panelMotherBoard.update({
    where: { id: pid },
    data: {
      motherBoard: {
        create: {
          model: motherBoardDto.model,
          price: Number(motherBoardDto.price),
          color: {
            create: {
              color: motherBoardDto.color,
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
      motherBoard: {
        include: {
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
  createMotherBoardService,
  getAllMotherBoardServie,
  getMotherBoardByIdService,
  deleteMotherBoardService,
  updateMotherBoardService,
  getMotherBoardByName,
  getPanelMotherBoardByIdService,
  createMotherBoardWithExistPanelService,
};
