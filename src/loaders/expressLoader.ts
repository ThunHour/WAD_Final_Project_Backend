import { Application, json } from "express";
import routes from "../routes/index";

import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimiterUsingThirdParty } from "../middleware/ratelimite";
export default (app: Application) => {
  // Application routing
  app.use(rateLimiterUsingThirdParty);
  app.use(cors());
  app.use(json());
  app.use(cookieParser());
  routes(app);
};
