import { Router } from "express";
import powerSupplyController from "./powerSupply.controller";
const uploadFile = require("multer")();
export default () => {
  const router = Router();
  router.post(
    "/create",
    uploadFile.array("file"),
    powerSupplyController.createPowerSupply
  );
  router.get("/getAllPowerSupply", powerSupplyController.getAllPowerSupply);
  router.get(
    "/getPowerSupplyById/:id",
    powerSupplyController.getPowerSupplyById
  );
  router.delete("/delete/:id/:itemId", powerSupplyController.deletePowerSupply);
  router.put(
    "/update/:id",
    uploadFile.array("file"),
    powerSupplyController.updatePowerSupply
  );
  router.post(
    "/createWithExistPanel/:id",
    uploadFile.array("file"),
    powerSupplyController.createPowerSupplyWithExistPanel
  );
  router.delete(
    "/deletePanel/:id",
    powerSupplyController.deletePanelPowerSupply
  );
  return router;
};
