import { NextFunction, Request, Response } from "express";
import { respone } from "../../payload/respone/defaultRespone";
import motherBoardService from "./motherBoard.service";
import { motherBoardRequest } from "../../payload/request/motherBoard.Request";
import upload from "../../util/picture.upload";
import { Image } from "@prisma/client";
async function createMotherBoard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    var image = req.files;
    var motherBoardDto = req.body as motherBoardRequest;
    const amount = image?.length;
    if (
      motherBoardDto.categoryId == null ||
      image == undefined ||
      image.length == 0 ||
      motherBoardDto.model == null ||
      motherBoardDto.color == null ||
      motherBoardDto.price == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    var up = await upload.uploadMulti(
      res,
      image,
      amount as number,
      "motherBoard"
    );
    var motherBoard = await motherBoardService.createMotherBoardService(
      motherBoardDto,
      up
    );
    respone(res, motherBoard, "Create motherboard successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function getMotherBoardById(
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
    const motherBoard = await motherBoardService.getPanelMotherBoardByIdService(
      id
    );

    if (motherBoard == null) {
      respone(res, null, "There are not motherboard found", 404);
      return;
    }
    respone(res, motherBoard, "Get motherboard successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function getAllMotherBoard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const motherboard = await motherBoardService.getAllMotherBoardServie();
    if (motherboard == null || motherboard.length == 0) {
      respone(res, null, "There are not ram found", 404);
      return;
    }
    respone(res, motherboard, "Get all motherboards successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deleteMotherBoard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, itemId } = req.params;

    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const motherboard = await motherBoardService.deleteMotherBoardService(
      id,
      itemId
    );
    if (motherboard == null) {
      respone(res, null, "There are not motherboard found", 404);
      return;
    }
    respone(res, motherboard, "Delete motherboard Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function updateMotherBoard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    var image = req.files;
    var motherBoardDto = req.body as motherBoardRequest;
    const amount = image?.length;
    const { id } = req.params;
    if (
      id == null ||
      motherBoardDto.categoryId == null ||
      (image == undefined &&
        motherBoardDto.model == null &&
        motherBoardDto.price == null &&
        motherBoardDto.color == null)
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const checkMotherBoard = await motherBoardService.getMotherBoardByIdService(
      id,
      motherBoardDto.itemId
    );
    if (checkMotherBoard == null) {
      respone(res, null, "There are not mother found", 404);
      return;
    }

    var up =
      image == undefined || image.length == 0
        ? []
        : await upload.uploadMulti(res, image, amount as number, "ram");
    var updateMotherBoard = await motherBoardService.updateMotherBoardService(
      id,
      motherBoardDto,
      up as Image[]
    );
    respone(res, updateMotherBoard, "update successful", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function createMotherBoardWithExistPanel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    var image = req.files;
    var motherBoardDto = req.body as motherBoardRequest;
    const amount = image?.length;
    if (
      motherBoardDto.categoryId == null ||
      image == undefined ||
      image.length == 0 ||
      motherBoardDto.model == null ||
      motherBoardDto.price == null ||
      motherBoardDto.color == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    var up = await upload.uploadMulti(
      res,
      image,
      amount as number,
      "motherBoard"
    );
    var motherBoard =
      await motherBoardService.createMotherBoardWithExistPanelService(
        id,
        motherBoardDto,
        up
      );
    respone(res, motherBoard, "Create motherboard successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
  {
  }
}
async function deletePanelMotherBoard(
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
    const motherboard = await motherBoardService.deletePanelMotherBoardService(
      id
    );
    if (motherboard == null) {
      respone(res, null, "There are not ram found", 404);
      return;
    }
    respone(res, motherboard, "Delete motherboard Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  deletePanelMotherBoard,
  createMotherBoard,
  deleteMotherBoard,
  getAllMotherBoard,
  getMotherBoardById,
  updateMotherBoard,
  createMotherBoardWithExistPanel,
};
