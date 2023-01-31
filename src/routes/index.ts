import { Application, Router } from "express";
import auth from "./auth";
import brand from "./brand/index";
import partner from "./partner/index";
import category from "./category/index";
import cases from "./case/index";
import ram from "./ram/index";
import motherBoard from "./motherBoard/index";
import storage from "./storage/index";
import gpu from "./gpu/index";
import powerSupply from "./powerSupply/index";

export default (app: Application) => {
  const route = Router();
  route.use("/auth", auth());
  route.use("/brand", brand());
  route.use("/partner", partner());
  route.use("/category", category());
  route.use("/case", cases());
  route.use("/ram", ram());
  route.use("/motherBoard", motherBoard());
  route.use("/storage", storage());
  route.use("/gpu", gpu());
  route.use("/powerSupply", powerSupply());
  app.use("/", route);
  return app;
};
