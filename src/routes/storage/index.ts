import { Router } from "express";
import storageController from "./storage.controller";
const uploadFile = require("multer")();
export default () => {
  const router = Router();
  router.post(
    "/create",
    uploadFile.array("file"),
    storageController.createStorage
  );
  router.get("/getAllStorage", storageController.getAllStorage);
  router.get("/getStorageById/:id", storageController.getStorageById);
  router.delete("/delete/:id/:itemId", storageController.deleteStorage);
  router.put(
    "/update/:id",

    uploadFile.array("file"),
    storageController.updateStorage
  );
  router.post(
    "/createWithExistPanel/:id",
    uploadFile.array("file"),
    storageController.createStorageWithExistPanel
  );
  router.delete("/deletePanel/:id", storageController.deletePanelStorage);
  return router;
};
