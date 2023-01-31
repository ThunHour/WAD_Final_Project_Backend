import { Router } from "express";
import caseController from "./case.controller";
const uploadFile = require("multer")();
export default () => {
  const router = Router();
  router.post("/create", uploadFile.array("file"), caseController.createCase);
  router.get("/getAllCase", caseController.getAllCase);
  router.get("/getCaseById/:id", caseController.getCaseById);
  router.delete("/delete/:id/:itemId", caseController.deleteCase);
  router.put(
    "/update/:id",
    uploadFile.array("file"),
    caseController.updateCase
  );
  router.post(
    "/createWithExistPanel/:id",
    uploadFile.array("file"),
    caseController.createCaseWithExistPanel
  );
  router.delete("/deletePanel/:id", caseController.deletePanelCase);
  return router;
};
