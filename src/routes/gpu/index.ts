import { Router } from "express";
import gpuController from "./gpu.controller";
const uploadFile = require("multer")();
export default () => {
  const router = Router();
  router.post("/create", uploadFile.array("file"), gpuController.createGpu);
  router.get("/getAllGpu", gpuController.getAllGpu);
  router.get("/getGpuById/:id", gpuController.getGpuById);
  router.delete("/delete/:id/:itemId", gpuController.deleteGpu);
  router.put("/update/:id", uploadFile.array("file"), gpuController.updateGpu);
  router.post(
    "/createWithExistPanel/:id",
    uploadFile.array("file"),
    gpuController.createGpuWithExistPanel
  );
  router.delete("/deletePanel/:id", gpuController.deletePanelGpu);
  return router;
};
