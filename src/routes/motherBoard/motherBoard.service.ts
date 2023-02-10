import { Image, PrismaClient } from "@prisma/client";
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
    select: {
      id: true,
      name: true,
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
      panelcase: {
        include: {
          category: {
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
          category: {
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
          category: {
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
          category: {
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
          category: {
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
          category: {
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
          category: {
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
          category: {
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
      panelcase: {
        include: {
          category: {
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
          category: {
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
          category: {
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
          category: {
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

async function updateMotherBoardService(
  pid: string,
  motherBoard: any,
  img: Image[]
) {
  if (img.length > 0) {
    await prisma.color.delete({
      where: {
        motherBoardId: motherBoard.itemId,
      },
    });
  }
  return await prisma.panelMotherBoard.update({
    where: { id: pid },
    data: {
      name: motherBoard.model,
      motherBoard: {
        update: {
          where: { id: motherBoard.itemId },
          data: {
            price: Number(motherBoard.price) as number,
            color:
              img.length == 0
                ? {
                    update: {
                      color: motherBoard.color,
                    },
                  }
                : {
                    create: {
                      color: motherBoard.color,
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
async function deletePanelMotherBoardService(id: string) {
  return await prisma.panelMotherBoard.delete({
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

export default {
  deletePanelMotherBoardService,
  createMotherBoardService,
  getAllMotherBoardServie,
  getMotherBoardByIdService,
  deleteMotherBoardService,
  updateMotherBoardService,
  getPanelMotherBoardByIdService,
  createMotherBoardWithExistPanelService,
};
