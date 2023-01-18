import { NextFunction, Request, Response } from "express";
import { respone } from "../../payload/respone/defaultRespone";
import partnerService from "./partner.service";
import upload from "../../util/picture.upload";
import { Partner } from "@prisma/client";

async function createPartner(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.file;
    const partnerDto = req.body as Partner;
    if (
      partnerDto.location == null ||
      image == undefined ||
      partnerDto.storeName == null ||
      partnerDto.webUrl == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const checkStore = await partnerService.getPartnerByName(
      partnerDto.storeName
    );
    if (checkStore != null) {
      respone(res, null, "Store already exist!", 409);
      return;
    }
    var up = await upload.uploadImage(res, "partnerLogo", image);
    var brand = await partnerService.createPartnerService(partnerDto, up);
    respone(res, brand, "Create partner successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function getPartnerById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const partner = await partnerService.getPartnerByIdService(id);
    if (partner == null) {
      respone(res, null, "There are not partner", 404);
      return;
    }
    respone(res, partner, "Get partner by id successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function getAllPartner(req: Request, res: Response, next: NextFunction) {
  try {
    const partner = await partnerService.getAllPartnerServie();
    if (partner == null || partner.length == 0) {
      respone(res, null, "There are not partner", 404);
      return;
    }
    respone(res, partner, "Get Partner successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deletePartner(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const partner = partnerService.deletePartnerService(id);
    if (partner == null) {
      respone(res, null, "There are not partner", 404);
      return;
    }
    respone(res, partner, "Delete partner successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function updatePartner(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const partnerDto = req.body as Partner;
    const img = req.file;
    if (
      id == null ||
      (partnerDto.location == null &&
        img == undefined &&
        partnerDto.storeName == null &&
        partnerDto.webUrl == null)
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const checkPartner = await partnerService.getPartnerByIdService(id);
    if (checkPartner == null) {
      respone(res, null, "Partner do not exist", 404);
      return;
    }
    var up =
      img == undefined
        ? checkPartner.logo?.imageUrl
        : await upload.uploadImage(res, "partnerLogo", img);

    partnerDto.location == null
      ? (partnerDto.location = checkPartner.location)
      : null;
    partnerDto.storeName == null
      ? (partnerDto.storeName = checkPartner.storeName)
      : null;
    partnerDto.webUrl == null
      ? (partnerDto.webUrl = checkPartner.webUrl)
      : null;
    const partner = await partnerService.updatePartnerService(
      id,
      partnerDto,
      up as string
    );
    respone(res, partner, "Partner update successfully", 200);
    return;
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  createPartner,
  deletePartner,
  getAllPartner,
  getPartnerById,
  updatePartner,
};
