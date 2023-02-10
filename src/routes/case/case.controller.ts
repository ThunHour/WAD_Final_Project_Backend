import { Image } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import upload from "../../util/picture.upload";
import { respone } from "../../payload/respone/defaultRespone";
import caseService from "./case.service";
import { caseRequest } from "../../payload/request/case.Request";
async function createCase(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.files;
    var caseDto = req.body as caseRequest;
    const amount = image?.length;
    if (
      caseDto.categoryId == null ||
      image == undefined ||
      caseDto.model == null ||
      caseDto.price == null ||
      caseDto.color == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const list = caseDto.listMotherBoardId.split(",");
    var up = await upload.uploadMulti(res, image, amount as number, "case");
    var cases = await caseService.createCaseService(caseDto, up, list);
    respone(res, cases, "Create case successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function createCaseWithExistPanel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  var image = req.files;
  var caseDto = req.body as caseRequest;
  const amount = image?.length;
  if (
    caseDto.categoryId == null ||
    image == undefined ||
    caseDto.model == null ||
    caseDto.price == null ||
    caseDto.color == null
  ) {
    respone(res, null, "bad request", 400);
    return;
  }
  var up = await upload.uploadMulti(res, image, amount as number, "case");
  var cases = await caseService.createCaseWithExistPanelService(
    id,
    caseDto,
    up
  );
  respone(res, cases, "Create case successfully", 201);
}
async function getCaseById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "Id must not null", 400);
      return;
    }
    const cases = await caseService.getPanelCaseByIdService(id);

    if (cases == null) {
      respone(res, null, "There are not case found", 404);
      return;
    }
    respone(res, cases, "Get cases successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function getAllCase(req: Request, res: Response, next: NextFunction) {
  try {
    const cases = await caseService.getAllCaseServie();
    if (cases == null || cases.length == 0) {
      respone(res, null, "There are not case found", 404);
      return;
    }
    respone(res, cases, "Get all cases successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deleteCase(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, itemId } = req.params;

    if (id == null || itemId == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const cases = await caseService.deleteCaseService(id, itemId);
    if (cases == null) {
      respone(res, null, "There are not case found", 404);
      return;
    }
    respone(res, cases, "Delete case Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function updateCase(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.files;
    var caseDto = req.body as caseRequest;
    const amount = image?.length;
    const { id } = req.params;
    if (
      id == null ||
      caseDto.categoryId == null ||
      (image == undefined &&
        caseDto.model == null &&
        caseDto.price == null &&
        caseDto.color == null)
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const checkPanelCase = await caseService.getCaseByIdService(
      id,
      caseDto.itemId
    );
    if (checkPanelCase == null) {
      respone(res, null, "There are not case found", 404);
      return;
    }

    var up =
      image == undefined || image.length == 0
        ? []
        : await upload.uploadMulti(res, image, amount as number, "case");
    const listOfMotherBoardId =
      caseDto.listMotherBoardId == undefined
        ? []
        : caseDto.listMotherBoardId == ""
        ? []
        : caseDto.listMotherBoardId.split(",");
    var updateCase = await caseService.updateCaseService(
      id,
      caseDto,
      up as Image[],
      listOfMotherBoardId
    );
    respone(res, updateCase, "update successful", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deletePanelCase(
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
    const cases = await caseService.deletePanelCaseService(id);
    if (cases == null) {
      respone(res, null, "There are not case found", 404);
      return;
    }
    respone(res, cases, "Delete case Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  deletePanelCase,
  createCase,
  deleteCase,
  getAllCase,
  getCaseById,
  updateCase,
  createCaseWithExistPanel,
};
