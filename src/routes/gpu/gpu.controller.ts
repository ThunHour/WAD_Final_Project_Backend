import { NextFunction, Request, Response } from "express";
import { respone } from "../../payload/respone/defaultRespone";
import upload from "../../util/picture.upload";
import gpuService from "./gpu.service";
import { gpuRequest } from "../../payload/request/gpu.Request";
import { Image } from "@prisma/client";

async function createGpu(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.files;
    var gpuDto = req.body as gpuRequest;
    const amount = image?.length;
    if (
      gpuDto.categoryId == null ||
      gpuDto.model == null ||
      gpuDto.price == null ||
      gpuDto.spec == null ||
      gpuDto.color == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }

    var up = await upload.uploadMulti(res, image, amount as number, "gpu");

    var gpus = await gpuService.createGpuService(gpuDto, up);
    respone(res, gpus, "Create gpu successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function createGpuWithExistPanel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  var image = req.files;
  var gpuDto = req.body as gpuRequest;
  const amount = image?.length;
  if (
    gpuDto.categoryId == null ||
    image == undefined ||
    gpuDto.model == null ||
    gpuDto.price == null ||
    gpuDto.color == null ||
    gpuDto.spec == null
  ) {
    respone(res, null, "bad request", 400);
    return;
  }
  var up = await upload.uploadMulti(res, image, amount as number, "gpu");
  var gpus = await gpuService.createGpuWithExistPanelService(id, gpuDto, up);
  respone(res, gpus, "Create gpu successfully", 201);
}

async function getGpuById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "Id must not null", 400);
      return;
    }
    const gpu = await gpuService.getPanelGpuByIdService(id);

    if (gpu == null) {
      respone(res, null, "There are not gpu found", 404);
      return;
    }
    respone(res, gpu, "Get gpu successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function getAllGpu(req: Request, res: Response, next: NextFunction) {
  try {
    const gpus = await gpuService.getAllGpuServie();
    if (gpus == null) {
      respone(res, null, "There are not gpus found", 404);
      return;
    }
    respone(res, gpus, "Get all gpus successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deleteGpu(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, itemId } = req.params;
    if (id == null || itemId == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const gpus = await gpuService.deleteGpuService(id, itemId);
    if (gpus == null) {
      respone(res, null, "There are not gpus found", 404);
      return;
    }
    respone(res, gpus, "Delete gpus Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function updateGpu(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.files;
    var gpuDto = req.body as gpuRequest;
    const amount = image?.length;
    const { id } = req.params;
    if (
      id == null ||
      gpuDto.categoryId == null ||
      (image == undefined &&
        gpuDto.model == null &&
        gpuDto.price == null &&
        gpuDto.color == null &&
        gpuDto.spec == null)
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const checkPanelGpu = await gpuService.getGpuByIdService(id, gpuDto.itemId);
    if (checkPanelGpu == null) {
      respone(res, null, "There are not case found", 404);
      return;
    }
    var up =
      image == undefined || image.length == 0
        ? []
        : await upload.uploadMulti(res, image, amount as number, "gpu");
    var updateGpu = await gpuService.updateGpuService(
      id,
      gpuDto,
      up as Image[]
    );
    respone(res, updateGpu, "update successful", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function deletePanelGpu(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const gpu = await gpuService.deletePanelGpuService(id);
    if (gpu == null) {
      respone(res, null, "There are not storage found", 404);
      return;
    }
    respone(res, gpu, "Delete storage Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  createGpu,
  deleteGpu,
  getAllGpu,
  getGpuById,
  deletePanelGpu,
  updateGpu,
  createGpuWithExistPanel,
};
