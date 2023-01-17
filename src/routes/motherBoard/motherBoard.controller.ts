import { NextFunction, Request, Response } from "express";
import { respone } from "../../payload/respone/defaultRespone";
async function createMotherBoard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
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
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  createMotherBoard,
  deleteMotherBoard,
  getAllMotherBoard,
  getMotherBoardById,
  updateMotherBoard,
};
