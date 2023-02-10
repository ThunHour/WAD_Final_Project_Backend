import { NextFunction, Request, Response } from "express";
import brandService from "./brand.service";
import upload from "../../util/picture.upload";
import { respone } from "../../payload/respone/defaultRespone";
async function createBrand(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.file;
    var brandName = req.body.brandName;
    if (brandName == null) {
      respone(res, null, "image is require", 400);
      return;
    }
    const checkBrand = await brandService.getBrandByName(brandName);
    if (checkBrand != null) {
      respone(res, null, "Brand already exist!", 409);
      return;
    }
    var up = await upload.uploadImage(res, "brand", image);
    const brand = await brandService.createBrandService(
      brandName,
      up as string
    );

    respone(res, brand, "Create brand successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function getAllBrand(req: Request, res: Response, next: NextFunction) {
  try {
    const brand = await brandService.getAllBrandServie();
    console.log(req.user);
    if (brand == null || brand.length == 0) {
      respone(res, null, "There are not brand found", 404);
      return;
    }
    respone(res, brand, "Get brand successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function getBrandById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "Id must not null", 400);
      return;
    }
    const brand = await brandService.getBrandByIdService(id);

    if (brand == null) {
      respone(res, null, "There are not brand found", 404);
      return;
    }
    respone(res, brand, "Get brand successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deleteBrand(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const brand = await brandService.deleteBrandService(id);
    if (brand == null) {
      respone(res, null, "Brand do not exist!", 404);
      return;
    }
    respone(res, brand, "Delete brand Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function updateBrand(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const name = req.body.brandName;
    const img = req.file;
    if (id == null || (name == null && img == undefined)) {
      respone(res, null, "bad request", 400);
      return;
    }

    const checkBrand = await brandService.getBrandByIdService(id);
    if (checkBrand == null) {
      respone(res, null, "Brand do not exist", 404);
      return;
    }

    var up =
      img == undefined
        ? checkBrand.Image?.imageUrl
        : await upload.uploadImage(res, "brand", img);
    const brand = await brandService.updateBrandService(
      id,
      name == null ? checkBrand.brandName : name,
      up as string
    );
    respone(res, brand, "Brand update successfully", 200);
    return;
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

export default {
  createBrand,
  getAllBrand,
  getBrandById,
  deleteBrand,
  updateBrand,
};
