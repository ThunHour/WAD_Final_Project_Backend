import { Application, json } from "express";
import routes from "../routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimiterUsingThirdParty } from "../middleware/ratelimite";
const eurekaHelper = require("../config/eureka/eureka-helper");
import config from "../config/config";
export default (app: Application) => {
  // Application routing
  // eurekaHelper.registerWithEureka("main-service", config.PORT || 3000);

  app.use(rateLimiterUsingThirdParty);
  app.use(cors());
  app.use(json());
  app.use(cookieParser());
  routes(app);
};
