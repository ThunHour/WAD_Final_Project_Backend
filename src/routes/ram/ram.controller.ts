import { NextFunction, Request, Response } from "express";
import { respone } from "../../payload/respone/defaultRespone";
import { ramRequest } from "../../payload/request/ram.Resquest";
import upload from "../../util/picture.upload";
import ramService from "./ram.service";
import { Image } from "@prisma/client";
async function createRam(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.files;
    var ramDto = req.body as ramRequest;
    const amount = image?.length;
    if (
      ramDto.categoryId == null ||
      ramDto.listMotherBoardId == null ||
      image == undefined ||
      image.length == 0 ||
      ramDto.model == null ||
      ramDto.spec == null ||
      ramDto.color == null ||
      ramDto.type == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const list = ramDto.listMotherBoardId.split(",");
    var up = await upload.uploadMulti(res, image, amount as number, "ram");
    var rams = await ramService.createRamService(ramDto, up, list);
    respone(res, rams, "Create ram successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function getRamById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "Id must not null", 400);
      return;
    }
    const rams = await ramService.getPanelRamByIdService(id);

    if (rams == null) {
      respone(res, null, "There are not ram found", 404);
      return;
    }
    respone(res, rams, "Get ram successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function getAllRam(req: Request, res: Response, next: NextFunction) {
  try {
    const rams = await ramService.getAllRamServie();
    if (rams == null || rams.length == 0) {
      respone(res, null, "There are not ram found", 404);
      return;
    }
    respone(res, rams, "Get all rams successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deleteRam(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, itemId } = req.params;
    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const rams = await ramService.deleteRamService(id, itemId);
    if (rams == null) {
      respone(res, null, "There are not ram found", 404);
      return;
    }
    respone(res, rams, "Delete rams Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function updateRam(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.files;
    var ramDto = req.body as ramRequest;
    const amount = image?.length;
    const { id } = req.params;
    if (
      id == null ||
      ramDto.categoryId == null ||
      (image == undefined &&
        ramDto.listMotherBoardId.length == 0 &&
        ramDto.listMotherBoardId.length == 0 &&
        ramDto.model == null &&
        ramDto.listMotherBoardId == null &&
        ramDto.price == null &&
        ramDto.spec == null &&
        ramDto.color == null)
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const checkPanelRam = await ramService.getRamByIdService(id, ramDto.itemId);
    if (checkPanelRam == null) {
      respone(res, null, "There are not ram found", 404);
      return;
    }

    var up =
      image == undefined || image.length == 0
        ? []
        : await upload.uploadMulti(res, image, amount as number, "ram");
    const listOfMotherBoardId =
      ramDto.listMotherBoardId == undefined
        ? []
        : ramDto.listMotherBoardId == ""
        ? []
        : ramDto.listMotherBoardId.split(",");
    var updateRam = await ramService.updateRamService(
      id,
      ramDto,
      up as Image[],
      listOfMotherBoardId
    );
    respone(res, updateRam, "update successful", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function createRamWithExistPanel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    var image = req.files;
    var ramDto = req.body as ramRequest;
    const amount = image?.length;
    if (
      ramDto.categoryId == null ||
      image == undefined ||
      image.length == 0 ||
      ramDto.model == null ||
      ramDto.price == null ||
      ramDto.spec == null ||
      ramDto.color == null ||
      ramDto.type == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    var up = await upload.uploadMulti(res, image, amount as number, "ram");
    var rams = await ramService.createRamWithExistPanelService(id, ramDto, up);
    respone(res, rams, "Create ram successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
  {
  }
}
async function deletePanelRam(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const rams = await ramService.deletePanelRamService(id);
    if (rams == null) {
      respone(res, null, "There are not panel ram found", 404);
      return;
    }
    respone(res, rams, "Delete panel ram Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  deletePanelRam,
  createRam,
  deleteRam,
  getAllRam,
  getRamById,
  updateRam,
  createRamWithExistPanel,
};
