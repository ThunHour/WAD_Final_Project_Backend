import { NextFunction, Request, Response } from "express";
import { respone } from "../../payload/respone/defaultRespone";
import { cpuRequest } from "../../payload/request/cpu.Request";
import upload from "../../util/picture.upload";
import cpuService from "./cpu.service";
import { Image } from "@prisma/client";
async function createCpu(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.files;
    var cpuDto = req.body as cpuRequest;
    const amount = image?.length;
    if (
      cpuDto.categoryId == null ||
      cpuDto.listMotherBoardId == null ||
      image == undefined ||
      image.length == 0 ||
      cpuDto.model == null ||
      cpuDto.spec == null ||
      cpuDto.color == null ||
      cpuDto.type == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const list = cpuDto.listMotherBoardId.split(",");
    var up = await upload.uploadMulti(res, image, amount as number, "cpu");
    var cpu = await cpuService.createCpuService(cpuDto, up, list);
    respone(res, cpu, "Create cpu successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function getCpuById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "Id must not null", 400);
      return;
    }
    const cpu = await cpuService.getPanelCpuByIdService(id);

    if (cpu == null) {
      respone(res, null, "There are not cpu found", 404);
      return;
    }
    respone(res, cpu, "Get cpu successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function getAllCpu(req: Request, res: Response, next: NextFunction) {
  try {
    const cpus = await cpuService.getAllCpuService();
    if (cpus == null || cpus.length == 0) {
      respone(res, null, "There are not cpus found", 404);
      return;
    }
    respone(res, cpus, "Get all cpus successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deleteCpu(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, itemId } = req.params;
    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const cpu = await cpuService.deleteCpuService(id, itemId);
    if (cpu == null) {
      respone(res, null, "There are not cpu found", 404);
      return;
    }
    respone(res, cpu, "Delete cpu Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function updateCpu(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.files;
    var cpuDto = req.body as cpuRequest;
    const amount = image?.length;
    const { id } = req.params;
    if (
      id == null ||
      cpuDto.categoryId == null ||
      (image == undefined &&
        cpuDto.listMotherBoardId.length == 0 &&
        cpuDto.listMotherBoardId.length == 0 &&
        cpuDto.model == null &&
        cpuDto.listMotherBoardId == null &&
        cpuDto.price == null &&
        cpuDto.spec == null &&
        cpuDto.color == null)
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const checkPanelCpu = await cpuService.getCpuByIdService(id, cpuDto.itemId);
    if (checkPanelCpu == null) {
      respone(res, null, "There are not cpu found", 404);
      return;
    }

    var up =
      image == undefined || image.length == 0
        ? []
        : await upload.uploadMulti(res, image, amount as number, "cpu");
    const listOfMotherBoardId =
      cpuDto.listMotherBoardId == undefined
        ? []
        : cpuDto.listMotherBoardId == ""
        ? []
        : cpuDto.listMotherBoardId.split(",");
    var updateCpu = await cpuService.updateCpuService(
      id,
      cpuDto,
      up as Image[],
      listOfMotherBoardId
    );
    respone(res, updateCpu, "update successful", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function createCpuWithExistPanel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    var image = req.files;
    var cpuDto = req.body as cpuRequest;
    const amount = image?.length;
    if (
      cpuDto.categoryId == null ||
      image == undefined ||
      image.length == 0 ||
      cpuDto.model == null ||
      cpuDto.price == null ||
      cpuDto.spec == null ||
      cpuDto.color == null ||
      cpuDto.type == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    var up = await upload.uploadMulti(res, image, amount as number, "cpu");
    var cpu = await cpuService.createCpuWithExistPanelService(id, cpuDto, up);
    respone(res, cpu, "Create cpu successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
  {
  }
}
async function deletePanelCpu(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const cpu = await cpuService.deletePanelCpuService(id);
    if (cpu == null) {
      respone(res, null, "There are not panel cpu found", 404);
      return;
    }
    respone(res, cpu, "Delete panel cpu Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  deletePanelCpu,
  createCpu,
  deleteCpu,
  getAllCpu,
  getCpuById,
  updateCpu,
  createCpuWithExistPanel,
};
