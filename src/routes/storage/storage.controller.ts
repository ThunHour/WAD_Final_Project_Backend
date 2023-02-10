import { NextFunction, Request, Response } from "express";
import { respone } from "../../payload/respone/defaultRespone";
import upload from "../../util/picture.upload";
import storageService from "./storage.service";
import { storageRequest } from "../../payload/request/storage.Request";
import { Image } from "@prisma/client";

async function createStorage(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.files;
    var storageDto = req.body as storageRequest;
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
    const list = storageDto.listMotherBoardId.split(",");
    var up = await upload.uploadMulti(res, image, amount as number, "storage");
    var storages = await storageService.createStorageService(
      storageDto,
      up,
      list
    );
    respone(res, storages, "Create storage successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function createStorageWithExistPanel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  var image = req.files;
  var storageDto = req.body as storageRequest;
  const amount = image?.length;
  if (
    storageDto.categoryId == null ||
    image == undefined ||
    storageDto.model == null ||
    storageDto.price == null ||
    storageDto.color == null ||
    storageDto.spec == null
  ) {
    respone(res, null, "bad request", 400);
    return;
  }
  var up = await upload.uploadMulti(res, image, amount as number, "storage");
  var storages = await storageService.createStorageWithExistPanelService(
    id,
    storageDto,
    up
  );
  respone(res, storages, "Create storage successfully", 201);
}

async function getStorageById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "Id must not null", 400);
      return;
    }
    const storage = await storageService.getPanelStorageByIdService(id);

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
    const { id, itemId } = req.params;
    if (id == null || itemId == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const storages = await storageService.deleteStorageService(id, itemId);
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
    var image = req.files;
    var storageDto = req.body as storageRequest;
    const amount = image?.length;
    const { id } = req.params;
    if (
      id == null ||
      storageDto.categoryId == null ||
      (image == undefined &&
        storageDto.model == null &&
        storageDto.price == null &&
        storageDto.color == null &&
        storageDto.spec == null)
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const checkPanelStorage = await storageService.getStorageByIdService(
      id,
      storageDto.itemId
    );
    if (checkPanelStorage == null) {
      respone(res, null, "There are not case found", 404);
      return;
    }

    var up =
      image == undefined || image.length == 0
        ? []
        : await upload.uploadMulti(res, image, amount as number, "storage");
    const listOfMotherBoardId =
      storageDto.listMotherBoardId == undefined
        ? []
        : storageDto.listMotherBoardId == ""
        ? []
        : storageDto.listMotherBoardId.split(",");

    var updateStorage = await storageService.updateStorageService(
      id,
      storageDto,
      up as Image[],
      listOfMotherBoardId
    );
    respone(res, updateStorage, "update successful", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function deletePanelStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const storages = await storageService.deletePanelStorageService(id);
    if (storages == null) {
      respone(res, null, "There are not storage found", 404);
      return;
    }
    respone(res, storages, "Delete storage Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  createStorage,
  deleteStorage,
  getAllStorage,
  getStorageById,
  deletePanelStorage,
  updateStorage,
  createStorageWithExistPanel,
};
