import { Router } from "express";
import brandController from "./brand.controller";
const uploadFile = require("multer")();
export default () => {
  const router = Router();
  router.post(
    "/create",
    uploadFile.array("file", 12),
    brandController.createBrand
  );
  router.get("/getAllBrand", brandController.getAllBrand);
  router.get("/getBrandById/:id", brandController.getBrandById);
  router.delete("/delete/:id", brandController.deleteBrand);
  // router.put("/create")
  return router;
};
