import { Application, Router } from "express";
import auth from "./auth";
import brand from "./brand/index";
import partner from "./partner/index";
export default (app: Application) => {
  const route = Router();
  route.use("/auth", auth());
  route.use("/brand", brand());
  route.use("/partner", partner());

  app.use("/", route);
  return app;
};
