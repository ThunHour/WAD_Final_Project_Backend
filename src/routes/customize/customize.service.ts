import { PrismaClient, Image } from "@prisma/client";
import { customizeRequest } from "../../payload/request/customize.Request";
const prisma = new PrismaClient();

async function shareCustomizeService(id: string) {
  return await prisma.customize.update({
    where: { id },
    data: {
      share: true,
    },
  });
}
async function copyCustomizeService(cusId: string, userId: string) {
  var cus = await getCustomizeByIdService(cusId);
  if (cus == null) {
    return null;
  } else {
    return await prisma.customize.create({
      data: {
        share: false,
        motherBoardId: cus?.motherBoardId,
        gpuId: cus?.gpuId,
        powerSupplyId: cus?.powerSupplyId,
        cpuId: cus?.cpuId,
        ramId: cus?.ramId,
        storageId: cus?.storageId,
        caseId: cus?.caseId,
        userId: userId,
      },
    });
  }
}
async function createCustomizeService(custom: customizeRequest) {
  return await prisma.customize.create({
    data: {
      motherBoardId: custom.motherBoardId,
      gpuId: custom.gpuId,
      powerSupplyId: custom.powerSupplyId,
      cpuId: custom.cpuId,
      ramId: custom.ramId,
      storageId: custom.storageId,
      caseId: custom.caseId,
      userId: custom.userId,
      share: false,
    },
    include: {
      case: {
        include: {
          color: {
            include: {
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
      cpu: {
        include: {
          color: {
            include: {
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
      gpu: {
        include: {
          color: {
            include: {
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
      powerSupply: {
        include: {
          color: {
            include: {
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
      motherBoard: {
        include: {
          color: {
            include: {
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
      ram: {
        include: {
          color: {
            include: {
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
      storage: {
        include: {
          color: {
            include: {
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
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
          role: true,
        },
      },
    },
  });
}
async function getAllAdminCustomizeService() {
  return await prisma.customize.findMany({
    where: {
      user: {
        role: "ADMIN",
      },
    },
    include: {
      case: {
        include: {
          color: {
            include: {
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
      cpu: {
        include: {
          color: {
            include: {
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
      gpu: {
        include: {
          color: {
            include: {
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
      powerSupply: {
        include: {
          color: {
            include: {
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
      motherBoard: {
        include: {
          color: {
            include: {
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
      ram: {
        include: {
          color: {
            include: {
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
      storage: {
        include: {
          color: {
            include: {
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
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
          role: true,
        },
      },
    },
  });
}
async function getAllCustomizeServie() {
  return await prisma.customize.findMany({
    include: {
      case: {
        include: {
          color: {
            include: {
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
      cpu: {
        include: {
          color: {
            include: {
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
      gpu: {
        include: {
          color: {
            include: {
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
      powerSupply: {
        include: {
          color: {
            include: {
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
      motherBoard: {
        include: {
          color: {
            include: {
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
      ram: {
        include: {
          color: {
            include: {
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
      storage: {
        include: {
          color: {
            include: {
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
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
          role: true,
        },
      },
    },
  });
}
async function getCustomizeByIdService(id: string) {
  return await prisma.customize.findUnique({
    where: { id },
    include: {
      case: {
        include: {
          color: {
            include: {
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
      cpu: {
        include: {
          color: {
            include: {
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
      gpu: {
        include: {
          color: {
            include: {
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
      powerSupply: {
        include: {
          color: {
            include: {
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
      motherBoard: {
        include: {
          color: {
            include: {
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
      ram: {
        include: {
          color: {
            include: {
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
      storage: {
        include: {
          color: {
            include: {
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
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
          role: true,
        },
      },
    },
  });
}
async function deleteCustomizeService(id: string) {
  return await prisma.customize.delete({
    where: { id },
  });
}

async function updateCustomizeService(id: string, custom: customizeRequest) {
  return await prisma.customize.update({
    where: { id },
    data: {
      motherBoardId: custom.motherBoardId,
      gpuId: custom.gpuId,
      powerSupplyId: custom.powerSupplyId,
      cpuId: custom.cpuId,
      ramId: custom.ramId,
      storageId: custom.storageId,
      caseId: custom.caseId,
      userId: custom.userId,
    },
    include: {
      case: {
        include: {
          color: {
            include: {
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
      cpu: {
        include: {
          color: {
            include: {
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
      gpu: {
        include: {
          color: {
            include: {
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
      powerSupply: {
        include: {
          color: {
            include: {
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
      motherBoard: {
        include: {
          color: {
            include: {
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
      ram: {
        include: {
          color: {
            include: {
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
      storage: {
        include: {
          color: {
            include: {
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
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
          role: true,
        },
      },
    },
  });
}
async function getAllCustomizeByUserIdService(id: string) {
  return await prisma.customize.findMany({
    where: {
      userId: id,
    },
  });
}
export default {
  createCustomizeService,
  getAllCustomizeServie,
  getCustomizeByIdService,
  deleteCustomizeService,
  updateCustomizeService,
  shareCustomizeService,
  getAllAdminCustomizeService,
  copyCustomizeService,
  getAllCustomizeByUserIdService,
};
