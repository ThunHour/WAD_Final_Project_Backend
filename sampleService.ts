import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createBrandService(brandName: string, img: any) {}
async function getAllBrandServie() {}
async function getBrandByIdService(id: string) {}
async function deleteBrandService(id: string) {}
async function getBrandByName(name: string) {}
async function updateBrandService(id: string, name: string, imgUrl: string) {}
export default {
  createBrandService,
  getAllBrandServie,
  getBrandByIdService,
  deleteBrandService,
  updateBrandService,
  getBrandByName,
};
