import { NextFunction, Request, Response } from "express";
import categoryService from "./category.service";
import upload from "../../util/picture.upload";
import { respone } from "../../payload/respone/defaultRespone";
import { Category } from "@prisma/client";
async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    var image = req.file;
    var categoryName = req.body as Category;
    if (
      categoryName.categoryName == null ||
      image == undefined ||
      categoryName.brandId == null
    ) {
      respone(res, null, "bad request", 400);
      return;
    }
    const checkCategory = await categoryService.getCategoryByName(
      categoryName.categoryName
    );
    if (checkCategory != null) {
      respone(res, null, "Category already exist!", 409);
      return;
    }
    var up = await upload.uploadImage(res, "category", image);
    var category = await categoryService.createCategoryService(
      categoryName,
      up
    );

    respone(res, category, "Create category successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function getCategoryById(
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
    const category = await categoryService.getCategoryByIdService(id);
    console.log(category);

    if (category == null) {
      respone(res, null, "There are not category found", 404);
      return;
    }
    respone(res, category, "Get category successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function getAllCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await categoryService.getAllCategoryServie();
    if (category == null || category.length == 0) {
      respone(res, null, "There are not category found", 404);
      return;
    }
    respone(res, category, "Get category successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id == null) {
      respone(res, null, "id must not null", 400);
      return;
    }
    const category = await categoryService.deleteCategoryService(id);
    if (category == null) {
      respone(res, null, "Category do not exist!", 404);
      return;
    }
    respone(res, category, "Delete category Successfully", 200);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const name = req.body.categoryName;
    const img = req.file;
    if (id == null || (name == null && img == undefined)) {
      respone(res, null, "bad request", 400);
      return;
    }

    const checkCategory = await categoryService.getCategoryByIdService(id);
    if (checkCategory == null) {
      respone(res, null, "Category do not exist", 404);
      return;
    }

    var up =
      img == undefined
        ? checkCategory.Image?.imageUrl
        : await upload.uploadImage(res, "category", img);
    const category = await categoryService.updateCategoryService(
      id,
      name == null ? checkCategory.categoryName : name,
      up as string
    );
    respone(res, category, "Category update successfully", 200);
    return;
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
};
