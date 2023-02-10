import { NextFunction, Request, Response } from "express";
import { respone } from "../../payload/respone/defaultRespone";
import upload from "../../util/picture.upload";
import powerSupplyService from "./powerSupply.service";
import { powerSupplyRequest } from "../../payload/request/powerSupply.Request";
import { Image } from "@prisma/client";

async function createPowerSupply(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    var image = req.files;
    var powerSupplyDto = req.body as powerSupplyRequest;
    const amount = image?.length;
    if (
      powerSupplyDto.categoryId == null ||
      image == undefined ||
      powerSupplyDto.model == null ||
      powerSupplyDto.price == null ||
      powerSupplyDto.spec == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    var up = await upload.uploadMulti(
      res,
      image,
      amount as number,
      "powerSupply"
    );
    var powerSupplies = await powerSupplyService.createPowerSupplyService(
      powerSupplyDto,
      up
    );
    respone(res, powerSupplies, "Create powerSupplies successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function createPowerSupplyWithExistPanel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  var image = req.files;
  var powerSupplyDto = req.body as powerSupplyRequest;
  const amount = image?.length;
  if (
    powerSupplyDto.categoryId == null ||
    image == undefined ||
    powerSupplyDto.model == null ||
    powerSupplyDto.price == null ||
    powerSupplyDto.color == null ||
    powerSupplyDto.spec == null
  ) {
    respone(res, null, "bad request", 400);
    return;
  }
  var up = await upload.uploadMulti(
    res,
    image,
    amount as number,
    "powerSupply"
  );
  var powerSupplies =
    await powerSupplyService.createPowerSupplyWithExistPanelService(
      id,
      powerSupplyDto,
      up
    );
  respone(res, powerSupplies, "Create powerSupplies successfully", 201);
}

async function getPowerSupplyById(
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
    const powerSupply = await powerSupplyService.getPanelPowerSupplyByIdService(
      id
    );

    if (powerSupply == null) {
      respone(res, null, "There are not powerSupply found", 404);
      return;
    }
    respone(res, powerSupply, "Get powerSupply successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function getAllPowerSupply(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const powerSupplies = await powerSupplyService.getAllPowerSupplyServie();
    if (powerSupplies == null) {
      respone(res, null, "There are not PowerSupplys found", 404);
      return;
    }
    respone(res, powerSupplies, "Get all powerSupplies successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deletePowerSupply(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, itemId } = req.params;
    if (id == null || itemId == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const powerSupplies = await powerSupplyService.deletePowerSupplyService(
      id,
      itemId
    );
    if (powerSupplies == null) {
      respone(res, null, "There are not powerSupplies found", 404);
      return;
    }
    respone(res, powerSupplies, "Delete powerSupplies Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function updatePowerSupply(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    var image = req.files;
    var powerSupplyDto = req.body as powerSupplyRequest;
    const amount = image?.length;
    const { id } = req.params;
    if (
      id == null ||
      powerSupplyDto.categoryId == null ||
      (image == undefined &&
        powerSupplyDto.model == null &&
        powerSupplyDto.price == null &&
        powerSupplyDto.color == null &&
        powerSupplyDto.spec == null)
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const checkPanelPowerSupply =
      await powerSupplyService.getPowerSupplyByIdService(
        id,
        powerSupplyDto.itemId
      );
    if (checkPanelPowerSupply == null) {
      respone(res, null, "There are not powersupply found", 404);
      return;
    }

    var up =
      image == undefined || image.length == 0
        ? []
        : await upload.uploadMulti(res, image, amount as number, "powerSupply");
    console.log(powerSupplyDto);

    var updatePowerSupply = await powerSupplyService.updatePowerSupplyService(
      id,
      powerSupplyDto,
      up as Image[]
    );
    respone(res, updatePowerSupply, "update successful", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function deletePanelPowerSupply(
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
    const powerSupplies =
      await powerSupplyService.deletePanelPowerSupplyService(id);
    if (powerSupplies == null) {
      respone(res, null, "There are not powerSupplies found", 404);
      return;
    }
    respone(res, powerSupplies, "Delete powerSupplies Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  createPowerSupply,
  deletePowerSupply,
  getAllPowerSupply,
  getPowerSupplyById,
  deletePanelPowerSupply,
  updatePowerSupply,
  createPowerSupplyWithExistPanel,
};
