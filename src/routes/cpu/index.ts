import { Router } from "express";
import cpuController from "./cpu.controller";
const uploadFile = require("multer")();
export default () => {
  const router = Router();
  router.post("/create", uploadFile.array("file"), cpuController.createCpu);
  router.get("/getAllCpu", cpuController.getAllCpu);
  router.get("/getCpuById/:id", cpuController.getCpuById);
  router.delete("/delete/:id/:itemId", cpuController.deleteCpu);
  router.put("/update/:id", uploadFile.array("file"), cpuController.updateCpu);
  router.post(
    "/createWithExistPanel/:id",
    uploadFile.array("file"),
    cpuController.createCpuWithExistPanel
  );
  router.delete("/deletePanel/:id", cpuController.deletePanelCpu);
  return router;
};
