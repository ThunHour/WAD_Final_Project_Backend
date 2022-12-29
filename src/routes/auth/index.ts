import { Router } from "express";
import authController from "./auth.controller"
export default () => {
  const router = Router();
  router.get("/test",authController.signUp)
  // router.post("/login");
  // router.post("/signup");
  return router;
};
