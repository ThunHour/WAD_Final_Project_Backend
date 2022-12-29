import { Application, Request, Response, NextFunction, json } from "express";
import routes from "../routes/index";

import cors from "cors";
import cookieParser from "cookie-parser";

export default (app: Application) => {
  // Application routing
  app.use(cors());
  app.use(json());
  app.use(cookieParser());
  routes(app);
};
