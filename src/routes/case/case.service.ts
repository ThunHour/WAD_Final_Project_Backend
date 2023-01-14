import { Case, Color, PrismaClient, Image } from "@prisma/client";
const prisma = new PrismaClient();

async function createCaseService(caseDto: Case, color: Color[], img: string[]) {
  return await prisma.case.create({
    data: {
      model: caseDto.model,
      price: caseDto.price,
      spec: caseDto.spec,
      categoryId: caseDto.categoryId,
      color: {
        create: color.map((c, index) => {
          return {
            color: c.color,
            image: {
              create: {
                imageUrl: img[index],
              },
            },
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
  });
}
async function getAllCaseServie() {
  return await prisma.case.findMany({
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
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
  });
}

async function getCaseByIdService(id: string) {
  return await prisma.case.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
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
  });
}
async function deleteCaseService(id: string) {
  return await prisma.case.delete({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
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
  });
}
async function getCaseByName(name: string) {}
async function updateCaseService(
  id: string,
  caseDto: Case,
  color: Color[],
  img: Image[]
) {
  return await prisma.case.update({
    where: { id },
    data: {
      model: caseDto.model,
      price: caseDto.price,
      spec: caseDto.spec,
      categoryId: caseDto.categoryId,
      color: {
        update: color.map((c, index) => {
          return {
            where: { id: c.id },
            data: {
              color: c.color,
              image: {
                update: {
                  where: { id: img[index].id },
                  data: {
                    imageUrl: img[index].imageUrl,
                  },
                },
              },
            },
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
  });
}
export default {
  createCaseService,
  getAllCaseServie,
  getCaseByIdService,
  deleteCaseService,
  updateCaseService,
  getCaseByName,
};
