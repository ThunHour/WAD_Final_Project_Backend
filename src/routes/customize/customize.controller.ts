import { NextFunction, Request, Response } from "express";
import { respone } from "../../payload/respone/defaultRespone";
import customizeService from "./customize.service";
import { customizeRequest } from "../../payload/request/customize.Request";
import jwtGen from "../../util/jwt-generate";
import { userToken } from "../../payload/request/user";
async function createCustomize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization as string;
    var customizeDto = req.body as customizeRequest;
    const user = req.user as userToken;
    console.log(customizeDto);

    customizeDto.userId = user.id;
    if (
      customizeDto.userId == null ||
      customizeDto.caseId == null ||
      customizeDto.cpuId == null ||
      customizeDto.gpuId == null ||
      customizeDto.motherBoardId == null ||
      customizeDto.powerSupplyId == null ||
      customizeDto.ramId == null ||
      customizeDto.storageId == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    var customize = await customizeService.createCustomizeService(customizeDto);
    respone(res, customize, "Create customize successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function getCustomizeById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "Id must not null", 400);
      return;
    }
    const customize = await customizeService.getCustomizeByIdService(id);

    if (customize == null) {
      respone(res, null, "There are not customize found", 404);
      return;
    }
    respone(res, customize, "Get customize successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function getAllCustomize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const customizes = await customizeService.getAllCustomizeServie();
    if (customizes == null || customizes.length == 0) {
      respone(res, null, "There are not customize found", 404);
      return;
    }
    respone(res, customizes, "Get all customizes successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function getAllAdminCustomize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const customizes = await customizeService.getAllAdminCustomizeService();
    if (customizes == null || customizes.length == 0) {
      respone(res, null, "There are not customize found", 404);
      return;
    }
    respone(res, customizes, "Get all customizes successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function getAllCustomizeByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization as string;
    var customizeDto = req.body as customizeRequest;
    const user = req.user as userToken;
    const id = user.id;
    const customizes = await customizeService.getAllCustomizeByUserIdService(
      id
    );
    if (customizes == null || customizes.length == 0) {
      respone(res, null, "There are not customize found", 404);
      return;
    }
    respone(res, customizes, "Get all customizes successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deleteCustomize(
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
    const customize = await customizeService.deleteCustomizeService(id);
    if (customize == null) {
      respone(res, null, "There are not customize found", 404);
      return;
    }
    respone(res, customize, "Delete customize Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function copyCustomize(req: Request, res: Response, next: NextFunction) {
  try {
    const { cusId } = req.body;
    const token = req.headers.authorization as string;
    const user = req.user as userToken;
    var userId = user.id;
    if (cusId == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const cus = await customizeService.copyCustomizeService(cusId, userId);
    if (cus == null) {
      respone(res, null, "Customize id not found !", 404);
      return;
    }
    respone(res, cus, "Copy customize Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function shareCustomize(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const customize = await customizeService.shareCustomizeService(id);
    if (customize == null) {
      respone(res, null, "Share is fail due to id not found !", 404);
      return;
    }
    respone(res, customize, "Share customize Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function updateCustomize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const token = req.headers.authorization as string;
    var customizeDto = req.body as customizeRequest;
    const user = req.user as userToken;
    customizeDto.userId = user.id;
    if (
      id == null ||
      customizeDto.userId ||
      customizeDto.caseId == null ||
      customizeDto.cpuId == null ||
      customizeDto.gpuId == null ||
      customizeDto.motherBoardId == null ||
      customizeDto.powerSupplyId == null ||
      customizeDto.ramId == null ||
      customizeDto.storageId == null ||
      (customizeDto.userId &&
        customizeDto.caseId == null &&
        customizeDto.cpuId == null &&
        customizeDto.gpuId == null &&
        customizeDto.motherBoardId == null &&
        customizeDto.powerSupplyId == null &&
        customizeDto.ramId == null &&
        customizeDto.storageId == null)
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const checkCustomize = await customizeService.getCustomizeByIdService(id);
    if (checkCustomize == null) {
      respone(res, null, "There are not customize found", 404);
      return;
    }
    var customize = await customizeService.updateCustomizeService(
      id,
      customizeDto
    );
    respone(res, customize, "update successful", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  shareCustomize,
  copyCustomize,
  getAllCustomizeByUserId,
  getAllAdminCustomize,
  createCustomize,
  deleteCustomize,
  getAllCustomize,
  getCustomizeById,
  updateCustomize,
};
