import { Router } from "express";
import partnerController from "./partner.controller";
const uploadFile = require("multer")();
export default () => {
  const router = Router();
  router.post(
    "/create",
    uploadFile.single("file"),
    partnerController.createPartner
  );
  router.get("/getAllPartner", partnerController.getAllPartner);
  router.get("/getPartnerById/:id", partnerController.getPartnerById);
  router.delete("/delete/:id", partnerController.deletePartner);
  router.put(
    "/update/:id",
    uploadFile.single("file"),
    partnerController.updatePartner
  );
  return router;
};
