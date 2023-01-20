import { NextFunction, Request, Response } from "express";
import { respone } from "../../payload/respone/defaultRespone";
import { Storage } from "@prisma/client";
import upload from "../../util/picture.upload";
import storageService from "./storage.service";

async function createStorage(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.files;
    var storageDto = req.body as Storage;
    const amount = image?.length;
    if (
      storageDto.categoryId == null ||
      image == undefined ||
      storageDto.model == null ||
      storageDto.price == null ||
      storageDto.spec == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    var up = await upload.uploadMulti(res, image, amount as number, "storage");
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function getStorageById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "Id must not null", 400);
      return;
    }
    const storage = await storageService.getStorageByIdService(id);

    if (storage == null) {
      respone(res, null, "There are not storage found", 404);
      return;
    }
    respone(res, storage, "Get storage successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function getAllStorage(req: Request, res: Response, next: NextFunction) {
  try {
    const storages = await storageService.getAllStorageServie();
    if (storages == null) {
      respone(res, null, "There are not storage found", 404);
      return;
    }
    respone(res, storages, "Get all storages successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deleteStorage(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const storages = await storageService.deleteStorageService(id);
    if (storages == null) {
      respone(res, null, "There are not storages found", 404);
      return;
    }
    respone(res, storages, "Delete storages Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function updateStorage(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  createStorage,
  deleteStorage,
  getAllStorage,
  getStorageById,
  updateStorage,
};
