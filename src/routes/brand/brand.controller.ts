import { NextFunction, Request, Response } from "express";
import brandService from "./brand.service";
import upload from "../../util/picture.upload";
async function createBrand(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.files;
    var brandName = req.body.brandName;
    var amount = req.files?.length;
    var up = await upload.uploadMulti(res, image, Number(amount));
    var brand = await brandService.createBrandService(brandName, up);
    res.status(200).send(brand);
  } catch (error) {
    next(error);
  }
}
async function getAllBrand(req: Request, res: Response, next: NextFunction) {
  try {
    const brand = await brandService.getAllBrandServie();
    res.status(200).send(brand);
  } catch (error) {
    next(error);
  }
}

async function getBrandById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      res.status(400).send("id must not null");
    }
    const brand = await brandService.getBrandByIdService(id);
    res.status(200).send(brand);
  } catch (error) {
    next(error);
  }
}
async function deleteBrand(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      res.status(400).send("id must not null");
    }
    const brand = await brandService.deleteBrandService(id);
    res.status(200).send(brand);
  } catch (error) {
    next(error);
  }
}

export default {
  createBrand,
  getAllBrand,
  getBrandById,
  deleteBrand,
};
