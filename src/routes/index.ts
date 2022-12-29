import { Application, Router } from "express";
import auth from "./auth"


export default (app: Application) => {
  const route = Router();
  route.use('/auth',auth());

  app.use("/", route);
  return app;
};