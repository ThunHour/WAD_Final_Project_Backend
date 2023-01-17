import { Router } from "express";
import motherBoardController from "./motherBoard.controller";
const uploadFile = require("multer")();
export default () => {
  const router = Router();
  router.post(
    "/create",
    uploadFile.array("file"),
    motherBoardController.createMotherBoard
  );
  router.get("/getAllMotherBoard", motherBoardController.getAllMotherBoard);
  router.get(
    "/getMotherBoardById/:id",
    motherBoardController.getMotherBoardById
  );
  router.delete("/delete/:id", motherBoardController.deleteMotherBoard);
  router.put(
    "/update/:id",
    uploadFile.array("file"),
    motherBoardController.updateMotherBoard
  );
  return router;
};
