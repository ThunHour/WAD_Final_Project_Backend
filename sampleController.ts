import { NextFunction, Request, Response } from "express";
import { respone } from "./src/payload/respone/defaultRespone";
async function createPartner(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function getPartnerById(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function getAllPartner(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deletePartner(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function updatePartner(req: Request, res: Response, next: NextFunction) {
  try {
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
