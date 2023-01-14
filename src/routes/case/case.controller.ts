import { Case } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import upload from "../../util/picture.upload";
import { respone } from "../../payload/respone/defaultRespone";
import caseService from "./case.service";
async function createCase(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.files;
    var caseDto = req.body as Case;
    const amount = image?.length;
    if (
      caseDto.categoryId == null ||
      image == undefined ||
      caseDto.model == null ||
      caseDto.price == null ||
      caseDto.spec == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    var up = await upload.uploadMulti(res, image, amount as number, "case");

    // var brand = await caseService.createCaseService(brandName, up);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function getCaseById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "Id must not null", 400);
      return;
    }
    const cases = await caseService.getCaseByIdService(id);

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
    if (cases == null) {
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
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const cases = await caseService.deleteCaseService(id);
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
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  createCase,
  deleteCase,
  getAllCase,
  getCaseById,
  updateCase,
};
