import { NextFunction, Request, Response } from "express";
import { respone } from "../../payload/respone/defaultRespone";
async function createRam(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function getRamById(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function getAllRam(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deleteRam(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function updateRam(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  createRam,
  deleteRam,
  getAllRam,
  getRamById,
  updateRam,
};
