import { Router } from "express";
import authController from "./auth.controller";
import img from "../../util/picture.upload";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const upload = require("multer")();
export default () => {
  const router = Router();
  // router.post("/login");
  // router.post("/signup");
  return router;
};
