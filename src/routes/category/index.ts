import { Router } from "express";
import categoryController from "./category.controller";
const uploadFile = require("multer")();
export default () => {
  const router = Router();
  router.post(
    "/create",
    uploadFile.single("file"),
    categoryController.createCategory
  );
  router.get("/getAllCategory", categoryController.getAllCategory);
  router.get("/getCategoryById/:id", categoryController.getCategoryById);
  router.delete("/delete/:id", categoryController.deleteCategory);
  router.put(
    "/update/:id",
    uploadFile.single("file"),
    categoryController.updateCategory
  );
  return router;
};
