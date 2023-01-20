import { Router } from "express";
import customizeService from "./customize.controller";
const uploadFile = require("multer")();
export default () => {
  const router = Router();
  router.post("/create", customizeService.createCustomize);
  router.post("/share/:id", customizeService.shareCustomize);
  router.post("/copyCustomize?:id", customizeService.createCustomize);
  router.get("/getAllCustomize", customizeService.getAllCustomize);
  router.get(
    "/getAllCustomizeByUserId",
    customizeService.getAllCustomizeByUserId
  );
  router.get("/getAllAdminCustomize", customizeService.getAllAdminCustomize);
  router.get("/getCustomizeById/:id", customizeService.getCustomizeById);
  router.delete("/delete/:id", customizeService.deleteCustomize);
  router.put("/update/:id", customizeService.updateCustomize);
  return router;
};
