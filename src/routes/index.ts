import { Application, Router } from "express";
import auth from "./auth";
import brand from "./brand/index";
import partner from "./partner/index";
import category from "./category/index";
export default (app: Application) => {
  const route = Router();
  route.use("/auth", auth());
  route.use("/brand", brand());
  route.use("/partner", partner());
  route.use("/category", category());

  app.use("/", route);
  return app;
};
