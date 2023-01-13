import { PrismaClient, Partner, Image } from "@prisma/client";
const prisma = new PrismaClient();

async function createPartnerService(partner: Partner, img: any) {
  return await prisma.partner.create({
    data: {
      storeName: partner.storeName,
      webUrl: partner.webUrl,
      location: partner.location,
      logo: {
        create: {
          imageUrl: img,
        },
      },
    },
  });
}

async function getAllPartnerServie() {
  return await prisma.partner.findMany({
    include: {
      logo: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });
}
async function getPartnerByIdService(id: string) {
  return await prisma.partner.findUnique({
    where: { id },
    include: {
      logo: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });
}
async function deletePartnerService(id: string) {
  return await prisma.partner.delete({
    where: { id },
    include: {
      logo: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });
}
async function getPartnerByName(name: string) {
  return await prisma.partner.findUnique({
    where: {
      storeName: name,
    },
    include: {
      logo: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });
}
async function updatePartnerService(id: string, partner: Partner, img: string) {
  return await prisma.partner.update({
    where: { id },
    data: {
      storeName: partner.storeName,
      webUrl: partner.webUrl,
      location: partner.location,
      logo: {
        update: {
          imageUrl: img,
        },
      },
    },
    include: {
      logo: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });
}
export default {
  createPartnerService,
  getAllPartnerServie,
  getPartnerByIdService,
  deletePartnerService,
  updatePartnerService,
  getPartnerByName,
};
