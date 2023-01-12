import { Application, Router } from "express";
import auth from "./auth";
import brand from "./brand/index";
export default (app: Application) => {
  const route = Router();
  route.use("/auth", auth());
  route.use("/brand", brand());

  app.use("/", route);
  return app;
};
