import { Router } from "express";
import ramController from "./ram.controller";
const uploadFile = require("multer")();
export default () => {
  const router = Router();
  router.post("/create", uploadFile.array("file"), ramController.createRam);
  router.get("/getAllRam", ramController.getAllRam);
  router.get("/getRamById/:id", ramController.getRamById);
  router.delete("/delete/:id/:itemId", ramController.deleteRam);
  router.put("/update/:id", uploadFile.array("file"), ramController.updateRam);
  router.post(
    "/createWithExistPanel/:id",
    uploadFile.array("file"),
    ramController.createRamWithExistPanel
  );
  router.delete("/deletePanel/:id", ramController.deletePanelRam);
  return router;
};
