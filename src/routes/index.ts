import { Application, Router } from "express";
import auth from "./auth";
import brand from "./brand/index";
import partner from "./partner/index";
import category from "./category/index";
import cases from "./case/index";
import ram from "./ram/index";
import motherBoard from "./motherBoard/index";
export default (app: Application) => {
  const route = Router();
  route.use("/auth", auth());
  route.use("/brand", brand());
  route.use("/partner", partner());
  route.use("/category", category());
  route.use("/case", cases());
  route.use("/ram", ram());
  route.use("/motherBoard", motherBoard());
  app.use("/", route);
  return app;
};
